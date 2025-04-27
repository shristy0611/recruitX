# RecruitPro AI - README

## Overview

RecruitPro AI is a state-of-the-art recruitment matching application designed to revolutionize the hiring process. With bilingual support (English and Japanese), advanced AI-powered matching algorithms, and comprehensive reporting capabilities, this application provides recruiters with powerful tools to find the perfect candidates for their job openings.

## Key Features

- **Bilingual Support**: Full support for English and Japanese throughout the application
- **AI-Powered Matching**: Sophisticated matching algorithms using Google Gemini 2.0 Flash Lite
- **API Key Rotation**: Intelligent rotation of 10 Gemini API keys to avoid rate limits
- **Multiple Matching Algorithms**: AI-powered, skill-based, and batch matching options
- **Comprehensive Reporting**: Detailed reports with exportable formats (HTML, PDF, Markdown)
- **Intuitive UI**: Modern, responsive interface optimized for desktop and mobile
- **Robust Backend**: Scalable architecture built on Next.js and Cloudflare

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- 10 Gemini API keys (gemini-2.0-flash-lite model)
- Cloudflare account (for deployment)

### Installation

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Configure environment variables
4. Initialize the database
5. Start the development server with `pnpm dev`

For detailed installation instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Usage

For detailed usage instructions, see [USER_GUIDE.md](./USER_GUIDE.md).

## Documentation

- [User Guide](./USER_GUIDE.md): Comprehensive guide for end users
- [Deployment Guide](./DEPLOYMENT.md): Instructions for deploying the application
- [Technical Architecture](./ARCHITECTURE.md): Overview of the application's technical design

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite-compatible)
- **AI Integration**: Google Gemini 2.0 Flash Lite
- **Internationalization**: next-i18next
- **Deployment**: Cloudflare Pages

## Testing

The application includes comprehensive testing capabilities:

- **Multilingual Testing**: Verify language switching and translation functionality
- **Performance Testing**: Measure application performance metrics
- **API Testing**: Verify API endpoint functionality
- **Integration Testing**: Run end-to-end workflow tests

Access the test dashboard at `/test-dashboard` to run these tests.

## License

This project is proprietary software. All rights reserved.

## Support

For support, please contact support@recruitpro-ai.example.com.

---

Built with ❤️ for revolutionizing the recruitment process.
