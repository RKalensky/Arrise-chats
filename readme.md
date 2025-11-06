Chats based on WebSockets

# Chat Client

This is the **frontend** part of the Chats project — a real-time chat app built with **React**, **Redux**, and *
*Redux-Saga**.  
It connects to the backend over REST and WebSocket, allowing users to join rooms, send messages, and see live updates.

---

## 🧰 Tech Stack

- React 19
- Redux
- Redux-Saga for async flows
- Webpack (custom configs for dev & prod)
- Babel (preset-env + preset-react)
- SCSS / SCSS Modules
- ESLint + Prettier
- Rive animations (visual backgrounds)

### 1. Install dependencies

```
npm install
```

### 2. Run in development with hot reload

```
npm run start:dev
```

### 3. Run in production mode locally

```
npm run start:prod
```

### 4.Build optimized bundle

```
npm run build
```

# Chat Server

## Overview

This is the **backend** for the Chats project.  
It manages rooms, messages, and WebSocket connections to provide real-time chat functionality.

---

## 🧰 Tech Stack

- Node.js (LTS)
- Express.js
- WebSocket

---

### 1. Install dependencies

```
npm install
```

### 2. Starts the server with nodemon for auto-reload.

```
npm run dev
```

3. Start the server

```
npm run start
```