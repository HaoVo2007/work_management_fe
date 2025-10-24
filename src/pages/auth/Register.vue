<template>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 w-full">
                <div class="mt-12 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>

                    <div class="w-full flex-1 mt-8">
                        <form class="mx-auto max-w-xs" @submit.prevent="register(form)">
                            <BaseInput id="name" label="Full Name" v-model="form.name" placeholder="Enter your name" />
                            <BaseInput id="email" label="Email" type="email" v-model="form.email"
                                placeholder="Enter your email" />
                            <BaseInput id="password" label="Password" type="password" v-model="form.password"
                                placeholder="Enter your password" />

                            <BaseButton type="submit" class="mt-5" :disabled="loading">
                                {{ loading ? "Registering..." : "Sign Up" }}
                            </BaseButton>

                            <p class="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </a>
                                and its
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useAuth } from "@/composables/useAuth";
const { loading, register } = useAuth();
const form = reactive({
    name: "",
    email: "",
    password: "",
});

</script>
        