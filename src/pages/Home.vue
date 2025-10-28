<template>
    <div class="min-h-screen bg-[#1F2125] text-white p-6">
        <section class="max-w-6xl mx-auto mt-10">
            <div class="">
                <h1 class="text-3xl font-semibold mb-2">Hello 👋, {{ userName }}</h1>
                <p class="text-gray-400 mb-8">
                    Welcome to your task management system.<br />
                    Get started by creating or accessing your first board.
                </p>
            </div>

            <div class="flex gap-4">
                <button
                    class="bg-[#579DFF] hover:bg-[#7AB4FF] text-white px-5 py-3 rounded-lg font-medium shadow transition"
                    @click="createBoard">
                    🗂️ Create new board
                </button>
                <button
                    class="bg-[#2A2C31] hover:bg-[#33353A] px-5 py-3 rounded-lg font-medium text-gray-300 transition"
                    @click="openTutorial">
                    📘 Quick guide
                </button>
            </div>
        </section>
        <section class="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="feature in features" :key="feature.title"
                class="bg-[#2A2C31] p-6 rounded-xl hover:bg-[#33353A] transition">
                <div class="text-3xl mb-3">{{ feature.icon }}</div>
                <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ feature.desc }}</p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm mt-16">
            © {{ new Date().getFullYear() }} KanbanFlow — Manage your work with ease.
        </footer>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const userName = ref("John Doe")

const features = [
    {
        icon: "📋",
        title: "Create and manage boards",
        desc: "Organize your work in visual and structured boards.",
    },
    {
        icon: "💡",
        title: "Track progress easily",
        desc: "Stay on top of every team member’s tasks and deadlines.",
    },
    {
        icon: "🤝",
        title: "Collaborate with your team",
        desc: "Add members, share ideas, and work together seamlessly.",
    },
    {
        icon: "🎨",
        title: "Customize appearance",
        desc: "Change colors, backgrounds, and themes to suit your style.",
    },
    {
        icon: "🔔",
        title: "Instant notifications",
        desc: "Never miss an update or comment on your boards.",
    },
    {
        icon: "📈",
        title: "Performance analytics",
        desc: "Visualize team productivity through insightful charts.",
    },
]

function openTutorial() {
    alert("🎉 Quick tutorial coming soon!")
}

function createBoard() {
    router.push("/boards")
}
</script>

<style scoped>
</style>
