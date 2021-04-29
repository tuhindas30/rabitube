import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { WatchLaterProvider } from "./contexts/WatchLaterProvider";
import { PlayListsProvider } from "./contexts/PlayListsProvider";
import { LikeProvider } from "./contexts/LikeProvider";
import { ModalProvider } from "./contexts/ModalProvider";
import { ToastProvider } from "./contexts/ToastProvider";
import { SearchProvider } from "./contexts/SearchProvider";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ModalProvider>
				<ToastProvider>
					<SearchProvider>
						<WatchLaterProvider>
							<PlayListsProvider>
								<LikeProvider>
									<App />
								</LikeProvider>
							</PlayListsProvider>
						</WatchLaterProvider>
					</SearchProvider>
				</ToastProvider>
			</ModalProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
