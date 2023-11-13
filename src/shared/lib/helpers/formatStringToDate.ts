export const formatDate = (date: Date) => {
	return [padToDigits(date.getDate()), padToDigits(date.getMonth()+1), padToDigits(date.getFullYear())].join('.');
}

const padToDigits = (pad : number) => {
	return pad.toString().padStart(2,'0');
}