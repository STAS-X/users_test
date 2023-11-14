import React, { FC, memo, useCallback, useMemo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text/ui/Text';
import { UserData } from '../../model/types/userShema';
import Phone from '@/shared/assets/phone.svg?react';
import Email from '@/shared/assets/email.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getUserById } from '../../model/selectors/getUsersData';

interface UserListItemProps {
	userId: EntityId;
	className?: string;
	onOpenInfoForm: () => void;
}

export const UserListItem: FC<UserListItemProps> = memo((props: UserListItemProps) => {
	const { userId, className = '', onOpenInfoForm } = props;

	const { name = '', phone = '', email = '' } = useAppSelector(getUserById(userId)) as UserData;

	const contentData = useMemo(() => {
		return [
			{
				left: <Icon Svg={Phone} width={24} height={24} variant={'purple'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={phone} />
			},
			{
				left: <Icon Svg={Email} width={24} height={24} variant={'purple'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={email} />
			}
		];
	}, [phone, email]);

	const scrollCardAndOpenInfoForm = useCallback(
		(userId: EntityId) => () => {
			const userCard = document.querySelector(`div[data-index="user-${userId}"]`)?.parentElement;
			if (userCard && userCard.parentElement) 
				if (
					userCard.offsetTop - userCard.clientHeight - userCard.parentElement.scrollTop + 70 < 10 ||
					userCard.offsetTop - userCard.parentElement.scrollTop + 85 > userCard.parentElement.clientHeight
				) {
					//console.log('not in scroll area');
					userCard.scrollIntoView({ block: 'center', behavior: 'smooth' });
				}
			onOpenInfoForm();
		},
		[onOpenInfoForm]
	);

	return (
		<Card
			data-index={`user-${userId}`}
			className={`${className} standart`}
			header={<Text className={'text-left'} size={'l'} content={name} />}
			content={contentData}
			paddings={24}
			gaps={12}
			sectionGaps={24}
			shadow
			onClick={scrollCardAndOpenInfoForm(userId)}
		></Card>
	);
});
