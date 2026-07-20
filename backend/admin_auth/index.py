import json
import os
import hmac
import hashlib
import time


def make_session_token(secret: str) -> str:
    ts = str(int(time.time()))
    sig = hmac.new(secret.encode(), ts.encode(), hashlib.sha256).hexdigest()
    return f'{ts}.{sig}'


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


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt_hex, hash_hex = stored_hash.split(':', 1)
    except ValueError:
        return False
    salt = bytes.fromhex(salt_hex)
    computed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 200000).hex()
    return hmac.compare_digest(computed, hash_hex)


def handler(event: dict, context) -> dict:
    '''
    Business: Авторизация администратора — вход по паролю, выдача сессионного токена, проверка сессии.
    Args: event - dict с httpMethod, body (password) для входа, headers X-Authorization для проверки
          context - объект с request_id
    Returns: HTTP-ответ с токеном сессии или статусом проверки
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
        'Content-Type': 'application/json',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    session_secret = os.environ.get('ADMIN_SESSION_SECRET', '')
    password_hash = os.environ.get('ADMIN_PASSWORD_HASH', '')

    if method == 'GET':
        auth_header = event.get('headers', {}).get('X-Authorization') or event.get('headers', {}).get('x-authorization') or ''
        token = auth_header.replace('Bearer ', '').strip()
        if token and session_secret and verify_session_token(token, session_secret):
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    if method == 'POST':
        try:
            data = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Invalid JSON'})}

        password = (data.get('password') or '').strip()

        if not password_hash or not session_secret:
            return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': 'Админка не настроена'})}

        if not password or not verify_password(password, password_hash):
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный пароль'})}

        token = make_session_token(session_secret)
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'token': token})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
