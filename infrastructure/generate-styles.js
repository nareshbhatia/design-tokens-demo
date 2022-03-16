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

/** Registers transform for sizes */
StyleDictionary.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    // TODO: Rethink how sizes should be transformed
    return [
      // 'fontSize',
      // 'spacing',
      // 'borderRadius',
      // 'borderWidth',
      // 'sizing',
    ].includes(prop.attributes.category);
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) + 'px';
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
          'attribute/cti',
          'name/cti/kebab',
          'sizes/px',
          'shadow/spreadShadow',
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
