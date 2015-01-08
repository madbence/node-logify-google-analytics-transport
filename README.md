# logify-google-analytics-transport

Google Analytics transport for [logify](https://npmjr.org/package/logify).

## Install

Install the [package](https://npmjs.org/package/logify-google-analytics-transport) with [`npm`](https://npmjs.org/):

```sh
$ npm install logify-google-analytics-transport
```

## Usage

```js
var logify = require('logify');
var transport = require('logify-google-analytics-transport');

var logger = logify();
logger.add(transport(ga));

logger.info({
  type: 'event',
  category: 'foo',
  action: 'bar',
}, 'Some description for other logger transports');
```

Just set the context for each message, log level is ignored for this transport.
You can event create dedicated event loggers:

```js
var eventLogger = logger.child({
  type: 'event'
});

logger.info({
  category: 'foo',
  action: 'bar',
});

// or

var actionLogger = logger.child({
  type: 'event',
  category: 'foo',
});

actionLogger.info({
  action: 'bar'
});
```

## Supported message types

### `pageview`

You can pass a `page` variable to override the default value (which is the current page).

```js
logger.info({
  type: 'pageview',
  page: '/foo',
});
```

### `event`

```js
logger.info({
  type: 'event',
  category: 'foo',
  action: 'bar',
  label: 'baz',
  value: 1337
});
```

### `exception`

```js
logger.error(err);
```

### `timing`

```js
logger.info({
  type: 'timing',
  category: 'foo',
  variable: 'bar',
  value: 1337,
  label: 'baz',
  page: 'qux',
});
```

## License

MIT
