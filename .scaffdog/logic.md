---
name: "logic"
root: "."
output: "**/*"
ignore: []
questions:
  name: "Please enter the logic name."
---

# `{{ inputs.name | camel }}/useHandleReach.ts`

```typescript
export const {{ inputs.name | camel }} = (a: any, b: any): any => {
  return a + b;
}
```

# `{{ inputs.name | camel }}/index.test.ts`

```typescript
import { describe, expect, it } from 'vitest';
import {  {{ inputs.name | camel }} } from './index';

describe('{{ inputs.name | camel }}', () => {
  it('Add a logic explanation', () => {
    expect( {{ inputs.name | camel }}()).toBe();
  });
});
```
