# Настройка n8n webhook

Этот документ описывает настройку n8n webhook для работы с формами и Robokassa.

## Текущий webhook

```
https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953
```

## Параметры

### Общие параметры

| Параметр | Тип | Обязателен | Описание |
|----------|-----|-----------|----------|
| `type` | string | Да | Тип заявки: `contact`, `order`, `payment_callback` |

### type=contact (Форма обратной связи)

| Параметр | Тип | Обязателен | Описание |
|----------|-----|-----------|----------|
| `name` | string | Да | Имя клиента |
| `contact` | string | Да | Телефон или Telegram |
| `configuration` | string | Нет | Конфигурация 1С |
| `services` | string | Нет | Выбранные услуги (через запятую) |
| `task` | string | Нет | Описание задачи |

**Пример запроса:**
```
GET https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?
  type=contact&
  name=Иван+Иванов&
  contact=+79000000000&
  configuration=Управление+торговли+11&
  services=Адаптация+конфигурации%2C+Новые+типы+документов&
  task=Нужно+добавить+распознавание+актов
```

**Ответ:**
```json
{
  "success": true
}
```

### type=order (Форма заказа)

| Параметр | Тип | Обязателен | Описание |
|----------|-----|-----------|----------|
| `name` | string | Да | Имя клиента |
| `contact` | string | Да | Телефон |
| `email` | string | Нет | Email |
| `configuration` | string | Нет | Конфигурация 1С |
| `tariff_id` | string | Да | ID тарифа (ut-11-5, bp-3-0, full-kit) |
| `tariff_name` | string | Да | Название тарифа |
| `price` | number | Да | Цена |
| `comment` | string | Нет | Комментарий |

**Пример запроса:**
```
GET https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?
  type=order&
  name=Иван+Иванов&
  contact=+79000000000&
  email=ivan@example.com&
  configuration=1С%3AУправление+торговлей+11&
  tariff_id=ut-11-5&
  tariff_name=Расширение+для+1С%3AУТ11.5&
  price=12200&
  comment=Нужна+установка+до+конца+недели
```

**Ответ:**
```json
{
  "success": true,
  "order_id": 12345,
  "robokassa_url": "https://auth.robokassa.ru/Merchant/Index.aspx?..."
}
```

### type=payment_callback (Callback от Robokassa)

| Параметр | Тип | Обязателен | Описание |
|----------|-----|-----------|----------|
| `inv_id` | string | Да | Номер заказа (InvId) |
| `out_sum` | string | Да | Сумма (OutSum) |
| `status` | string | Да | Статус: `success`, `fail` |

**Пример запроса:**
```
GET https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?
  type=payment_callback&
  inv_id=12345&
  out_sum=12200.00&
  status=success
```

**Ответ:**
```json
{
  "success": true
}
```

## Логика n8n workflow

### Для type=contact

1. Принять параметры из URL
2. Создать запись в CRM/1С
3. Отправить уведомление вам (Telegram/Email)
4. Вернуть `200 OK` с JSON `{ "success": true }`

### Для type=order

1. Принять параметры из URL
2. Создать запись в CRM/1С со статусом "Ожидает оплаты"
3. Сгенерировать уникальный `order_id`
4. Сформировать MD5 подпись для Robokassa:
   ```
   SignatureValue = MD5(MerchantLogin:OutSum:InvId:Password1)
   ```
5. Сформировать URL Robokassa:
   ```
   https://auth.robokassa.ru/Merchant/Index.aspx?
     MerchantLogin=<login>&
     OutSum=<price>&
     InvId=<order_id>&
     Description=<tariff_name>&
     SignatureValue=<signature>&
     Shp_Contact=<contact>&
     Shp_Name=<name>&
     Shp_Email=<email>&
     Shp_Configuration=<configuration>&
     Culture=ru
   ```
6. Вернуть JSON:
   ```json
   {
     "success": true,
     "order_id": 12345,
     "robokassa_url": "https://auth.robokassa.ru/Merchant/Index.aspx?..."
   }
   ```

### Для type=payment_callback

1. Принять параметры из URL
2. Найти заказ по `inv_id`
3. Обновить статус заказа в CRM/1С:
   - `success` → "Оплачен"
   - `fail` → "Отменен"
4. Если статус `success` — отправить уведомление вам с контактами клиента
5. Вернуть `200 OK` с JSON `{ "success": true }`

## Переменные среды n8n

Создайте следующие переменные в n8n:

```env
ROBOKASSA_MERCHANT_LOGIN=your_login
ROBOKASSA_PASSWORD_1=your_password_1
ROBOKASSA_PASSWORD_2=your_password_2
ROBOKASSA_TEST_MODE=true
```

## Тестирование

### Тест type=contact

```bash
curl "https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?type=contact&name=Тест&contact=+79000000000"
```

### Тест type=order

```bash
curl "https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?type=order&name=Тест&contact=+79000000000&tariff_id=ut-11-5&tariff_name=Тест&price=100"
```

Ожидаемый ответ:
```json
{
  "success": true,
  "order_id": 12345,
  "robokassa_url": "..."
}
```

### Тест type=payment_callback

```bash
curl "https://n8auto.ru/webhook/312b5335-6a03-4722-8d47-7b125579e953?type=payment_callback&inv_id=12345&status=success"
```