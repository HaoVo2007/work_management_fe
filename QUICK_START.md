# ⚡ Quick Start Guide

## 📁 Cấu trúc thư mục đã được tổ chức lại

### Tổng quan nhanh

```
src/
├── components/
│   ├── base/           ← 🧱 Components UI cơ bản (Button, Input, Tooltip)
│   ├── common/         ← 🌐 Components dùng chung (Header, Sidebar, Modal)
│   └── features/       ← 🎨 Components theo tính năng
│       ├── board/      ← Board modals
│       ├── column/     ← Column modals
│       └── task/       ← Task modals
│
├── composables/        ← 🔄 Logic tái sử dụng (useBoard, useColumn, useTask)
├── api/                ← 📡 API calls
├── constants/          ← 📝 Constants (colors, icons, endpoints)
├── utils/              ← 🛠️ Utility functions
└── pages/              ← 📄 Page components
```

---

## 🚀 Import Paths Mới

### ❌ Cũ (Không dùng nữa)
```javascript
import BaseButton from '@/components/BaseButton.vue'
import AddColumnModal from '@/components/AddColumnModal.vue'
```

### ✅ Mới (Sử dụng paths mới)
```javascript
// Base components
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import Tooltip from '@/components/base/Tooltip.vue'

// Common components
import Header from '@/components/common/Header.vue'
import SideBar from '@/components/common/SideBar.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

// Feature components
import BoardCreateModal from '@/components/features/board/BoardCreateModal.vue'
import AddColumnModal from '@/components/features/column/AddColumnModal.vue'
import AddTaskModal from '@/components/features/task/AddTaskModal.vue'
```

### 🎯 Hoặc dùng named imports (khuyến nghị)
```javascript
// Import từ index.js
import { BaseButton, BaseInput, Tooltip } from '@/components/base'
import { Header, SideBar, ConfirmModal } from '@/components/common'
```

---

## 📝 Quy tắc đơn giản

### Khi tạo component mới, hỏi:

1. **Component này có thể dùng ở nhiều nơi không?**
   - Có → Đặt vào `components/base/`
   - Ví dụ: BaseCard, BaseModal, BaseBadge

2. **Component này dùng chung trong toàn app?**
   - Có → Đặt vào `components/common/`
   - Ví dụ: Navbar, Footer, Notification

3. **Component này specific cho 1 tính năng?**
   - Có → Đặt vào `components/features/[tên-tính-năng]/`
   - Ví dụ: AddTaskModal → `features/task/`

### Khi thêm logic mới, hỏi:

1. **Logic này cần Vue reactivity?**
   - Có → Tạo composable trong `composables/`
   - Ví dụ: useComment.js

2. **Logic này là pure function?**
   - Có → Thêm vào `utils/helpers.js`
   - Ví dụ: formatDate(), validateEmail()

3. **Đây là constant/config?**
   - Có → Thêm vào `constants/`
   - Ví dụ: COLORS, PRIORITIES

---

## 🎯 Common Tasks

### Thêm tính năng "Comments"

**1. Tạo API**
```javascript
// src/api/comment.js
import api from './index'

export const CommentAPI = {
  async create(payload) {
    const res = await api.post('/comments', payload)
    return res.data
  }
}
```

**2. Tạo Composable**
```javascript
// src/composables/useComment.js
import { ref } from 'vue'
import { CommentAPI } from '../api/comment'

export function useComment(taskId) {
  const comments = ref([])
  const loading = ref(false)
  
  const createComment = async (form) => {
    const comment = await CommentAPI.create(form)
    comments.value.push(comment)
  }
  
  return { comments, loading, createComment }
}
```

**3. Tạo Component**
```vue
<!-- src/components/features/comment/AddCommentModal.vue -->
<script setup>
import { BaseInput, BaseButton } from '@/components/base'

const emit = defineEmits(['submit', 'close'])
// ...
</script>
```

---

## 🎨 UI Components Guide

### BaseButton Variants
```vue
<BaseButton variant="primary">Save</BaseButton>
<BaseButton variant="secondary">Cancel</BaseButton>
<BaseButton variant="danger">Delete</BaseButton>
<BaseButton variant="success">Approve</BaseButton>
```

### BaseInput
```vue
<BaseInput 
  v-model="name"
  label="Name"
  placeholder="Enter name"
/>
```

### Tooltip
```vue
<Tooltip text="Full name here">
  <div class="truncate">{{ name }}</div>
</Tooltip>
```

### ConfirmModal
```vue
<ConfirmModal
  :show="showConfirm"
  title="Delete Item"
  message="Are you sure?"
  type="danger"
  @confirm="handleDelete"
  @cancel="close"
/>
```

---

## 🔧 Development Tips

### 1. Always use absolute imports
```javascript
// ✅ Good
import { useBoard } from '@/composables/useBoard'

// ❌ Avoid
import { useBoard } from '../../../composables/useBoard'
```

### 2. Use constants
```javascript
// ✅ Good
import { BOARD_COLORS } from '@/constants'
const color = BOARD_COLORS[0]

// ❌ Avoid
const color = "#579DFF"
```

### 3. Use composables for logic
```javascript
// ✅ Good - In component
const { boards, fetchBoards } = useBoard()

// ❌ Avoid - Direct API calls in component
const boards = await BoardAPI.getMyBoards()
```

---

## 📖 Learning Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🆘 Need Help?

1. **Đọc STRUCTURE.md** - Hiểu cấu trúc tổng thể
2. **Đọc REFACTORING_GUIDE.md** - Hướng dẫn chi tiết cho người mới
3. **Xem code examples** - Trong src/pages/BoardView.vue
4. **Check README files** - Trong api/, composables/

---

## ✅ Checklist cho người mới

- [ ] Đọc STRUCTURE.md
- [ ] Hiểu folder structure (base/common/features)
- [ ] Học cách dùng composables
- [ ] Tạo component mới theo structure
- [ ] Import đúng paths mới
- [ ] Sử dụng constants thay vì hardcode

---

**Happy Coding! 🚀**

