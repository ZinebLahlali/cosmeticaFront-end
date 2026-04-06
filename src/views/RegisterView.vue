<script setup>
import {ref} from 'vue'
import api from '../services/api'
import router from '@/router'
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const role_id = ref('')
const message = ref('')

const register = async () => {
    try{
        // console.log('name'+name.value +'====='+email.value +'====='+ password.value +'====='+ password_confirmation.value +'====='+role_id.value)

        const res = await api.post('/register',{
            name: name.value,
            email: email.value, 
            password: password.value,
            password_confirmation: password_confirmation.value,
            role_id: role_id.value,
        })

        message.value = 'Inscription réussie'
        console.log(res.data)
        router.back()
    } catch (err) {
        console.error(err)
        message.value = "Erreur lors de l'inscription"
    }
}
</script>
<template>
 <div class="py-5 flex items-center justify-center bg-purple-400 px-3 shadow-xl" >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-4">
        <h1 class="font-bold text-3xl text-gray-800 text-center">Create account</h1>
        <form class="mt-3 space-y-2" @submit.prevent="register">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="name">Name</label>
                <input class="w-full rounded-xl border-gray-200 border px-4 py-2 outline-none" id="name" v-model="name" type="text"/>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
                <input class="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none" id="email" v-model="email" type="email">
            </div>
            <div>
                <label class="block text-sm text-gray-700 font-medium mb-2" for="password">Password</label>
                <input class="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none"  id="password" v-model="password" type="password"/>
            </div>
            <div>
                <label  class="block text-sm text-gray-700 font-medium mb-2" for="password_confirmation">Password confirmation</label>
                <input class="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none" id="password_confirmation"  v-model="password_confirmation" type="password"/>
            </div>
            <div>
                <div>
                    <label  class="block text-sm text-gray-700 font-medium mb-2" for="role_id">Role</label>
                </div>
                <select class="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none" v-model="role_id" name="role_id" id="role_id">
                    <option value="2">Employe</option>
                    <option value="3">Client</option>
                </select>
            </div>
            <button class="w-3/4 mx-auto flex itmes-center justify-center rounded-xl border border-gray-200 py-3 outline-none bg-purple-400"  type="submit">Register</button>
        </form>
        <p>{{ message }}</p>
          <p class="text-center text-sm mt-4">
            Already have an account?
            <router-link to="/login" class="text-blue-400 font-semibold hover:underline">
                Login here
            </router-link>
          </p>
    </div>    
  </div>
 </template>