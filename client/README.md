# BeyondChats Client

A modern React frontend application for the BeyondChats Full Stack Assignment. This client interface displays articles scraped from BeyondChats blogs, enhanced with AI-powered content optimization.

## 🚀 Project Overview

The client application provides a beautiful, responsive UI to:

- View the scraped articles from BeyondChats
- Read original content vs AI-enhanced content side-by-side
- Navigate through a collection of blogs with smooth animations
- Experience a modern dark-themed design with green (#2EFFA9) accent colors

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Markdown Rendering:** React Markdown
- **HTTP Client:** Axios
- **Icons:** SVG Icons

## ✨ Features

- **Home Page:** Hero section with project information and navigation
- **Articles Grid:** Displays all scraped articles with AI badges
- **Article Detail:** Side-by-side comparison of original vs AI-enhanced content
- **Responsive Design:** Works on all screen sizes
- **Smooth Animations:** Fluid transitions and hover effects
- **Dark Theme:** Modern dark UI with green accents
- **Real-time Loading States:** Loading spinners and progress indicators

## 📁 Folder Structure

```
client/
├── index.html              # Entry HTML file
├── package.json            # Client dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── src/
    ├── main.jsx            # Application entry point with providers
    ├── App.jsx             # Main App component with routing
    ├── index.css           # Global styles and Tailwind imports
    ├── api/
    │   ├── apis.js         # API endpoint constants
    │   └── axiosInstance.js # Axios instance with base configuration
    ├── components/
    │   ├── global/
    │   │   ├── Navbar.jsx  # Navigation component
    │   │   └── Footer.jsx  # Footer component
    │   ├── home/
    │   │   └── Hero.jsx    # Hero section on home page
    │   └── article/
    │       ├── ArticleCard.jsx     # Article preview card
    │       └── ArticleDetail.jsx   # Article detail view with comparison
    ├── pages/
    │   ├── Home.jsx        # Home page
    │   ├── Articles.jsx    # Articles listing page
    │   └── Article.jsx     # Single article page
    └── redux/
        ├── store.js        # Redux store configuration
        ├── slices/
        │   └── articles.slice.js   # Articles slice with reducers
        └── thunks/
            └── articles.thunk.js    # Async thunks for API calls
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A running BeyondChats server (backend)

### Installation

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `client` directory:

```bash
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔌 API Integration

### Base URL Configuration

The client connects to the server at:

```
http://localhost:5000/api/v1
```

Configure via environment variable:

```
VITE_API_BASE_URL=http://your-server-url/api/v1
```

### API Endpoints Used

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/articles`     | Fetch all articles         |
| GET    | `/articles/:id` | Fetch single article by ID |

### Response Handling

The client uses Redux Toolkit's async thunks to handle API calls with:

- Automatic loading states
- Error handling
- Response caching through Redux state

## 🧩 Key Components

### App.jsx

Main routing configuration using React Router DOM with three routes:

- `/` - Home page
- `/articles` - Articles listing
- `/article/:id` - Individual article view

### Articles.jsx

Displays a grid of all articles fetched from the server:

- Shows loading spinner during fetch
- Displays article cards in responsive grid layout
- Shows empty state if no articles exist

### Article.jsx & ArticleDetail.jsx

Single article view with:

- Side-by-side comparison (Original vs AI-Enhanced)
- Markdown rendering for AI content
- Source URL links
- Reference links from Google Search
- Timestamps and metadata

### ArticleCard.jsx

Reusable card component displaying:

- Article title
- Preview text (first paragraph)
- AI badge if enhanced
- Link to full article
- Hover animations

## 📦 State Management (Redux)

### Articles Slice

```javascript
// State structure
{
  articles: [],        // Array of all articles
  currentArticle: null, // Currently viewed article
  loading: false,      // Loading state
  error: null          // Error message
}
```

### Thunks

- `fetchAllArticlesThunk()` - Fetches all articles
- `fetchArticleByIdThunk(id)` - Fetches single article by ID

### Store Configuration

The Redux store is configured with:

- Redux Toolkit's `configureStore`
- Articles reducer as the main slice

## 🎨 Styling

### Tailwind CSS Configuration

The project uses Tailwind CSS 4 with:

- Custom green accent color (#2EFFA9)
- Dark theme with white text
- Glassmorphism effects with backdrop blur
- Custom fonts and spacing

### Global Styles (index.css)

- Tailwind imports
- Custom animations
- Base styles for dark theme

## 🔧 Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## 📱 Responsive Design

The client is fully responsive with breakpoints:

- Mobile: `grid-cols-1`
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3`
