const pkg = require('../../package.json')

const healtchCheck = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    message: 'Tests Server running',
    version: pkg.version,
    coreVersion: pkg.dependencies['@flowbuild/test-core']
  }

  return next();
}

module.exports = {
  healtchCheck
}