import React, { FC, useState, InputHTMLAttributes } from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames';
import { Icon } from '@/shared/ui/Icon/ui/Icon';
import { Stack } from '@/shared/ui/Stack';
import classes from './SearchUserInput.module.scss';
import { Text } from '@/shared/ui/Text/ui/Text';
import Search from '@/shared/assets/search.svg?react';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getLoadingStatus, getUsersCount } from '@/entities/User';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'placeholder' | 'value' | 'size' | 'readOnly' | 'onChange'
>;
type InputIconAlign = 'left' | 'right';
type FontSize = 's' | 'm' | 'l';
type BoxRound = 'none' | 'standart' | 'circle';

const delay = 500;

export interface SearchInputUserProps extends HTMLInputProps {
	className?: string;
	value?: string;
	type?: string;
	placeholder?: string | null;
	onChange?: (value: string) => void;
	onSearchUsers?: (searchMask: string) => void;
	readonly?: boolean;
	round?: BoxRound;
	size?: FontSize;
	iconalign?: InputIconAlign;
}

export const SearchUserInput: FC<SearchInputUserProps> = (props: SearchInputUserProps) => {
	const {
		className,
		placeholder,
		type = 'text',
		readonly = false,
		value = '',
		iconalign = 'left',
		size = 'm',
		round = 'none',
		onChange,
		onSearchUsers,
		...otherProps
	} = props;

	const [defaultValue, setDefaultValue] = useState(value);
	const [isRefetch, setIsRefetch] = useState(true);

	const loadStatus = useAppSelector(getLoadingStatus);
	const count = useAppSelector(getUsersCount);

	const refetchUsers = (searchMask: string) => {
		if (isRefetch) {
			setIsRefetch(false);
			if (onSearchUsers) onSearchUsers(searchMask);
		}
	};

	useDebounce(defaultValue, delay, refetchUsers);

	const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value }
		} = event;
		onChange?.(value);
		setDefaultValue(value);
		setIsRefetch(true);
		//console.log(`current value is ${value}`);
	};

	const mods: Mods = {
		[classes.readonly]: readonly
	};

	return (
		<div className={classNames(classes.container, {}, [])}>
			<div className={'min-h-[20px] p-[5px] pl-[25px]'}>
				{loadStatus === 'loading' && (
					<Text
						content={'Данные о пользователе загружаются...'}
						size={'s'}
						variant={'secondary'}
						align={'align-left'}
					/>
				)}
				{loadStatus === 'idle' && (
					<Text
						content={count > 0 ? `Загружено ${count} пользователей(я)` : 'Пользователи не найдены'}
						size={'s'}
						variant={'secondary'}
						align={'align-left'}
					/>
				)}
			</div>
			<div className={classNames(classes.searchwrapper, {}, [className, classes[size], classes[round]])}>
				<Stack gap={10} justify={'between'} direction={'row'} max>
					{iconalign === 'left' && <Icon Svg={Search} variant={'purple'} width={24} height={24} />}
					<input
						className={classNames(classes.input, mods, [classes[round]])}
						value={defaultValue}
						type={type}
						onChange={onChangeValue}
						readOnly={readonly}
						placeholder={placeholder ?? ''}
						{...otherProps}
					></input>
					{iconalign === 'right' && (
						<Icon className={'pt-[2px] pr-[2px]'} Svg={Search} variant={'purple'} width={24} height={24} />
					)}
				</Stack>
			</div>
		</div>
	);
};
