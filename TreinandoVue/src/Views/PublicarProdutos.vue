<template>
    <!-- Div raiz única obrigatória para o Vue Transition funcionar -->
  <div>
 <!-- Container centralizado verticalmente e horizontalmente -->
    <main class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
       <!-- Card do formulário com largura de 50% -->
      <div class="card w-50 shadow p-4 custom-card">
         <h2 class="text-center mb-4 fw-bold">Publicar Produto</h2>
          <!-- 
          @submit.prevent: impede o recarregamento da página
          enctype não é necessário no Vue — o FormData cuida disso
        -->
        <form @submit.prevent="publicarProduto">

          <!-- Campo Nome do Produto -->
          <div class="mb-3">
            <label class="form-label fw-bold">Nome do Produto</label>
            <input
              v-model="formulario.NOME"
              type="text"
              class="form-control"
              placeholder="Ex: Fotografia Pôr do Sol"
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
              placeholder="Descreva sua imagem..."
            ></textarea>
          </div>

          <!-- Campos Valor e Quantidade lado a lado -->
          <div class="row mb-3">

            <!-- Valor -->
            <div class="col-md-6">
              <label class="form-label fw-bold">Valor (R$)</label>
              <input
                v-model="formulario.VALOR"
                type="number"
                step="0.01"
                min="0"
                class="form-control"
                placeholder="Ex: 49.90"
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
                placeholder="Ex: 10"
                required
              >
            </div>

          </div>
          
          <!-- Campo Upload de Imagem -->
          <div class="mb-4">
            <label class="form-label fw-bold">Imagem do Produto</label>
            <!-- 
              @change: captura o arquivo escolhido pelo usuário
              accept: filtra para aceitar só imagens
            -->
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="capturarImagem"
              required
            >
          </div>

          <!-- Preview da imagem escolhida antes de enviar -->
          <div v-if="preview" class="mb-4 text-center">
            <p class="text-muted small">Pré-visualização:</p>
            <!-- Exibe a imagem localmente antes do upload -->
            <img :src="preview" class="img-preview" alt="Preview da imagem">
          </div>

           <!-- Botão de envio -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success px-4">
              Publicar Produto
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

/* Preview da imagem com tamanho controlado */
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

const router = useRouter()

/* 
  Objeto reativo com os campos do formulário
  Começa vazio e vai sendo preenchido conforme o usuário digita
*/
const formulario = ref({
  NOME: '',
  DESCRICAO: '',
  VALOR: '',
  QUANTIDADE: ''
})

/* 
  Armazena o arquivo de imagem escolhido pelo usuário
  Começa como null pois nenhum arquivo foi selecionado ainda
*/
const arquivoImagem = ref(null)

/* 
  URL temporária para mostrar o preview da imagem antes do envio
  Criada pelo URL.createObjectURL() — funciona só no navegador
*/
const preview = ref(null)

/* 
  Função executada quando o usuário escolhe um arquivo
  event.target.files[0] = primeiro arquivo selecionado
*/
function capturarImagem(event) {
  const arquivo = event.target.files[0]
  if (arquivo) {
    arquivoImagem.value = arquivo
    // Cria uma URL local temporária para exibir o preview sem fazer upload ainda
    preview.value = URL.createObjectURL(arquivo)
  }
}

/* 
  Função principal — monta o FormData e envia para o servidor
  FormData é obrigatório para enviar arquivos junto com texto
*/
async function publicarProduto() {

    try {
          // Recupera os dados do usuário logado salvos no login
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null

    

    // Bloqueia o envio se não houver usuário logado
    if (!usuarioLogado) {
      alert('Sessão expirada! Faça login novamente.')
      router.push('/entrar')
      return
    }

      /* 
      FormData: objeto especial do JavaScript para enviar
      texto + arquivo juntos numa única requisição HTTP
    */
    const formData = new FormData()
    formData.append('NOME',        formulario.value.NOME)
    formData.append('DESCRICAO',   formulario.value.DESCRICAO)
    formData.append('VALOR',       formulario.value.VALOR)
    formData.append('QUANTIDADE',  formulario.value.QUANTIDADE)
    formData.append('AUTOR_EMAIL', usuarioLogado.EMAIL)
    formData.append('imagem',      arquivoImagem.value) // Campo que o Multer vai interceptar

     /* 
      Envia para a rota POST /produtos do servidor Node
      Não define Content-Type — o navegador detecta automaticamente como multipart/form-data
    */
    const resposta = await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      body: formData
    })

     if (resposta.ok) {
      alert('Produto publicado com sucesso!')
      router.push('/') // Redireciona para a tela principal
    } else {
      alert('Erro ao publicar o produto.')
    }



}
catch (erro) {
    console.error('Erro ao enviar produto:', erro)
    alert('Erro de conexão com o servidor.')
  }
}



</script>