const Module = require('module')
const orig = Module.prototype.require
Module.prototype.require = function (id) {
  const result = orig.apply(this, arguments)
  if (id === '@next/env' && result && !result.default) {
    Object.defineProperty(result, 'default', { value: result, enumerable: true })
  }
  return result
}
