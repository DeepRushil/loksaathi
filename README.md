# LokSaathi: Your AI Election Companion

**LokSaathi** (from Hindi, meaning "People's Companion") is a non-partisan, AI-powered educational platform designed to help Indian citizens navigate the democratic process, from voter registration to casting a ballot.

## Features

**AI Chat Assistant**
Ask questions about Indian elections in natural language. The assistant is powered by Google Gemini 2.5 Flash and is strictly prompted to remain non-partisan and informative.

**Election Timeline**
An interactive 7-step guide that walks users through the entire electoral process, from checking eligibility to understanding results day.

**Polling Booth Finder**
Seamless Google Maps integration allows citizens to quickly locate their nearest polling station.

**Comprehensive FAQ Section**
Curated answers to the most common questions regarding the Election Photo Identity Card (EPIC), Electronic Voting Machines (EVM), Voter Verifiable Paper Audit Trail (VVPAT), and the "None of the Above" (NOTA) option.

**Multilingual Support**
Available in 8 Indian languages: English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and Kannada.

**Built-In Security and Analytics**
The application uses a secure server-side proxy to protect API keys, while Firebase Analytics and App Check ensure platform stability and abuse prevention.

## Technology Stack

The project is built on a modern, high-performance web stack:

* **Framework:** Next.js 16 (App Router)
* **AI Integration:** Google Gemini 2.5 Flash via server-side API proxy
* **Maps:** Google Maps Embed API
* **Backend Services:** Firebase (Analytics, App Check with reCAPTCHA Enterprise, Performance Monitoring)
* **Typography:** Google Fonts (Inter, Playfair Display)
* **Language:** TypeScript
* **Styling:** CSS Modules utilizing a custom design system inspired by the Indian tricolor
* **Testing:** Jest and React Testing Library

### Google Services Integration

The platform heavily leverages the Google ecosystem:
1. Google Gemini 2.5 Flash for the core AI conversational experience.
2. Google Maps Embed API for the polling booth finder.
3. Firebase Analytics for tracking user engagement.
4. Firebase App Check for API protection.
5. Firebase Performance for network monitoring.
6. Firebase Hosting for production deployment.
7. Google Fonts for typography.

## Getting Started

### Prerequisites

* Node.js 18 or higher
* A Google Gemini API key
* Optional: Google Maps API key
* Optional: A configured Firebase project

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/your-username/loksaathi.git
cd loksaathi
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Copy the example environment file and add your credentials.
```bash
cp .env.example .env.local
```

4. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Project Structure

* `src/app/`: Next.js App Router pages, layouts, and API routes.
* `src/components/`: Reusable UI components grouped by feature and layout.
* `src/lib/`: Core utilities including internationalization, context providers, Firebase initialization, and static election data.
* `__tests__/`: Comprehensive test suites for API routes, components, and utilities.

## Testing

The project maintains rigorous test coverage using Jest.

```bash
# Run all test suites
npm test

# Run tests and generate a coverage report
npm run test:coverage
```

## Security Measures

* **API Key Protection:** The Gemini API key is securely stored server-side and is never exposed to the client browser.
* **Rate Limiting:** An in-memory rate limiter restricts requests to 20 per minute per IP address.
* **Input Validation:** All user messages undergo length validation and sanitization.
* **Safety Settings:** The Gemini API is configured with strict safety filters to prevent harassment, hate speech, and dangerous content.

## Design System

The application features a minimalist, accessible design inspired by the Indian national flag:

* **Saffron** (`#FF6B00`) for primary actions and highlights.
* **India Green** (`#138808`) for success states and positive indicators.
* **Ashoka Blue** (`#1A4FA0`) for secondary accents.
* **Deep Navy** (`#060A14`) for the background to provide a modern dark-mode aesthetic.

## License

This project is intended strictly for educational and civic purposes. It remains entirely non-partisan.

***

Built with ❤️ for Indian democracy by [**DEEP RUSHIL**](https://www.linkedin.com/in/deeprushil/)

*Powered by Google Gemini AI, Firebase & Google Maps*
