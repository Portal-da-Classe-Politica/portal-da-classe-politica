import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        d1: ['60px', '72px'],
        d2: ['52px', '62px'],
        h1: ['40px', '48px'],
        h2: ['32px', '38px'],
        h3: ['28px', '33px'],
        h4: ['24px', '33px'],
        h5: ['24px', '33px'],
        h6: ['20px', '24px'],
        b1: ['16px', '22px'],
        b2: ['14px', '20px'],
        l1: ['16px', '19px'],
        l2: ['14px', '17px'],
        s1: ['24px', '30px'],
        c1: ['14px', '17px'],
        c2: ['12px', '12px'],
      },
      colors: {
        laranja: '#EB582F',
        laranja1: '#F9D1C5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
