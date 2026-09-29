import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}'], theme: { extend: { fontFamily: { sans: ['Arial', 'sans-serif'] }, colors: { ink: '#182230', navy: '#20365f', mist: '#f5f7fb', cyan: '#35b8c5' } } }, plugins: [] } satisfies Config;
