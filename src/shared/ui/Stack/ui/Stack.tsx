import React, { CSSProperties, FC, MutableRefObject } from 'react';
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
	style?: CSSProperties;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	width?: string | number;
	height?: string | number;
	gap?: number;
	overlap?: boolean;
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
		overlap = false,
		width = '',
		height = '',
		gap = 8,
		style,
		...others
	} = props;

	const transformWHtoTileWindStyle = max
		? direction === 'column'
			? 'h-full '
			: 'w-full '
		: width !== ''
		? typeof width === 'number'
			? `w-${width} `
			: `w-[${width}] `
		: height !== ''
		? typeof height === 'number'
			? `h-${height} `
			: `h-[${height}] `
		: '';
	//console.log(width, height, transformWHtoTileWindStyle, 'get transform style props');

	return (
		<div
			className={classNames('flex', {}, [transformWHtoTileWindStyle, overlap ? 'truncate' : '', className])}
			style={{
				...style,
				flexDirection: direction,
				justifyContent: convertToStyleProperty(justify),
				alignItems: convertToStyleProperty(align),
				gap
			}}
			{...others}
		>
			{children}
		</div>
	);
};
