import React, { FC, memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton/ui/Skeleton';
import { Stack } from '@/shared/ui/Stack';

interface UserListItemSkeletonProps {
	className?: string;
}

export const UserListItemSkeleton: FC<UserListItemSkeletonProps> = memo((props: UserListItemSkeletonProps) => {
	const { className = '' } = props;

	return (
		<Card className={`${className} w-[360px] h-[320px]`} shadow>
			<Stack direction={'column'} align={'start'} gap={16}>
				<Skeleton width={'100%'} height={24} border={10} />
				<div className={'-mt-[10px]'}></div>
				<Skeleton width={'80%'} height={20} border={5} />
				<Skeleton width={'70%'} height={20} border={5} />
				<Skeleton width={'60%'} height={20} border={5} />
				<Skeleton width={'60%'} height={20} border={5} />
			</Stack>
		</Card>
	);
});
