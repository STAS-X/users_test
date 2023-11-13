import { FC, memo, SVGProps } from 'react';
import { classNames } from '../../../lib/helpers/classNames';
import classes from './Icon.module.scss';
import React from 'react';

export type IconVariant = 'standart' | 'none' | 'alert' | 'purple';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick' | 'ref'>;

interface IconProps extends SvgProps {
	className?: string;
	Svg: FC<SVGProps<SVGSVGElement>>;
	variant?: IconVariant;
	disabled?: boolean;
	onIconClick?: () => void;
	clickable?: boolean;
}

export const Icon: FC<IconProps> = memo((props: IconProps) => {
	const {
		className = '',
		Svg,
		variant = 'standart',
		width = 32,
		height = 32,
		disabled = false,
		clickable = false,
		onIconClick = () => {
			return;
		},
		...others
	} = props;

	return clickable ? (
		<button onClick={onIconClick}>
			<Svg
				className={classNames(classes.icon, { [classes.disabled]: disabled, [classes.clickable]: clickable }, [
					classes[variant],
					className
				])}
				width={width}
				height={height}
				{...others}
			/>
		</button>
	) : (
		<Svg
			className={classNames(classes.icon, { [classes.disabled]: disabled }, [classes[variant], className])}
			width={width}
			height={height}
			{...others}
		/>
	);
});
