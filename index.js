'use strict';

var istanbul = require('istanbul');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');

var defaultOptions = {
    embedSource: true,
    noAutoWrap: true
};

module.exports = function(source, map) {
    var userOptions = loaderUtils.parseQuery(this.query);
    var instrumenter = new istanbul.Instrumenter(
        assign({}, defaultOptions, userOptions)
    );

    if (this.cacheable) {
        this.cacheable();
    }

    var datauri = 'data:application/json;charset=utf-8;base64,';
    var vlq = new Buffer(JSON.stringify(map)).toString('base64');
    source += "\n//# sourceMappingURL=" + datauri + vlq;

    return instrumenter.instrumentSync(source, this.resourcePath);
};
