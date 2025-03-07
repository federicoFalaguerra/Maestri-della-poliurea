/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				testcolor: '#ff0000',
			},
			fontSize: {
				xs: 'clamp(0.75rem, 0.9vw, 1rem)', // 12px - 16px
				sm: 'clamp(0.875rem, 1vw, 1.25rem)', // 14px - 20px
				base: 'clamp(1rem, 1.2vw, 1.5rem)', // 16px - 24px
				lg: 'clamp(1.5rem, 2vw, 2rem)', // 24px - 32px
				xl: 'clamp(2rem, 2.5vw, 3rem)', // 32px - 48px
			},
		}
	},
	plugins: [
		require('flowbite/plugin')
	],
}