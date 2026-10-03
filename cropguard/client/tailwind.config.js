/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Agricultural palette: field green, soil, harvest gold, alert clay.
        leaf:   { 50:'#F1F7EE', 100:'#DCEBD4', 200:'#BBD9AC', 300:'#92C07E',
                  400:'#68A455', 500:'#478A36', 600:'#357029', 700:'#2A5A22',
                  800:'#23471E', 900:'#1B3517' },
        soil:   { 50:'#F7F5F1', 100:'#EBE6DD', 300:'#C4B9A6', 600:'#7A6A52', 900:'#3A3122' },
        harvest:{ 100:'#FDF0D2', 400:'#E8B33C', 600:'#B9820F' },
        clay:   { 100:'#FBE6DF', 400:'#D9694A', 600:'#A83A1C' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,53,23,.06), 0 8px 24px -12px rgba(27,53,23,.18)'
      },
      borderRadius: { xl2: '1.25rem' }
    }
  },
  plugins: []
};
