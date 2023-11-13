import { UserData } from '../types/userShema';
import { createAppAsyncThunk } from '@/shared/types/thunk/thunkAction';
import type { ThunkError } from '@/shared/types/thunk/thunkAction';

export interface UsersBySearchProps {
	search?: string;
}

// A mock function to mimic making an async request for data
export function fetchUsers(data: UserData[] = []): Promise<
	UserData[]
> {
	return new Promise<UserData[]>((resolve) =>
		setTimeout(() => resolve(data), 1500)
	);
}

// First, create the thunk
export const fetchUsersBySearch = createAppAsyncThunk<UserData[], UsersBySearchProps>(
	'users/fetchUsersBySearch',
	async (searchData, thunkApi) => {
		const { search: term } = searchData;
		const { extra, rejectWithValue } = thunkApi;

		try {


			const response = await extra.api.get<UserData[]>(`/`, {
				params: term ? {
					term
				} : {}
			});

			//throw new Error("Внимание ошибка!");
			//console.log(response.data, 'get data from json server');
			//if (!response.data) throw new Error(`Пользователи на сервере не найдены`);
			const usersWithId = (await fetchUsers(response.data)).map((user, id) => {
				if (!user.id) user.id = String(id);
				return user;
			});

			return usersWithId;
		} catch (e: ThunkError) {
			//if (e.response?.status === 404) return rejectWithValue('articleNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(e.message || e.response?.data || `Во время выполнения запроса произошла ошибка: ${e.code || e.response?.status || 500}`);
		}
	}
);
