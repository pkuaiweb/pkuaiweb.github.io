# GitHub Pages Deployment Guide

## Method 1: Using the Deploy Script (Recommended)

### Step 1: Build and Prepare for Deployment
```bash
# macOS/Linux
./deploy.sh

# Windows
deploy.bat
```

### Step 2: Commit and Push to GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 3: Configure Pages on GitHub
1. Open the repository page: https://github.com/pkuaiweb/pkuaiweb.github.io
2. Click **Settings**
3. Find **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Click **Save**

### Step 4: Wait for Deployment to Complete
- GitHub will deploy automatically, usually within 1-3 minutes
- Once deployed, the site will be available at: **https://pkuaiweb.github.io/**

---

## Method 2: Manual Build and Deploy

### 1. Build the Project
```bash
npm run build
```

### 2. Create .nojekyll File
```bash
cd docs
touch .nojekyll
cd ..
```

> **Why is .nojekyll needed?**
> GitHub Pages uses Jekyll by default to process files, which ignores files starting with `_` (e.g., `_plugin-vue_export-helper.js`). Adding `.nojekyll` disables Jekyll so all files load correctly.

### 3. Commit and Push
```bash
git add .
git commit -m "Build for deployment"
git push origin main
```

### 4. Configure GitHub Pages (same as above)

---

## Verify Deployment

After successful deployment, visit https://pkuaiweb.github.io/ to see the site.

If you encounter issues:
1. Check if GitHub Actions succeeded (Repository > Actions tab)
2. Confirm `docs/.nojekyll` file exists
3. Check browser console for 404 errors

---

## Subsequent Update Workflow

After each code change:
```bash
./deploy.sh                           # Rebuild
git add .
git commit -m "Update content"
git push origin main                   # GitHub Pages updates automatically
```

---

## Project Configuration Notes

The project is configured with:
- `vite.config.js`: `base: './'` - supports relative paths
- `build.outDir: 'docs'` - builds to docs directory
- `createWebHashHistory()` - uses hash routing, no server-side configuration needed
