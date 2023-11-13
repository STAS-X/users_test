import { UserSchema, UserData, LoadingStatus } from '../types/userShema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersBySearch } from '../services/getUsersBySearch';


export const usersAdapter = createEntityAdapter<UserData>();

const usersSlice = createSlice({
	name: 'getUsersData',
	initialState: usersAdapter.getInitialState<UserSchema>({
		status: 'idle',
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		setUsersData: (state, action: PayloadAction<UserData[]>) => {
			usersAdapter.setAll(state, action.payload);
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setStatus: (state, action: PayloadAction<LoadingStatus>) => {
			state.status = action.payload;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchUsersBySearch.pending, (state) => {
			state.error = undefined;
			state.status = 'loading';
		});
		builder.addCase(fetchUsersBySearch.fulfilled, (state, action) => {
			state.status = 'idle';
			console.error(action.payload, action.payload.length, 'data payload');
			if (action.payload.length > 0 && usersAdapter.getSelectors().selectTotal(state) === 0) usersAdapter.setAll(state, action.payload);
			state.error = undefined;
		});
		builder.addCase(fetchUsersBySearch.rejected, (state, action) => {
			state.status = 'failed';
			//usersAdapter.setAll(state, []);
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: usersActions, reducer: usersData } = usersSlice;
