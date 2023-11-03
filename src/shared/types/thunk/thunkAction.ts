import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunkDispatch, ExtraThunkArgs, StateSchema } from '@/app/providers/StoreProvider';

interface SerializedError {
	name?: string;
	message?: string;
	code?: string;
	stack?: string;
}
export type ThunkError = SerializedError | any;

//Defining a Pre - Typed createAsyncThunk
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: StateSchema;
	dispatch: AppThunkDispatch;
	extra: ExtraThunkArgs;
	error: ThunkError;
	rejectValue: string;
}>();

