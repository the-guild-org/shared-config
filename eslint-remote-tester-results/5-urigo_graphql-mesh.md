## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `urigo/graphql-mesh/packages/loaders/openapi/tests/example_api7.test.ts`
-   [Link](https://github.com/urigo/graphql-mesh/blob/HEAD/packages/loaders/openapi/tests/example_api7.test.ts#L116)

```ts
  114 |     });
  115 |
> 116 |     for await (const chunk of response.body) {
      |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 117 |       const data = Buffer.from(chunk).toString('utf-8');
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 118 |       expect(data.trim()).toBe(
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 119 |         `data: ${JSON.stringify({
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 120 |           data: {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 121 |             devicesEventListener: {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 122 |               name: deviceName,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 123 |               status: false,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 124 |             },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 125 |           },
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 126 |         })}`
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 127 |       );
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 128 |       break;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 129 |     }
      | ^^^^^^
  130 |
  131 |     abortCtrl.abort();
  132 |   });
```

## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `urigo/graphql-mesh/packages/loaders/soap/src/SOAPLoader.ts`
-   [Link](https://github.com/urigo/graphql-mesh/blob/HEAD/packages/loaders/soap/src/SOAPLoader.ts#L602)

```ts
  600 |                   } else if (elementObj.simpleType) {
  601 |                     // eslint-disable-next-line no-unreachable-loop
> 602 |                     for (const simpleTypeObj of elementObj.simpleType) {
      |                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 603 |                       // Dynamically defined simple type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 604 |                       // So we need to define alias map for this type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 605 |                       this.aliasMap.set(simpleTypeObj, aliasMap);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 606 |                       // Inherit the name from elementObj
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 607 |                       simpleTypeObj.attributes = simpleTypeObj.attributes || ({} as any);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 608 |                       simpleTypeObj.attributes.name = simpleTypeObj.attributes.name || elementObj.attributes.name;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 609 |                       let finalTC: AnyTypeComposer<any> = this.getTypeForSimpleType(
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 610 |                         simpleTypeObj,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 611 |                         complexTypeNamespace
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 612 |                       );
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 613 |                       if (isPlural) {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 614 |                         finalTC = finalTC.getTypePlural();
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 615 |                       }
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 616 |                       if (!isNullable) {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 617 |                         finalTC = finalTC.getTypeNonNull();
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 618 |                       }
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 619 |                       return finalTC;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 620 |                     }
      | ^^^^^^^^^^^^^^^^^^^^^^
  621 |                   } else if (elementObj.complexType) {
  622 |                     // eslint-disable-next-line no-unreachable-loop
  623 |                     for (const complexTypeObj of elementObj.complexType) {
```

## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `urigo/graphql-mesh/packages/loaders/soap/src/SOAPLoader.ts`
-   [Link](https://github.com/urigo/graphql-mesh/blob/HEAD/packages/loaders/soap/src/SOAPLoader.ts#L623)

```ts
  621 |                   } else if (elementObj.complexType) {
  622 |                     // eslint-disable-next-line no-unreachable-loop
> 623 |                     for (const complexTypeObj of elementObj.complexType) {
      |                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 624 |                       // Dynamically defined type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 625 |                       // So we need to define alias map for this type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 626 |                       this.aliasMap.set(complexTypeObj, aliasMap);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 627 |                       // Inherit the name from elementObj
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 628 |                       complexTypeObj.attributes = complexTypeObj.attributes || ({} as any);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 629 |                       complexTypeObj.attributes.name = complexTypeObj.attributes.name || elementObj.attributes.name;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 630 |                       let finalTC: AnyTypeComposer<any> = this.getInputTypeForComplexType(
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 631 |                         complexTypeObj,
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 632 |                         complexTypeNamespace
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 633 |                       );
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 634 |                       if (isPlural) {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 635 |                         finalTC = finalTC.getTypePlural();
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 636 |                       }
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 637 |                       if (!isNullable) {
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 638 |                         finalTC = finalTC.getTypeNonNull();
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 639 |                       }
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 640 |                       return finalTC;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 641 |                     }
      | ^^^^^^^^^^^^^^^^^^^^^^
  642 |                   }
  643 |                   throw new Error(`Invalid element type definition: ${complexTypeName}->${fieldName}`);
  644 |                 },
```

## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `urigo/graphql-mesh/packages/loaders/soap/src/SOAPLoader.ts`
-   [Link](https://github.com/urigo/graphql-mesh/blob/HEAD/packages/loaders/soap/src/SOAPLoader.ts#L746)

```ts
  744 |     } else if (elementObj.simpleType) {
  745 |       // eslint-disable-next-line no-unreachable-loop
> 746 |       for (const simpleTypeObj of elementObj.simpleType) {
      |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 747 |         // Dynamically defined simple type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 748 |         // So we need to define alias map for this type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 749 |         this.aliasMap.set(simpleTypeObj, aliasMap);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 750 |         // Inherit the name from elementObj
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 751 |         simpleTypeObj.attributes = simpleTypeObj.attributes || ({} as any);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 752 |         simpleTypeObj.attributes.name = simpleTypeObj.attributes.name || elementObj.attributes.name;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 753 |         const outputTC = this.getTypeForSimpleType(simpleTypeObj, namespace);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 754 |         return outputTC;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 755 |       }
      | ^^^^^^^^
  756 |     } else if (elementObj.complexType) {
  757 |       // eslint-disable-next-line no-unreachable-loop
  758 |       for (const complexTypeObj of elementObj.complexType) {
```

## Rule: no-unreachable-loop

-   Message: `Invalid loop. Its body allows only one iteration.`
-   Path: `urigo/graphql-mesh/packages/loaders/soap/src/SOAPLoader.ts`
-   [Link](https://github.com/urigo/graphql-mesh/blob/HEAD/packages/loaders/soap/src/SOAPLoader.ts#L758)

```ts
  756 |     } else if (elementObj.complexType) {
  757 |       // eslint-disable-next-line no-unreachable-loop
> 758 |       for (const complexTypeObj of elementObj.complexType) {
      |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 759 |         // Dynamically defined type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 760 |         // So we need to define alias map for this type
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 761 |         this.aliasMap.set(complexTypeObj, aliasMap);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 762 |         // Inherit the name from elementObj
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 763 |         complexTypeObj.attributes = complexTypeObj.attributes || ({} as any);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 764 |         complexTypeObj.attributes.name = complexTypeObj.attributes.name || elementObj.attributes.name;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 765 |         const outputTC = this.getOutputTypeForComplexType(complexTypeObj, namespace);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 766 |         return outputTC;
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 767 |       }
      | ^^^^^^^^
  768 |     }
  769 |     throw new Error(`Invalid element type definition: ${elementObj.attributes.name}`);
  770 |   }
```
