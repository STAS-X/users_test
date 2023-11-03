import React, { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import classes from './Card.module.scss';

type CardTheme = 'normal' | 'outline' | 'light';
type CardBorder = 'standart' | 'round' | 'partial';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	variant?: CardTheme;
	border?: CardBorder;
	max?: boolean;
	shadow?:boolean;
	paddings?: number;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
	const {
		className,
		variant = 'normal',
		border = 'standart',
		paddings = 16,
		children,
		max = false,
		shadow = false,
		...otherProps
	} = props;

	return (
		<div
			className={classNames(classes.card, { [classes.max]: max, [classes.shadow]: shadow }, [
				className,
				classes[variant],
				classes[border]
			])}
			style={{ padding: paddings }}
			{...otherProps}
		>
			{children}
		</div>
	);
});
