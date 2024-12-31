#### App.tsx

`function handleSelectClick`

step 2b is not recommended
[React Docs](https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays:~:text=Updating%20objects%20inside%20arrays)

Don't do this:

```JS
// 2a. create new array
const newScore = [...history];

// 2b. mutate new array at index - add value "X" or "O"
newScore[index] = activeSymbol;
```

No mutation:

```JS
// 2. create new array, add value at index i
const newScore = history.map((item, i) => {
  if (index === i) {
    return activeSymbol
    } else {
      return item;
      }
    });
```
