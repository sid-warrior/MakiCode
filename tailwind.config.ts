import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#323437',
        'bg-sub': '#2c2e31',
        text: '#d1d0c5',
        sub: '#646669',
        main: '#e2b714',
        error: '#ca4754',
        border: '#3d3d3d',
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
