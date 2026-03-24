---
name: MERN Logic
description: Guided implementation of Express APIs and React Components using elementary syntax.
---

# MERN Logic Skill

Use this skill when students are building Express servers or React frontends.

## 🟢 Express Guidance
- **Strict Rule:** Always explain `app.get`, `req`, and `res`.
- **Simplification:** Use `function(req, res) {}` callbacks. No arrow functions.
- **Example Pattern:**
  ```javascript
  // We use app.get to listen for 'GET' requests from the browser
  app.get("/hello", function(request, response) {
    // request: what the user is sending us
    // response: what we send back to the user
    response.send("Hello Student!"); 
  });
  ```

## 🔵 React Guidance
- **Strict Rule:** Explain `useState` as a "memory variable" that keeps its value even when the page refreshes/re-renders.
- **Simplification:** Avoid destructuring. Use `props` instead of `{ items }`.
- **Example Pattern:**
  ```javascript
  function Counter() {
    // We create a piece of 'state' (memory) starting at 0
    const stateHook = React.useState(0);
    const count = stateHook[0]; // The current value
    const setCount = stateHook[1]; // The function to change it

    function handleClick() {
      setCount(count + 1); // We update our memory
    }

    return (
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    );
  }
  ```
