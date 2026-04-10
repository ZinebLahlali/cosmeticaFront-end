
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
})


const logout = () => {
   localStorage.removeItem('token')
    isLoggedIn.value = false
   router.push('/login')
}






</script>

<template>
 <div>
    <nav class="flex gap-4 p-4 shadow">
    <template v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
     </template>
      <template v-else>
        <router-link to="/home">Home</router-link>
        <router-link to="/ajouter-commande">Ajouter commande</router-link>
         <button @click="logout" class="text-red-600">
        Logout
      </button>
      </template>  
    </nav>
   <router-view/>
   </div>
</template>


