/**
 * Generates styles using Style Dictionary
 */

const StyleDictionary = require('style-dictionary');
const { createArray } = require('./fns');

/** Generates style dictionary config dynamically */
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function(dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`;
  },
});

/** Registers transform for sizes to px */
StyleDictionary.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function(token) {
    return ['borderRadius', 'borderWidth'].includes(token.type);
  },
  transformer: function(token) {
    return `${token.value}px`;
  },
});

/** Registers transform for sizes to rem */
StyleDictionary.registerTransform({
  name: 'sizes/rem',
  type: 'value',
  matcher: function(token) {
    return ['fontSizes', 'spacing'].includes(token.type);
  },
  transformer: function(token) {
    return `${parseFloat(token.value) / 16}rem`;
  },
});

/** Registers transform for sizes from percent to number (unit less) */
StyleDictionary.registerTransform({
  name: 'sizes/lineHeights',
  type: 'value',
  matcher: function(token) {
    return ['lineHeights'].includes(token.type);
  },
  transformer: function(token) {
    return typeof token.value === 'string' && token.value.includes('%')
      ? parseFloat(token.value) / 100
      : `${parseFloat(token.value) / 16}rem`;
  },
});

/** Registers transform for fontWeights */
StyleDictionary.registerTransform({
  name: 'font/weights',
  type: 'value',
  matcher: function(token) {
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
  matcher: function(token) {
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
  matcher: function(token) {
    return token.type === 'boxShadow';
  },
  transformer: (token) => {
    const shadows = Object.values(token.value);
    const result = shadows.map(
      (shadow) =>
        `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    );
    return result.join(',');
  },
});

console.log('Build started...');

/** Processes global, semantic and brand token sets */
[
  'global',
  'semantic',
  'brand1-light',
  'brand1-dark',
  'brand2-light',
  'brand2-dark'
].map(function(tokenSet) {
  console.log(`\nProcessing: [${tokenSet}]`);

  const StyleDictionaryExtended = StyleDictionary.extend(
    getTokenSetConfig(tokenSet)
  );

  StyleDictionaryExtended.buildPlatform('web');

  console.log('==============================================');
});

console.log('\nBuild completed!');

// ---------- Helper functions ----------

/** Returns the configuration for a token set */
function getTokenSetConfig(tokenSet) {
  return {
    source: [`tokens/output/${tokenSet}.json`],
    format: {
      createArray,
    },
    platforms: {
      web: {
        transforms: [
          // disable cti (category/type/item) support
          // we dont use this taxonomy
          // 'attribute/cti',
          'name/cti/kebab',
          'sizes/px',
          'sizes/rem',
          'sizes/lineHeights',
          'shadow/spreadShadow',
          'font/weights',
          'font/letterSpacing',
        ],
        buildPath: 'apps/advisor-desktop-css/src/styles/output/',
        files: [
          {
            destination: `${tokenSet}.json`,
            format: 'createArray',
          },
          {
            destination: `${tokenSet}.css`,
            format: 'css/variables',
            selector: tokenSet === 'global' ? ':root' : `.${tokenSet}`,
          },
        ],
      },
    },
  };
}
