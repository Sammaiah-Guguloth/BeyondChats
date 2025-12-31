# BeyondChats - Full Stack Assignment

A comprehensive full-stack application featuring automated web scraping, AI-powered content enhancement, and a modern React frontend with side-by-side content comparison.

## 🚀 Project Overview

This project demonstrates a complete full-stack solution that:

1. **Phase 1 (Backend & Scraping):** Automatically scrapes articles from BeyondChats blogs and stores them in a MongoDB database
2. **Phase 2 (AI Enhancement):** Uses Google Search API and Gemini AI to research competitors and enhance article quality
3. **Phase 3 (Frontend):** Displays articles with a beautiful React UI showing original vs AI-enhanced content comparison

## 🏗️ Architecture

```
BeyondChats_Assignment/
├── client/                 # React Frontend (Phase 3)
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── redux/         # State management
│   └── package.json
├── server/                 # Express Backend (Phase 1 & 2)
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── scripts/           # Phase 2 automation scripts
│   │   └── services/      # AI, Search, Scraping services
│   ├── utils/             # Utility functions
│   └── package.json
├── README.md              # Main documentation
└── .env                   # Environment variables
```

## 🛠️ Tech Stack

### Frontend (Client)

- **React 19** - UI library
- **Vite 7** - Build tool
- **Redux Toolkit** - State management
- **React Router DOM 7** - Routing
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Markdown** - Markdown rendering
- **Axios** - HTTP client

### Backend (Server)

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB + Mongoose** - Database
- **Cheerio** - Server-side DOM manipulation
- **Axios** - HTTP requests
- **Google Generative AI (Gemini)** - AI content enhancement
- **SerpApi** - Google Search API

## ✨ Features

### Phase 1: Web Scraping & CRUD API

- Automated scraping of 5 oldest articles from BeyondChats blog
- Semantic content extraction (headings, paragraphs, lists)
- Full CRUD operations via REST API
- MongoDB storage with structured content

### Phase 2: AI Content Enhancement

- Automatic competitor research via Google Search
- Content scraping from competitor articles
- AI transformation using Gemini LLM
- SEO optimization and professional formatting
- Automatic citation and reference generation

### Phase 3: Modern Frontend UI

- Beautiful dark-themed design with green accents
- Responsive layout for all devices
- Smooth animations and transitions
- Side-by-side content comparison
- Article cards with AI badges
- Real-time loading states

## 📚 Documentation

- [Client Documentation](client/README.md)
- [Server Documentation](server/README.md)
- [Setup Guide](SET_UP.md)
