import React from 'react';
import { memo, ReactElement } from 'react';
import { classNames } from '../../../lib/helpers/classNames';
import classes from './ContentLayout.module.scss';

export interface ContentLayoutProps {
	className?: string;
	header?: ReactElement;
	content: ReactElement;
	footer?: ReactElement;
}

export const ContentLayout = memo((props: ContentLayoutProps) => {
	const { className, header, content, footer } = props;
	//const { t } = useTranslation();

	return (
		<section className={classNames(classes.ContentLayout, {}, [className])}>
			{header && <div className={classes.header}>{header}</div>}
			<div className={classes.content}>{content}</div>
			{footer && <div className={classes.footer}>{footer}</div>}
		</section>
	);
});
