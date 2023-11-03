import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getLoadingStatus } from '../model/selectors/getUsersData';
import { UserData } from '../model/types/userShema';
import { Stack } from '@/shared/ui/Stack';
import { UserListItemSkeleton } from './ListItem/UserListItemSkeleton';
import { UserListItem } from './ListItem/UserListItem';

interface UserListProps {
	users: UserData[];
}

export const UserList: FC<UserListProps> = (props: UserListProps) => {
	const { users } = props;

	const loadStatus = useAppSelector(getLoadingStatus);

	useEffect(() => {
		console.log(loadStatus, 'loadstatus changed');
	}, [loadStatus]);

	const skeletons = Array.from({ length: 3 }, (_, i) => <UserListItemSkeleton key={i} className={'basis-[30%]'} />);

	return (
		<Stack
			className={'flex-wrap flex-auto p-[20px] pl-[40px] h-[570px] overflow-y-auto'}
			align={'start'}
			max
			gap={24}
			height={'100%'}
			direction={'row'}
		>
			{loadStatus === 'loading'
				? skeletons.map((skeleton) => skeleton)
				: users.map((user, index) => <UserListItem key={index} className={'basis-[30%]'} data={user} />)}
		</Stack>
	);
};
