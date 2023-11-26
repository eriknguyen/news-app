# News Aggregator

*This is a simple News aggregator built with React, Next.js using News API.*

## Getting Started

### Live demo

For a quick preview of basic feature (News API only supports localhost for Developer plan), check out this app on Vercel using fallback mock data: [https://news-app-eriknguyen.vercel.app/](https://news-app-eriknguyen.vercel.app/)

### Running locally

Locally, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpn install
pnpm dev
# or
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Base: React & Next.js, Typescript
- Styling: TailwindCSS, shadcn-ui (using @radix-ui primitives)
- State management: React Context
- Data fetching: react-query, axios
- Runtime validation: zod
- Test: jest, react-testing-library, playwright
