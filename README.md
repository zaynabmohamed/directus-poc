# Directus POC

## Technologies
- Next.js
- TypeScript
- Tailwind CSS
- Directus
- Docker
- PostgreSQL

## Features
- Fetch News
- Fetch Events
- Fetch Team Members
- Display Images from Directus Assets

## Installation

```bash
# Start Directus
docker compose up

# Install frontend dependencies
npm install

# Run Next.js
npm run dev
```

## Project Structure

```
directus-poc/
├── docker-compose.yml
├── uploads/
├── extensions/
└── directus-frontend/
    ├── app/
    ├── lib/
    ├── public/
    ├── package.json
    └── .env.local
```

## Preview

This project demonstrates how to integrate Directus Headless CMS with a Next.js application using the Directus SDK. The frontend dynamically fetches News, Events, and Team Members, including images stored in Directus Assets.