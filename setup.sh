#!/bin/bash

# e-Learning Platform - Quick Setup Script
# This script helps set up environment files for local development

echo "🚀 e-Learning Platform - Environment Setup"
echo "=========================================="
echo ""

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ Error: .env.example not found!"
    exit 1
fi

# Create backend .env if it doesn't exist
if [ -f "backend/.env" ]; then
    echo "⚠️  backend/.env already exists. Skipping..."
else
    echo "📝 Creating backend/.env from template..."
    cp .env.example backend/.env
    echo "✅ Created backend/.env"
    echo "   👉 Edit backend/.env with your actual credentials"
fi

echo ""

# Create frontend .env if it doesn't exist
if [ -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env already exists. Skipping..."
else
    echo "📝 Creating frontend/.env from template..."
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
    echo "   👉 Leave empty for local development (uses proxy)"
fi

echo ""
echo "=========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your credentials:"
echo "   - MongoDB Atlas connection string"
echo "   - Gmail SMTP credentials"
echo "   - Cloudinary credentials"
echo "   - Generate JWT secrets"
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo "   cd backend && npm install"
echo "   cd ../frontend && npm install"
echo ""
echo "3. Start development servers:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "📖 For detailed setup instructions, see DEPLOYMENT_GUIDE.md"
echo ""
