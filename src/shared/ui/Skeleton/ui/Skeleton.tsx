import React, { CSSProperties, FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import classes from './Skeleton.module.scss';

export interface SkeletonProps {
	className?: string;
	height?: string | number;
	width?: string | number;
	border?: string | number;
}

export const Skeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
	const { className, height, width, border } = props;
	const style: CSSProperties = {
		height,
		width,
		borderRadius: border
	};

	return <div className={classNames(classes.skeleton, {}, [className])} style={style}></div>;
};
