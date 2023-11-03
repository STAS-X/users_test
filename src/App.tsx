import React, { FC } from 'react';

import { AppRouter } from '@/app/providers/router/ui/AppRouter';
import { ContentLayout } from './shared/lib/layout/ContentLayout/ContentLayout';

export const App: FC = () => {
	return (
		<div className="App">
			<ContentLayout content={<AppRouter />} />
		</div>
	);
};
