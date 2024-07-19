import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        design: '1700px',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        d1: ['3.75em', '1.2em'], // 60px - 72px
        d2: ['3.25em', '1.1923em'], // 52px - 62px
        h1: ['2.5em', '1.2em'], // 40px - 48px
        h2: ['2em', '1.1875em'], // 32px - 38px
        h3: ['1.75em', '1.1786em'], // 28px - 33px
        h4: ['1.5em', '1.375em'], // 24px - 33px
        h5: ['1.375em', '1.5em'], // 22px - 33px
        h6: ['1.25em', '1.2em'], // 20px - 24px
        b1: ['1em', '1.375em'], // 16px - 22px
        b2: ['0.875em', '1.4286em'], // 14px - 20px
        l1: ['1em', '1.1875em'], // 16px - 19px
        l2: ['0.875em', '1.2143em'], // 14px - 17px
        s1: ['1.5em', '1.25em'], // 24px - 30px
        c1: ['0.875em', '1.2143em'], // 14px - 17px
        c2: ['0.75em', '1em'], // 12px - 12px
        min: ['0.625em', '1.2em'], // 10px - 12px
      },
      colors: {
        orangeLight1: '#F9D1C5',
        orangeLight2: '#F3A28B',
        orangeLight3: '#ED7451',
        orange: '#EB582F',
        orangeDark1: '#CC3A10',
        orangeDark2: '#A82D0A',
        orangeDark3: '#6B1A02',

        grayLight1: '#D4D4D4',
        grayLight2: '#A9A8AA',
        grayLight3: '#7D7D7F',
        grayDark1: '#525155',
        grayDark2: '#3C3C3D',
        grayDark3: '#141315',

        white: '#FFFFFF',
        black: '#000000',

        // Not mapped on palette but used on buttons
        grayMix1: '#EDEDED',
        grayMix2: '#D9D9D9',
        grayMix3: '#F4F4F4',
        grayMix4: '#444444',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /^w-\d+$/ },
    { pattern: /^w-px$/ },
    { pattern: /^w-(full|screen|min|max|fit)$/ },
    { pattern: /^h-\d+$/ },
    { pattern: /^h-px$/ },
    { pattern: /^h-(full|screen|min|max|fit)$/ },
  ],
};

export default config;
