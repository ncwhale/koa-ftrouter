const debug = require('debug')('router'),
      methods = require('methods');

var Router = (function() {
    let Router = function(options = {}) {
        this.method = {};
        
    }

    // This is the default router function.
    let create = Router.prototype.create = function(method) {
        var method = method.toLowerCase();
        Router.prototype[method] = function(name, path, ...middlewares){
            this.method[method] = middlewares;
        };
    };

    // Just some proto warp function.
    let remove = Router.prototype.remove = function(method){
        var method = method.toLowerCase();
        delete Router.prototype[method];
    };

    let replace = Router.prototype.replace = function(method, func){
        var method = method.toLowerCase();
        delete Router.prototype[method];
        Router.prototype[method] = func;
    };

    
    // Router.prototype. = function() {};
    methods.forEach( method => {
        create(method);
    });

    return Router;
})();

module.exports = Router;
