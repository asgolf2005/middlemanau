#!/bin/bash

# Star Smiles Website - Automated Setup Script
# This script will set up your development environment

echo "🌟 Star Smiles Website Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ Created .env.local (you can edit this later)"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev          - Start development server"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Edit .env.local to add your API keys (optional for now)"
echo ""
echo "📖 Check QUICKSTART.md for more info"
echo ""
echo "Happy coding! 🚀"
