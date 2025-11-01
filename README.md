# 🚀 Work Management Frontend

A modern, well-organized Vue 3 application for managing boards, columns, and tasks with a clean architecture.

## ✨ Features

- ✅ **Board Management** - Create, edit, delete boards with custom colors and icons
- ✅ **Column Management** - Organize work with customizable columns
- ✅ **Task Management** - Add tasks to columns with assignees and priorities
- ✅ **Member Management** - Assign tasks to board members
- ✅ **Modern UI** - Dark theme with smooth animations and tooltips
- ✅ **Responsive** - Works on desktop and mobile devices

## 🏗️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **Vue3-Toastify** - Toast notifications

## 📁 Project Structure

```
src/
├── api/              # API calls (board, column, task, auth)
├── components/       # Vue components
│   ├── base/        # Reusable UI components
│   ├── common/      # Shared app components
│   └── features/    # Feature-specific components
├── composables/      # Reusable Vue logic
├── constants/        # App constants & config
├── pages/            # Page components (router views)
├── router/           # Vue Router configuration
├── utils/            # Utility functions
├── plugins/          # Vue plugins
└── store/            # State management
```

📖 **Xem chi tiết**: [STRUCTURE.md](./STRUCTURE.md)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd work_management_fe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file:

```bash
VITE_API_URL=http://localhost:8080/api/v1/
```

## 📚 Documentation

- **[STRUCTURE.md](./STRUCTURE.md)** - Chi tiết cấu trúc thư mục
- **[REFACTORING_GUIDE.md](./REFACTORING_GUIDE.md)** - Hướng dẫn cho người mới học Vue
- **[REFACTORING_COMPLETE.md](./REFACTORING_COMPLETE.md)** - Tổng kết refactoring
- **[src/api/README.md](./src/api/README.md)** - API layer documentation
- **[src/composables/README.md](./src/composables/README.md)** - Composables guide

## 🎓 For Vue Beginners

### 1. Hiểu cấu trúc folder
Đọc [STRUCTURE.md](./STRUCTURE.md) để hiểu cách tổ chức code.

### 2. Học Composables
Composables là cách tái sử dụng logic trong Vue 3. Xem [src/composables/README.md](./src/composables/README.md).

### 3. Tạo component mới
Quy tắc đơn giản:
- Reusable UI → `components/base/`
- Shared component → `components/common/`
- Feature-specific → `components/features/[feature]/`

### 4. Thêm tính năng mới
1. Tạo API file: `api/feature.js`
2. Tạo composable: `composables/useFeature.js`
3. Tạo components: `components/features/feature/`
4. Sử dụng trong pages

## 🔑 Key Concepts

### Composables Pattern
```javascript
import { useBoard } from '@/composables/useBoard'

const { boards, loading, fetchBoards } = useBoard()
await fetchBoards()
```

### Constants Usage
```javascript
import { BOARD_COLORS, DEFAULTS } from '@/constants'

const color = DEFAULTS.BOARD_COLOR
```

### API Calls
```javascript
import { BoardAPI } from '@/api/board'

const boards = await BoardAPI.getMyBoards()
```

## 🎨 Component Examples

### Using Base Components
```vue
<BaseButton variant="primary">Save</BaseButton>
<BaseButton variant="secondary">Cancel</BaseButton>
<BaseInput v-model="name" label="Name" />
```

### Using Feature Components
```vue
<AddTaskModal 
  :board-id="boardId"
  :column-id="columnId"
  :members="members"
  @submit="handleCreate"
  @close="close"
/>
```

## 🛠️ Development Guidelines

1. **Use Composition API** (`<script setup>`)
2. **Add JSDoc comments** for functions
3. **Handle errors** in all async operations
4. **Use constants** instead of magic strings
5. **Keep components focused** - Single responsibility
6. **Organize imports** - External → Vue → Internal → Components

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎯 Code Quality

- ✅ No linter errors
- ✅ JSDoc comments throughout
- ✅ Consistent code style
- ✅ Organized file structure
- ✅ Reusable components and composables

## 🐛 Debugging Tips

### API not working?
Check `src/api/index.js` for base URL and interceptors.

### Component not found?
Check import path - components are now organized in subdirectories.

### State not updating?
Ensure you're using reactive values from composables.

## 🤝 Contributing

1. Follow the folder structure
2. Use existing patterns (composables, API layer)
3. Add JSDoc comments
4. Test your changes

## 📄 License

MIT

---

## 🎉 Recent Improvements

- ✅ Organized components into base/common/features
- ✅ Added comprehensive documentation
- ✅ Improved composables with error handling
- ✅ Created reusable Tooltip component
- ✅ Enhanced BaseButton with variants
- ✅ Centralized constants and configs
- ✅ Better API layer with JSDoc
- ✅ No toast spam on GET requests
- ✅ Member dropdown in Add Task modal
- ✅ Ellipsis + tooltip for long names

**Codebase hiện tại sạch, gọn, dễ maintain và perfect cho người mới học Vue! 🎓**
