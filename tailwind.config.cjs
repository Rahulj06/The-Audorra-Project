module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        blush: '#FFD6D6',
        mint: '#CDE7E3',
        lilac: '#E6D7FF',
        peach: '#FFE3C6',
        ink: '#333333',
        coral: '#FF7F7F'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        blob: '2rem'
      }
    }
  },
  plugins: [],
}

