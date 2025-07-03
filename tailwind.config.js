module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/globals.css',
    ],
    theme: {
        extend: {
            fontFamily: {
                caveat: ['var(--font-caveat)', 'cursive'],
            }
        },
    },
    plugins: [],
}