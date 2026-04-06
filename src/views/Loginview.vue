
<script setup>
 import { ref } from 'vue'
 import api from '../services/api'
 import router from '@/router'

 const email = ref('')
 const password = ref('')
 const message = ref('')

 const login = async () => {
    try{
       console.log(email.value, password.value)

        const res = await api.post('/login', {
            email: email.value,
            password: password.value,
        })
        localStorage.setItem('token', res.data.token)
        message.value = 'Login successful'
        console.log(res.data)

        router.push('/home')

    } catch (err){
        console.log(err.response?.data)
        message.value = 'Email or Password invalid'
    }

 }

</script>

<template>
    <div class="min-h-screen bg-blue-300 flex items-center justify-center px-4 ">
        <div class="w-[70vh] max-w-md bg-white p-8 rounded-3xl shadow-xl mt-7 mb-3 ">
            <h1 class="text-3xl font-bold text-center mb-6">Login</h1>
         <form @submit.prevent="login" class="space-y-5">
            <div>
                <label for="email" class=" block text-sm font-semiblod mb-2">Email</label>
                <input v-model="email" type="email" class="w-full rounded-xl border px-3 py-2 outline-none" id="email"/>
            </div>
             <div>
                <label for="password" class=" block text-sm font-semiblod mb-2">Password</label>
                <input v-model="password" type="password" class="w-full rounded-xl border px-3 py-2 outline-none" id="password"/>
            </div>
           <button class="flex items-center justify-center border rounded-full w-[50%] mt-5 mx-20 py-2 bg-blue-200 ">Login</button>
               <p v-if="message" class="text-red-500 text-center">
                 {{ message }}
               </p>
             <p class="text-center text-sm mt-4">
                Don’t have an account?
                <router-link to="/register" class="text-violet-600 font-semibold hover:underline">
                    Register here
                </router-link>
             </p>
         </form>
        </div>
    </div>
</template>