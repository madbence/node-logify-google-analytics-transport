'use strict';

var GATransport = module.exports = function GATransport(ga, opts) {
  if (!(this instanceof GATransport)) {
    return new GATransport(ga, opts);
  }
  opts = opts || {};
  this.ga = ga;
};

var proto = GATransport.prototype;

proto.write = function write(message) {
  var ga = this.ga;
  var meta = message.meta;
  if (message.err) {
    ga(
      'send',
      'exception', {
        exDescription: message.message,
        exFatal: meta.fatal,
      }
    );
    return;
  }
  switch(meta.type) {
    case 'pageview': ga(
      'send',
      'pageview', {
        page: meta.page,
      }
    ); break;
    case 'event': ga(
      'send',
      'event', {
        eventCategory: meta.category,
        eventAction: meta.action,
        eventLabel: meta.label,
        eventValue: meta.value,
      }
    ); break;
    case 'timing': ga(
      'send',
      'timing', {
        timingCategory: meta.category,
        timingVar: meta.variable,
        timingValue: meta.value,
        timingLabel: meta.label,
        page: meta.page,
      }
    ); break;
    default: throw new Error(
      'Message type ' + meta.type + ' not supported by this transport!'
    );
  }
};
