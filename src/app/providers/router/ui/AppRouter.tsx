import { Navigate, Route, Routes } from 'react-router-dom';
import { CounterPage } from '@/pages/CounterPage';
import { MainPage } from '@/pages/MainPage';
import React, { FC } from 'react';

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="counter" element={<CounterPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
