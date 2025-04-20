# 🏡 Homenest

**Homenest** is a full-stack web application built with **Next.js**, designed to provide a seamless platform for **home sharing and booking**. Whether you're a homeowner looking to rent out space or a traveler in search of budget-friendly stays, Homenest makes it easy, secure, and efficient.

---

## 🚀 Features

- 🌐 **Google Authentication** with NextAuth
- 📋 **List a Home** with title, description, amenities, location, and price
- 🔍 **Search Listings** by location with real-time suggestions
- 📆 **Date-based Booking** with `react-datepicker`
- 💳 **Manual Payment** with QR code and transaction ID confirmation
- 🧾 **Booking Management** with confirmation and toast notifications
- 📱 **Responsive Design** for all screen sizes
- 🔐 **Protected Routes**: Booking only allowed after login
- 🧑 **User Session Management** via `next-auth`

---

## 🛠️ Tech Stack

| Frontend      | Backend/API         | Database    | Authentication | UI/UX        |
|---------------|---------------------|-------------|----------------|--------------|
| Next.js 14    | Next.js API Routes  | MongoDB     | NextAuth       | Tailwind CSS |
| React         | RESTful APIs        | Mongoose    | Google OAuth   | React Icons  |

---

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/devankit57/homenest.git
   cd homenest
2. **Install Dependencies**
   ```bash
   npm install
3. **Run the project**
   ```bash
   npm run dev

## 📁 Project Structure 

Homenest/
├── components/
│   └── (Your React components)
├── node_modules/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   └── error.js
│   │   ├── bookings/
│   │   │   └── index.js
│   │   └── listings/
│   │       ├── add-listings.js
│   │       ├── edit-listings.js
│   │       ├── fetch-booking.js
│   │       └── fetch-listings.js
│   ├── bookings/
│   │   └── index.js
│   ├── listings/
│   │   ├── [listingId].js
│   │   └── index.js
│   ├── login/
│   │   └── index.js
│   ├── my-listings/
│   │   └── index.js
│   ├── _app.js
│   └── index.js
├── public/
│   └── (Images like payment.png, login-bg.png, google.webp, etc.)
├── styles/
│   └── (Global CSS files if any)
├── utils/
│   └── (Utility functions or helpers)
├── .env.local
├── .gitignore
├── package.json
├── next.config.js
└── README.md (to be created)

## 🖼️ Screenshot


