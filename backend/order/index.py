import json
import os
import urllib.request
import urllib.parse
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает заявку на техническое сопровождение с сайта, сохраняет в БД и отправляет её в Telegram.
    Args: event - dict с httpMethod, body (name, phone, company, services, message)
          context - объект с request_id
    Returns: HTTP-ответ со статусом обработки заявки
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    try:
        data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = (data.get('name') or '').strip()
    phone = (data.get('phone') or '').strip()
    company = (data.get('company') or '').strip()
    services = data.get('services') or []
    message = (data.get('message') or '').strip()

    if len(name) < 2 or len(phone) < 6:
        return {'statusCode': 422, 'headers': cors, 'body': json.dumps({'error': 'Заполните имя и телефон'})}

    services_text = ', '.join(services) if services else '—'

    dsn = os.environ.get('DATABASE_URL')
    if dsn:
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO orders (name, phone, company, services, message) VALUES (%s, %s, %s, %s, %s)",
                    (name, phone, company, services_text, message)
                )
            conn.commit()
        finally:
            conn.close()

    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if token and chat_id:
        text = (
            '🆕 <b>Новая заявка на сопровождение</b>\n\n'
            f'👤 <b>Имя:</b> {name}\n'
            f'📞 <b>Телефон:</b> {phone}\n'
            f'🏢 <b>Компания:</b> {company or "—"}\n'
            f'🛠 <b>Услуги:</b> {services_text}\n'
            f'💬 <b>Задача:</b> {message or "—"}'
        )

        tg_url = f'https://api.telegram.org/bot{token}/sendMessage'
        payload = urllib.parse.urlencode({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'HTML',
        }).encode()

        req = urllib.request.Request(tg_url, data=payload)
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}