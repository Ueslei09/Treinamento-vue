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
// 1. Lê os dados guardados de quem logou de verdade
    const dadosSalvos = localStorage.getItem('dados_usuario');
    const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null;

    // Limpa o link da imagem para garantir que não envie páginas HTML inteiras por engano
    // Se por algum motivo não achar ninguém logado, barra na hora
    if (!usuarioLogado) {
      alert('Sessão expirada. Faça login novamente!');
      router.push('/entrar');
      return;
    }

     // 2. Monta o post com as colunas EXATAS do Firebird e o e-mail de quem está logado
    const novaPostagem = {
      AUTOR_EMAIL: usuarioLogado.EMAIL, // 100% Automático! Vai o e-mail de quem logou.
      TEXTO: texto.value,
      IMAGEM: imagem.value || 'https://picsum.photos',
      DATA_POST: new Date().toISOString().split('T')[0] // Formato limpo AAAA-MM-DD
    }

    await ApiMeuBanco.salvarPost(novaPostagem)
    
    alert('Publicação enviada com sucesso!')
    router.push('/') // Manda para a Home
}

 catch (error) {
    alert('Erro ao salvar a publicação no banco de dados.');
    console.error(error)
  }


}





</script>