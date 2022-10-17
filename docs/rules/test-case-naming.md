# Add validation for test names (`test-case-naming`)

This allow you to detect test cases in your project that follow a certain pattern and require that they meet a specific requirement

## Rule details

This rule gives you control over the usage of these keywords in your codebase.

## Options

This rule can be configured as follows

```json5
{
  type: "object",
  properties: {
    matches: {
      type: "array",
      items: {
        type: "object",
        properties: {
          match: {
            type: "string",
          },
          requirement: {
            type: "string",
          },
          violation: {
            type: "string",
          },
        },
      },
    },
    fn: {
      enum: ["test", "it"],
    },
  },
},
```

### matches

#### match

Provide a `RegExp` string that will select particular tests

#### requirement

For each found test case name, provide a `RegExp` string that validates that a given string requirement is met

#### violation

Message to display when violation is met

### fn

Decides whether to use `test` or `it`.

## Examples

### Ensure a flaky test has a specific annotation

```js
// .eslintrc.js
module.exports = {
  "test-name-cases": [
    "error",
    {
      matches: [
        {
          match: "flaky",
          requirement: "reason:",
          violation: "provide a reason for the failing test",
        },
      ],
    },
  ],
};

// valid
it("@flaky reason:Need to update this test - run things");

// invalid
it("@flaky run things");
```
