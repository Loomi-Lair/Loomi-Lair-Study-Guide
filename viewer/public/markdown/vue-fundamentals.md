# Vue.js Fundamentals

## What is Vue.js?

Vue.js is a progressive JavaScript framework for building user interfaces.

## Core Concepts

### 1. Reactivity

Vue automatically tracks JavaScript state changes and updates the DOM.

```javascript
import { ref } from 'vue';

const count = ref(0);
// Accessing: count.value
// Updating: count.value++
```

### 2. Components

Components are reusable Vue instances with a name.

```vue
<script setup>
import { ref } from 'vue';

const message = ref('Hello Vue!');
</script>

<template>
  <div>{{ message }}</div>
</template>
```

### 3. Directives

Vue provides special attributes called directives:

- **v-bind**: Bind attribute or prop
- **v-if**: Conditional rendering
- **v-for**: List rendering
- **v-on**: Event handling
- **v-model**: Two-way binding

### Example: v-for

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

### Example: v-model

```vue
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>
```

## Component Communication

### Props (Parent to Child)

```vue
<script setup>
defineProps(['title', 'content']);
</script>

<template>
  <h2>{{ title }}</h2>
  <p>{{ content }}</p>
</template>
```

### Emits (Child to Parent)

```vue
<script setup>
const emit = defineEmits(['update']);

function handleClick() {
  emit('update', newValue);
}
</script>
```

## Lifecycle Hooks

```javascript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Component mounted!');
});

onUnmounted(() => {
  console.log('Component unmounted!');
});
```

## Computed Properties

```javascript
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);
```

## Best Practices

1. Use Composition API with `<script setup>`
2. Keep components small and focused
3. Use computed properties for derived state
4. Name components with PascalCase
5. Use props validation

---

*Build amazing apps with Vue!*
