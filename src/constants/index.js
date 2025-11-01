/**
 * Board Colors - Predefined color palette for boards
 */
export const BOARD_COLORS = [
  "#579DFF", "#6E59A5", "#E56B6F",
  "#F0A04B", "#34A0A4", "#57CC99",
  "#3A86FF", "#FFB703", "#FF6D00",
  "#6A4C93", "#0081A7", "#2A9D8F"
]

/**
 * Board Icons - Available icons for boards
 */
export const BOARD_ICONS = [
  { id: "dev", emoji: "💻", name: "IT / Development" },
  { id: "marketing", emoji: "📢", name: "Marketing" },
  { id: "sales", emoji: "💰", name: "Sales" },
  { id: "design", emoji: "🎨", name: "Design" },
  { id: "product", emoji: "📦", name: "Product" },
  { id: "support", emoji: "🎧", name: "Customer Support" },
  { id: "hr", emoji: "🧑‍💼", name: "Human Resource" },
  { id: "meeting", emoji: "📅", name: "Meetings" },
  { id: "finance", emoji: "📊", name: "Finance" },
  { id: "strategy", emoji: "🎯", name: "Strategy" },
]

/**
 * Default values
 */
export const DEFAULTS = {
  BOARD_COLOR: "#579DFF",
  BOARD_ICON: "💻",
  COLUMN_COLOR: "#579DFF",
  TASK_PRIORITY: 3,
}

/**
 * Priority levels for tasks
 */
export const TASK_PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  NORMAL: 3,
  HIGH: 4,
  URGENT: 5,
}

/**
 * Priority labels
 */
export const PRIORITY_LABELS = {
  1: "Low",
  2: "Medium",
  3: "Normal",
  4: "High",
  5: "Urgent",
}

