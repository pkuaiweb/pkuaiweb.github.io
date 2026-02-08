#!/bin/bash

# One-click local development server startup script
# Purpose: Quickly start the project and preview the website in a browser

echo "Starting PKU AI Web local development server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "First run detected, installing dependencies..."
    npm install
    echo ""
fi

echo "Starting development server..."
echo "The browser will open automatically after the server starts"
echo "Press Ctrl+C to stop the server"
echo ""
echo "-----------------------------------"
echo ""

# Start the development server
npm run dev

# If the server was stopped
echo ""
echo "Development server stopped"
