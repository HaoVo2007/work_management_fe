/**
 * Utility functions for common operations
 */

/**
 * Format date to YYYY-MM-DD format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDateReadable(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Check if a string is a valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result with errors
 */
export function validateForm(data, rules) {
  const errors = {}
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.message || `${field} is required`
      continue
    }
    
    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`
      continue
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = rule.message || `${field} must be at most ${rule.maxLength} characters`
      continue
    }
    
    if (value && rule.email && !isValidEmail(value)) {
      errors[field] = rule.message || `${field} must be a valid email`
      continue
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Generate unique ID (fallback if crypto.randomUUID not available)
 * @returns {string} Unique ID
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 50) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

