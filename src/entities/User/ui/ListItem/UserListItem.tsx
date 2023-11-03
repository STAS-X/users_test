import React, { FC, memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Stack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/ui/Text';
import { UserData } from '../../model/types/userShema';
import Phone from '@/shared/assets/phone.svg?react';
import Email from '@/shared/assets/email.svg?react';
import { Icon } from '@/shared/ui/Icon';

interface UserListItemProps {
	data: UserData;
	className?: string;
}

export const UserListItem: FC<UserListItemProps> = memo((props: UserListItemProps) => {
	const {
		data: { name, phone, email },
		className = ''
	} = props;

	return (
		<Card className={`${className} w-[360px] h-[320px]`} shadow>
			<Stack direction={'column'} align={'start'} gap={16}>
				<Text className={'text-left text-[#262C40]'} size={'l'} content={name} />
				<div className={'-mt-[10px]'}></div>
				<Stack direction={'row'} justify={'start'} gap={16}>
					<Icon Svg={Phone} width={24} height={24} variant={'purple'} />
					<Text className={'text-left text-[#8189A3]'} size={'m'} content={phone} />
				</Stack>
				<Stack direction={'row'} justify={'start'} gap={16}>
					<Icon Svg={Email} width={24} height={24} variant={'purple'} />
					<Text className={'text-left text-[#8189A3]'} size={'m'} content={email} />
				</Stack>
			</Stack>
		</Card>
	);
});
