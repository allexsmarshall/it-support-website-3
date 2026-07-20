import json
import os
import hmac
import hashlib
import time
import psycopg2
import psycopg2.extras


def verify_session_token(token: str, secret: str, max_age: int = 60 * 60 * 12) -> bool:
    try:
        ts_str, sig = token.split('.', 1)
    except ValueError:
        return False
    expected = hmac.new(secret.encode(), ts_str.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected):
        return False
    ts = int(ts_str)
    return (time.time() - ts) < max_age


def handler(event: dict, context) -> dict:
    '''
    Business: Возвращает список заявок и позволяет обновлять их статус. Доступно только с валидной сессией администратора.
    Args: event - dict с httpMethod, headers X-Authorization, body (id, status) для PUT
          context - объект с request_id
    Returns: HTTP-ответ со списком заявок или результатом обновления статуса
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
        'Content-Type': 'application/json',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    session_secret = os.environ.get('ADMIN_SESSION_SECRET', '')
    headers = event.get('headers', {})
    auth_header = headers.get('X-Authorization') or headers.get('x-authorization') or ''
    token = auth_header.replace('Bearer ', '').strip()

    if not token or not session_secret or not verify_session_token(token, session_secret):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': 'БД не настроена'})}

    conn = psycopg2.connect(dsn)
    try:
        if method == 'GET':
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, name, phone, company, services, message, status, "
                    "to_char(created_at, 'YYYY-MM-DD HH24:MI') as created_at "
                    "FROM orders ORDER BY created_at DESC LIMIT 200"
                )
                rows = cur.fetchall()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'orders': rows}, default=str)}

        if method == 'PUT':
            try:
                data = json.loads(event.get('body') or '{}')
            except json.JSONDecodeError:
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Invalid JSON'})}

            order_id = data.get('id')
            status = (data.get('status') or '').strip()
            allowed_statuses = ('new', 'in_progress', 'closed')

            if not order_id or status not in allowed_statuses:
                return {'statusCode': 422, 'headers': cors, 'body': json.dumps({'error': 'Некорректные данные'})}

            with conn.cursor() as cur:
                cur.execute("UPDATE orders SET status = %s WHERE id = %s", (status, order_id))
            conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
    finally:
        conn.close()
