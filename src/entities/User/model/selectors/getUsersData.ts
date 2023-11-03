import { StateSchema } from '@/app/providers/StoreProvider/config/store';
import { UserData } from '../types/userShema';
import { createSelector } from '@reduxjs/toolkit';
import { usersAdapter } from '../slices/usersSlice';

export const getLoadingStatus = (state?: StateSchema) => state?.users?.status; 
export const getError = (state?: StateSchema) => state?.users?.error;

const getAllUsers = usersAdapter.getSelectors<StateSchema>((state) => state?.users || usersAdapter.getInitialState());

export const getUsersData = createSelector(
	getAllUsers.selectAll,
	(users?: UserData[]) => users || []
);

export const getUsersCount = createSelector(
	getAllUsers.selectTotal,
	(count?: number) => count || 0
);
