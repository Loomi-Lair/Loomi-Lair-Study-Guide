# JavaScript Basics

## Introduction

JavaScript is a versatile programming language used for web development.

## Variables

JavaScript has three ways to declare variables:

### var
```javascript
var name = "John";
```

### let
```javascript
let age = 25;
```

### const
```javascript
const PI = 3.14159;
```

## Data Types

1. **String**: Text data
2. **Number**: Numeric values
3. **Boolean**: true or false
4. **Array**: Ordered list of values
5. **Object**: Key-value pairs
6. **Null**: Intentional absence of value
7. **Undefined**: Variable not assigned

## Functions

### Function Declaration
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Arrow Functions
```javascript
const greet = (name) => `Hello, ${name}!`;
```

## Arrays

```javascript
const fruits = ['apple', 'banana', 'orange'];

// Access elements
console.log(fruits[0]); // 'apple'

// Array methods
fruits.push('grape');
fruits.pop();
```

## Objects

```javascript
const person = {
  name: 'Alice',
  age: 30,
  greet: function() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
```

## Control Flow

### If Statement
```javascript
if (age >= 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}
```

### Loops
```javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```

## Tips

- Use `const` by default, `let` when reassignment is needed
- Avoid using `var` in modern JavaScript
- Use arrow functions for cleaner syntax
- Practice regularly to master the basics

---

*Keep coding!*
