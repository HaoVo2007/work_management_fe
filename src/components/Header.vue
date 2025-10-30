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
                    <button class="p-1 rounded-full hover:bg-[#2A2C31]" title="Tài khoản">
                        <img :src="avatarUrl" alt="avatar"
                            class="h-8 w-8 rounded-full object-cover border border-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
