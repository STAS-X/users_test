import React, { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import classes from './Card.module.scss';
import { Stack } from '../../Stack';

type CardTheme = 'normal' | 'outline' | 'light';
type CardBorder = 'standart' | 'round' | 'partial';
type CardRole = 'card' | 'modal' | 'skeleton';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	variant?: CardTheme;
	border?: CardBorder;
	max?: boolean;
	role?: CardRole;
	shadow?: boolean;
	header?: ReactNode;
	content?: Array<{ left: ReactNode; right: ReactNode }>;
	footer?: ReactNode;
	paddings?: number;
	gaps?: number;
	sectionGaps?: number;
	onTransitionEnd?: () => void;
	onClick?: () => void;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
	const {
		className = 'standart',
		variant = 'normal',
		border = 'standart',
		paddings = 16,
		gaps = 16,
		children,
		role = 'card',
		header,
		content = [],
		footer,
		sectionGaps = 0,
		max = false,
		shadow = false,
		...otherProps
	} = props;

	return (
		<div
			className={classNames(classes.card, { [classes.max]: max, [classes.shadow]: shadow }, [
				classes[className],
				classes[variant],
				classes[border]
			])}
			style={{ padding: paddings }}
			role={role}
			{...otherProps}
		>
			{(header || footer || content.length > 0) && (
				<Stack direction={'column'} align={'start'} max gap={sectionGaps}>
					{header && (
						<Stack direction={'row'} align={'center'} justify={'between'} max gap={gaps}>
							{header}
						</Stack>
					)}
					{content.length > 0 && (
						<Stack direction={'column'} align={'start'} max gap={gaps}>
							{content.map((data, index) => (
								<Stack
									key={index}
									direction={'row'}
									align={'center'}
									justify={'start'}
									max
									gap={sectionGaps}
								>
									<div className={role === 'modal' ? 'min-w-[30%]' : ''}>{data.left}</div>
									{data.right}
								</Stack>
							))}
						</Stack>
					)}
					{footer && (
						<Stack direction={'column'} align={'start'} overlap max gap={gaps}>
							{footer}
						</Stack>
					)}
				</Stack>
			)}
			{!(header || footer || content.length > 0) && children}
		</div>
	);
});
