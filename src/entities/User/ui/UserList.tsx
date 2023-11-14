import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getLoadingStatus } from '../model/selectors/getUsersData';
import { UserData } from '../model/types/userShema';
import { Stack } from '@/shared/ui/Stack';
import { UserListItemSkeleton } from './ListItem/UserListItemSkeleton';
import { UserListItem } from './ListItem/UserListItem';
import { UserModal } from './UserForm/UserModal/UserModal';
import { EntityId } from '@reduxjs/toolkit';
import { useModal } from '@/shared/lib/hooks/useModal';
import { useTransition, config, animated } from '@react-spring/web';

interface UserListProps {
	users: UserData[];
}

export const UserList: FC<UserListProps> = (props: UserListProps) => {
	const { users } = props;

	const [clickedUserId, setClickedUserId] = useState<EntityId>(0);
	//const containerRef = useRef<HTMLDivElement>(null);

	const { isOpen, closeHandler } = useModal({ isOpen: false, animationDelay: 500 });

	const loadStatus = useAppSelector(getLoadingStatus);

	// useEffect(() => {
	// 	if (loadStatus === 'idle' && users.length > 3) {
	// 		//console.log(loadStatus, document.querySelector('#userlist')?.style.display, 'loadstatus changed');
	// 		if (document.querySelector('#userlist')) {
	// 			(document.querySelector('#userlist') as HTMLDivElement).click();
	// 			//(document.querySelector('#userlist') as HTMLDivElement).style.display = '';
	// 		}
	// 	}
	// }, [loadStatus, users]);

	const openInfoUserForm = useCallback(
		(id: EntityId) => {
			if (!isOpen) setClickedUserId(id);
			closeHandler();
		},
		[isOpen, setClickedUserId, closeHandler]
	);

	const skeletons = Array.from({ length: 3 }, (_, i) => <UserListItemSkeleton key={i} />);

	const transitions = useTransition(users, {
		from: {
			transform: `translateY(-200%) scale(1)`,
			opacity: 0
		},
		enter: (user: UserData) => {
			//if (animateComments.findIndex((animatedComment) => animatedComment.id !== comment.id) > -1) return;
			//console.log(user.id, 'entering');
			return [
				{
					transform: 'translateY(-100%) scale(0.9)',
					//marginBottom: '-70px',
					opacity: 0.1
				},
				{
					transform: 'translateY(0%) scale(1)',
					opacity: 1
				}
			];
		},
		leave: (user: UserData) => {
			//console.log(user.id, 'deleting');
			return [
				{
					transform: 'translateY(-100%) scale(0.9)',
					opacity: 0.1
				},
				{
					transform: 'translateY(-200%) scale(0.75)',
					opacity: 0
				}
			];
		},

		onDestroyed: (user: UserData) => {
			//console.info(`animated comment ${user.id} DELETED from dom node`);
		},
		unique: true,
		//trail: 50,
		config: { ...config.wobbly, duration: 250 }
	});

	const animatedUsers = transitions((style, user: UserData) => {
		return (
			<animated.div
				className={'flex items-center justify-center'}
				style={{
					...style
				}}
				key={user.id}
			>
				<UserListItem onOpenInfoForm={() => openInfoUserForm(user.id)} userId={user.id} />
			</animated.div>
		);
	});

	return (
		<>
			<Stack
				className={`flex flex-wrap w-[1180px] h-[560px] p-[20px] ${
					users.length > 3 && loadStatus === 'idle' ? 'overflow-y-auto' : 'overflow-hidden'
				} ${
					users.length === 0 && loadStatus === 'idle'
						? `${import.meta.env.DEV ? 'bg-user-nodata-dev' : 'bg-user-nodata'} bg-no-repeat bg-center`
						: 'overflow-y-auto'
				}`}
				id={'userlist'}
				align={'start'}
				justify={'start'}
				max
				gap={24}
				direction={'row'}
			>
				{loadStatus === 'loading' ? skeletons.map((skeleton) => skeleton) : { ...animatedUsers }}
			</Stack>
			<UserModal isOpen={isOpen} onClose={closeHandler} userId={clickedUserId} />
		</>
	);
};
