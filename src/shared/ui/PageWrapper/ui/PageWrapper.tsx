import React, { FC, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import classes from './PageWrapper.module.scss';

export interface PageWrapperProps {
	className?: string;
	children: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = (props: PageWrapperProps) => {
	const { children, className } = props;

	return <section className={classNames(classes.wrapper, {}, [className])}>{children}</section>;
};
