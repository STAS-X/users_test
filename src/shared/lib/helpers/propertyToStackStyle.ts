import { FlexAlign, FlexJustify } from '../../ui/Stack/ui/Stack';

export const convertToStyleProperty = (property: FlexJustify | FlexAlign) => {
	switch (property) {
		case 'start':
		case 'end':
			return `flex-${property}`;
		case 'between':
		case 'around':
			return `space-${property}`;
		case 'center':
			return `${property}`;
	}
};
