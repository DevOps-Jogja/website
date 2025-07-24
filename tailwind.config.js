/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./templates/**/*.html",
        "./static/js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                'devops-blue': '#2563eb',
                'devops-purple': '#7c3aed',
                'devops-green': '#059669',
                'tech-dark': '#0f172a',
                'tech-gray': '#334155'
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace']
            },
            backgroundImage: {
                'tech-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'dark-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translatey(0px)' },
                    '50%': { transform: 'translatey(-20px)' }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
