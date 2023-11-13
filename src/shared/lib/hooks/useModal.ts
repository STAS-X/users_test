import { useCallback, useEffect, useState } from 'react';

interface UseModalProps {
	onClose?: () => void;
	isOpen: boolean;
	animationDelay?: number;
}

interface UseModalReturn {
	closeHandler: () => void;
	isOpen: boolean;
}

export const useModal = (props: UseModalProps): UseModalReturn => {
	const { onClose, animationDelay = 300, isOpen = false } = props;
	const [opened, setOpened] = useState<boolean>(isOpen);

	const closeHandler = useCallback(() => {
		if (onClose) onClose();
		setOpened((prev) => !prev);
	}, [onClose, setOpened]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
				if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
			}
		},
		[closeHandler]
	);

	//const contentClick = (e: React.MouseEvent) => e.stopPropagation();
	useEffect(() => {
		document.documentElement.style.setProperty('--animation-delay', `${animationDelay || 500}ms`);
	}, [animationDelay]);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	useEffect(() =>
		console.log(`new opened status ${opened}`)
		, [opened])

	return {
		closeHandler,
		isOpen: opened
	};
};
