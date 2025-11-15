# 🚀 Deployment Guide for e-Learning Platform

This guide walks you through deploying the e-Learning Platform from scratch.

---

## 📋 Prerequisites Checklist

Before deploying, you need accounts for these services (all have free tiers):

- [ ] MongoDB Atlas account (database)
- [ ] Cloudinary account (file uploads)
- [ ] Gmail account (for SMTP emails)
- [ ] Vercel account (for deployment) or Railway/Render
- [ ] GitHub account (code hosting)

---

## 🔧 STEP 1: Set Up Required Services

### 1.1 MongoDB Atlas (Database)

**What it does:** Stores all your application data (users, courses, etc.)

**Setup Instructions:**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (select Free tier - M0)
4. Wait for cluster creation (2-5 minutes)
5. Click "Connect" on your cluster
6. Add a database user:
   - Username: `elearning_user` (or your choice)
   - Password: Generate a secure password and **SAVE IT**
7. Add IP access:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict this later
8. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://elearning_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - **SAVE THIS STRING** - you'll need it for `MONGODB_URL`

---

### 1.2 Cloudinary (File Uploads)

**What it does:** Stores uploaded files (documents, images)

**Setup Instructions:**

1. Go to https://cloudinary.com/users/register/free
2. Create a free account
3. After login, go to Dashboard
4. Find these values and **SAVE THEM**:
   - **Cloud Name** (near the top)
   - **API Key** (in "Account Details" section)
   - **API Secret** (click "eye" icon to reveal)
5. These will be your:
   - `CLOUDINARY_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_SECRET_KEY`

---

### 1.3 Gmail SMTP (Email Service)

**What it does:** Sends verification emails to users

**Setup Instructions:**

1. Use an existing Gmail account or create a new one
2. Enable 2-Step Verification:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification" → Turn it on
3. Create App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → Type "elearning-platform"
   - Click "Generate"
   - **SAVE THE 16-CHARACTER PASSWORD** (no spaces)
4. You'll need:
   - `SMTP_EMAIL`: Your Gmail address
   - `SMTP_PASS`: The 16-character app password

---

## 🛠️ STEP 2: Configure Environment Variables

### 2.1 Backend Configuration

1. Copy the example file:
   ```bash
   cp .env.example backend/.env
   ```

2. Edit `backend/.env` with your actual values:

```env
# Database (from MongoDB Atlas)
MONGODB_URL=mongodb+srv://elearning_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net
DB_NAME=eLearning
PORT=4400

# JWT Secrets (generate random strings)
ACCESS_TOKEN_SECRET=generate_a_random_32_character_string_here_abc123xyz
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=generate_a_different_32_character_string_here_xyz789
REFRESH_TOKEN_EXPIRY=30d

# CORS (will update after frontend deployment)
CORS=http://localhost:5173

# Email (from Gmail setup)
SMTP_EMAIL=youremail@gmail.com
SMTP_PASS=your16characterapppassword

# Cloudinary (from Cloudinary dashboard)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# URLs (will update after deployment)
BACKEND_URL=http://localhost:4400
FRONTEND_URL=http://localhost:5173

TEST=development
```

**To generate JWT secrets** (run in terminal):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run this twice to get two different secrets.

### 2.2 Frontend Configuration

1. Create the file:
   ```bash
   touch frontend/.env
   ```

2. For now, leave it empty (or add):
```env
# Will be set during production deployment
VITE_API_URL=
```

---

## 🧪 STEP 3: Test Locally

Before deploying, make sure everything works locally:

### 3.1 Install Dependencies

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3.2 Start Backend

```bash
cd backend
npm run dev
```

Should see:
```
MongoDB connected !! DB HOST :: ...
⚙️ Server is running at port : 4400
```

### 3.3 Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Should see:
```
VITE v5.0.8  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3.4 Test the Application

1. Open http://localhost:5173
2. Try to sign up as a student
3. Check your email for verification link
4. If email arrives, everything is working! ✅

---

## 🚀 STEP 4: Deploy to Production

### Option A: Vercel (Recommended - Easiest)

#### Deploy Backend

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Add Environment Variables (click "Environment Variables"):
   - Copy ALL variables from your `backend/.env`
   - Add them one by one
   - ⚠️ Update `CORS` to `*` temporarily (we'll fix this)
   - ⚠️ Update `BACKEND_URL` to your Vercel URL (you'll get this after deploy)
7. Click "Deploy"
8. Wait for deployment to complete
9. **SAVE YOUR BACKEND URL** (e.g., `https://your-app.vercel.app`)

#### Deploy Frontend

1. In Vercel dashboard, click "Add New" → "Project"
2. Import the same repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL`: `https://your-backend-url.vercel.app/api`
5. Click "Deploy"
6. Wait for deployment
7. **SAVE YOUR FRONTEND URL** (e.g., `https://your-frontend.vercel.app`)

#### Final Configuration

1. Go back to Backend project settings
2. Update Environment Variables:
   - `CORS`: `https://your-frontend.vercel.app`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
   - `BACKEND_URL`: `https://your-backend.vercel.app`
3. Redeploy backend (Deployments → click "..." → Redeploy)

---

### Option B: Railway (Better for long-running processes)

#### Deploy Backend

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - Add a new service
   - Select `backend` folder
   - Railway auto-detects Node.js
6. Add Environment Variables (Settings → Variables):
   - Copy all from `backend/.env`
   - Railway will provide `PORT` automatically
7. Deploy
8. Get your backend URL from Settings → Domains

#### Deploy Frontend

Use Vercel for frontend (as above) or:
1. Create another Railway service
2. Select `frontend` folder
3. Add `VITE_API_URL` environment variable
4. Deploy

---

## ✅ STEP 5: Verify Deployment

Test these features:

1. **Homepage loads**: Visit your frontend URL
2. **Student signup**: Create a student account
3. **Email verification**: Check email and click verification link
4. **Login**: Log in with verified account
5. **File upload**: Try document upload (tests Cloudinary)
6. **Teacher signup**: Test teacher registration flow
7. **Admin login**: Create admin account manually in MongoDB

---

## 🔒 STEP 6: Secure Your Deployment

### Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas
2. Network Access → Edit
3. Remove "0.0.0.0/0"
4. Add specific IP ranges for:
   - Vercel IPs: https://vercel.com/docs/concepts/deployments/ip-addresses
   - Your local IP (for development)

### Update CORS

Make sure `CORS` in backend env is set to your exact frontend URL, not `*`.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB Atlas IP whitelist
- Verify connection string password (no special characters unencoded)
- Check if cluster is running

### "Email not sending"
- Verify Gmail App Password (not regular password)
- Check if 2-Step Verification is enabled
- Try generating a new App Password

### "CORS error in browser"
- Make sure `CORS` environment variable matches frontend URL exactly
- Include `https://` in the URL
- Redeploy backend after changing

### "File upload fails"
- Verify Cloudinary credentials
- Check API key has upload permissions
- Look at Network tab in browser DevTools

### "502 Bad Gateway on Vercel"
- Check backend logs in Vercel dashboard
- Verify environment variables are set
- Check MongoDB connection

---

## 📝 Creating First Admin User

Since there's no admin signup flow, create manually:

1. Go to MongoDB Atlas → Browse Collections
2. Find `admins` collection
3. Insert document:
```json
{
  "Email": "admin@example.com",
  "Firstname": "Admin",
  "Lastname": "User",
  "Password": "$2b$10$...", // Use bcrypt to hash your password
  "Isverified": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

Or use MongoDB Compass or run a script.

---

## 🎉 You're Done!

Your e-Learning Platform is now live and accessible to anyone on the internet!

**Next Steps:**
- Share your frontend URL with users
- Monitor logs in deployment platform
- Set up custom domain (optional)
- Add analytics (optional)

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Cloudinary Docs: https://cloudinary.com/documentation

---

**Note**: This platform is now deployment-ready. Video conferencing and payment features can be added later as enhancements.
