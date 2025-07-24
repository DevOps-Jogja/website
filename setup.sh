#!/bin/bash

# DevOps Jogja Website Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up DevOps Jogja Website..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies
echo "🎨 Installing Node.js dependencies..."
npm install

# Build Tailwind CSS
echo "💅 Building Tailwind CSS..."
npm run build-css-prod

# Create necessary directories
echo "📁 Creating content directories..."
mkdir -p static/images/blog
mkdir -p static/images/event
mkdir -p static/organizer
mkdir -p content/blog
mkdir -p content/event

echo "✅ Setup completed successfully!"
echo ""
echo "To start the development server:"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "Visit http://localhost:5000 to see your website!"
