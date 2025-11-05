<template>
    <header class="sticky top-0 z-50 bg-[#1F2125] border-b border-[#2A2C31] shadow-md">
        <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-14 gap-4">
                <div class="flex items-center gap-3">
                    <button class="md:hidden p-2 rounded-lg hover:bg-[#2A2C31] text-gray-300 transition"
                        @click="$emit('toggle-sidebar')" aria-label="Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <a href="#" class="flex items-center gap-2">
                        <img src="https://cdn.worldvectorlogo.com/logos/trello.svg" class="h-6 w-6" alt="logo" />
                        <span class="text-white font-semibold text-lg">Trello</span>
                    </a>
                </div>

                <div class="flex-1 max-w-xl mx-4">
                    <div class="flex items-center gap-3 w-full">
                        <div class="relative flex items-center w-full">
                            <input v-model="searchQuery" type="text"
                                class="w-full bg-[#2A2C31] text-sm text-gray-200 placeholder-gray-400 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Search" @input="handleSearch" />
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button class="p-2 rounded-full hover:bg-[#2A2C31] text-gray-300" title="Thông báo">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div class="relative">
                        <button class="p-1 rounded-full hover:bg-[#2A2C31]" title="Tài khoản" @click.stop="toggleDropdown">
                            <img :src="avatarUrl" alt="avatar"
                                class="h-8 w-8 rounded-full object-cover border border-gray-500" />
                        </button>
                        <div v-if="showDropdown"
                            class="absolute right-0 mt-2 w-64 bg-[#2A2C31] rounded-md shadow-lg py-1 z-50 transform origin-top-right transition-all duration-200 ease-out"
                            :class="{'scale-95 opacity-0': !showDropdown, 'scale-100 opacity-100': showDropdown}"
                            @click.stop>
                            <div class="px-4 py-2 text-sm text-gray-300 border-b border-[#1A1C20]">
                                <p class="font-semibold">{{ authStore.user?.data?.name || 'Người dùng' }}</p>
                                <p class="text-xs text-gray-400">{{ authStore.user?.data?.email || 'Không xác định' }}</p>
                            </div>
                            <input type="file" ref="avatarInput" @change="handleAvatarUpload" class="hidden" />
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A1C20] hover:text-white"
                                @click="triggerAvatarUpload">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload avatar image
                            </a>
                            <a href="#"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A1C20] hover:text-white"
                                @click="logout">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { UserAPI } from '@/api/user'
import { toast } from '@/plugins/toast'
import { useUserStore } from '@/store/user'

const authStore = useUserStore()
const router = useRouter()
const { logout: authLogout } = useAuth() 

const searchQuery = ref('')
const showDropdown = ref(false)
const avatarInput = ref(null)
const avatarUrl = computed(() => authStore.user?.data?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social_media_user_vector.jpg')

const handleSearch = () => {
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const triggerAvatarUpload = () => {
  avatarInput.value.click()
}

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const res = await UserAPI.uploadAvatar(formData)
    authStore.setUser({ ...authStore.user, data: { ...authStore.user.data, avatar: res.data } })
    console.log('User after upload avatar:', authStore.user)
  } catch (error) {
    console.error('Failed to upload main image:', error)
    toast.error('Failed to upload main image')
  } finally {
    closeDropdown()
  }
}

const logout = async () => {
  try {
    await authLogout() 
  } catch (error) {
    console.error('Failed to logout:', error)
    toast.error('Failed to logout')
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
