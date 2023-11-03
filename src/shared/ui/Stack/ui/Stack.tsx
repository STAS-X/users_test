import React, { FC } from 'react';
import { ReactNode } from 'react';
import { classNames } from '../../../lib/helpers/classNames';
import { convertToStyleProperty } from '../../../lib/helpers/propertyToStackStyle';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface StackProps extends DivProps {
	className?: string;
	children: ReactNode;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	width?: string | number;
	height?: string | number;
	gap?: number;
	max?: boolean;
}

export const Stack: FC<StackProps> = (props: StackProps) => {
	const {
		className,
		children,
		justify = 'start',
		align = 'center',
		direction = 'column',
		max = false,
		width = '',
		height = '',
		gap = 8,
		style,
		...others
	} = props;

	const transformWHtoTileWindStyle = max
		? direction === 'column'
			? 'w-full '
			: 'h-full '
		: width !== ''
		? typeof width === 'number'
			? `w-${width} `
			: `w-[${width}] `
		: (height !== '')
		? typeof height === 'number'
			? `h-${height} `
			: `h-[${height}] `
		: '';
	//console.log(width, height, transformWHtoTileWindStyle, 'get transform style props');

	return (
		<div
			className={classNames('flex', {}, [transformWHtoTileWindStyle, className])}
			style={{
				...style,
				justifyContent: convertToStyleProperty(justify),
				alignItems: convertToStyleProperty(align),
				flexDirection: direction,
				gap
			}}
			{...others}
		>
			{children}
		</div>
	);
};
