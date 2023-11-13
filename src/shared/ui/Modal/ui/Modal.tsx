import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames';
import { Portal } from '../../Portal';
import classes from './Modal.module.scss';
import { Overlay } from '../../Overlay';

export interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props: ModalProps) => {
	const { className = '', children, isOpen, onClose } = props;

	const mods: Mods = useMemo(() => {
		return {
			[classes.opened]: isOpen,
			[classes.closed]: !isOpen
		};
	}, [isOpen]);

	const handleClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	return (
		<Portal>
			<div className={classNames(classes.modal, mods, [className])}>
				<Overlay onClick={handleClose} />
				<div className={classNames(classes.content)}>{children}</div>
			</div>
		</Portal>
	);
};
