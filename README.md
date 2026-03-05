WASM-PDF-Converter
📄 DocuShift-WASM
A high-performance, Local-First PDF conversion suite. This application leverages the MERN stack for user management and WebAssembly (WASM) to perform heavy-duty PDF processing entirely in the user's browser.

🚀 The Architecture Logic
Unlike traditional converters that upload sensitive documents to a server, DocuShift processes files locally.

Privacy: Files never leave the client's machine during conversion.

Speed: Near-native execution speeds via WASM.

Scalability: Server costs remain low by offloading computation to the client.

🛠️ Tech Stack
Frontend (The Factory)
React & TypeScript: Type-safe UI components.

WASM / PDF-Lib: The engine for client-side file manipulation.

Framer Motion: Smooth, professional "Visual State" animations.

Zustand: Lightweight state management for conversion history.

Axios: Reporting metadata to the backend.

Backend (The Accountant)
Node.js & Express: API orchestration and "Management" layer.

Passport.js & JWT: Secure authentication and identity logic.

Winston: Industrial-grade logging and error tracing.

Mongoose: Object modeling for MongoDB.

Database (The Memory)
MongoDB: Persisting user accounts and conversion activity logs (metadata only).

🏗️ The Data Flow (The Trace)
Ingest: User drops a file into the React-Dropzone.

Process: React hands the file bytes to a Web Worker running WASM logic.

Download: A Blob URL is generated, and the converted file is saved to the user's disk.

Report: Axios sends the conversion metadata (filename, size, timestamp) to the Express API.

Persist: MongoDB records the activity under the user's profile for their history dashboard.


Shutterstock
🚦 Getting Started
1. Prerequisites
Node.js (v18+)

MongoDB Atlas Account

2. Installation
Bash
# Clone the repository
git clone https://github.com/your-username/docushift-wasm.git

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
3. Environment Setup
Create a .env file in the /backend folder:

Code snippet
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
4. Run the App
Bash
# In the backend folder
npm run dev
