<template>
  <div>
    <main class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
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
          </div>

          <!-- Campo Upload de Imagem — substituiu o campo de URL -->
          <div class="mb-4">
            <label class="form-label fw-bold">Imagem da Publicação</label>
            <!-- 
              @change: captura o arquivo quando o usuário seleciona
              accept: filtra para aceitar só imagens
            -->
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="capturarImagem"
            >
          </div>

          <!-- Preview da imagem escolhida — só aparece depois de selecionar -->
          <div v-if="preview" class="mb-4 text-center">
            <p class="text-muted small">Pré-visualização:</p>
            <!-- URL temporária criada pelo navegador para mostrar a imagem localmente -->
            <img :src="preview" class="img-preview" alt="Preview da imagem">
          </div>

          <!-- Botão de Envio -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success px-4">Publicar no Feed</button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Cor de fundo do card */
.custom-card {
  background-color: #d0e0ee !important;
}

/* Impede o redimensionamento manual do textarea */
textarea {
  resize: none;
}

/* Tamanho máximo do preview da imagem antes do envio */
.img-preview {
  max-width: 100%;
  max-height: 250px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #aac4de;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

const texto = ref('')
const router = useRouter()

/* Armazena o arquivo de imagem selecionado pelo usuário */
const arquivoImagem = ref(null)

/* URL temporária para o preview da imagem no navegador */
const preview = ref(null)

/* Captura o arquivo quando o usuário seleciona no input */
function capturarImagem(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    arquivoImagem.value = arquivo
    /* Cria URL local temporária para mostrar o preview sem fazer upload ainda */
    preview.value = URL.createObjectURL(arquivo)
  }
}

/* Função principal — monta o FormData e envia para o servidor */
async function enviarPublicacao() {
  try {
    /* Recupera os dados do usuário logado */
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null

    /* Bloqueia o envio se não houver usuário logado */
    if (!usuarioLogado) {
      alert('Sessão expirada. Faça login novamente!')
      router.push('/entrar')
      return
    }

    /* 
      FormData: objeto especial para enviar texto + arquivo juntos
      O Multer no servidor vai interceptar o campo 'imagem'
    */
    const formData = new FormData()
    formData.append('AUTOR_EMAIL', usuarioLogado.EMAIL)
    formData.append('TEXTO', texto.value)
    formData.append('DATA_POST', new Date().toISOString().split('T')[0])

    /* Só adiciona a imagem se o usuário selecionou uma */
    if (arquivoImagem.value) {
      formData.append('imagem', arquivoImagem.value)
    }

    /* Envia para a API */
    await ApiMeuBanco.salvarPostComImagem(formData)

    alert('Publicação enviada com sucesso!')
    router.push('/')

  } catch (error) {
    alert('Erro ao salvar a publicação no banco de dados.')
    console.error(error)
  }
}
</script>