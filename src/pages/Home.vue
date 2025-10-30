<template>
    <div class="h-screen flex justify-center bg-[#1F2125] text-white px-6">
        <section class="max-w-5xl w-full text-center mt-24">
            <h1 class="text-4xl font-bold mb-3 tracking-wide">Welcome to Work Management</h1>
            <p class="text-gray-400 mb-10 text-lg">
                Manage tasks, track progress and collaborate efficiently with your team.
            </p>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="feature in features" :key="feature.title"
                    class="p-6 rounded-xl bg-[#26282C] hover:bg-[#323438] border border-transparent hover:border-[#3A89FF40] transition-all shadow-lg hover:shadow-[#3A89FF33] cursor-pointer">
                    <div class="text-4xl mb-4">{{ feature.icon }}</div>
                    <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ feature.desc }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

const features = [
    { icon: "📋", title: "Boards Management", desc: "Organize tasks into powerful visual boards." },
    { icon: "💡", title: "Task Tracking", desc: "Always be aware of what’s done and what’s next." },
    { icon: "🤝", title: "Team Collaboration", desc: "Work together in real-time seamlessly." },
    { icon: "🎨", title: "Custom Themes", desc: "Personalize boards to fit your visual style." },
    { icon: "🔔", title: "Smart Notifications", desc: "Stay informed about every project activity." },
    { icon: "📈", title: "Insights & Analytics", desc: "Monitor performance with helpful charts." },
]

function createBoard() {
    router.push("/boards")
}
</script>

<style scoped>
</style>
