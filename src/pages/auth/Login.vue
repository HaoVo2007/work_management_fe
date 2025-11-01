<template>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 w-full">
                <div class="mt-12 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">Sign In</h1>

                    <div class="w-full flex-1 mt-8">
                        <form class="mx-auto max-w-xs" @submit.prevent="login(form)">
                            <BaseInput id="email" label="Email" type="email" v-model="form.email"
                                placeholder="Enter your email" />
                            <BaseInput id="password" label="Password" type="password" v-model="form.password"
                                placeholder="Enter your password" />

                            <BaseButton type="submit" class="mt-5" :disabled="loading">
                                {{ loading ? "Signing In..." : "Sign In" }}
                            </BaseButton>

                            <p class="mt-6 text-xs text-gray-600 text-center">
                                Don’t have an account?
                                <RouterLink to="/register" class="text-blue-600 hover:underline">Sign Up</RouterLink>
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
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useAuth } from "@/composables/useAuth";
const { loading, login } = useAuth();
const form = reactive({
    email: "",
    password: "",
});

</script>
