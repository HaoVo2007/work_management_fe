# 📁 Cấu trúc thư mục Work Management Frontend

## 🎯 Tổng quan

Cấu trúc thư mục được tổ chức theo nguyên tắc **Feature-based** và **Separation of Concerns** để dễ dàng bảo trì, mở rộng và phù hợp với người mới học Vue.

```
src/
├── api/                    # API calls - Tầng giao tiếp với backend
│   ├── index.js           # Axios instance với interceptors
│   ├── auth.js            # Auth API endpoints
│   ├── board.js           # Board API endpoints
│   ├── column.js          # Column API endpoints
│   └── task.js            # Task API endpoints
│
├── assets/                 # Static assets
│   ├── main.css           # Global styles
│   └── vue.svg            # Images/icons
│
├── components/             # Vue Components (tổ chức theo mục đích)
│   ├── base/              # 🧱 Base components - Reusable UI components
│   │   ├── BaseButton.vue # Button với nhiều variants
│   │   ├── BaseInput.vue  # Input field chuẩn
│   │   └── Tooltip.vue    # Tooltip component
│   │
│   ├── common/            # 🌐 Common components - Shared across app
│   │   ├── Header.vue     # App header
│   │   ├── SideBar.vue    # App sidebar
│   │   └── ConfirmModal.vue # Confirmation modal
│   │
│   └── features/          # 🎨 Feature-specific components
│       ├── board/         # Board-related components
│       │   ├── BoardCreateModal.vue
│       │   └── EditBoardColumnModal.vue
│       │
│       ├── column/        # Column-related components
│       │   ├── AddColumnModal.vue
│       │   └── EditColumnModal.vue
│       │
│       └── task/          # Task-related components
│           └── AddTaskModal.vue
│
├── composables/            # 🔄 Vue Composables - Reusable logic
│   ├── useAuth.js         # Authentication logic
│   ├── useBoard.js        # Board management logic
│   ├── useColumn.js       # Column management logic
│   └── useTask.js         # Task management logic
│
├── constants/              # 📝 Constants & Config
│   ├── index.js           # App constants (colors, icons, defaults)
│   └── routes.js          # API endpoints & route names
│
├── configs/                # ⚙️ Configuration files
│   └── env.js             # Environment variables
│
├── layouts/                # 📐 Layout components
│   └── AuthLayout.vue     # Auth page layout
│
├── pages/                  # 📄 Page components (Vue Router views)
│   ├── auth/              # Auth pages
│   │   ├── Login.vue
│   │   └── Register.vue
│   ├── BoardView.vue      # Board detail page
│   └── Home.vue           # Home page
│
├── plugins/                # 🔌 Vue plugins
│   └── toast.js           # Toast notification plugin
│
├── router/                 # 🛣️ Vue Router
│   └── index.js           # Route definitions & navigation guards
│
├── store/                  # 💾 State management
│   └── user.js            # User state
│
├── utils/                  # 🛠️ Utility functions
│   └── helpers.js         # Helper functions (date, validation, etc)
│
├── App.vue                 # Root component
├── main.js                 # App entry point
└── style.css               # Global styles

```

## 📖 Chi tiết từng thư mục

### 🧱 `components/base/`
**Mục đích**: Components UI cơ bản, có thể tái sử dụng ở bất kỳ đâu

- `BaseButton.vue` - Button với variants: primary, secondary, danger, success
- `BaseInput.vue` - Input field với styling nhất quán
- `Tooltip.vue` - Tooltip hiển thị khi hover

**Khi nào tạo base component?**
- Component được dùng ở nhiều nơi
- Component không liên quan đến business logic
- Component chỉ nhận props và emit events

**Ví dụ sử dụng:**
```vue
<BaseButton variant="primary">Click me</BaseButton>
<BaseInput v-model="name" label="Name" />
```

### 🌐 `components/common/`
**Mục đích**: Components được share across toàn bộ app nhưng có business logic

- `Header.vue` - App header/navbar
- `SideBar.vue` - App sidebar với board list
- `ConfirmModal.vue` - Modal xác nhận hành động

**Khác biệt với base:**
- Có thể chứa business logic
- Thường kết nối với store/composables
- Specific hơn cho app này

### 🎨 `components/features/`
**Mục đích**: Components theo từng tính năng (feature-based organization)

#### `features/board/`
- Components liên quan đến Board
- Ví dụ: Create, Edit, Delete board

#### `features/column/`
- Components liên quan đến Column
- Ví dụ: Add, Edit column

#### `features/task/`
- Components liên quan đến Task
- Ví dụ: Add, Edit, Delete task

**Lợi ích:**
- Dễ tìm component theo tính năng
- Dễ thêm tính năng mới
- Team có thể làm việc parallel trên các features khác nhau

### 🔄 `composables/`
**Mục đích**: Reusable logic với Vue reactivity

Mỗi composable quản lý một domain cụ thể:
- `useAuth.js` - Login, logout, register
- `useBoard.js` - CRUD boards
- `useColumn.js` - CRUD columns + board members
- `useTask.js` - CRUD tasks

**Pattern:**
```javascript
export function useBoard() {
  const boards = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchBoards = async () => { /*...*/ }
  const createBoard = async (form) => { /*...*/ }
  
  return { boards, loading, error, fetchBoards, createBoard }
}
```

### 📝 `constants/`
**Mục đích**: Centralize magic strings/numbers

- `index.js` - Colors, icons, defaults, priorities
- `routes.js` - API endpoints, route names, storage keys

**Lợi ích:**
- Tránh typo
- Dễ thay đổi giá trị
- Self-documenting code

### 📄 `pages/`
**Mục đích**: Page-level components (Vue Router views)

Tổ chức theo feature/module:
- `auth/` - Auth pages (Login, Register)
- `BoardView.vue` - Board detail page
- `Home.vue` - Home/dashboard page

**Best practice:**
- Keep pages thin (logic → composables)
- Pages chỉ orchestrate components
- Business logic ở composables

### 🛠️ `utils/`
**Mục đích**: Pure utility functions (không có Vue reactivity)

Ví dụ:
- Date formatting
- Validation
- String manipulation
- Debounce, throttle

## 🚀 Migration & Import Paths

### Trước khi refactor:
```javascript
import BaseButton from '@/components/BaseButton.vue'
import AddColumnModal from '@/components/AddColumnModal.vue'
```

### Sau khi refactor:
```javascript
import BaseButton from '@/components/base/BaseButton.vue'
import AddColumnModal from '@/components/features/column/AddColumnModal.vue'
```

## 📚 Best Practices

### 1. Component Naming
- Base components: `Base*.vue` (BaseButton, BaseInput)
- Feature components: `Feature*.vue` hoặc descriptive names
- Page components: PascalCase (BoardView, Home)

### 2. File Organization
- **1 component = 1 file**
- Group by feature, not by type
- Keep related files close together

### 3. Import Conventions
- Always use `@/` alias cho absolute imports
- Import từ specific paths, không import all

### 4. Folder Rules
- `base/` - No business logic, highly reusable
- `common/` - Shared but can have logic
- `features/` - Feature-specific, can import from base/common

## 🎓 Hướng dẫn cho người mới

### Tôi muốn tạo component mới, đặt ở đâu?

**Hỏi 3 câu:**
1. **Component có reusable không?** → `base/`
2. **Component dùng chung trong app?** → `common/`
3. **Component specific cho 1 feature?** → `features/[feature-name]/`

### Tôi muốn thêm logic mới, đặt ở đâu?

**Hỏi:**
1. **Logic có Vue reactivity không?** → `composables/`
2. **Logic là pure function?** → `utils/`
3. **Logic là constant/config?** → `constants/`

### Ví dụ thực tế

**Tạo feature "Comments":**
```
components/features/comment/
├── AddCommentModal.vue
├── CommentCard.vue
└── CommentList.vue

composables/
└── useComment.js

api/
└── comment.js
```

## ✅ Lợi ích của cấu trúc mới

1. **Rõ ràng** - Dễ tìm file theo tính năng
2. **Scalable** - Dễ thêm features mới
3. **Maintainable** - Logic tách biệt rõ ràng
4. **Team-friendly** - Nhiều người làm việc song song
5. **Beginner-friendly** - Cấu trúc dễ hiểu, có quy tắc rõ ràng

## 🔧 Quick Reference

| Loại file | Đặt ở đâu | Ví dụ |
|-----------|-----------|-------|
| UI component tái sử dụng | `components/base/` | BaseButton, BaseInput |
| Shared component | `components/common/` | Header, Sidebar |
| Feature component | `components/features/[feature]/` | AddTaskModal |
| Page | `pages/` | BoardView.vue |
| Composable | `composables/` | useBoard.js |
| API call | `api/` | board.js |
| Utility function | `utils/` | helpers.js |
| Constant | `constants/` | index.js |

