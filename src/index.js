import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ShortenUrlProvider } from "react-shorten-url";
import { ModalProvider } from "./contexts/ModalProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { VideoProvider } from "./contexts/VideoProvider";
import { LikeProvider } from "./contexts/LikeProvider";
import { WatchlaterProvider } from "./contexts/WatchlaterProvider";
import { PlaylistProvider } from "./contexts/PlaylistProvider";
import { HistoryProvider } from "./contexts/HistoryProvider";

const accessToken = process.env.REACT_APP_BITLY_ACCESS_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ShortenUrlProvider config={{ accessToken }}>
        <VideoProvider>
          <AuthProvider>
            <LikeProvider>
              <WatchlaterProvider>
                <PlaylistProvider>
                  <HistoryProvider>
                    <ModalProvider>
                      <App />
                    </ModalProvider>
                  </HistoryProvider>
                </PlaylistProvider>
              </WatchlaterProvider>
            </LikeProvider>
          </AuthProvider>
        </VideoProvider>
      </ShortenUrlProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
