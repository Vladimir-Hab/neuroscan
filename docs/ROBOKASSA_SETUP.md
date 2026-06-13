# Настройка Robokassa

Этот документ описывает регистрацию и настройку Robokassa для приема платежей.

## Регистрация

1. Перейдите на https://merchant.robokassa.ru/Register
2. Заполните форму регистрации:
   - Email
   - Пароль
   - Контактный телефон
   - Имя компании/ИП
   - ИНН
   - Юридический адрес
3. Подтвердите email
4. Дождитесь модерации (обычно 1-3 рабочих дня)

## Создание магазина

1. В личном кабинете Robokassa перейдите в "Магазины"
2. Нажмите "Добавить магазин"
3. Заполните данные:
   - Название магазина
   - URL сайта
   - Email для уведомлений
4. Сохраните — вы получите `MerchantLogin` и пароли

## URL для callback

После создания магазина укажите следующие URL:

### Тестовый режим (GitHub Pages)

Если сайт будет на GitHub Pages:
```
Success URL: https://<username>.github.io/neuroscan/payment-success
Fail URL:    https://<username>.github.io/neuroscan/payment-fail
```

### Боевой режим (свой домен)

Если сайт будет на своем домене:
```
Success URL: https://ваш-домен.ru/payment-success
Fail URL:    https://ваш-домен.ru/payment-fail
```

## Получение данных для интеграции

После создания магазина вы получите:

### Данные из личного кабинета Robokassa

- **MerchantLogin** — ваш логин в системе Robokassa
- **Password 1** — для формирования подписи (используется при отправке пользователя на оплату)
- **Password 2** — для проверки подписи (используется при обработке callback)
- **Test Mode** — включен ли тестовый режим

### Добавьте эти данные в n8n

В n8n создайте следующие переменные среды:

```env
ROBOKASSA_MERCHANT_LOGIN=ваш_merchant_login
ROBOKASSA_PASSWORD_1=ваш_password_1
ROBOKASSA_PASSWORD_2=ваш_password_2
ROBOKASSA_TEST_MODE=true
```

## Формирование подписи

### Для URL оплаты (Password 1)

```
SignatureValue = MD5(MerchantLogin:OutSum:InvId:Password1)
```

Пример:
```
MerchantLogin = demo
OutSum = 12200
InvId = 12345
Password1 = test_password

Строка для хэширования: demo:12200:12345:test_password
SignatureValue = MD5(demo:12200:12345:test_password)
```

### Для проверки callback (Password 2)

```
SignatureValue = MD5(OutSum:InvId:Password2)
```

Пример:
```
OutSum = 12200
InvId = 12345
Password2 = test_password

Строка для хэширования: 12200:12345:test_password
SignatureValue = MD5(12200:12345:test_password)
```

## Полный URL оплаты

Формируется в n8n:

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
  Culture=ru&
  IsTest=1
```

Примечание: `IsTest=1` только для тестового режима

## Параметры от Robokassa

### В URL после оплаты

Robokassa добавляет следующие параметры в URL:

| Параметр | Описание |
|----------|----------|
| `InvId` | Номер заказа |
| `OutSum` | Сумма платежа |
| `SignatureValue` | Подпись (для проверки с Password2) |
| `Shp_*` | Все кастомные параметры (Contact, Name, Email, Configuration) |

Пример URL:
```
https://example.com/payment-success?
  InvId=12345&
  OutSum=12200.00&
  SignatureValue=abc123&
  Shp_Contact=%2B79000000000&
  Shp_Name=Иван&
  Shp_Email=ivan%40example.com
```

### Callback на сервер (ResultURL)

Robokassa также отправляет запрос на указанный ResultURL (если настроен).

Параметры:
- `OutSum`
- `InvId`
- `SignatureValue`
- Все `Shp_*` параметры

## Тестовый режим

### Тестовые карты

Для тестирования используйте:

| Номер карты | Результат |
|-------------|-----------|
| 4111111111111111 | Успешно |
| 4111111111111112 | Ошибка |

### Тестирование

1. Убедитесь что `ROBOKASSA_TEST_MODE=true` в n8n
2. Откройте сайт, нажмите "Купить"
3. Заполните форму заказа
4. Нажмите "Перейти к оплате"
5. На странице Robokassa выберите тестовую карту
6. После оплаты вы должны быть перенаправлены на страницу success

## Переход в боевой режим

1. Убедитесь что всё работает в тестовом режиме
2. В n8n измените `ROBOKASSA_TEST_MODE=false`
3. Уберите параметр `IsTest=1` из URL
4. Тестируйте с реальной картой на минимальную сумму

## Безопасность

**Важно:**

- ✅ Никогда не храните секретные ключи на фронтенде
- ✅ Формирование подписи — только на бэкенде (n8n)
- ✅ Проверка подписи callback — только на бэкенде (n8n)
- ✅ Все финансовые операции проходят через n8n
- ✅ Используйте HTTPS
- ✅ Валидируйте все параметры от Robokassa

## Уведомления

### Настройка уведомлений в n8n

Добавьте в n8n workflow отправку уведомлений:

**При новом заказе (type=order):**
- Telegram: "Новый заказ #<order_id>. Телефон: <contact>"

**При успешной оплате (payment_callback=success):**
- Telegram: "Оплачен заказ #<order_id>. Сумма: <out_sum> ₽. Контакт: <contact>"
- Email: Чек на <email>

**При неудачной оплате (payment_callback=fail):**
- Telegram: "Отмена оплаты заказа #<order_id>"

## Частые проблемы

### Подпись неверна

Убедитесь что:
- Используете правильный пароль (Password1 для URL, Password2 для callback)
- Порядок параметров в строке для хэширования совпадает
- Сумма — это строка с двумя знаками после запятой (например "12200.00")

### Callback не приходит

Проверьте:
- ResultURL указан в настройках Robokassa
- Сервер доступен по указанному URL
- Возвращает `OK` без HTML

### Тестовый режим не работает

Убедитесь что:
- Параметр `IsTest=1` добавлен в URL
- Тестовый режим включен в настройках магазина Robokassa