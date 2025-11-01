# 🏛️ Architecture Overview

## 📊 Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Vue Application                     │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │   Pages      │  │  Components  │  │  Layouts   │  │  │
│  │  │  (Views)     │  │              │  │            │  │  │
│  │  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │  │
│  │         │                 │                 │         │  │
│  │         └─────────┬───────┴─────────────────┘         │  │
│  │                   │                                    │  │
│  │         ┌─────────▼──────────────────┐                │  │
│  │         │     Composables            │                │  │
│  │         │  (Reusable Logic)          │                │  │
│  │         │  - useBoard                │                │  │
│  │         │  - useColumn               │                │  │
│  │         │  - useTask                 │                │  │
│  │         └─────────┬──────────────────┘                │  │
│  │                   │                                    │  │
│  │         ┌─────────▼──────────────────┐                │  │
│  │         │      API Layer             │                │  │
│  │         │  (HTTP Calls)              │                │  │
│  │         │  - BoardAPI                │                │  │
│  │         │  - ColumnAPI               │                │  │
│  │         │  - TaskAPI                 │                │  │
│  │         └─────────┬──────────────────┘                │  │
│  │                   │                                    │  │
│  └───────────────────┼────────────────────────────────────┘  │
│                      │                                       │
└──────────────────────┼───────────────────────────────────────┘
                       │
                       │ HTTP/HTTPS
                       │
              ┌────────▼─────────┐
              │   Backend API    │
              │  (Go Services)   │
              └──────────────────┘
```

---

## 🔄 Data Flow

### 📥 Loading Data (GET)

```
User Action
   │
   ▼
┌──────────────┐
│  Page/View   │ → User clicks "View Board"
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Composable   │ → fetchColumns()
│ useColumn    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  API Layer   │ → BoardAPI.getBoardByID()
│  board.js    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Axios       │ → GET /api/v1/boards/123
│  Interceptor │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │ → Returns board with columns & members
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Composable   │ → Updates reactive state
│ columns.value│ → columns.value = res.columns
│ members.value│ → boardMembers.value = res.members
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   UI Updates │ → Vue reactivity re-renders
└──────────────┘
```

### 📤 Creating Data (POST)

```
User Action
   │
   ▼
┌──────────────┐
│  Component   │ → User fills form, clicks "Create"
│  AddTaskModal│
└──────┬───────┘
       │
       │ emit('submit', formData)
       ▼
┌──────────────┐
│  Page/View   │ → handleCreateTask(formData)
│  BoardView   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  API Layer   │ → TaskAPI.createTask(payload)
│  task.js     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Axios       │ → POST /api/v1/tasks
│  Interceptor │ → Auto add Bearer token
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │ → Creates task, returns new task object
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Page/View   │ → Adds task to column.tasks array
│              │ → Closes modal
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Toast       │ → Shows success message
│  UI Updates  │ → Re-renders with new task
└──────────────┘
```

---

## 🎨 Component Hierarchy

```
App.vue
├── Header (common)
├── SideBar (common)
│   ├── Tooltip (base) - for board names
│   ├── EditBoardModal (features/board)
│   └── ConfirmModal (common) - for delete
│
└── Router View (pages)
    │
    ├── Home.vue
    │
    └── BoardView.vue
        ├── Tooltip (base) - for column names
        ├── AddColumnModal (features/column)
        │   ├── BaseInput (base)
        │   └── BaseButton (base)
        │
        ├── EditColumnModal (features/column)
        │   ├── BaseInput (base)
        │   └── BaseButton (base)
        │
        ├── AddTaskModal (features/task)
        │   ├── BaseInput (base)
        │   ├── BaseButton (base)
        │   └── Member Dropdown (if members exist)
        │
        └── ConfirmModal (common)
            └── BaseButton (base)
```

---

## 🔌 Dependency Graph

```
Pages
  │
  ├─→ Composables (useBoard, useColumn, useTask)
  │     │
  │     └─→ API Layer (BoardAPI, ColumnAPI, TaskAPI)
  │           │
  │           └─→ Axios (index.js with interceptors)
  │
  ├─→ Components
  │     ├─→ Base (BaseButton, BaseInput)
  │     ├─→ Common (Header, SideBar, ConfirmModal)
  │     └─→ Features (Modals)
  │
  └─→ Constants & Utils
        ├─→ constants/index.js
        ├─→ constants/routes.js
        └─→ utils/helpers.js
```

---

## 🎯 Separation of Concerns

### Layer Responsibilities

| Layer | Responsibility | Examples |
|-------|----------------|----------|
| **Pages** | Orchestrate components, handle routing | BoardView.vue, Home.vue |
| **Components** | Display UI, emit events | AddTaskModal, BaseButton |
| **Composables** | Business logic, state management | useBoard, useColumn |
| **API** | HTTP calls only | BoardAPI.create() |
| **Utils** | Pure functions, no Vue reactivity | formatDate() |
| **Constants** | Configuration, magic values | BOARD_COLORS |

### Rules

1. **Pages** không gọi API trực tiếp → Dùng composables
2. **Components** không có business logic → Logic vào composables
3. **Composables** không render UI → Chỉ logic
4. **API layer** không có state → Chỉ HTTP calls

---

## 🔐 Authentication Flow

```
┌─────────────┐
│ User visits │
│   /home     │
└──────┬──────┘
       │
       ▼
┌────────────────┐
│ Router Guard   │ → beforeEach
└──────┬─────────┘
       │
       ▼
   Has token?
       │
    ┌──┴──┐
    │     │
   NO    YES
    │     │
    ▼     ▼
┌────────┐ ┌─────────┐
│Redirect│ │ Allow   │
│ /login │ │ Access  │
└────────┘ └─────────┘
```

---

## 📦 State Management

### Global State (store/)
- `user.js` - Current user info

### Local State (Composables)
- `useBoard` - Boards list
- `useColumn` - Columns & members
- `useTask` - Tasks

### Component State (ref/reactive)
- Modal visibility
- Form data
- UI states

---

## 🎓 Best Practices Applied

### 1. Single Responsibility Principle
Mỗi file/function có 1 trách nhiệm duy nhất.

### 2. DRY (Don't Repeat Yourself)
- Base components tái sử dụng
- Composables cho logic chung
- Constants cho values chung

### 3. Clear Naming
- Components: PascalCase (BoardView)
- Composables: camelCase (useBoard)
- Files: kebab-case (board-view.vue) hoặc PascalCase

### 4. Documentation
- JSDoc cho functions
- README cho từng module
- Comments cho logic phức tạp

---

## 🚦 Error Handling Flow

```
API Call
   │
   ▼
Try/Catch in Composable
   │
   ├─→ Success → Update state
   │
   └─→ Error
       │
       ├─→ Log to console
       ├─→ Set error state
       ├─→ Show toast (from interceptor)
       └─→ Throw error (if needed in component)
```

---

## 📱 Responsive Design

```
Mobile (< 768px)
├── Sidebar: Hidden by default, toggle button
├── Columns: Horizontal scroll
└── Modals: Full width

Desktop (≥ 768px)
├── Sidebar: Always visible
├── Columns: Horizontal scroll with better spacing
└── Modals: Fixed width, centered
```

---

## 🎉 Summary

Kiến trúc mới:
- ✅ **Modular** - Mỗi phần độc lập
- ✅ **Scalable** - Dễ thêm features
- ✅ **Maintainable** - Dễ bảo trì
- ✅ **Testable** - Logic tách biệt
- ✅ **Beginner-friendly** - Rõ ràng, có documentation

**Xem thêm chi tiết trong STRUCTURE.md và REFACTORING_GUIDE.md**

