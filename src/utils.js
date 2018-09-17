const path = require('path')
const fs = require('fs')

function getBabelrc (src) {
  if (src && fs.existsSync(src)) {
    return src
  }
  const curBabelRc = path.resolve('./.babelrc')
  if (fs.existsSync(curBabelRc)) {
    return curBabelRc
  }
  return ''
}

module.exports = { getBabelrc }