import React, { FC, memo, useCallback, useEffect, useMemo } from 'react';
//import { classNames } from '@/shared/lib/helpers/classNames';
//import classes from './UserInfoForm.module.scss';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import CloseTag from '@/shared/assets/closetag.svg?react';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getUserById } from '../../../model/selectors/getUsersData';
import { UserData } from '../../../model/types/userShema';
import { formatDate } from '@/shared/lib/helpers/formatStringToDate';
//import { Icon } from '@/shared/ui/Icon';

export interface UserInfoFormProps {
	className?: string;
	userId: string | number;
	onTransition: () => void;
	onClose: () => void;
}

export const UserInfoForm: FC<UserInfoFormProps> = memo((props: UserInfoFormProps) => {
	const { className, onClose: onFormClose, onTransition, userId } = props;

	const {
		name = '',
		phone = '',
		email = '',
		position_name = '',
		department = '',
		//address = '',
		hire_date = new Date().toDateString()
	} = useAppSelector(getUserById(userId)) as UserData;

	const onEnterDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Esc') {
				void onFormClose();
			}
		},
		[onFormClose]
	);

	useEffect(() => {
		window.addEventListener('keydown', onEnterDown);

		return () => {
			window.removeEventListener('keydown', onEnterDown);
		};
	}, [onEnterDown]);

	const contentData = useMemo(() => {
		return [
			{
				left: <Text className={'text-left'} size={'m'} content={'Телефон:'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={phone} />
			},
			{
				left: <Text className={'text-left'} size={'m'} content={'Почта:'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={email} />
			},
			{
				left: <Text className={'text-left'} size={'m'} content={'Дата приема:'} />,
				right: (
					<Text
						className={'text-left'}
						size={'sm'}
						variant={'secondary'}
						content={formatDate(new Date(hire_date))}
					/>
				)
			},
			{
				left: <Text className={'text-left'} size={'m'} content={'Должность:'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={position_name} />
			},
			{
				left: <Text className={'text-left'} size={'m'} content={'Подразделение:'} />,
				right: <Text className={'text-left'} size={'sm'} variant={'secondary'} content={department} />
			}
		];
	}, [phone, email, position_name, department, hire_date]);

	const loremIpsum =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation.';

	return (
		<Card
			className={className}
			paddings={24}
			gaps={12}
			sectionGaps={30}
			onTransitionEnd={onTransition}
			shadow
			role={'modal'}
			header={
				<>
					<Text className={'text-left'} size={'l'} content={name} />
					<Icon
						Svg={CloseTag}
						width={20}
						height={20}
						variant={'standart'}
						clickable
						onIconClick={onFormClose}
					/>
				</>
			}
			content={contentData}
			footer={
				<>
					<Text className={'text-left'} size={'m'} content={'Дополнительная информация:'} />
					<Text className={'text-justify'} size={'sm'} variant={'secondary'} wrap content={loremIpsum} />
				</>
			}
		></Card>
	);
});
