# Deployment Guide — Step by Step

This guide walks you through deploying the forecasting benchmark app from your
computer to a live Vercel URL. Follow every step in order.

---

## Part 1 — Get Your Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the key — you will need it in Part 3 and Part 4
5. Keep it private — never share it or commit it to GitHub

---

## Part 2 — Put the Project on GitHub

### Step 1: Create a new repository on GitHub
1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top-right → **"New repository"**
3. Name it: `forecasting-benchmark` (or any name you like)
4. Set it to **Public** (required for free Vercel deployment)
5. Leave all other options as default — do NOT add a README or .gitignore
6. Click **"Create repository"**
7. Copy the repository URL (it looks like `https://github.com/YOUR-USERNAME/forecasting-benchmark.git`)

### Step 2: Open a terminal on your computer
- **Windows:** Press `Windows key + R`, type `cmd`, press Enter
- Or open **Git Bash** if you have it installed

### Step 3: Navigate to the project folder
Type the following, replacing the path with wherever you saved the project:
```bash
cd Desktop\forecasting-app
```
(If you saved it elsewhere, adjust the path accordingly)

### Step 4: Initialize git and push to GitHub
Run these commands one at a time, pressing Enter after each:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/forecasting-benchmark.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

When prompted, sign in with your GitHub credentials.

### Step 5: Verify
Go to your GitHub repository URL in your browser. You should see all the project files listed there.

---

## Part 3 — Deploy to Vercel

### Step 1: Create a Vercel account
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** — this links Vercel to your GitHub account

### Step 2: Import your project
1. Once signed in, click **"Add New…"** → **"Project"**
2. You will see a list of your GitHub repositories
3. Find `forecasting-benchmark` and click **"Import"**

### Step 3: Configure the project
On the configuration screen:
- **Framework Preset:** Vercel should auto-detect **Next.js** — leave it as-is
- **Root Directory:** Leave as `./`
- **Build Command:** Leave as default (`next build`)
- **Output Directory:** Leave as default

### Step 4: Add your environment variable (CRITICAL)
This is the most important step. Without this, the AI features will not work.

1. Scroll down to the **"Environment Variables"** section
2. Click **"Add"**
3. In the **Name** field type exactly: `GEMINI_API_KEY`
4. In the **Value** field paste your Gemini API key from Part 1
5. Make sure all three checkboxes are checked: Production, Preview, Development
6. Click the checkmark to save it

### Step 5: Deploy
1. Click the **"Deploy"** button
2. Vercel will build and deploy the project — this takes about 1–2 minutes
3. When it finishes you will see a **"Congratulations!"** screen
4. Click **"Continue to Dashboard"**

### Step 6: Get your live URL
On the dashboard you will see your live URL — it looks like:
`https://forecasting-benchmark-abc123.vercel.app`

Click it to open your live app. Share this URL with your professor.

---

## Part 4 — Test Your Live App

After deploying, test each feature:

1. **Home page** — loads correctly with model timeline and findings
2. **Results Explorer** — select different datasets and horizons, chart updates
3. **Model Recommender** — fill in the form and click the button — you should get an AI recommendation within 5 seconds
4. **AI Assistant** — type a question and press Enter — you should get a response
5. **Methodology** — all model cards load correctly

If the AI features return an error, the most common cause is the environment variable
being set incorrectly. Go back to Vercel → your project → **Settings** → **Environment Variables**
and verify `GEMINI_API_KEY` is set correctly, then go to **Deployments** and click
**"Redeploy"** on the latest deployment.

---

## Part 5 — Making Updates After Deployment

If you need to change anything after deploying:

1. Edit the files on your computer
2. Open your terminal and navigate to the project folder
3. Run:
```bash
git add .
git commit -m "describe your change here"
git push
```
4. Vercel will automatically detect the push and redeploy — takes about 1 minute

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| AI features return an error | Check GEMINI_API_KEY in Vercel environment variables |
| Build fails on Vercel | Check the build logs in Vercel → Deployments for the error message |
| `git push` asks for password | Use a GitHub Personal Access Token instead of your password — create one at github.com/settings/tokens |
| Page shows 404 | Make sure you pushed all files including the `app/` folder |
| Charts don't render | Recharts requires client-side rendering — the `"use client"` directive is already in place |
