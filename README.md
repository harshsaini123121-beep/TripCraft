# 🗺️ TripCraft — AI-Powered Travel Planner

A full-stack travel planning web app where AI crafts your perfect trip itinerary, compares hotels and transport, and redirects to real booking platforms.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| AI | OpenAI GPT-4o |
| Auth | JWT + bcryptjs |

---

## 🚀 Quick Setup

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# In the server/ folder, create .env
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.mongodb.net/tripcraft
JWT_SECRET=your_super_secret_key_here
OPENAI_API_KEY=sk-your-openai-key-here
```

### 3. Get Required API Keys

**MongoDB Atlas (Free):**
1. Go to https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string → paste in MONGO_URI

**OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create new key → paste in OPENAI_API_KEY

### 4. Run the App

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

Open http://localhost:5173

---

## 📦 Project Structure

```
tripcraft/
├── server/                  # Node.js + Express backend
│   ├── config/db.js         # MongoDB connection
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── services/aiService.js # OpenAI integration
│   └── server.js            # Entry point
│
└── client/                  # React frontend
    └── src/
        ├── pages/           # Home, PlanTrip, TripResult, MyTrips, Auth
        ├── components/      # Navbar, Result tabs
        ├── context/         # AuthContext
        ├── services/api.js  # Axios API calls
        └── utils/           # Booking redirect URLs
```

---

## 🔗 Booking Integrations

| Transport | Platform | Redirect |
|---|---|---|
| 🚌 Bus | RedBus | redbus.in |
| 🚂 Train | RailYatri | railyatri.in |
| ✈️ Flight | MakeMyTrip | makemytrip.com/flights |
| 🏨 Hotels | MakeMyTrip | makemytrip.com/hotels |
| 🚖 Cab | Ola Cabs | olacabs.com |

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | ❌ | Create account |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/me | ✅ | Get profile |
| POST | /api/trip/generate | Optional | AI trip generation |
| GET | /api/trip/my-trips | ✅ | Saved trips |
| GET | /api/trip/:id | ❌ | Get trip by ID |
| DELETE | /api/trip/:id | ✅ | Delete trip |

---

## 🎨 Design

- **Theme**: Luxury editorial — midnight navy + gold accents
- **Fonts**: Playfair Display + DM Sans
- **UI**: Glassmorphism cards, animated gradients, parallax orbs
- **Mobile**: Fully responsive

---

## 📝 Notes

- Users can generate trips without an account (guest mode)
- Login required to save trips to My Trips
- All booking buttons open in new tab (redirect-based, no payment processing)
- AI generates realistic hotel names, train names, and landmarks for the actual destination
