# Setup Guide for BeyondChats Assignment

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local installation or cloud instance like MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd BeyondChats
   ```

2. **Install root dependencies:**

   ```
   npm install
   ```

   This installs `concurrently` for running multiple scripts simultaneously.

3. **Install client dependencies:**

   ```
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies:**

   ```
   cd server
   npm install
   cd ..
   ```

5. **Environment Configuration:**
   - Copy `.env.example` to `.env` in both `client/` and `server/` directories.
   - Fill in the required values in each `.env` file:
     - **Server (.env):**
       - `MONGO_URI`: Your MongoDB connection string
       - `CLIENT_URL`: Frontend URL (default: http://localhost:5173)
       - `SERPAPI_KEY`: API key for SerpAPI
       - `GEMINI_API_KEY`: API key for Google Gemini AI
       - `API_BASE_URL`: Backend API base URL (default: http://localhost:5000/api/v1)
     - **Client (.env):**
       - `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:5000/api/v1)

## Running the Application

From the root directory, run:

```
npm run dev
```

This command will start both the client and server simultaneously:

- **Client**: Runs on http://localhost:5173 (Vite development server)
- **Server**: Runs on the port specified in the server code (typically 5000)

## Additional Notes

- Ensure MongoDB is running if using a local instance.
- The server uses nodemon for automatic restarts on changes.
- The client uses Vite for fast development builds.
- API endpoints are available at http://localhost:5000/api/v1
