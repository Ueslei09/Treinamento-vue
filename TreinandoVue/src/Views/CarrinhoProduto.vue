<template>
  <!-- Div raiz única obrigatória -->
  <div>
    <div class="container mt-5 mb-5">

      <h2 class="fw-bold mb-4">🛒 Meu Carrinho</h2>

      <!-- Mensagem se o carrinho estiver vazio -->
      <div v-if="itensCarrinho.length === 0" class="text-center text-muted my-5">
        <p class="fs-5">Seu carrinho está vazio.</p>
        <router-link to="/" class="btn btn-dark mt-2">Ver Produtos</router-link>
      </div>

      <!-- Layout principal: lista de itens + resumo -->
      <div class="row" v-else>

        <!-- ============================
             COLUNA ESQUERDA: Lista de itens
             ============================ -->
        <div class="col-md-8">

          <!-- 
            Botão para selecionar/desmarcar todos os itens de uma vez
          -->
          <div class="d-flex align-items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="selecionarTodos"
              class="form-check-input mt-0"
              :checked="todosSelecionados"
              @change="alternarTodos"
            >
            <!-- Label clicável que seleciona/desmarca todos -->
            <label for="selecionarTodos" class="form-check-label fw-bold" style="cursor:pointer;">
              Selecionar todos
            </label>
          </div>

          <!-- Percorre cada item do carrinho -->
          <div
            v-for="item in itensCarrinho"
            :key="item.ID"
            class="card mb-3 shadow-sm border-0"
            :class="{ 'card-selecionado': item.selecionado }"
          >
            <div class="card-body d-flex align-items-center gap-3">

              <!-- 
                Checkbox individual do item
                v-model vincula direto ao item.selecionado
              -->
              <input
                type="checkbox"
                class="form-check-input mt-0 checkbox-item"
                v-model="item.selecionado"
              >

              <!-- Imagem do produto -->
              <img
                :src="`http://localhost:3000${item.IMAGEM}`"
                class="img-carrinho"
                alt="Produto"
              >

              <!-- Informações do produto -->
              <div class="flex-grow-1">

                <!-- Nome do produto -->
                <h5 class="fw-bold mb-1">{{ item.NOME }}</h5>
                <!-- Preço unitário -->
                <p class="text-muted small mb-2">R$ {{ Number(item.VALOR).toFixed(2) }} cada</p>

                <!-- Controles de quantidade: botão - , número, botão + -->
                <div class="d-flex align-items-center gap-2">

                  <!-- Botão diminuir quantidade -->
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="diminuirQuantidade(item)"
                  >−</button>

                  <!-- Quantidade atual -->
                  <span class="fw-bold px-2">{{ item.QUANTIDADE }}</span>

                  <!-- Botão aumentar quantidade -->
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="aumentarQuantidade(item)"
                  >+</button>

                </div>
              </div>

              <!-- Subtotal do item (quantidade × valor) -->
              <div class="text-end">
                <p class="fw-bold text-success fs-5 mb-1">
                  R$ {{ (item.QUANTIDADE * item.VALOR).toFixed(2) }}
                </p>

                <!-- Botão excluir item do carrinho -->
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="removerItem(item)"
                >🗑 Remover</button>
              </div>

            </div>
          </div>

        </div>

        <!-- ============================
             COLUNA DIREITA: Resumo da compra
             Mostra APENAS os itens selecionados
             ============================ -->
        <div class="col-md-4">
          <div class="card shadow-sm border-0 p-4 resumo-card">

            <h5 class="fw-bold mb-4">Resumo do Pedido</h5>

            <!-- Mensagem se nenhum item estiver selecionado -->
            <div v-if="itensSelecionados.length === 0" class="text-muted small text-center mb-3">
              Selecione os itens que deseja comprar
            </div>

            <!-- Lista resumida — apenas itens com checkbox marcado -->
            <div
              v-for="item in itensSelecionados"
              :key="'resumo-' + item.ID"
              class="d-flex justify-content-between mb-2 small"
            >
              <!-- Nome e quantidade -->
              <span>{{ item.NOME }} (x{{ item.QUANTIDADE }})</span>
              <!-- Subtotal -->
              <span>R$ {{ (item.QUANTIDADE * item.VALOR).toFixed(2) }}</span>
            </div>

            <!-- Linha divisória -->
            <hr>

            <!-- 
              Valor total — soma APENAS dos itens selecionados
              Atualiza automaticamente conforme o usuário marca/desmarca
            -->
            <div class="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total</span>
              <span class="text-success">R$ {{ valorTotalSelecionados.toFixed(2) }}</span>
            </div>

            <!-- 
              Botão finalizar — desabilitado se nenhum item selecionado
              :disabled impede o clique se não houver nada selecionado
            -->
            <!-- Botão vai para a tela de pagamento passando o valor total -->
<button
  class="btn btn-success w-100 py-2 fw-bold"
  @click="router.push(`/pagamento?valor=${valorTotalSelecionados.toFixed(2)}`)"
  :disabled="itensSelecionados.length === 0"
>
  💳 Ir para Pagamento ({{ itensSelecionados.length }})
</button>

            <!-- Botão continuar comprando -->
            <router-link to="/" class="btn btn-outline-secondary w-100 mt-2">
              ← Continuar Comprando
            </router-link>

          </div>
        </div>

      </div>
    </div>

    <!-- ============================
         TELA DE SUCESSO
         Aparece depois que finaliza a compra
         ============================ -->
    <div
      v-if="pedidoFinalizado"
      class="modal-sucesso d-flex align-items-center justify-content-center"
    >
      <div class="card p-5 text-center shadow-lg" style="max-width: 480px;">
        <div class="display-1 mb-3">🎉</div>
        <h3 class="fw-bold text-success mb-2">Pedido Realizado!</h3>
        <p class="text-muted mb-1">Seu pedido <strong>#{{ pedidoId }}</strong> foi confirmado.</p>
        <p class="text-muted mb-4">Obrigado pela compra!</p>
        <router-link to="/" class="btn btn-success px-5">Voltar para a Loja</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Imagem do produto no carrinho */
.img-carrinho {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

/* Card do resumo fixo no scroll */
.resumo-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  position: sticky;
  top: 90px; /* Abaixo do header fixo */
}

/* 
  Destaca o card quando o item está selecionado
  Borda verde aparece ao marcar o checkbox
*/
.card-selecionado {
  border: 2px solid #198754 !important;
  background-color: #f0fff4;
}

/* Checkbox maior para facilitar o clique */
.checkbox-item {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

/* Tela de sucesso que aparece sobre tudo */
.modal-sucesso {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

/* Animação de entrada da tela de sucesso */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'
import { useCarrinhoStore } from '../stores/carrinhoStore.js'

const router = useRouter()
const carrinhoStore = useCarrinhoStore()

/* Lista reativa dos itens do carrinho */
const itensCarrinho = ref([])

/* Controla se mostra a tela de sucesso */
const pedidoFinalizado = ref(false)

/* ID do pedido gerado após finalizar */
const pedidoId = ref(null)

/* 
  Computed: filtra apenas os itens com checkbox marcado
  Recalcula automaticamente quando qualquer selecionado mudar
*/
const itensSelecionados = computed(() => {
  return itensCarrinho.value.filter(item => item.selecionado)
})

/* 
  Computed: soma o valor APENAS dos itens selecionados
  Atualiza automaticamente conforme o usuário marca/desmarca
*/
const valorTotalSelecionados = computed(() => {
  return itensSelecionados.value.reduce((soma, item) => {
    return soma + (item.QUANTIDADE * item.VALOR)
  }, 0)
})

/* 
  Computed: verifica se TODOS os itens estão selecionados
  Usado para o estado do checkbox "Selecionar todos"
*/
const todosSelecionados = computed(() => {
  return itensCarrinho.value.length > 0 &&
         itensCarrinho.value.every(item => item.selecionado)
})

/* 
  Seleciona ou desmarca TODOS os itens de uma vez
  Se todos estiverem marcados, desmarca todos — e vice-versa
*/
function alternarTodos() {
  const novoEstado = !todosSelecionados.value
  itensCarrinho.value.forEach(item => {
    item.selecionado = novoEstado
  })
}

/* Busca o carrinho ao carregar a tela */
onMounted(async () => {
  const dadosSalvos = localStorage.getItem('dados_usuario')
  const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null

  if (!usuarioLogado) {
    router.push('/entrar')
    return
  }

  try {
    const itens = await ApiMeuBanco.buscarCarrinho(usuarioLogado.EMAIL)

    /* 
      Adiciona a propriedade selecionado = true em cada item
      Por padrão todos começam marcados — usuário desmarca o que não quer
    */
    itensCarrinho.value = itens.map(item => ({
      ...item,
      selecionado: true
    }))

    carrinhoStore.atualizarCarrinho(itensCarrinho.value)
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error)
  }
})

/* Aumenta a quantidade de um item em +1 */
async function aumentarQuantidade(item) {
  try {
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = JSON.parse(dadosSalvos)
    const novaQtd = item.QUANTIDADE + 1
    await ApiMeuBanco.atualizarQuantidade(item.ID, novaQtd, usuarioLogado.EMAIL)
    item.QUANTIDADE = novaQtd
    carrinhoStore.atualizarCarrinho(itensCarrinho.value)
  } catch (error) {
    console.error('Erro ao aumentar quantidade:', error)
  }
}

/* Diminui a quantidade — remove se chegar a 0 */
async function diminuirQuantidade(item) {
  try {
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = JSON.parse(dadosSalvos)

    if (item.QUANTIDADE <= 1) {
      await removerItem(item)
      return
    }

    const novaQtd = item.QUANTIDADE - 1
    await ApiMeuBanco.atualizarQuantidade(item.ID, novaQtd, usuarioLogado.EMAIL)
    item.QUANTIDADE = novaQtd
    carrinhoStore.atualizarCarrinho(itensCarrinho.value)
  } catch (error) {
    console.error('Erro ao diminuir quantidade:', error)
  }
}

/* Remove um item do carrinho */
async function removerItem(item) {
  try {
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = JSON.parse(dadosSalvos)
    await ApiMeuBanco.removerDoCarrinho(item.ID, usuarioLogado.EMAIL, item.PRODUTO_ID)
    itensCarrinho.value = itensCarrinho.value.filter(i => i.ID !== item.ID)
    carrinhoStore.atualizarCarrinho(itensCarrinho.value)
  } catch (error) {
    console.error('Erro ao remover item:', error)
  }
}

/* Finaliza a compra — envia APENAS os itens selecionados */
async function finalizarCompra() {
  try {
    const dadosSalvos = localStorage.getItem('dados_usuario')
    const usuarioLogado = JSON.parse(dadosSalvos)

    /* Monta o array APENAS com os itens que o usuário selecionou */
    const itens = itensSelecionados.value.map(item => ({
      PRODUTO_ID: item.PRODUTO_ID,
      NOME:       item.NOME,
      VALOR:      item.VALOR,
      QUANTIDADE: item.QUANTIDADE
    }))

    /* Envia o pedido com o total dos itens selecionados */
    const resposta = await ApiMeuBanco.finalizarPedido(
      usuarioLogado.EMAIL,
      itens,
      valorTotalSelecionados.value
    )

    pedidoId.value = resposta.PEDIDO_ID
    carrinhoStore.limparCarrinho()
    itensCarrinho.value = []
    pedidoFinalizado.value = true

  } catch (error) {
    console.error('Erro ao finalizar compra:', error)
    alert('Erro ao finalizar a compra. Tente novamente.')
  }
}
</script>