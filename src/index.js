var path = require('path')
const loaderUtils = require('loader-utils');
const babel = require('babel-core')
const {parseGlobalComponents, parseComponentsDeps} = require('./parse')
const  { getBabelrc } = require('./utils')
const trim = require('trim')

module.exports = function (content) {
  this.cacheable && this.cacheable();
  const options = loaderUtils.getOptions(this) || {}
  try {

    const rawFilePath = path.normalize(this.resourcePath);
    // if(rawFilePath == '/Users/lzw/Documents/git/tua-mp/packages/tua-mp/examples/ylp-leadmall-wxapp/src/components/page/data_controller.vue') {
      let m = content.match(/((.|\n)*)export\s*default((.|\n)*)/)
      let optionsCode;
      let headerCode;
      // console.log('m ', m)
      if(m == null) {
        m = content.match(/((.|\n)*)module\.exports((.|\n)*)/)
      }
      // console.log('m2 ', m)
      if(m != null) {
        headerCode = m[1]
        optionsCode = trim(m[3])
        // console.log('headerCode ', headerCode)
        // console.log('\n\n\n\n\noptionsCode ', optionsCode)

        if(optionsCode && optionsCode.length > 0) {
          const last = optionsCode[optionsCode.length - 1];
          if(last == ';') {
            optionsCode = optionsCode.substring(0, optionsCode.length-1)
            // console.log('rawFilePath------》', rawFilePath)

          }
        }
      }

      // replace(/export.*default/, '')
      // .replace('module.exports', ''))

      const code = `
      ${headerCode}
      import Vue from 'vue';
      export default new Vue(${optionsCode});
    `
      // console.log('code------》', code)
      return code
    // }
    // return content;
  } catch (err) {
    console.error(err)
    return null;
  }
};