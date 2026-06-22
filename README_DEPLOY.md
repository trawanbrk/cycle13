# Cycle OS - Deploy Guide

## 1. DNS A-record

Создайте A-запись для субдомена `cycle13.peso27.ru`, указывающую на IP вашего VPS.

```
cycle13  IN  A  <VPS_IP>
```

## 2. Установка Docker на VPS

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

## 3. Клонирование репозитория

```bash
git clone https://github.com/trawanbrk/cycle13.git
cd cycle13
```

## 4. Настройка .env

```bash
cp .env.example .env
# Отредактируйте .env при необходимости
```

## 5. Настройка домена в Caddyfile

Caddyfile уже настроен на `cycle13.peso27.ru`. Если нужен другой домен,
отредактируйте первую строку Caddyfile.

## 6. Запуск

```bash
docker compose up -d --build
```

## 7. Проверка логов

```bash
docker compose logs -f
```

## 8. Обновление

```bash
git pull
docker compose up -d --build
```

## Проверка

Откройте `https://cycle13.peso27.ru` в браузере. Caddy автоматически получит
SSL-сертификат от Let's Encrypt.

## Тестовый режим даты

Добавьте `?date=YYYY-MM-DD` к URL для проверки:

- `https://cycle13.peso27.ru/?date=2026-06-22` - 7 цикл, 2 неделя, 7♥
- `https://cycle13.peso27.ru/?date=2026-12-28` - Джокер-неделя
- `https://cycle13.peso27.ru/?date=2027-01-04` - новый Туз♠