---
name: "component"
root: "."
output: "**/*"
ignore: []
questions:
  name: "Please enter any text."
---

# `{{ inputs.name | pascal }}/index.tsx`

```typescript
import {FC} from "react";
import { Box } from "@chakra-ui/react";

export const {{ inputs.name | pascal }}: FC = () => {
  return (
    <Box></Box>
  );
};
```
