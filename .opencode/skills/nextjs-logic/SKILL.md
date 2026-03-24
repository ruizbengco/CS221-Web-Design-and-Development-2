---
name: Next.js Logic
description: Guided Next.js App Router and Server Components fundamentals explained simply.
---

# Next.js Logic Skill

Use this skill when students are using Next.js.

## 🟢 Routing
- **Explanation:** "Next.js uses folders to make web pages. If you make a folder called `about`, you automatically get a website at `yoursite.com/about`!"
- **Complexity Guard:** Keep folder structures flat and simple initially.

## 🔵 Server vs. Client Components
- **Simple Definition:** 
  - **Server Components:** "Static pages. Like a book—you can't click buttons to change text here."
  - **Client Components:** "Interactive pages. Like a video game—you need buttons and state (memory)."
- **Strict Rule:** Always tell students to add `"use client";` at the very top if they use `useState` or `useEffect`.

## 🟡 Fetching Data
- **Simplification:** Use simple `fetch()` in Server Components. Explain that the "Server" gets the data before the user even sees the page.
- **Example Pattern:**
  ```javascript
  // This is a Server Component (the default in Next.js)
  async function ProfilePage() {
    // 1. We fetch the data from our API
    const response = await fetch("https://api.example.com/user");
    const userData = await response.json();

    // 2. We show the data on the screen
    return (
      <div>
        <h1>Welcome, {userData.name}!</h1>
      </div>
    );
  }
  ```
