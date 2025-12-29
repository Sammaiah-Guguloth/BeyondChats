# Server README

## Folder Structure

The server is organized as follows:

- `config/`: Contains database connection configuration.

  - `connectToDB.js`: Handles MongoDB connection using Mongoose.

- `controllers/`: Contains the business logic for handling requests.

  - `article.controller.js`: Handles article-related operations like initializing database, fetching, updating articles.

- `middlewares/`: (If any, currently empty)

- `models/`: Defines the data models.

  - `article.model.js`: Mongoose schema for Article with fields: title, sourceUrl, originalContent, updatedContent, references, isAiUpdated, timestamps.

- `routes/`: Defines the API routes.

  - `article.routes.js`: Routes for article CRUD operations.

- `scripts/`: Contains automation scripts for Phase 2 AI content enhancement.

  - `processor.js`: Main automation script that orchestrates the AI enhancement process for articles.

  - `services/`: Modular services used by the processor.

    - `search.service.js`: Uses SerpApi to find top competitor blog links for a given article title.

    - `scraper.service.js`: Scrapes full content from competitor URLs for AI reference.

    - `ai.service.js`: Transforms original article content using Gemini AI, incorporating competitor insights.

- `utils/`: Utility functions.

  - `scraper.js`: Contains the `scrapeBeyondChats` function to scrape articles from https://beyondchats.com/blogs/.

- `index.js`: Main entry point for the server, sets up Express app, middleware, routes.

- `package.json`: Dependencies and scripts.

- `.env`: Environment variables (e.g., MongoDB URI, API keys, port).

## Scraper

The scraper (`utils/scraper.js`) is responsible for scraping the 5 oldest articles from the BeyondChats blog.

- It starts by fetching the main blog page to determine the last page number from pagination.

- Then, it iterates from the last page backwards, scraping article titles, links, and full content.

- For each article, it fetches the individual article page to extract the full content using the `.entry-content` selector.

- If fetching fails, it falls back to the excerpt from the listing page.

- Returns an array of 5 articles with title, sourceUrl, originalContent, isAiUpdated.

## Phase 2 Automation

Phase 2 involves AI-powered content enhancement using the scripts in the `scripts/` folder. The automation process enhances existing articles by researching competitors, scraping their content, and using AI to rewrite the original articles with improved quality and citations.

### Running the Automation

To run the Phase 2 automation:

1. Ensure the server is running (Phase 1 completed with articles in DB).

2. Ensure environment variables are set: `SERPAPI_KEY`, `GEMINI_API_KEY`, `API_BASE_URL`.

3. Run the processor script:

```bash
node server/scripts/processor.js
```

### Automation Process

The `processor.js` script performs the following steps for each article:

1. **Fetch Articles**: Retrieves all articles from the database via GET /api/articles.

2. **Search Competitors**: For each article title, uses `search.service.js` to find top 3 competitor blog links (excluding social media, Amazon, Pinterest, and beyondchats.com).

3. **Scrape Competitor Content**: Uses `scraper.service.js` to scrape full content from competitor URLs. Filters noise elements and extracts main content.

4. **AI Transformation**: Uses `ai.service.js` with Gemini AI to rewrite the original content, incorporating competitor insights for better quality.

5. **Update Database**: Updates the article via PUT /api/articles/:id with enhanced content, references (all competitor links), and marks as AI-updated.

### Services

- **search.service.js**: Integrates with SerpApi Google Search to find relevant competitor articles.

- **scraper.service.js**: Robust web scraper that handles various site structures, removes noise, and limits content to 5000 characters.

- **ai.service.js**: Uses Google Gemini AI to transform content with professional formatting and SEO improvements.

### Logging

The scripts provide detailed console logging for monitoring progress, including search results, scraping status, AI processing, and update confirmations.

## APIs

The server provides the following APIs for article management:

### 1. POST /api/articles/seed

Initializes the database by scraping and storing 5 oldest articles if not already present.

**Request:**

- Method: POST

- URL: /api/articles/seed

- Body: None

**Response:**

- Success (201):

```json
{
  "articles": [
    {
      "title": "Article Title",
      "sourceUrl": "https://beyondchats.com/...",
      "originalContent": "Full article content...",
      "isAiUpdated": false
    }
  ],
  "message": "5 oldest articles stored."
}
```

- If already have articles (200):

```json
{
  "message": "Database already has articles."
}
```

- Error (500):

```json
{
  "error": "Error message"
}
```

### 2. GET /api/articles/

Fetches all articles from the database.

**Request:**

- Method: GET

- URL: /api/articles/

**Response:**

- Success (200):

```json
{
  "articles": [
    {
      "_id": "article_id",
      "title": "Article Title",
      "sourceUrl": "https://beyondchats.com/...",
      "originalContent": "Content...",
      "updatedContent": null,
      "references": [],
      "isAiUpdated": false,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

### 3. GET /api/articles/:id

Fetches a single article by ID.

**Request:**

- Method: GET

- URL: /api/articles/:id

**Response:**

- Success (200):

```json
{
  "article": {
    "_id": "article_id",
    "title": "Article Title",
    "sourceUrl": "https://beyondchats.com/...",
    "originalContent": "Content...",
    "updatedContent": null,
    "references": [],
    "isAiUpdated": false,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- Not Found (404):

```json
{
  "message": "Article not found"
}
```

### 4. PUT /api/articles/:id

Updates an article by ID.

**Request:**

- Method: PUT

- URL: /api/articles/:id

- Body:

```json
{
  "title": "Updated Title",
  "sourceUrl": "https://...",
  "originalContent": "Updated content",
  "updatedContent": "AI updated content",
  "references": ["ref1", "ref2"],
  "isAiUpdated": true
}
```

**Response:**

- Success (200):

```json
{
  "article": {
    "_id": "article_id",
    "title": "Updated Title",
    "sourceUrl": "https://...",
    "originalContent": "Updated content",
    "updatedContent": "AI updated content",
    "references": ["ref1", "ref2"],
    "isAiUpdated": true,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

- Not Found (404):

```json
{
  "message": "Article not found"
}
```

Note: The base URL is /api/v1/articles.

This completes Phase 1 (Data Collection) and Phase 2 (AI Content Enhancement) of the assignment.
