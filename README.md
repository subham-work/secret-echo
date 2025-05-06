# SecretEcho – Real-Time AI Companion Chat App

A lightweight, scalable real-time messaging app with simulated AI responses built for a Senior Full Stack Engineer technical assessment.

---

## 🚀 Features

- Realtime chat via Socket.io
- JWT-based authentication (Login/Signup)
- Persistent chat history via MongoDB
- Simulated AI companion replies
- Modular, scalable backend & frontend structure

---

## 📁 Folder Structure

```
secretecho/
├── backend/   # Node.js + Express + MongoDB API
├── frontend/  # Next.js client
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone Repo

```bash
git clone <repo-url>
cd secretecho
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env      # Fill in your MongoDB URI and JWT secret
npm run dev               # Starts backend on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev               # Starts frontend on http://localhost:3000
```

---

## 🔐 Auth

- Signup: `POST /api/auth/signup`
- Login: `POST /api/auth/login`
- Uses JWT in `Authorization` header

---

## 💬 Messaging API

- `GET /api/messages` – fetch all messages (requires JWT)
- `Socket.io` emits:
  - `send_message` to send
  - `receive_message` for real-time updates

---

## 🧠 AI Simulation

The server randomly replies with predefined responses after a user's message.

---

## 🧪 Unit Tests

we include unit tests for:

- Auth (signup/login flow)
- Message API

---

## ⚠️ Known Trade-offs

- No UI framework/styling polish (focus is on logic & architecture)
- AI responses are hardcoded/random (no ML)
- No user-to-user chat (AI-only for now)

---

## 📌 Tech Stack

- **Frontend**: Next.js, Axios, Socket.io-client
- **Backend**: Express.js, MongoDB, Socket.io, JWT, bcrypt
