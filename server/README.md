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

- `utils/`: Utility functions.

  - `scraper.js`: Contains the `scrapeBeyondChats` function to scrape articles from https://beyondchats.com/blogs/.

- `index.js`: Main entry point for the server, sets up Express app, middleware, routes.

- `package.json`: Dependencies and scripts.

- `.env`: Environment variables (e.g., MongoDB URI, port).

## Scraper

The scraper (`utils/scraper.js`) is responsible for scraping the 5 oldest articles from the BeyondChats blog.

- It starts by fetching the main blog page to determine the last page number from pagination.

- Then, it iterates from the last page backwards, scraping article titles, links, and full content.

- For each article, it fetches the individual article page to extract the full content using the `.entry-content` selector.

- If fetching fails, it falls back to the excerpt from the listing page.

- Returns an array of 5 articles with title, source_url, content, isAiUpdated.

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
      "source_url": "https://beyondchats.com/...",
      "content": "Full article content...",
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

Note: Assuming the base URL is /api/articles, as per standard routing.

This completes Phase 1 of the assignment.
