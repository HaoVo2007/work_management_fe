# Work Management Frontend

A modern Vue.js 3 application for managing boards, columns, and tasks with a clean, reusable architecture.

## 📁 Project Structure

```
src/
├── api/              # API calls organized by feature
│   ├── board.js
│   ├── column.js
│   ├── task.js
│   └── index.js      # Axios instance with interceptors
│
├── components/       # Vue components
│   ├── base/         # Reusable UI components (BaseButton, BaseInput)
│   └── features/     # Feature-specific components (modals, cards)
│
├── composables/      # Vue composables for reusable logic
│   ├── useBoard.js
│   ├── useColumn.js
│   └── useTask.js
│
├── constants/        # Constants and configuration
│   ├── index.js      # App constants (colors, icons, defaults)
│   └── routes.js     # API endpoints and route names
│
├── pages/            # Page components
│   ├── auth/
│   ├── BoardView.vue
│   └── Home.vue
│
├── router/           # Vue Router configuration
├── utils/            # Utility functions
└── plugins/          # Vue plugins (toast, etc.)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📚 Key Concepts for Vue Beginners

### 1. Composables (`composables/`)
Composables are reusable functions that contain Vue reactivity logic.

**Example:**
```javascript
import { useBoard } from '@/composables/useBoard'

const { boards, loading, fetchBoards } = useBoard()
```

**Why use composables?**
- Reusable logic across components
- Organized code
- Easy to test

### 2. API Layer (`api/`)
Centralized API calls organized by feature.

**Example:**
```javascript
import { BoardAPI } from '@/api/board'

const boards = await BoardAPI.getMyBoards()
```

**Benefits:**
- Single source of truth for API calls
- Easy to update endpoints
- Consistent error handling

### 3. Constants (`constants/`)
Centralized constants prevent magic strings/numbers.

**Example:**
```javascript
import { BOARD_COLORS, DEFAULTS } from '@/constants'

const color = DEFAULTS.BOARD_COLOR
```

**Why?**
- Avoid typos
- Easy to change values
- Self-documenting code

### 4. Components Structure

#### Base Components
Reusable UI components that can be used anywhere:
- `BaseButton.vue` - Button with variants (primary, secondary, danger)
- `BaseInput.vue` - Input field with consistent styling

#### Feature Components
Components specific to features:
- `AddColumnModal.vue` - Modal for adding columns
- `BoardCreateModal.vue` - Modal for creating boards

## 🎯 Common Patterns

### Using a Composable

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useColumn } from '@/composables/useColumn'

const boardId = ref('123')
const { columns, loading, fetchColumns, createColumn } = useColumn(boardId)

onMounted(() => {
  fetchColumns()
})

const handleCreate = async (form) => {
  await createColumn(form)
}
</script>
```

### Making API Calls

```vue
<script setup>
import { TaskAPI } from '@/api/task'

const createTask = async (data) => {
  try {
    const task = await TaskAPI.createTask(data)
    console.log('Created:', task)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
```

### Using Constants

```vue
<script setup>
import { BOARD_COLORS, DEFAULTS } from '@/constants'

const selectedColor = ref(DEFAULTS.BOARD_COLOR)
</script>

<template>
  <div v-for="color in BOARD_COLORS" :key="color">
    {{ color }}
  </div>
</template>
```

## 🛠️ Development Guidelines

### 1. Component Naming
- PascalCase for components: `AddColumnModal.vue`
- camelCase for composables: `useBoard.js`

### 2. File Organization
- Keep related files together
- One component per file
- Export composables as named exports

### 3. Props and Emits
Always define props and emits explicitly:

```vue
<script setup>
const props = defineProps({
  boardId: { type: String, required: true }
})

const emit = defineEmits(['submit', 'close'])
</script>
```

### 4. Error Handling
Always handle errors in async operations:

```javascript
try {
  await someAsyncOperation()
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
}
```

## 📖 Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router](https://router.vuejs.org/)
- [Composables Pattern](https://vuejs.org/guide/reusability/composables.html)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Code Style

- Use Composition API (`<script setup>`)
- Use TypeScript-style JSDoc comments
- Follow Vue style guide
- Use Tailwind CSS for styling

## 🤝 Contributing

1. Create feature branches
2. Follow the project structure
3. Add JSDoc comments for functions
4. Test your changes

## 📄 License

MIT

