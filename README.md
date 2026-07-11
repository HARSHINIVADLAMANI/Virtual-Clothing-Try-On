# AR Try-On Web Application

A modern, responsive React web application that provides real-time Augmented Reality (AR) try-on experiences using [Snap Camera Kit for Web](https://docs.snap.com/camera-kit/quick-start/web). 

## 🌟 Features

*   **Real-time AR Viewer**: High-performance camera integration with AR lens support.
*   **Snap Camera Kit Integration**: Built on top of the official `@snap/camera-kit` SDK.
*   **Responsive UI**: Fluid layouts optimized for both desktop and mobile screens, ensuring the camera feed renders properly across devices.
*   **Modern Tech Stack**: Fast development and optimized builds powered by Vite, React 19, and Tailwind CSS.

## 🚀 Tech Stack

*   **Framework**: React (v19)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **AR SDK**: Snap Camera Kit (`@snap/camera-kit`)
*   **Routing**: React Router DOM
*   **Icons**: Lucide React
*   **Animations**: Motion

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
*   **Node.js**: Make sure you have Node.js (v18 or higher recommended) installed.
*   **Package Manager**: `npm` (comes with Node.js), `yarn`, or `pnpm`.
*   **Snap Developer Account**: You will need a developer account and a Camera Kit project set up on the [Snap Developer Portal](https://developer.snap.com/) to obtain an API token.

## 🛠️ Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

The application requires a Snap Camera Kit API Token to fetch and render AR lenses. 

1. Create a `.env` file in the root directory of the project. You can copy the template provided in `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the placeholder with your actual Snap Camera Kit API Token:
   ```env
   VITE_SNAP_CAMERA_KIT_API_TOKEN="your_actual_token_here"
   ```
   *(Note: Variables prefixed with `VITE_` are automatically exposed to the client-side code by Vite).*

### 4. Start the development server

```bash
npm run dev
```

The application will start, usually on `http://localhost:3000`. Open this URL in your browser. 

*Note: You may be prompted to grant camera permissions in your browser to use the AR features.*

## 📂 Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components (e.g., ARViewer.tsx)
│   ├── pages/           # Route-level components (e.g., TryOn.tsx)
│   ├── main.tsx         # Application entry point
│   ├── App.tsx          # Main application shell and routing
│   └── index.css        # Global styles and Tailwind configuration
├── .env.example         # Template for required environment variables
├── package.json         # Project metadata and dependencies
├── vite.config.ts       # Vite bundler configuration
└── tailwind.config.js   # (If applicable) Tailwind CSS configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
