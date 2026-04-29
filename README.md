# PakSEO AI - Professional SEO Intelligence Suite

A powerful, localized SEO content strategy tool built for high-performance digital marketing. This application leverages Google's Gemini AI to generate SEO-optimized titles, meta data, keyword clusters, advanced schemas, and content improvements.

## Key Features

*   **SEO Title Generator**: High-CTR headline creation optimized for regional search.
*   **Meta Studio**: SERP snippet simulation and metadata generation.
*   **Keyword Intelligence**: Deep semantic mining (LSI), long-tail research, and intent categorization.
*   **Advanced Schema Studio**: Comprehensive JSON-LD generator for Articles, FAQs, Products, and Local Businesses.
*   **Content Improver**: AI-driven logic and flow optimization for existing articles.
*   **AI Chat Assistant**: On-demand SEO guidance powered by regional intelligence.

## Tech Stack

*   **Framework**: React 18+ (Vite)
*   **Styling**: Tailwind CSS (Modern SaaS Aesthetics)
*   **Animations**: Motion (Framer Motion)
*   **Icons**: Lucide React
*   **AI Engine**: Google Gemini Pro API
*   **Routing**: React Router DOM

## Local Setup Instructions

Follow these steps to run the project on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed.

### 2. Download and Extract
Download the project ZIP and extract it to your preferred directory.

### 3. Install Dependencies
Open your terminal in the project root and run:
```bash
npm install
```

### 4. Configuration (Environment Variables)
The application requires a Gemini API Key to function. 
1. Create a `.env` file in the root directory.
2. Add your key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```
*You can obtain a key from the [Google AI Studio](https://aistudio.google.com/).*

### 5. Launch the App
Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Project Structure

*   `/src/pages`: Main screen components (Home, Tools).
*   `/src/components`: Reusable UI elements (Layout, Cards, Assistant).
*   `/src/services`: Gemini API integration logic.
*   `/src/hooks`: Custom React hooks (Drag-scroll, etc.).
*   `/src/context`: Global state management for theme and utilities.
*   `/src/types.ts`: Centralized TypeScript interfaces.

## License
Built by **[Abdul Hameed](https://www.linkedin.com/in/abdul-hameed-website-developer/)** - Professional Web Developer.
Designed for performance and regional SEO excellence.
