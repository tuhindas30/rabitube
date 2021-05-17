import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./contexts/ModalProvider";
import { SearchProvider } from "./contexts/SearchProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { VideoProvider } from "./contexts/VideoProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModalProvider>
        <SearchProvider>
          <AuthProvider>
            <VideoProvider>
              <App />
            </VideoProvider>
          </AuthProvider>
        </SearchProvider>
      </ModalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
