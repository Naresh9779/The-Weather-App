/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,vue,html}"],
  theme: {
    extend: {
      colors:{
        "weatherPrimary":'#003f5c',
        "weatherSecondary":"#00202e",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif','system-ui'],
      },
      container:{
        center: true,
        padding: '2rem',
      },
      screens:{
        sm:"640px",
        md:"748px"
      }

  
    },
  },
  plugins: [],
}

