
<template>
  <!-- Div raiz única obrigatória -->
  <div>
    <main class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <div class="card w-50 shadow p-4 custom-card">
        <h2 class="text-center mb-4 fw-bold">✏️ Editar Produto</h2>

        <!-- Mensagem enquanto carrega os dados -->
        <div v-if="carregando" class="text-center py-5">
          <p class="text-muted">Carregando dados do produto...</p>
        </div>

        <!-- Formulário de edição — aparece após carregar -->
        <form v-else @submit.prevent="salvarEdicao">

          <!-- Campo Nome -->
          <div class="mb-3">
            <label class="form-label fw-bold">Nome do Produto</label>
            <input
              v-model="formulario.NOME"
              type="text"
              class="form-control"
              required
            >
          </div>

          <!-- Campo Descrição -->
          <div class="mb-3">
            <label class="form-label fw-bold">Descrição</label>
            <textarea
              v-model="formulario.DESCRICAO"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <!-- Campos Valor e Quantidade lado a lado -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label fw-bold">Valor (R$)</label>
              <input
                v-model="formulario.VALOR"
                type="number"
                step="0.01"
                min="0"
                class="form-control"
                required
              >
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold">Quantidade</label>
              <input
                v-model="formulario.QUANTIDADE"
                type="number"
                min="1"
                class="form-control"
                required
              >
            </div>
          </div>

          <!-- Checkbox de promoção -->
          <div class="mb-4 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="promocao"
              v-model="formulario.PROMOCAO"
            >
            <label class="form-check-label fw-bold text-danger" for="promocao">
              🔥 Marcar como Promoção
            </label>
          </div>

          <!-- Imagem atual do produto -->
          <div v-if="imagemAtual" class="mb-3 text-center">
            <p class="text-muted small fw-bold">Imagem atual:</p>
            <img
              :src="`http://localhost:3000${imagemAtual}`"
              class="img-preview"
              alt="Imagem atual"
            >
          </div>

          <!-- Campo para trocar a imagem -->
          <div class="mb-4">
            <label class="form-label fw-bold">Nova Imagem (opcional)</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="capturarImagem"
            >
            <small class="text-muted">Deixe em branco para manter a imagem atual</small>
          </div>

          <!-- Preview da nova imagem escolhida -->
          <div v-if="preview" class="mb-4 text-center">
            <p class="text-muted small">Nova imagem:</p>
            <img :src="preview" class="img-preview" alt="Preview">
          </div>

          <!-- Botões de ação -->
          <div class="d-flex gap-2 justify-content-end">
            <!-- Botão cancelar — volta sem salvar -->
            <button
              type="button"
              class="btn btn-outline-secondary px-4"
              @click="router.push('/')"
            >
              Cancelar
            </button>
            <!-- Botão salvar -->
            <button type="submit" class="btn btn-success px-4">
              💾 Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Cor de fundo do card */
.custom-card {
  background-color: #d0e0ee;
  border-radius: 12px;
}

/* Tamanho controlado da imagem preview */
.img-preview {
  max-width: 100%;
  max-height: 250px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #aac4de;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

const router = useRouter()
const route = useRoute()

/* Controla se está carregando os dados do produto */
const carregando = ref(true)

/* Imagem atual do produto para mostrar antes de trocar */
const imagemAtual = ref(null)

/* Nova imagem escolhida pelo usuário */
const arquivoImagem = ref(null)

/* Preview da nova imagem */
const preview = ref(null)

/* Objeto reativo com os dados do produto para editar */
const formulario = ref({
  NOME: '',
  DESCRICAO: '',
  VALOR: '',
  QUANTIDADE: '',
  PROMOCAO: false
})

/* Carrega os dados do produto ao abrir a tela */
onMounted(async () => {
  try {
    /* Pega o ID da URL — ex: /editar-produto/5 → id = 5 */
    const id = route.params.id

    /* Verifica se o usuário está logado */
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null

    if (!usuarioLogado) {
      router.push('/entrar')
      return
    }

    /* Busca os dados atuais do produto */
    const produto = await ApiMeuBanco.buscarProdutoPorId(id)

    /* Verifica se o usuário logado é o dono do produto */
    if (produto.AUTOR_EMAIL !== usuarioLogado.EMAIL) {
      alert('Você não tem permissão para editar este produto!')
      router.push('/')
      return
    }

    /* Pré-preenche o formulário com os dados atuais */
    formulario.value = {
      NOME:       produto.NOME,
      DESCRICAO:  produto.DESCRICAO,
      VALOR:      produto.VALOR,
      QUANTIDADE: produto.QUANTIDADE,
      PROMOCAO:   produto.PROMOCAO === 1 /* Converte 1/0 para true/false */
    }

    /* Guarda a imagem atual para mostrar na tela */
    imagemAtual.value = produto.IMAGEM

  } catch (error) {
    console.error('Erro ao carregar produto:', error)
    alert('Erro ao carregar dados do produto.')
    router.push('/')
  } finally {
    /* Para de mostrar o carregando independente do resultado */
    carregando.value = false
  }
})

/* Captura a nova imagem escolhida */
function capturarImagem(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    arquivoImagem.value = arquivo
    /* Cria preview local da nova imagem */
    preview.value = URL.createObjectURL(arquivo)
  }
}

/* Salva as alterações do produto */
async function salvarEdicao() {
  try {
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = JSON.parse(dadosSalvos)
    const id = route.params.id

    /* Monta o FormData com os dados atualizados */
    const formData = new FormData()
    formData.append('NOME',        formulario.value.NOME)
    formData.append('DESCRICAO',   formulario.value.DESCRICAO)
    formData.append('VALOR',       formulario.value.VALOR)
    formData.append('QUANTIDADE',  formulario.value.QUANTIDADE)
    formData.append('AUTOR_EMAIL', usuarioLogado.EMAIL)
    formData.append('PROMOCAO',    formulario.value.PROMOCAO ? 1 : 0)

    /* Só envia nova imagem se o usuário escolheu uma */
    if (arquivoImagem.value) {
      formData.append('imagem', arquivoImagem.value)
    }

    /* Envia para o servidor */
    await ApiMeuBanco.editarProduto(id, formData)

    alert('Produto atualizado com sucesso!')
    router.push('/') /* Volta para a tela principal */

  } catch (error) {
    console.error('Erro ao salvar edição:', error)
    alert('Erro ao salvar as alterações.')
  }
}
</script>
