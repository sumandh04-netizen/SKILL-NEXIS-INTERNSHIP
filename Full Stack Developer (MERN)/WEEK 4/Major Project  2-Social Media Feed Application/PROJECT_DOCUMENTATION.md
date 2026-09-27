# SOCIALHUB — PROJECT DOCUMENTATION

## 1. Objective

Build a complete AI-powered social-media platform where authenticated users can publish content, connect with people, discover posts, communicate in real time and use an AI assistant. The supplied project brief defines SocialHub as an AI-powered social media feed platform and asks for frontend, backend, database, REST APIs, real-time communication, AI, media, notifications, analytics, moderation, responsive UI and documentation. fileciteturn0file0L5-L13

## 2. Problem Statement

Traditional social-feed prototypes often separate content publishing, communication, discovery and intelligent assistance. SocialHub brings these workflows into one responsive MERN application.

## 3. Proposed Solution

The solution is a layered MERN system:

```text
Browser / Mobile Web
        |
React + Vite UI
        |
Axios REST + Socket.IO
        |
Express API + Auth Middleware + Services
        |
MongoDB / Mongoose
        |
External AI Provider (optional, server-side)
```

## 4. Functional Requirements

- Register, login, logout and token refresh.
- Manage profiles and follow relationships.
- Create and manage text/media posts.
- React, comment, save and discover posts.
- Search users, posts and hashtags.
- Exchange real-time messages.
- Receive notifications.
- Use an AI assistant and AI post helpers.
- View personal analytics.
- Review platform users/reports with authorized admin/moderator accounts.

These requirements reflect the source brief's authentication, profile, feed, post, media, reaction, comment, follow, chat, notification, search, AI and analytics sections. fileciteturn0file0L219-L247 fileciteturn0file0L293-L345 fileciteturn0file0L478-L540 fileciteturn0file0L612-L800

## 5. Non-Functional Requirements

- Readable and maintainable source code.
- Responsive layouts for desktop, tablet and mobile.
- Security middleware and server-side authorization.
- Loading, empty and error states.
- Pagination and indexes for common queries.
- AI credentials kept off the frontend.
- No deliberately inert major controls.

The source brief specifically asks for readable source, responsive design, security, performance, loading states, error handling and no fake functionality. fileciteturn0file0L57-L89 fileciteturn0file0L1118-L1142 fileciteturn0file0L1177-L1191 fileciteturn0file0L1567-L1575

## 6. Authentication Flow

```text
Register/Login
      |
Password -> bcrypt verification
      |
Access JWT + Refresh JWT
      |
Frontend stores tokens locally for this development build
      |
Axios sends Bearer access token
      |
Expired access token -> refresh endpoint
      |
Protected Express route -> user lookup -> authorization
```

For a hardened production deployment, move refresh tokens to secure HTTP-only cookies and use a managed email provider for verification/password reset.

## 7. Database Design

Primary models included:

- User
- Post
- Comment
- Reaction data embedded in Post
- Follow data embedded in User
- FollowRequest
- Notification
- Message
- Conversation
- Story
- Hashtag
- Bookmark
- Report
- Poll
- PollVote
- Media
- RefreshToken
- Analytics
- AIConversation
- AIMessage

The supplied brief calls for Mongoose models including these entities and asks for references, validation, indexes, timestamps and pagination-friendly fields. fileciteturn0file0L984-L1019

## 8. API Architecture

Routes are separated by domain and controllers contain request logic. Services hold cross-cutting AI and notification logic.

```text
routes -> controllers -> services/models
                  |
              MongoDB
```

## 9. AI Architecture

The frontend calls `/api/ai/*`. The backend `aiService.js` reads:

```env
AI_API_KEY=
AI_MODEL=
AI_BASE_URL=
```

The provider is intentionally abstracted so the frontend does not know or store provider credentials. The service expects an OpenAI-compatible chat-completions interface and can be adapted without changing React components.

Supported UI tasks include natural-language chat, caption improvement, hashtag generation, shortening, translation and image-analysis request architecture. The source brief requests these AI capabilities and server-side key protection. fileciteturn0file0L626-L655 fileciteturn0file0L661-L700

## 10. Socket.IO Architecture

A connected user joins `user:<id>`. A chat client joins `conversation:<id>`. Messages are persisted in MongoDB before broadcasting to the conversation room.

```text
React Chat
   |
Socket.IO
   |
Express/Node Socket Handler
   |
Message + Conversation Models
   |
MongoDB
   |
Broadcast message:new
```

## 11. UI/UX Architecture

Desktop uses:

```text
Sidebar | Main Feed | Right Sidebar
```

Mobile uses:

```text
Top Header
Stories
Feed
Bottom Navigation
```

This follows the source wireframe/project brief layout requirements. fileciteturn0file0L1481-L1520

## 12. Accessibility

The implementation uses semantic labels, visible focus states, descriptive image alt text and keyboard-friendly form controls. Further WCAG audit should be completed before production release.

## 13. Testing Strategy

Critical backend helper tests are included. Recommended next-stage tests:

1. Registration validation.
2. Login failure/success.
3. Protected route authorization.
4. Post CRUD.
5. Reaction replacement/removal.
6. Comment creation.
7. Follow/unfollow.
8. Search.
9. Notifications.
10. AI provider error handling.

The source brief lists these core API categories for testing. fileciteturn0file0L1381-L1401

## 14. Deployment Strategy

### Frontend

Build with:

```powershell
npm run build
```

Deploy the generated `frontend/dist` to a static host.

### Backend

Run:

```powershell
npm start
```

Use a managed Node service or container platform and set environment variables through the platform's secret manager.

### Database

Use MongoDB Atlas for a production deployment and restrict network access appropriately.

## 15. Future Scope

- Email verification and transactional email integration.
- Password reset with expiring one-time tokens.
- Object storage/CDN for media.
- Video transcoding and thumbnails.
- Story creation/viewer UI.
- Poll composer/voting UI.
- Advanced recommendation ranking.
- AI streaming responses.
- Automated accessibility testing.
- Comprehensive API/integration test suite.
- Background jobs for notification and analytics aggregation.

## 16. Validation Workflow

The source brief defines the target end-to-end workflow as registration, login, home feed, post creation, image upload, publish, engagement, following, notifications, profile, messaging, AI, search, analytics and logout. fileciteturn0file0L1599-L1640

The included application implements the core path and leaves external-provider-dependent features clearly configuration-based rather than fabricating successful AI results.
