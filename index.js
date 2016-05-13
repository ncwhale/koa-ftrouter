'use strict';

const fs = require('fs'),
      path = require('path'),
      pathToRegexp = require('path-to-regexp');

const debug = require('debug')('koa-route'),
      methods = require('methods');

var Router = module.exports = function (options = {}){
    // Build route tree from root dir.

    // TODO: update to async/await when node support it.
    return function *(){
    };
}

//


/**
 * Module dependencies.
 */


methods.forEach(function(method){
  module.exports[method] = create(method);
});

module.exports.del = module.exports.delete;
module.exports.all = create();

function create(method) {
  if (method) method = method.toUpperCase();

  return function(path, fn, opts){
    const re = pathToRegexp(path, opts);
    debug('%s %s -> %s', method || 'ALL', path, re);

    return function *(next){
      // method
      if (!matches(this, method)) return yield* next;

      // path
      const m = re.exec(this.path);
      if (m) {
        const args = m.slice(1).map(decode);
        debug('%s %s matches %s %j', this.method, path, this.path, args);
        args.push(next);
        yield* fn.apply(this, args);
        return;
      }

      // miss
      return yield* next;
    }
  }
}

/**
 * Decode value.
 */

function decode(val) {
  if (val) return decodeURIComponent(val);
}

/**
 * Check request method.
 */

function matches(ctx, method) {
  if (!method) return true;
  if (ctx.method === method) return true;
  if (method === 'GET' && ctx.method === 'HEAD') return true;
  return false;
}
