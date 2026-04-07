<script setup>
//on doit utilise ref et onMounted comme declaration
import {ref, onMounted} from 'vue'
import api from '../services/api'

const commandes = ref([])

onMounted(async () => {
    try {
        
    const res = await api.get('/mes_Commandes', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log('data:', res.data)

     commandes.value = res.data.commandes
} catch (err) {
    console.log(err.response?.data)
}
})
</script>



   <template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-100 py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-fuchsia-700">My Orders</h1>
        <p class="mt-2 text-gray-600">Here is the list of your recent orders</p>
      </div>

      <div v-if="commandes.length === 0" class="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
        No orders found.
      </div>

      <div v-else class="grid gap-6">
        <div v-for="commande in commandes" :key="commande.id"
          class="bg-white rounded-3xl shadow-md border border-pink-100 p-6 hover:shadow-xl transition duration-300">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                Order #{{ commande.id }}
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Created at: {{ commande.created_at }}
              </p>
            </div>

            <span
              class="inline-block px-4 py-2 rounded-full text-sm font-semibold w-fit"
              :class="{
                'bg-yellow-100 text-yellow-700': commande.statut === 'pending',
                'bg-blue-100 text-blue-700': commande.statut === 'en_preparation',
                'bg-red-100 text-red-700': commande.statut === 'cancel'
              }">
              {{ commande.statut }}
            </span>
          </div>

          <div class="mt-6 grid sm:grid-cols-2 gap-4">
            <div class="bg-pink-50 rounded-2xl p-4">
              <p class="text-sm text-gray-500">Customer name</p>
              <p class="mt-1 font-medium text-gray-800">{{ commande.nom }}</p>
            </div>

            <div class="bg-pink-50 rounded-2xl p-4">
              <p class="text-sm text-gray-500">Product</p>
              <p class="mt-1 font-medium text-gray-800">{{ commande.name }}</p>
            </div>

            <div class="bg-pink-50 rounded-2xl p-4">
              <p class="text-sm text-gray-500">Quantity</p>
              <p class="mt-1 font-medium text-gray-800">{{ commande.quantite }}</p>
            </div>

            <div class="bg-pink-50 rounded-2xl p-4">
              <p class="text-sm text-gray-500">Delivery address</p>
              <p class="mt-1 font-medium text-gray-800">{{ commande.adresse_livraison }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
