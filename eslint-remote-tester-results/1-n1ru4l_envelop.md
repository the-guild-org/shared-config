## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `n1ru4l/envelop/packages/plugins/execute-subscription-event/test/use-extend-context-value-per-subscription-event.spec.ts`
-   [Link](https://github.com/n1ru4l/envelop/blob/HEAD/packages/plugins/execute-subscription-event/test/use-extend-context-value-per-subscription-event.spec.ts#L71)

```ts
  69 |     pushValue({});
  70 |
> 71 |     for await (const value of result) {
     |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 72 |       expect(value.errors).toBeUndefined();
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 73 |       expect(value.data?.message).toEqual('hi');
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 74 |       expect(onEnd.mock.calls).toHaveLength(1);
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 75 |       return;
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 76 |     }
     | ^^^^^^
  77 |   });
  78 | });
  79 |
```
