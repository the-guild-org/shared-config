## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ',' expected.`
-   Path: `graphql/dataloader/flow-typed/npm/jest_v24.x.x.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/flow-typed/npm/jest_v24.x.x.js#L4)

```js
  2 | // flow-typed version: 6cb9e99836/jest_v24.x.x/flow_>=v0.104.x
  3 |
> 4 | type JestMockFn<TArguments: $ReadOnlyArray<*>, TReturn> = {
    |                          ^
  5 |  (...args: TArguments): TReturn,
  6 |  /**
  7 |   * An object for introspecting mock calls
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ',' expected.`
-   Path: `graphql/dataloader/src/__tests__/abuse.test.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/__tests__/abuse.test.js#L33)

```js
  31 |
  32 |   it('Load function requires an key', () => {
> 33 |     const idLoader = new DataLoader<number, number>(async keys => keys);
     |                                                  ^
  34 |
  35 |     expect(() => {
  36 |       // $FlowExpectError
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ')' expected.`
-   Path: `graphql/dataloader/src/__tests__/browser.test.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/__tests__/browser.test.js#L11)

```js
   9 |
  10 | // Mock out process.nextTick as not existing for this test before requiring.
> 11 | process.nextTick = (null: any);
     |                        ^
  12 | const DataLoader = require('..');
  13 |
  14 | describe('Browser support', () => {
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ',' expected.`
-   Path: `graphql/dataloader/src/__tests__/dataloader.test.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/__tests__/dataloader.test.js#L27)

```js
  25 |
  26 |   it('builds a really really simple data loader', async () => {
> 27 |     const identityLoader = new DataLoader<number, number>(async keys => keys);
     |                                                        ^
  28 |
  29 |     const promise1 = identityLoader.load(1);
  30 |     expect(promise1).toBeInstanceOf(Promise);
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ')' expected.`
-   Path: `graphql/dataloader/src/__tests__/oldbrowser.test.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/__tests__/oldbrowser.test.js#L12)

```js
  10 | // Mock out process.nextTick and setImmediate as not existing for this test
  11 | // before requiring.
> 12 | process.nextTick = (null: any);
     |                        ^
  13 | global.setImmediate = (null: any);
  14 | const DataLoader = require('..');
  15 |
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: ',' expected.`
-   Path: `graphql/dataloader/src/__tests__/unhandled.test.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/__tests__/unhandled.test.js#L21)

```js
  19 |     });
  20 |
> 21 |     const identityLoader = new DataLoader<number, number>(async keys => keys);
     |                                                        ^
  22 |
  23 |     identityLoader.prime(1, new Error('Error: 1'));
  24 |
```

## Rule: unable-to-parse-rule-id

-   Message: `Parsing error: Expected '=' for property initializer.`
-   Path: `graphql/dataloader/src/index.js`
-   [Link](https://github.com/graphql/dataloader/blob/HEAD/src/index.js#L66)

```js
  64 |   _batchLoadFn: BatchLoadFn<K, V>;
  65 |   _maxBatchSize: number;
> 66 |   _batchScheduleFn: (() => void) => void;
     |                                 ^
  67 |   _cacheKeyFn: K => C;
  68 |   _cacheMap: CacheMap<C, Promise<V>> | null;
  69 |   _batch: Batch<K, V> | null;
```
