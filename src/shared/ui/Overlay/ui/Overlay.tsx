import { classNames } from '@/shared/lib/helpers/classNames';
import React, { memo, ReactNode } from 'react';
import classes from './Overlay.module.scss';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
	children?: ReactNode;
}

export const Overlay = memo((props: OverlayProps) => {
	const { className, onClick, children } = props;

	return (
		<div onClick={onClick} className={classNames(classes.Overlay, {}, [className])}>
			{children}
		</div>
	);
});
