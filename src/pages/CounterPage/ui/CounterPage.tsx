import React, { FC, memo } from 'react';
import { PageWrapper } from '@/shared/ui/PageWrapper';
import Counter from '@/features/counter/Counter';

export const CounterPage: FC = memo(() => {
	return (
		<PageWrapper>
			<h1 className={'mb-1'}>Cтраница со счетчиком</h1>
			<Counter />
		</PageWrapper>
	);
});
