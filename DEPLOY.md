# Deployment Guide

Your portfolio is built and ready to deploy! Since I cannot access your Vercel or Netlify account directly, here are the quickest ways to get your site live.

## Option 1: Vercel (Recommended)

1.  **Open Terminal** in your project folder.
2.  Run:
    ```bash
    npx vercel
    ```
3.  Follow the prompts:
    -   Log in (it will open your browser).
    -   Set up and deploy: "Y".
    -   Scope: [Select your account].
    -   Link to existing project: "N".
    -   Project Name: `aditya-portfolio` (or press Enter).
    -   Directory: `./` (Press Enter).
    -   **Build Command**: `npm run build` (Press Enter).
    -   **Output Directory**: `dist` (Press Enter).
    -   **Install Command**: `npm install` (Press Enter).

## Option 2: Netlify Drop (Easiest Manual Way)

1.  Locate the `dist` folder in your project directory: `/Users/adityaraj0421/Portfolio/dist`.
2.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3.  Drag and drop the `dist` folder onto the page.
4.  Your site will be live instantly!

## Option 3: GitHub Pages

1.  Push your code to a GitHub repository.
2.  Go to Settings > Pages.
3.  Select "GitHub Actions" as the source.
4.  Use the "Static HTML" workflow.

---

**Build Status:** ✅ Success
**Output Folder:** `dist/`
