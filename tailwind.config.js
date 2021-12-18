module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: {
          200: '#F6C3C2',
          700: '#E79D9C'
        },
        green: {
          200: '#BDF5BF',
          400: '#00FF07',
          600: '#39E83E'
        },
        grey: {
          600: '#CFCFCF',
          700: '#C4C4C4',
          900: '#424242' 
        }
      }
    }
  },

  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },

  plugins: [],
  }