WASM-PDF-Converter
📄 DocuShift-WASM
<div align="center">

A High-Performance, Local-First PDF Conversion Engine. Secure. Private. Blazing Fast.

Explore The Docs · Report Bug · Request Feature

</div>

🧐 What is DocuShift?
Most PDF converters require you to upload sensitive documents to a third-party server. DocuShift changes the game. By leveraging WebAssembly (WASM), the actual file processing happens locally in your browser.

Your files never leave your machine. Your privacy isn't just a promise; it's the architecture.

🛠️ Built With
Frontend (The Factory)
WASM / PDF-Lib — Native-speed processing in the browser.

Framer Motion — High-end "Visual State" feedback and animations.

Zustand — Clean, predictable state management.

React Hook Form & Zod — Type-safe validation for every input.

Backend (The Accountant)
Node.js & Express — Lightweight management and API orchestration.

Passport.js & JWT — Secure, stateless authentication.

Winston & Morgan — Detailed logging and error tracing.

Database (The Memory)
MongoDB Atlas — Securely storing conversion metadata and user activity.


Shutterstock
🔄 The Data Flow "Trace"
Ingestion: User drops a file into the animated DropZone.

Hand-off: React sends raw bytes to a Web Worker to keep the UI responsive.

Execution: The WASM Engine recompiles/converts the file at near-native speeds.

Reporting: Axios sends a metadata summary (size, type, status) to the Express API.

Persistence: The activity is logged in MongoDB for the user's conversion history.

⚙️ Installation & Setup
1. Clone the Repository
Bash
git clone https://github.com/yourusername/docushift-wasm.git
cd docushift-wasm
2. Configure Environment
Navigate to the backend folder and create a .env file:

Code snippet
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
3. Launch the App
Bash
# Start the Backend
cd backend
npm run dev

# Start the Frontend
cd ../frontend
npm run dev
🚀 Key Features
✅ Zero-Server Processing: Low latency, high privacy.

✅ Real-Time History: Track your conversions via a secure dashboard.

✅ Modern UI: Built with TailwindCSS and Framer Motion for a premium feel.

✅ Robust Logging: Winston-powered backend tracing.
