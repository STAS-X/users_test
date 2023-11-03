import { DeepPartial } from '@reduxjs/toolkit';
import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { $apiAxios } from '@/shared/api/api';
import { createReduxStore, StateSchema } from '../config/store';

export interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = (props: StoreProviderProps) => {
	const { children, initialState } = props;

	const api = $apiAxios;
	const store = createReduxStore(initialState as StateSchema, {
		api,
	});

	return <Provider store={store}>{children}</Provider>;
};
