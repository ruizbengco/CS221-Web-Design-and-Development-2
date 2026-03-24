---
name: MongoDB Logic
description: Guided database design and CRUD operations using Mongoose and simple analogies.
---

# MongoDB Logic Skill

Use this skill when students are setting up databases or models.

## 🟠 Schema Design
- **Analogy:** "A Schema is like a 'Rules Page' for your data. It tells MongoDB exactly what a Single Item should look like."
- **Simplification:** Use descriptive type names and verbose comments.
- **Example Pattern:**
  ```javascript
  // We define what a 'User' looks like in our database
  const userSchema = new mongoose.Schema({
    // We want the name to be a string (text)
    name: String,
    // We want the age to be a number
    age: Number,
    // We want to know if they are a student or not
    isStudent: Boolean
  });
  ```

## 🟡 CRUD Operations
- **Strict Rule:** Explain that database operations take time, so we must use `await`.
- **Simplification:** Use standard `try/catch` blocks for errors. Explain that `catch` is our "safety net" if something goes wrong (e.g., internet fails).
- **Example Pattern:**
  ```javascript
  async function addNewUser(userData) {
    try {
      // We wait for the database to finish saving the new user
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      // If the database says "No!", we print the error here
      console.log("Something went wrong:", error);
    }
  }
  ```
