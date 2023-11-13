import React from 'react';
import './index.css';
import '@/app/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './App';
//import { store } from "./app/StoreProvider/store";
//import { Provider } from "react-redux";
import { StoreProvider } from './app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

const container = document.getElementById('root');

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<ErrorBoundary>
					<ToastContainer
						className={'bg-transparent'}
						position="top-right"
						autoClose={3000}
						draggable={false}
					/>
					<App />
				</ErrorBoundary>
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>
);
