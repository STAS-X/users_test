import { UserSchema } from '../model/types/userShema';
import { rtkApi } from '../../../shared/api/rtkApi';

const usersApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsersData: builder.query<UserSchema[], string>({
			query: (mask) => ({
				url: '/',				
				params: {
					term: mask
				}
			})
		}),

	}),
	overrideExisting: true
});

export const { useGetUsersDataQuery } = usersApi;
