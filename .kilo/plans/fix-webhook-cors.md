# План: Исправить отправку форм (CORS ошибка с n8n вебхуком)

## Проблема
Формы (`ContactForm.tsx`, `OrderForm.tsx`) делают `fetch` запрос из браузера к `https://n8auto.ru/webhook/...`. Браузер **блокирует ответ**, потому что вебхук n8n не возвращает CORS-заголовок `Access-Control-Allow-Origin`. Появляется «Ошибка соединения. Проверьте интернет.»

Код из 1С работает, т.к. 1С — серверный HTTP-клиент без ограничений CORS.

## Решение: настроить CORS на вебхуке n8n + почистить frontend

### ШАГ 1. Настроить CORS в n8n (на n8auto.ru) — делает пользователь в интерфейсе n8n

Поскольку это простой GET-запрос с query-параметрами и без нестандартных заголовков, **preflight (OPTIONS) не нужен**. Достаточно, чтобы вебхук возвращал заголовок ответа.

Варианты в n8n (зависит от версии/структуры флоу):
1. Если есть нода **«Respond to Webhook»**:
   - Response Headers → добавить:
     - `Access-Control-Allow-Origin: *`
   - Response Body → оставить JSON `{ "success": true }`
2. Если ответ формирует сама нода **Webhook** (Respond: «When Last Node Finishes» / «Using Respond to Webhook Node»):
   - включить «Include Response Headers» → добавить `Access-Control-Allow-Origin: *`

Проверить через браузер/curl: `curl -i "https://n8auto.ru/webhook/...?test=1"` — в ответе должен быть заголовок `access-control-allow-origin: *`.

### ШАГ 2. Почистить frontend (код сайта)

После включения CORS на n8n стандартный fetch сработает. Внести правки:

#### `src/components/ContactForm.tsx` (`handleSubmit`)
- Убрать `mode: 'no-cors'` (если был) / оставить поведение по умолчанию (`cors`)
- Убрать заголовок `Accept` (не обязателен; можно оставить — он CORS-safelisted)
- Убрать `credentials: 'omit'` (по умолчанию и так omit)
- Убрать `console.error` со статусом и тексты вида `Ошибка: ${response.status}` — оставить понятные сообщения
- Логика: `if (response.ok)` → успех, иначе → «Не удалось отправить заявку. Попробуйте позже.»; catch → «Ошибка соединения. Проверьте интернет.»

#### `src/components/OrderForm.tsx` (`handleSubmit`)
- Те же правки по fetch-настройкам
- После `response.ok` → показать «Заказ принят! Мы свяжемся с вами для оплаты.» и закрыть диалог (`onClose()`)
- Иначе → «Не удалось отправить заказ»; catch → «Ошибка соединения»

### ШАГ 3. Резервный вариант (если n8n CORS не получится быстро)
Если настройка CORS в n8n затягивается, временно переключить обе формы на `mode: 'no-cors'`:
- GET доставляется в n8n и срабатывает (как из 1C)
- Ответ opaque → показываем успех оптимистично после завершения fetch без исключения
- Минус: нельзя узнать реальный статус

## Проверка
1. После настройки CORS в n8n: в DevTools → Network → запрос к вебхуку должен иметь статус 200 и заголовок `access-control-allow-origin`, вкладка Console без ошибок CORS
2. Отправить заявку из обеих форм → приходит успех, заявка появляется в n8n
3. `npm run build` без ошибок

## Файлы
- `src/components/ContactForm.tsx` — правки fetch-логики
- `src/components/OrderForm.tsx` — правки fetch-логики
- n8n (n8auto.ru) — настройка CORS-заголовка (пользователь, вне кода)
