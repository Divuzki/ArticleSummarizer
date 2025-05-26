# Article Summarizer

Article Summarizer is a full-stack web application that allows users to input or paste article text and receive a concise, AI-generated summary. The project is designed for easy local development and seamless deployment to cloud platforms like Railway, with support for Docker-based production environments.

## Features

- **Summarize Articles:** Paste or input any article text and receive a summary generated using NLP techniques (TF-IDF, stopword removal, sentence scoring).
- **Modern UI:** Built with React, TypeScript, and Tailwind CSS for a responsive and user-friendly experience.
- **API Backend:** Node.js/Express server with a summarization endpoint powered by the `natural` NLP library.
- **Production Ready:** Includes Dockerfile, Procfile, and environment variable support for cloud deployment (e.g., Railway).

## Project Structure

```
/ArticleSummarizer
├── server/                # Backend API (Node.js/Express)
│   ├── index.js           # Express server entry point
│   └── summarizer.js      # Summarization logic using NLP
├── src/                   # Frontend (React + TypeScript)
│   ├── components/        # UI components (Header, Footer, ArticleInput, etc.)
│   ├── pages/             # Page-level components (SummarizerPage)
│   ├── services/          # API service (api.ts)
│   ├── types/             # TypeScript types
│   └── ...                # Main entry, styles, etc.
├── Dockerfile             # Docker build instructions
├── Procfile               # For Railway deployment
├── .env.example           # Example environment variables
├── package.json           # Project scripts and dependencies
└── README.md              # Project documentation
```

## Backend Overview

- **Framework:** Node.js with Express
- **Summarization:** Implements extractive summarization using the `natural` library:
  - Tokenizes input into sentences and words
  - Removes stopwords
  - Calculates TF-IDF scores for each sentence
  - Selects top N sentences as the summary
- **API Endpoint:**
  - `POST /api/summarize` — Accepts `{ text: string, numSentences?: number }` and returns `{ summary: string }`

## Frontend Overview

- **Framework:** React (with TypeScript)
- **Styling:** Tailwind CSS
- **Main Components:**
  - `ArticleInput` — Text area for user input
  - `SummaryOutput` — Displays the summary
  - `LoadingSpinner`, `Header`, `Footer` — UI/UX enhancements
- **API Integration:** Uses Axios to communicate with the backend API
- **Environment Variable:**
  - `REACT_APP_API_URL` — Set to backend API base URL (defaults to `/api` for production proxy)

## Setup & Development

### Prerequisites

- Node.js (v18+ recommended)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ArticleSummarizer.git
cd ArticleSummarizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and set values as needed:

```bash
cp .env.example .env
```

### 4. Run Locally (Dev Mode)

- Start both frontend and backend with:

```bash
npm run dev:full
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api

### 5. Build for Production

```bash
npm run build
```

### 6. Start Production Server

```bash
npm run start
```

## Deployment

### Railway

- Ensure `Procfile` and `Dockerfile` are present.
- Set environment variables in Railway dashboard (e.g., `REACT_APP_API_URL`, `PORT`).
- Deploy directly from GitHub or with Railway CLI.

### Docker

Build and run the app in a container:

```bash
docker build -t article-summarizer .
docker run -p 5001:5001 article-summarizer
```

## Configuration

- **.env.example:** Documents all required environment variables.
- **.dockerignore:** Excludes unnecessary files from Docker builds.
- **package.json:** Scripts for development, production, and linting.

## Scripts

- `npm run dev` — Start frontend (Vite)
- `npm run server` — Start backend (Express)
- `npm run dev:full` — Run both frontend and backend concurrently
- `npm run build` — Build frontend for production
- `npm run start` — Start production server

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, natural (NLP)
- **Deployment:** Docker, Railway

## File Reference

- `server/index.js` — Express server setup and API routing
- `server/summarizer.js` — Summarization logic (TF-IDF, stopwords, scoring)
- `src/services/api.ts` — Axios API client
- `src/components/` — UI components
- `Dockerfile`, `Procfile`, `.env.example` — Deployment configuration

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## Author

- [Divine Ikhuoria](divuzki@gmail.com)

---

### Notes for AI

- This project is a full-stack, extractive article summarizer using TF-IDF and stopword filtering.
- The backend exposes a single summarization endpoint and is stateless.
- The frontend is a single-page React app that interacts with the backend via REST API.
- All configuration is via environment variables and scripts in package.json.
- Designed for easy deployment to Railway or Docker-compatible platforms.
