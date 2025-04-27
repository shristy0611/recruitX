# RecruitPro AI - Deployment Guide

This document provides instructions for deploying the RecruitPro AI application to a production environment.

## Prerequisites

Before deploying, ensure you have the following:

1. 10 Gemini API keys (gemini-2.0-flash-lite model)
2. Node.js 20.x or higher
3. Access to a Cloudflare account (for D1 database)
4. Domain name (optional, but recommended for production)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/recruitment-app.git
cd recruitment-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Gemini API Keys (at least one required)
GEMINI_API_KEY_1=your_api_key_1
GEMINI_API_KEY_2=your_api_key_2
GEMINI_API_KEY_3=your_api_key_3
GEMINI_API_KEY_4=your_api_key_4
GEMINI_API_KEY_5=your_api_key_5
GEMINI_API_KEY_6=your_api_key_6
GEMINI_API_KEY_7=your_api_key_7
GEMINI_API_KEY_8=your_api_key_8
GEMINI_API_KEY_9=your_api_key_9
GEMINI_API_KEY_10=your_api_key_10

# Default language (en or ja)
DEFAULT_LANGUAGE=en

# Database configuration
DATABASE_URL=your_database_url
```

### 4. Initialize the Database

Run the database migrations to set up the schema:

```bash
wrangler d1 execute DB --local --file=migrations/0001_initial.sql
```

### 5. Seed Initial Data (Optional)

If you want to populate the database with sample data:

```bash
node scripts/seed-database.js
```

### 6. Build the Application

```bash
pnpm build
```

### 7. Deploy to Cloudflare

```bash
wrangler deploy
```

### 8. Verify Deployment

Once deployed, verify that the application is working correctly by:

1. Accessing the application URL
2. Testing language switching between English and Japanese
3. Creating a test job and candidate
4. Running a test match
5. Generating a test report

## API Key Rotation Configuration

The application automatically rotates between the 10 Gemini API keys to avoid rate limits. The rotation logic:

1. Selects the least recently used API key for each request
2. Marks keys as rate-limited when they encounter errors
3. Automatically reactivates keys after the rate limit duration expires

You can monitor API key usage in the Settings page of the application.

## Multilingual Support

The application supports both English and Japanese languages. Users can switch between languages using the language selector in the header.

To add or modify translations:

1. Edit the files in `/public/locales/en/` and `/public/locales/ja/` directories
2. Rebuild and redeploy the application

## Troubleshooting

If you encounter issues during deployment:

1. Check the Cloudflare Workers logs for errors
2. Verify that all API keys are valid and have access to the gemini-2.0-flash-lite model
3. Ensure the database migrations have been applied correctly
4. Check that all environment variables are set correctly

## Support

For additional support, please contact the development team at support@recruitpro-ai.example.com.
