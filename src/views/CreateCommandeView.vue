<script setup>
import { ref, onMounted} from 'vue'
import api from '../services/api'



const produits = ref([])
const loadingProduits = ref(false)
const message = ref('')
const error = ref('')


const form = ref({
    adresse_livraison: '',
    produit_id: '',
    quantite: 1,

})

onMounted(async () => {
  loadingProduits.value = true
  error.value = ''

  try {
    const res = await api.get('/produits')
    produits.value = res.data
  } catch (err) {
    console.error(err)
    error.value = 'Impossible de charger les produits'
  } finally {
    loadingProduits.value = false
   }
})


const submitCommande = async () => {
  message.value = ''
  error.value = ''

  try {
    const payload = {
      adresse_livraison: form.value.adresse_livraison,
      produit_id: form.value.produit_id,
      quantite: form.value.quantite,
    }

    const res = await api.post('/commande/creation', payload, {
             headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
       

    message.value = res.data.message || 'Commande ajoutée avec succès'

    form.value = {
      adresse_livraison: '',
      produit_id: '',
      quantite: 1,
    }
  } catch (err) {
    console.error(err)

    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Erreur lors de la création de la commande'
    }
  }
}



</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
      <h1 class="mb-6 text-2xl font-bold text-gray-800">
        Ajouter une commande
      </h1>

      <form @submit.prevent="submitCommande" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Adresse de livraison
          </label>
          <input
            v-model="form.adresse_livraison"
            type="text"
            placeholder="Votre adresse"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Produit
          </label>

          <select
            v-model="form.produit_id"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500 text-black"
          >
            <option disabled value="">
              {{ loadingProduits ? 'Chargement...' : 'Choisir un produit' }}
            </option>

            <option
              v-for="produit in produits"
              :key="produit.id"
              :value="produit.id"
            >
              {{ produit.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Quantité
          </label>
          <input
            v-model.number="form.quantite"
            type="number"
            min="1"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-pink-600 px-4 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          Valider la commande
        </button>

        <p
          v-if="message"
          class="rounded-xl bg-green-100 px-4 py-3 text-sm text-green-700"
        >
          {{ message }}
        </p>

        <p
          v-if="error"
          class="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700"
        >
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>