# MotionGuard AI

**A real-time, browser-based motion detection and monitoring system** built with the MERN stack. MotionGuard AI uses classical computer-vision frame differencing on a live webcam feed to detect movement, logs each event to a database, and visualizes activity on a per-user analytics dashboard.

**Live Demo:** [motionguard-ai.vercel.app](https://motionguard-ai.vercel.app)

---

## Features

- **Live webcam monitoring** directly in the browser (no installation or plugins)
- **Motion detection** using frame-by-frame pixel differencing (`pixelmatch`)
- **Real-time status**: switches between *Monitoring* and *Motion Detected*
- **Automatic event logging**: motion percentage and timestamp are saved to MongoDB (rate-limited to one save every 5 seconds)
- **Analytics dashboard**: total events, today's events, average motion level, and a motion-activity line chart
- **Motion history** table with date and motion percentage for every event
- **User accounts**: registration and login with bcrypt-hashed passwords and JWT authentication
- **Per-user data**: API routes are JWT-protected and each user only sees their own events
- **Responsive UI** built with Tailwind CSS and Framer Motion

---

## How Motion Detection Works

1. The webcam is sampled every **2 seconds** (`react-webcam`).
2. The current and previous frames are drawn onto a **320x240 canvas**.
3. The frames are compared pixel by pixel with **`pixelmatch`** (color-difference threshold `0.1`).
4. The number of changed pixels is converted into a **motion percentage**:

   ```
   motion % = (changed pixels / total pixels) x 100
   ```

5. If motion exceeds the trigger threshold (**2%**), the UI shows *Motion Detected* and the event is sent to the backend (at most once every 5 seconds).

> This is a classical computer-vision approach (frame differencing) that runs entirely in the browser. Raw video is never sent to the server; only the motion percentage, user ID and timestamp are stored.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, React Router, Tailwind CSS 4, Framer Motion, Recharts, Axios, react-webcam, pixelmatch |
| **Backend** | Node.js, Express 5, Mongoose, JSON Web Tokens, bcryptjs, CORS, dotenv |
| **Database** | MongoDB (MongoDB Atlas compatible) |
| **Deployment** | Frontend on Vercel; backend API hosted separately and connected through `VITE_API_URL` |

---

## Project Structure

```
motionguard-ai/
├── client/                     # React + Vite frontend
│   └── src/
│       ├── components/
│       │   └── Camera.jsx      # Webcam capture + motion detection logic
│       └── pages/
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Dashboard.jsx   # Live camera, stats, chart, history
│           └── History.jsx
├── server/                     # Node.js + Express backend
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── models/                 # Mongoose models (User, MotionEvent)
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth
│   │   ├── motionRoutes.js     # /api/motion
│   │   └── historyRoutes.js    # /api/history
│   └── server.js
└── .gitignore
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB](https://www.mongodb.com/) database (local or MongoDB Atlas)
- A device with a webcam

### 1. Clone the repository

```bash
git clone https://github.com/amnashoaib2510-cloud/motionguard-ai.git
cd motionguard-ai
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Start the server:

```bash
npm run dev     # development (nodemon)
# or
npm start       # production
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the app:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`), register an account, log in, and allow camera access.

---

## API Reference

Protected routes require the header `Authorization: Bearer <token>`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Create an account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | No | Log in; returns a JWT (valid for 7 days) and basic user info |
| `POST` | `/api/motion/save` | Yes | Save a motion event (`percentage`); the user is taken from the token |
| `GET`  | `/api/history` | Yes | Fetch the logged-in user's motion events, newest first |

---

## Roadmap

- [ ] Deep-learning based detection (e.g., YOLO / MobileNet-SSD) to classify *what* moved (person, animal, object)
- [ ] Pose-based human motion recognition
- [ ] Snapshot capture when motion is detected
- [ ] Email / push notifications for motion alerts
- [ ] Adjustable sensitivity and detection zones
- [ ] Export history as CSV / PDF reports

---

## Author

**Amna Shoaib**
BS Information Technology, MNS University of Agriculture, Multan, Pakistan
Research interests: Artificial Intelligence, Computer Vision, Deep Learning

- GitHub: [@amnashoaib2510-cloud](https://github.com/amnashoaib2510-cloud)
