# SocialHub API Reference

All protected endpoints use:

`Authorization: Bearer <accessToken>`

## Auth

### POST /api/auth/register

Body: `fullName`, `username`, `email`, `password`

### POST /api/auth/login

Body: `emailOrUsername`, `password`

### POST /api/auth/refresh

Body: `refreshToken`

### POST /api/auth/logout

Authenticated.

## Posts

`GET /api/posts?page=1&limit=10`

`POST /api/posts` uses multipart form data with `content` and zero or more `media` files.

`PUT /api/posts/:id`

`DELETE /api/posts/:id`

`POST /api/posts/:id/reactions` body `{ "type": "like" }` or `{ "type": "none" }`

`GET /api/posts/:id/comments`

`POST /api/posts/:id/comments` body `{ "content": "...", "parent": null }`

`POST /api/posts/:id/bookmark`

`GET /api/posts/saved`

## AI

`POST /api/ai/chat` body `{ "message": "...", "conversationId": "optional" }`

`POST /api/ai/task` body `{ "task": "...", "input": "..." }`

`POST /api/ai/image-analysis` body `{ "imageUrl": "...", "caption": "optional" }`

## Health

`GET /api/health`
