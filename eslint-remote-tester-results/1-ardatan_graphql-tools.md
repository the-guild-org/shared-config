## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `ardatan/graphql-tools/packages/utils/src/stub.ts`
-   [Link](https://github.com/ardatan/graphql-tools/blob/HEAD/packages/utils/src/stub.ts#L67)

```ts
  65 |     const fields = type.getFields();
  66 |     // eslint-disable-next-line no-unreachable-loop
> 67 |     for (const fieldName in fields) {
     |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 68 |       const field = fields[fieldName];
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 69 |       return field.name === '_fake';
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 70 |     }
     | ^^^^^^
  71 |   }
  72 |
  73 |   return false;
```
