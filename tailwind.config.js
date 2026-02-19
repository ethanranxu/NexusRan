/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#10B981",
                "primary-dark": "#059669",
                "background-light": "#f6f8f7",
                "background-dark": "#0a120e",
                "card-light": "#ffffff",
                "card-dark": "#121f18",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'glow': '0 0 15px rgba(16, 185, 129, 0.3)',
            },
            animation: {
                'gradient-text': 'gradient-xy 4s ease infinite',
                'text-shimmer': 'shimmer 3s linear infinite',
            },
            keyframes: {
                'shimmer': {
                    '0%': {
                        'background-position': '100% 0'
                    },
                    '100%': {
                        'background-position': '-100% 0'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
