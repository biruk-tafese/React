module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3490dc',
      },
    },
    fontFamily: {
      'custom': ['CustomFont', 'sans'],
    },
  },
  plugins: [
    // Add any additional plugins or customizations here
  ],
}

const cssnano = require('cssnano');

module.exports = {
  plugins: {
    tailwindcss: {},
             cssnano: {
              preset: [
                'default', // Use the default preset optimizations
                {
                  minifySelectors: false, // Don't minify selectors
                  zindex: false, // Don't optimize z-index values
                  discardEmpty: true, // Remove empty rules
                  reduceIdents: false, // Don't reduce identifier names
                },
              ],
            }
    // Other PostCSS plugins can be added here if needed
  }
}

module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-import': {}, // Add postcss-import to the plugins
    // Other PostCSS plugins can be added here if needed
  }
}