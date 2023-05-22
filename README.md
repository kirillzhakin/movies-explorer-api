# Movies Browser (backend)
### Описание
Movies Browser — cервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете. Репозиторий содержит API дипломного проекта Movies Browser.

### Использованные технологии  
![NODE.JS](https://img.shields.io/badge/Node.js-172F45?style=for-the-badge&logo=node.js)
![MONGODB](https://img.shields.io/badge/MongoDB-172F45?style=for-the-badge&logo=mongodb&)
![EXPRESS.JS](https://img.shields.io/badge/Express-172F45?style=for-the-badge&logo=express)
#
👉 Демо API для тестирования доступно по адресу - [https://movies-explorer-api-six.vercel.app](https://movies-explorer-api-six.vercel.app)

❗️❗️❗️ Для работы с этим API есть frontend проект - [movies-explorer-frontend](https://github.com/kirillzhakin/movies-explorer-frontend.git)
#

### Возможности
- Регистрация  
- Авторизация
- Запрос информации о текущем пользователе
- Обновление информации о текущем пользователе
- Сохранение фильма в избранное
- Удаление фильма из избранного
- Запрос перечня сохранённых фильмов
#

### Инструкция по запуску (Быстрый старт)

Если вы хотите запустить локальную копию приложения, следуйте инструкции:

1. Cоздайте копию репозитория и клонируйте репозиторий
2. Установите зависимости npm

```sh
npm install
```

3. Запустите локальный сервер, в режиме разработки

```sh
npm run dev
```
 или в обычном режиме
```sh
npm run start
```

### Тестирование сервера с помощью Postman
#
### User
### POST /signup - регистрация пользователя
```sh
http://localhost:3000/signup
```
Тело запроса
```sh
{
  "name": "Kirill",
  "email": "test@test.ru",
  "password": "test"
}
```

Тело ответа
```sh
{
    "_id": "646b4eafa7daaeb179d22bbb",
    "name": "Kirill",
    "email": "test@test.ru"
}
```

### POST /signin - авторизация пользователя
```sh
http://localhost:3000/signin
```
Тело запроса
```sh
{
  "email": "test@test.ru",
  "password": "test"
}
```
Тело ответа
```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZiNGVhZmE3ZGFhZWIxNzlkMjJiYmIiLCJpYXQiOjE2ODQ3NTQyNjcsImV4cCI6MTY4NTM1OTA2N30.7_z-BGsO_LBY1SjhwNy9N_a92C15Aw7hk_N5j90fsQk",
    "message": "Авторизация прошла успешно"
}
```

### POST /signout - выход
```sh
http://localhost:3000/signout
```

Тело ответа
```sh
{
    "message": "Выход"
}
```

### GET /users/me - возвращает информацию о пользователе (email и имя)
```sh
http://localhost:3000/users/me
```
Тело ответа
```sh
{
    "_id": "646b4eafa7daaeb179d22bbb",
    "email": "test@test.ru",
    "name": "Kirill"
}
```
### GET /users/me - обновляет информацию о пользователе (email и имя)
```sh
http://localhost:3000/users/me
```
Тело запроса
```sh
{
  "name": "Kirill Ivanov",
  "email": "test@test.ru"
}
```

Тело ответа
```sh
{
    "_id": "646b4eafa7daaeb179d22bbb",
    "email": "test@test.ru",
    "name": "Kirill Ivanov"
}
```


### Movies
#

### POST /movies -   сохраняет фильм с переданными в теле данными

```sh
http://localhost:3000/movies
```
Тело запроса
```sh
{
  "country": "Россия",
  "director": "Иванов" ,
  "duration": "100",
  "year": "2022",
  "description": "Боевик",
  "image": "https://film.ru/image.jpg",
  "trailerLink": "https://www.youtube.com/watch?v=jw0SkOHhlp4",
  "thumbnail": "https://film.ru/image.jpg",
  "nameRU": "Аллигатор",
  "nameEN": "Alligator",
  "movieId": "1"
}
```

Тело ответа
```sh
{
    "country": "Россия",
    "director": "Иванов",
    "duration": 100,
    "year": "2022",
    "description": "Боевик",
    "image": "https://film.ru/image.jpg",
    "trailerLink": "https://www.youtube.com/watch?v=jw0SkOHhlp4",
    "thumbnail": "https://film.ru/image.jpg",
    "owner": "646b4eafa7daaeb179d22bbb",
    "movieId": 1,
    "nameRU": "Аллигатор",
    "nameEN": "Alligator",
    "_id": "646b5b18a7daaeb179d22bc3"
}
```


### GET /movies - возвращает все сохранённые текущим  пользователем фильмы


```sh
http://localhost:3000/movies
```

Тело ответа
```sh
[
    {
        "_id": "646b5cdfa7daaeb179d22bc9",
        "country": "Россия",
        "director": "Иванов",
        "duration": 100,
        "year": "2022",
        "description": "Боевик",
        "image": "https://film.ru/image.jpg",
        "trailerLink": "https://www.youtube.com/watch?v=jw0SkOHhlp4",
        "thumbnail": "https://film.ru/image.jpg",
        "owner": "646b4eafa7daaeb179d22bbb",
        "movieId": 1,
        "nameRU": "Аллигатор",
        "nameEN": "Alligator"
    }
]
```
### DELETE /movies/_id - удаляет сохранённый фильм по id

```sh
http://localhost:3000/movies/646b5cdfa7daaeb179d22bc9
```

Тело ответа
```sh
{
    "message": {
        "_id": "646b5cdfa7daaeb179d22bc9",
        "country": "Россия",
        "director": "Иванов",
        "duration": 100,
        "year": "2022",
        "description": "Боевик",
        "image": "https://film.ru/image.jpg",
        "trailerLink": "https://www.youtube.com/watch?v=jw0SkOHhlp4",
        "thumbnail": "https://film.ru/image.jpg",
        "owner": "646b4eafa7daaeb179d22bbb",
        "movieId": 1,
        "nameRU": "Аллигатор",
        "nameEN": "Alligator"
    }
}
```
