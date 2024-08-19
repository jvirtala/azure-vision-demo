# Azure AI Demos

This project consists of a server and a client application for Azure AI demos.

## Development Setup

### Install dependencies

```
pnpm i
```

### Server

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Create a `.env` file in the server directory and add the following environment variables:
   ```
   AZURE_VISION_ENDPOINT=your_azure_vision_endpoint_here
   AZURE_VISION_KEY=your_azure_vision_key_here
   ```

### Client

1. Open a new terminal and navigate to the client directory:

   ```
   cd client
   ```

2. Start the client development server:
   ```
   pnpm run dev
   ```

The client will start vite dev server running on `http://localhost:5173` and api running on `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. Check the demos in the navigation bar.

## Development Notes

- The server uses Express.js and integrates with Azure Computer Vision for image analysis.
- The client is built with React and Vite, using TypeScript for type safety.
- Make sure both the server and client are running simultaneously during development.
- Any changes to the client code will be hot-reloaded automatically.
- Ensure all required environment variables are set in the `.env` file for the server to function correctly.
