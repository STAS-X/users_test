module.exports = {
	content: ['./src/**/*.tsx', './src/**/*.ts'],
	theme: {
		extend: {
			backgroundImage: {
				'user-nodata-dev': "url('/src/shared/assets/nodata.jpg')",
				'user-nodata': "url('nodata.jpg')"
			}
		}
	},
	plugins: []
};
