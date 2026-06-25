<template>
  <main class="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card w-50 shadow p-4 text-black custom-card">
      <h2 class="text-center mb-4">Nova Publicação</h2>
      <form @submit.prevent="enviarPublicacao">
         <!-- Campo para o Texto -->
        <div class="mb-3">

          <label class="form-label fw-bold">O que você está pensando?</label>
          <textarea 
            v-model="texto" 
            class="form-control" 
            rows="4" 
            placeholder="Escreva sua mensagem aqui..." 
            required
          ></textarea>
          <!-- Campo para a Imagem (Link/URL) -->
        <div class="mb-4">
           <label class="form-label fw-bold">Link da Imagem (URL)</label>
           <input 
            v-model="imagem" 
            type="text" 
            class="form-control" 
            placeholder="Cole o link de uma imagem da internet (ex: https://...)"
          >


        </div>
        <!-- Botão de Envio -->
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success px-4">Publicar no Feed</button>

        </div>
        </div>




      </form>
    </div>


  </main>
</template>
<style scoped>
.custom-card {
  background-color: #d0e0ee !important;
}
.custom-card {
  background-color: #d0e0ee !important;
}
textarea {
  resize: none;
}


</style>
<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

const texto = ref('')
const imagem = ref('')
const router = useRouter()

async function enviarPublicacao() {
try {
// 1. Pega os dados do usuário que ficaram guardados no login
    const dadosUsuario = JSON.parse(localStorage.getItem('dados_usuario') || '{}')

    // 2. Monta o objeto exatamente com as colunas que o Firebird e o Node esperam
    const novaPostagem = {
      AUTOR_EMAIL: dadosUsuario.EMAIL || 'usuario@teste.com', // E-mail do usuário logado
      TEXTO: texto.value,
      IMAGEM: imagem.value || 'https://picsum.photos', // Foto padrão se ficar em branco
      DATA_POST: new Date().toLocaleDateString('pt-BR') // Data de hoje formatada (DD/MM/AAAA)

    }
    // 3. Envia os dados para a API salvar no banco de dados Firebird
    await ApiMeuBanco.salvarPost(novaPostagem)

    alert('Publicação enviada com sucesso para o Firebird!')

      // 4. Redireciona o usuário de volta para a Home para ver o feed atualizado
    router.push('/')




}

 catch (error) {
    alert('Erro ao salvar a publicação no banco de dados.');
    console.error(error)
  }


}





</script>