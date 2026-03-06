# Graphic Design Portfolio

This repository contains the code for a graphic design portfolio website. It consists of a React frontend and an Express backend.

## Prerequisites

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher is recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Project Structure

- `frontend/`: Contains the React application (built with Vite).
- `backend/`: Contains the Express.js backend server.

## Installation and Running

You will need to run the frontend and the backend in separate terminal windows.

### 1. Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
# or use `npm run dev` depending on your setup
```

The server will typically start on port 5000 (check `backend/server.js` or console output for the exact port).

### 2. Frontend

Open a new, separate terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will start a local development server. Check the console output for the local URL (usually `http://localhost:5173/`).

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, CORS
