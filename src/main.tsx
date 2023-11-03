import React from 'react';
import './index.css';
import '@/app/styles/index.scss';
import { App } from './App';
//import { store } from "./app/StoreProvider/store";
//import { Provider } from "react-redux";
import { StoreProvider } from './app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>
);
