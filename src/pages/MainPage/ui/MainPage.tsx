import React, { FC, memo, useEffect } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper';
import { SearchUserInput } from '@/features/SearchUserInput';
import { fetchUsersBySearch, getUsersData, UserData } from '@/entities/User';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { UserList } from '../../../entities/User/ui/UserList';

export const MainPage: FC = memo(() => {
	const dispatch = useAppDispatch();
	const users = useAppSelector<UserData[]>(getUsersData);

	const fetchUsersByFTS = async (search: string) => {
		const { payload: users } = await dispatch(fetchUsersBySearch({ search }));
		console.log(users, users?.length, `founded users by search q text [${search}]`);
	};

	useEffect(() => {
		if (users.length > 0) {
			console.log(users, `Найдено ${users.length} пользователей по запросу`);
		} else {
			console.warn('Пользователи по запросу не найдены');
		}
	}, [users]);

	return (
		<PageWrapper>
			{/*<h1 className={'mb-2'}>Главная страница</h1>*/}
			<div className={'flex w-full h-full flex-wrap gap-[32px] justify-center truncate'}>
				<SearchUserInput
					onSearchUsers={fetchUsersByFTS}
					placeholder={'Введите запрос для полнотекстового поиска пользователей'}
					iconalign={'right'}
					round={'standart'}
				/>
				<UserList users={users} />
			</div>
		</PageWrapper>
	);
});
