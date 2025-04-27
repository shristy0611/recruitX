# RecruitPro AI - Technical Architecture

This document provides an overview of the technical architecture of the RecruitPro AI application.

## Overview

RecruitPro AI is a state-of-the-art recruitment matching application built with Next.js, featuring bilingual support (English and Japanese), API key rotation for Gemini AI integration, advanced matching algorithms, and comprehensive reporting capabilities.

## Technology Stack

- **Frontend**: Next.js with React and Tailwind CSS
- **Backend**: Next.js API routes with Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite-compatible)
- **AI Integration**: Google Gemini 2.0 Flash Lite
- **Internationalization**: next-i18next
- **Deployment**: Cloudflare Pages

## System Architecture

The application follows a modern, component-based architecture:

```
recruitment-app/
├── migrations/           # Database migration files
├── public/               # Static assets and localization files
│   ├── locales/          # Translation files
│   │   ├── en/           # English translations
│   │   └── ja/           # Japanese translations
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   │   ├── api-keys/ # API key management endpoints
│   │   │   ├── candidates/ # Candidate management endpoints
│   │   │   ├── gemini/   # Gemini AI integration endpoints
│   │   │   ├── i18n/     # Internationalization endpoints
│   │   │   ├── jobs/     # Job management endpoints
│   │   │   ├── matching/ # Matching algorithm endpoints
│   │   │   └── reports/  # Report generation endpoints
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and services
│       ├── api-key-rotation.tsx # API key rotation logic
│       ├── api-utils.ts  # API utility functions
│       ├── gemini-service.ts # Gemini API service
│       ├── i18n-config.tsx # Internationalization configuration
│       └── language-context.tsx # Language context provider
└── wrangler.toml         # Cloudflare configuration
```

## Key Components

### API Key Rotation System

The application implements a sophisticated API key rotation system for Gemini AI:

1. Stores multiple API keys in the database
2. Selects the least recently used key for each request
3. Tracks usage and automatically marks keys as rate-limited when errors occur
4. Reactivates keys after the rate limit duration expires

### Matching Algorithms

The application offers three matching approaches:

1. **AI-Powered Matching**: Uses Gemini AI to analyze job descriptions and resumes for comprehensive matching with detailed explanations.
2. **Skill-Based Matching**: Performs matching based on skill overlap between job requirements and candidate skills, with appropriate weighting for required vs. preferred skills.
3. **Batch Matching**: Processes multiple jobs and candidates in batches to efficiently generate matches at scale.

### Reporting System

The reporting system generates five types of reports:

1. **Match Report**: Detailed analysis of a specific job-candidate match
2. **Candidate Comparison**: Comparison of multiple candidates for a single job
3. **Hiring Progress**: Analysis of hiring progress over a specified time period
4. **Talent Pool Analysis**: Analysis of the available talent pool based on specified criteria
5. **Skill Gap Analysis**: Analysis of skill gaps between job requirements and available candidates

Reports can be exported in HTML, PDF, and Markdown formats.

### Multilingual Support

The application provides full bilingual support for English and Japanese:

1. Uses next-i18next for internationalization
2. Implements a language context provider to manage language state
3. Provides a language switcher component for users to toggle between languages
4. Automatically detects browser language preferences
5. Stores language preference in localStorage

## Database Schema

The application uses a relational database with the following main tables:

1. **jobs**: Stores job listings with required and preferred skills
2. **candidates**: Stores candidate profiles with skills and experience
3. **matches**: Stores job-candidate matches with scores and explanations
4. **reports**: Stores generated reports with parameters and content
5. **api_keys**: Stores Gemini API keys with usage statistics

## API Endpoints

The application exposes RESTful API endpoints for all major functions:

1. **/api/jobs**: CRUD operations for job listings
2. **/api/candidates**: CRUD operations for candidate profiles
3. **/api/matching**: Endpoints for generating and retrieving matches
4. **/api/reports**: Endpoints for generating and exporting reports
5. **/api/api-keys**: Endpoints for managing API keys
6. **/api/gemini**: Endpoints for interacting with Gemini AI
7. **/api/i18n**: Endpoints for retrieving translations

## Performance Optimizations

The application implements several performance optimizations:

1. **API Key Rotation**: Distributes load across multiple API keys to avoid rate limits
2. **Batch Processing**: Processes matches in batches to avoid overwhelming the API
3. **Caching**: Caches translations and frequently accessed data
4. **Lazy Loading**: Implements lazy loading for components and routes
5. **Optimized Builds**: Uses Next.js production builds for optimal performance

## Security Considerations

The application implements security best practices:

1. **API Key Protection**: Securely stores and manages API keys
2. **Input Validation**: Validates all user inputs
3. **Error Handling**: Implements proper error handling to avoid exposing sensitive information
4. **Rate Limiting**: Implements rate limiting for API endpoints
5. **HTTPS**: Enforces HTTPS for all communications

## Deployment Architecture

The application is deployed on Cloudflare Pages with the following architecture:

1. **Frontend**: Static assets served from Cloudflare's global CDN
2. **Backend**: API routes running as Cloudflare Workers
3. **Database**: Cloudflare D1 database for data storage
4. **Caching**: Cloudflare's caching for improved performance

## Monitoring and Logging

The application includes monitoring and logging capabilities:

1. **API Key Usage**: Tracks API key usage and rate limiting
2. **Performance Metrics**: Monitors application performance
3. **Error Logging**: Logs errors for troubleshooting
4. **Usage Statistics**: Tracks usage patterns for optimization

## Future Enhancements

Potential future enhancements include:

1. **Additional Languages**: Support for more languages beyond English and Japanese
2. **Advanced Analytics**: More sophisticated analytics for recruitment insights
3. **Integration with ATS**: Integration with Applicant Tracking Systems
4. **Mobile App**: Native mobile applications for iOS and Android
5. **AI-Powered Recommendations**: More advanced AI-powered recommendations for recruiters
