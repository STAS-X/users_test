import React, { ReactNode, FC, useEffect, useCallback } from 'react';
import { getUserError } from '@/entities/User';
import { useAppDispatch, useAppSelector } from '../../StoreProvider/config/hooks';
import { Slide, toast } from 'react-toastify';
import classes from './ErrorBoundary.module.scss';
import { usersActions } from '@/entities/User';

interface ErrorBoundaryProps {
	children: ReactNode;
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = (props: ErrorBoundaryProps) => {
	const { children } = props;
	const error = useAppSelector(getUserError);
	const dispatch = useAppDispatch();

	const handleCloseToastify = useCallback(() => {
		dispatch(usersActions.setError(''));
	}, [dispatch]);

	useEffect(() => {
		if (error)
			toast.error(
				<div className={classes.toastContent}>
					<h2>Внимание ошибка:</h2>
					<h3>{error}</h3>
				</div>,
				{
					//type: toast.TYPE.ERROR,
					className: classes.toastError,
					theme: 'colored',
					transition: Slide,
					onClose: handleCloseToastify,
					hideProgressBar: true,
					closeButton: true,
					closeOnClick: true,
					pauseOnHover: true
				}
			);
	}, [error, handleCloseToastify]);

	return <>{children}</>;
};
