# SecureAuth — Insurance Portal Frontend

A production-ready React authentication portal with Login, Register, OTP Verification, and Forgot Password flows.

## Stack
- **React 18** + **React Router v6**
- **Vite** (bundler)
- **Tailwind CSS** (styling)
- **Lucide React** (icons)

## Project Structure

```
src/
├── components/
│   ├── Alert.jsx          # Reusable alert/error component
│   ├── OTPInput.jsx       # 6-box OTP input with auto-advance
│   ├── RolePicker.jsx     # Customer / Staff / Admin pill selector
│   └── Spinner.jsx        # Loading spinner
├── context/
│   └── AuthContext.jsx    # Auth state + API calls
├── hooks/
│   └── useAuth.js         # useAuth() hook
├── pages/
│   ├── auth/
│   │   ├── Login.jsx      # Login + Forgot Password modal
│   │   ├── Register.jsx   # Registration form + strength meter
│   │   └── OTPVerify.jsx  # 6-box OTP verification + countdown
│   └── Dashboard.jsx      # Protected post-login page
├── App.jsx                # Routes + PrivateRoute guard
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## API Endpoints Expected

| Method | Path                        | Body                              | Returns            |
|--------|-----------------------------|-----------------------------------|--------------------|
| POST   | /api/auth/login             | { email, password, role }         | { success, role, token, name } |
| POST   | /api/auth/register          | { name, email, mobile, role, password } | { success } |
| POST   | /api/auth/verify-otp        | { email, otp }                    | { success } |
| POST   | /api/auth/forgot-password   | { email }                         | { success } |
| POST   | /api/auth/reset-password    | { email, otp, newPassword }       | { success, message } |

All error responses should return `{ success: false, message: "..." }`.

## Vite Proxy

The `vite.config.js` proxies `/api` requests to `http://localhost:5000`.
Update this if your backend runs on a different port.

## Build for Production

```bash
npm run build
```

Output goes to `dist/`.
