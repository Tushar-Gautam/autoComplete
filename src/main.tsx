import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (
    import.meta.env.MODE === "development" ||
    import.meta.env.MODE === "production"
  ) {
    const { worker } = await import("./mocks/browser");
    worker.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
