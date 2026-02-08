# Local Debugging Guide

## Quick Start

### macOS/Linux:
```bash
./start.sh
```

### Windows:
Double-click `start.bat` or run in command line:
```cmd
start.bat
```

### Manual Start (All Systems):
```bash
# 1. Install dependencies (first run only)
npm install

# 2. Start the development server
npm run dev
```

---

## Accessing the Website

After starting, the development server will typically run at:
- **Local**: http://localhost:5173
- **Network**: http://[your-IP]:5173

The browser will open automatically, or you can manually visit the above addresses.

---

## Viewing the Team Members Page

After starting, visit the following paths to view team member information:
- Homepage: http://localhost:5173
- Team page: http://localhost:5173/#/people (exact path depends on router configuration)

---

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Other Commands

### Build for production:
```bash
npm run build
```

### Preview the built version:
```bash
npm run preview
```

---

## Troubleshooting

### 1. Port Already in Use
If port 5173 is occupied, Vite will automatically use the next available port (e.g., 5174).

### 2. Dependency Installation Failure
Try clearing the cache and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 3. Photos Not Displaying
Make sure all photo files are in:
```
public/img/people/
```

---

## Project Structure

```
pkuaiweb.github.io/
├── src/
│   ├── configs/
│   │   └── people.json          # Team member configuration
│   └── ...
├── public/
│   └── img/
│       └── people/               # Team member photos
├── start.sh                      # macOS/Linux startup script
├── start.bat                     # Windows startup script
└── package.json                  # Project configuration
```
