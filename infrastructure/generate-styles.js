/**
 * Generates styles using Style Dictionary
 */

const StyleDictionary = require('style-dictionary');
const { createArray } = require('./fns');

/** Generates style dictionary config dynamically */
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`;
  },
});

/** Registers transform for sizes to px */
StyleDictionary.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (token) {
    return ['borderWidth'].includes(token.type);
  },
  transformer: function (token) {
    return `${token.value}px`;
  },
});

/** Registers transform for sizes to rem */
StyleDictionary.registerTransform({
  name: 'sizes/rem',
  type: 'value',
  matcher: function (token) {
    return ['fontSizes', 'borderRadius'].includes(token.type);
  },
  transformer: function (token) {
    return `${parseFloat(token.value) / 16}rem`;
  },
});

/** Registers transform for sizes from percent to number (unit less) */
StyleDictionary.registerTransform({
  name: 'sizes/percentToNumber',
  type: 'value',
  matcher: function (token) {
    return ['lineHeights'].includes(token.type);
  },
  transformer: function (token) {
    return parseFloat(token.value) / 100;
  },
});

/** Registers transform for fontWeights */
StyleDictionary.registerTransform({
  name: 'font/weights',
  type: 'value',
  matcher: function (token) {
    return token.type === 'fontWeights';
  },
  transformer: (token) => {
    const map = {
      Light: 300,
      Regular: 400,
      Medium: 500,
    };
    return map[token.value];
  },
});

/** Registers transform for letterSpacing */
StyleDictionary.registerTransform({
  name: 'font/letterSpacing',
  type: 'value',
  matcher: function (token) {
    return token.type === 'letterSpacing';
  },
  transformer: (token) => {
    return `${parseFloat(token.value) / 100}em`;
  },
});

/** Registers transform for boxShadow */
StyleDictionary.registerTransform({
  name: 'shadow/spreadShadow',
  type: 'value',
  matcher: function (token) {
    return token.type === 'boxShadow';
  },
  transformer: (token) => {
    const shadows = Object.values(token.value);
    const result = shadows.map(
      (shadow) =>
        `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`
    );
    return result.join(',');
  },
});

console.log('Build started...');

/** Processes global tokens and theme specific tokens */
['global', 'blue-light', 'blue-dark', 'grey-light', 'grey-dark'].map(function (
  theme
) {
  console.log(`\nProcessing: [${theme}]`);

  const StyleDictionaryExtended = StyleDictionary.extend(getThemeConfig(theme));

  StyleDictionaryExtended.buildPlatform('web');

  console.log('==============================================');
});

console.log('\nBuild completed!');

// ---------- Helper functions ----------

/** Returns the configuration for a theme */
function getThemeConfig(theme) {
  return {
    source: [`tokens/output/${theme}.json`],
    format: {
      createArray,
    },
    platforms: {
      web: {
        transforms: [
          'name/cti/kebab',
          'sizes/px',
          'sizes/rem',
          'sizes/percentToNumber',
          'shadow/spreadShadow',
          'font/weights',
          'font/letterSpacing',
        ],
        buildPath: 'apps/advisor-desktop-css/src/styles/output/',
        files: [
          {
            destination: `${theme}.json`,
            format: 'createArray',
          },
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            selector: `.${theme}-theme`,
          },
        ],
      },
    },
  };
}
