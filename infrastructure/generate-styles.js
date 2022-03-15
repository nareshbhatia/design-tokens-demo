// ***** Generates styles using Style Dictionary *****

const StyleDictionaryPackage = require('style-dictionary');
const { createArray } = require('./fns');

/** Generates style dictionary config dynamically */
StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join('\n')}\n}`;
  },
});

/** Registers required transformations */
StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return [
      'fontSizes',
      'spacing',
      'borderRadius',
      'borderWidth',
      'sizing',
    ].includes(prop.attributes.category);
  },
  transformer: function (prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return parseFloat(prop.original.value) + 'px';
  },
});

/** Returns the configuration for a theme */
function getThemeConfig(theme) {
  return {
    source: [`tokens/output/${theme}.json`],
    format: {
      createArray,
    },
    platforms: {
      web: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px'],
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

/** Processes global tokens and theme specific tokens */
function main() {
  console.log('Build started...');

  ['global', 'blue-light', 'blue-dark', 'grey-light', 'grey-dark'].map(
    function (theme) {
      console.log('\n==============================================');
      console.log(`\nProcessing: [${theme}]`);

      const StyleDictionary = StyleDictionaryPackage.extend(
        getThemeConfig(theme)
      );

      StyleDictionary.buildPlatform('web');

      console.log('\nEnd processing');
    }
  );

  console.log('\n==============================================');
  console.log('\nBuild completed!');
}

main();
