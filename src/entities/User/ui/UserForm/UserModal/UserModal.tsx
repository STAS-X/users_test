import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames';
import { Modal } from '@/shared/ui/Modal';
import { UserInfoForm } from '../UserInfoForm/UserInfoForm';
import { EntityId } from '@reduxjs/toolkit';

export interface UserInfoFormProps {
	className?: string;
	isOpen: boolean;
	userId: EntityId;
	onClose: () => void;
}

export const UserModal: FC<UserInfoFormProps> = memo((props: UserInfoFormProps) => {
	const { className, isOpen, userId, onClose } = props;

	const [isShowContent, setIsShowContent] = useState<boolean>(isOpen || true);

	const onFormClose = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	const handleTransitionEnd = useCallback(
		(isOpen: boolean) => () => {
			setIsShowContent(isOpen);
		},
		[setIsShowContent]
	);

	useEffect(() => console.log(`isShowContent has new status ${isOpen}`), [isOpen]);

	// useEffect(() => {
	// 	const sleep = async (ms: number) =>
	// 		await new Promise((resolve) => setTimeout(() => resolve(setSlowClose(isOpen)), ms));
	// 	void sleep(isOpen ? 0 : 500);
	// }, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onFormClose} className={classNames('', {}, [className])}>
			{isShowContent && (
				<UserInfoForm
					className={'formCard'}
					onClose={onFormClose}
					onTransition={handleTransitionEnd(isOpen)}
					userId={userId}
				/>
			)}
		</Modal>
	);
});
