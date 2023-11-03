import { FC, memo } from 'react';
import { classNames } from '../../../lib/helpers/classNames';
import classes from './Text.module.scss';
import React from 'react';

type TextVariant = 'primary' | 'secondary' | 'error';
type TextAlign = 'align-right' | 'align-left' | 'align-center';
type TextSize = 's' | 'm' | 'l';

export interface TextProps {
	className?: string;
	title?: string | null;
	content?: string | null;
	variant?: TextVariant;
	align?: TextAlign;
	bold?: boolean;
	size?: TextSize;
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const sizeToHeaderTag: Record<TextSize, HeaderTag> = {
	l: 'h1',
	m: 'h2',
	s: 'h3',
};

export const Text: FC<TextProps> = memo((props: TextProps) => {
	const {
		className,
		title = '',
		size = 'm',
		content = '',
		bold = false,
		align = 'align-left',
		variant = 'primary',
	} = props;

	const TagHeader = sizeToHeaderTag[size];

	const additionalClasses = [classes[variant], classes[align], classes['size_'+size], className];

	return (
		<div className={classNames(classes.text, { [classes.bold]: bold }, [...additionalClasses])}>
			{title && (
				<TagHeader className={classes.title}>
					{title}
				</TagHeader>
			)}
			{content && (
				<p className={classNames(classes.content)}>
					{content}
				</p>
			)}
		</div>
	);
});
