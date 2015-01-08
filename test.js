'use strict';

var ga = require('./');

describe('GATransport', function () {
  beforeEach(function () {
    this.args = null;
    this.tracker = function() {
      this.args = arguments;
    }.bind(this);
  });
  it('should return instance', function () {
    var i = ga();
    i.should.be.an.instanceOf(ga);
  });
  it('should track pageviews', function () {
    var i = ga(this.tracker);
    i.write({
      meta: {
        type: 'pageview',
      },
    });
    this.args[0].should.eql('send');
    this.args[1].should.eql('pageview');
    i.write({
      meta: {
        type: 'pageview',
        page: '/foo',
      },
    });
    this.args[2].page.should.eql('/foo');
  });
  it('should track events', function () {
    var i = ga(this.tracker);
    i.write({
      meta: {
        type: 'event',
        category: 'foo',
        action: 'bar',
        label: 'baz',
        value: 1337,
      },
    });
    this.args[0].should.eql('send');
    this.args[1].should.eql('event');
    this.args[2].should.eql({
      eventCategory: 'foo',
      eventAction: 'bar',
      eventLabel: 'baz',
      eventValue: 1337,
    });
  });
  it('should track exceptions', function () {
    var i = ga(this.tracker);
    i.write({
      message: 'foo',
      meta: {
        fatal: true,
      },
      err: {},
    });
    this.args[0].should.eql('send');
    this.args[1].should.eql('exception');
    this.args[2].should.eql({
      exDescription: 'foo',
      exFatal: true,
    });
  });
  it('should track timings', function () {
    var i = ga(this.tracker);
    i.write({
      meta: {
        type: 'timing',
        category: 'foo',
        variable: 'bar',
        value: 1337,
        label: 'baz',
        page: 'qux',
      },
    });
    this.args[0].should.eql('send');
    this.args[1].should.eql('timing');
    this.args[2].should.eql({
      timingCategory: 'foo',
      timingVar: 'bar',
      timingValue: 1337,
      timingLabel: 'baz',
      page: 'qux',
    });
  });
  it('should throw when type is unknown', function () {
    var i = ga(this.tracker);
    (function () {
      i.write({
        type: 'foo',
      });
    }).should.throw();
  });
});
