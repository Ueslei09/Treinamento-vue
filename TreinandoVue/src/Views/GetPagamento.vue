<template>
  <div>
    <div class="container mt-5 mb-5" style="max-width: 600px;">

      <h2 class="fw-bold mb-1">💳 Pagamento</h2>
      <p class="text-muted mb-4">Valor total: <strong class="text-success">R$ {{ valorTotal }}</strong></p>

      <!-- Abas de seleção do método de pagamento -->
      <div class="d-flex gap-2 mb-4">

        <!-- Aba Cartão -->
        <button
          class="btn flex-fill py-3"
          :class="metodo === 'cartao' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="metodo = 'cartao'"
        >
          💳 Cartão
        </button>

        <!-- Aba PIX -->
        <button
          class="btn flex-fill py-3"
          :class="metodo === 'pix' ? 'btn-success' : 'btn-outline-secondary'"
          @click="metodo = 'pix'"
        >
          ⚡ PIX
        </button>

        <!-- Aba Boleto -->
        <button
          class="btn flex-fill py-3"
          :class="metodo === 'boleto' ? 'btn-warning' : 'btn-outline-secondary'"
          @click="metodo = 'boleto'"
        >
          📄 Boleto
        </button>

      </div>

      <!-- ============================
           CARTÃO DE CRÉDITO
           ============================ -->
      <div v-if="metodo === 'cartao'" class="card border-0 shadow-sm p-4">

        <h5 class="fw-bold mb-4">Dados do Cartão</h5>

        <!-- Preview visual do cartão -->
        <div class="cartao-preview mb-4">
          <div class="cartao-numero">
            {{ cartao.numero || '•••• •••• •••• ••••' }}
          </div>
          <div class="d-flex justify-content-between mt-3">
            <div>
              <div class="cartao-label">TITULAR</div>
              <div class="cartao-valor">{{ cartao.nome || 'SEU NOME' }}</div>
            </div>
            <div class="text-end">
              <div class="cartao-label">VALIDADE</div>
              <div class="cartao-valor">{{ cartao.validade || 'MM/AA' }}</div>
            </div>
          </div>
        </div>

        <!-- Formulário do cartão -->
        <div class="mb-3">
          <label class="form-label fw-bold">Número do Cartão</label>
          <input
            v-model="cartao.numero"
            type="text"
            class="form-control"
            placeholder="0000 0000 0000 0000"
            maxlength="19"
            @input="formatarCartao"
          >
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Nome do Titular</label>
          <input
            v-model="cartao.nome"
            type="text"
            class="form-control"
            placeholder="Como está no cartão"
            @input="cartao.nome = cartao.nome.toUpperCase()"
          >
        </div>

        <div class="row mb-4">
          <div class="col-6">
            <label class="form-label fw-bold">Validade</label>
            <input
              v-model="cartao.validade"
              type="text"
              class="form-control"
              placeholder="MM/AA"
              maxlength="5"
              @input="formatarValidade"
            >
          </div>
          <div class="col-6">
            <label class="form-label fw-bold">CVV</label>
            <input
              v-model="cartao.cvv"
              type="text"
              class="form-control"
              placeholder="•••"
              maxlength="3"
            >
          </div>
        </div>

        <!-- Parcelas -->
        <div class="mb-4">
          <label class="form-label fw-bold">Parcelas</label>
          <select v-model="cartao.parcelas" class="form-select">
            <option value="1">1x de R$ {{ valorTotal }} sem juros</option>
            <option value="2">2x de R$ {{ (valorTotal / 2).toFixed(2) }} sem juros</option>
            <option value="3">3x de R$ {{ (valorTotal / 3).toFixed(2) }} sem juros</option>
            <option value="6">6x de R$ {{ (valorTotal / 6).toFixed(2) }} sem juros</option>
            <option value="12">12x de R$ {{ (valorTotal / 12).toFixed(2) }} sem juros</option>
          </select>
        </div>

        <button class="btn btn-primary w-100 py-3 fw-bold" @click="confirmarPagamento">
          💳 Pagar R$ {{ valorTotal }}
        </button>

      </div>

      <!-- ============================
           PIX
           ============================ -->
      <div v-if="metodo === 'pix'" class="card border-0 shadow-sm p-4 text-center">

        <h5 class="fw-bold mb-3">Pagamento via PIX</h5>
        <p class="text-muted mb-4">Escaneie o QR Code ou copie a chave PIX</p>

        <!-- QR Code simulado -->
        <div class="qrcode-container mx-auto mb-4">
          <div class="qrcode-simulado">
            <div class="qr-grid">
              <div v-for="i in 49" :key="i" class="qr-cell" :class="celulaPix(i)"></div>
            </div>
          </div>
          <p class="text-muted small mt-2">QR Code simulado</p>
        </div>

        <!-- Chave PIX para copiar -->
        <div class="input-group mb-4">
          <input
            type="text"
            class="form-control text-center"
            :value="chavePix"
            readonly
          >
          <button class="btn btn-outline-success" @click="copiarPix">
            {{ pixCopiado ? '✅ Copiado!' : '📋 Copiar' }}
          </button>
        </div>

        <!-- Timer de expiração -->
        <div class="alert alert-warning mb-4">
          ⏱ Este PIX expira em <strong>{{ timerPix }}</strong>
        </div>

        <button class="btn btn-success w-100 py-3 fw-bold" @click="confirmarPagamento">
          ✅ Confirmar Pagamento PIX
        </button>

      </div>

      <!-- ============================
           BOLETO
           ============================ -->
      <div v-if="metodo === 'boleto'" class="card border-0 shadow-sm p-4">

        <h5 class="fw-bold mb-3">Boleto Bancário</h5>

        <div class="alert alert-info mb-4">
          📌 O boleto vence em <strong>3 dias úteis</strong>. Após o pagamento, a confirmação pode levar até <strong>2 dias úteis</strong>.
        </div>

        <!-- Código de barras simulado -->
        <div class="boleto-barras mb-3"></div>

        <!-- Linha digitável -->
        <div class="input-group mb-4">
          <input
            type="text"
            class="form-control"
            :value="linhaDigitavel"
            readonly
          >
          <button class="btn btn-outline-warning" @click="copiarBoleto">
            {{ boletoCopiado ? '✅ Copiado!' : '📋 Copiar' }}
          </button>
        </div>

        <div class="d-flex justify-content-between text-muted small mb-4">
          <span>Valor: <strong class="text-dark">R$ {{ valorTotal }}</strong></span>
          <span>Vencimento: <strong class="text-dark">{{ vencimentoBoleto }}</strong></span>
        </div>

        <button class="btn btn-warning w-100 py-3 fw-bold" @click="confirmarPagamento">
          📄 Gerar Boleto
        </button>

      </div>

      <!-- Botão voltar -->
      <button class="btn btn-outline-secondary w-100 mt-3" @click="router.push('/carrinho-produto')">
        ← Voltar ao Carrinho
      </button>

    </div>

    <!-- Tela de sucesso do pagamento -->
    <div v-if="pagamentoConfirmado" class="modal-sucesso d-flex align-items-center justify-content-center">
      <div class="card p-5 text-center shadow-lg" style="max-width: 480px;">

        <div class="display-1 mb-3">
          {{ metodo === 'cartao' ? '💳' : metodo === 'pix' ? '⚡' : '📄' }}
        </div>

        <h3 class="fw-bold text-success mb-2">
          {{ metodo === 'boleto' ? 'Boleto Gerado!' : 'Pagamento Confirmado!' }}
        </h3>

        <p class="text-muted mb-1">
          {{ mensagemSucesso }}
        </p>

        <p class="fw-bold text-success fs-5 mb-4">R$ {{ valorTotal }}</p>

        <router-link to="/" class="btn btn-success px-5">
          Voltar para a Loja
        </router-link>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Preview do cartão */
.cartao-preview {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  font-family: 'Courier New', monospace;
  min-height: 160px;
}

.cartao-numero {
  font-size: 20px;
  letter-spacing: 4px;
  margin-top: 16px;
}

.cartao-label {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 2px;
}

.cartao-valor {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

/* QR Code simulado */
.qrcode-container {
  width: 200px;
}

.qrcode-simulado {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.qr-cell {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
  background: white;
}

.qr-cell.escuro {
  background: #000;
}

/* Barras do boleto */
.boleto-barras {
  height: 60px;
  background: repeating-linear-gradient(
    90deg,
    #000 0px,
    #000 2px,
    #fff 2px,
    #fff 4px,
    #000 4px,
    #000 7px,
    #fff 7px,
    #fff 9px
  );
  border-radius: 4px;
  margin-bottom: 12px;
}

/* Modal de sucesso */
.modal-sucesso {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

/* Método de pagamento selecionado */
const metodo = ref('cartao')

/* Controla a tela de sucesso */
const pagamentoConfirmado = ref(false)

/* Dados do cartão */
const cartao = ref({
  numero: '',
  nome: '',
  validade: '',
  cvv: '',
  parcelas: '1'
})

/* Estados do PIX */
const pixCopiado = ref(false)
const boletoCopiado = ref(false)

/* Timer do PIX — 30 minutos */
const timerPix = ref('30:00')

/* Pega o valor total da URL ou do store */
const valorTotal = ref(route.query.valor || '0.00')

/* 
  Chave PIX simulada — gerada com timestamp único
  Em produção viria do gateway de pagamento
*/
const chavePix = `00020126580014BR.GOV.BCB.PIX0136${Date.now()}5204000053039865802BR5925TREINANDO VUE LTDA6009SAO PAULO62070503***6304`

/* 
  Linha digitável do boleto simulada
  Em produção viria do banco/gateway
*/
const linhaDigitavel = `34191.09008 61713.860007 61020.150008 8 92690000${Math.floor(valorTotal.value * 100).toString().padStart(10, '0')}`

/* 
  Vencimento do boleto — 3 dias úteis a partir de hoje
*/
const vencimentoBoleto = computed(() => {
  const data = new Date()
  data.setDate(data.getDate() + 3)
  return data.toLocaleDateString('pt-BR')
})

/* Mensagem de sucesso conforme o método */
const mensagemSucesso = computed(() => {
  if (metodo.value === 'cartao') return `Pagamento aprovado em ${cartao.value.parcelas}x no cartão!`
  if (metodo.value === 'pix') return 'PIX recebido! Seu pedido será processado em instantes.'
  return 'Boleto gerado! Pague até o vencimento para confirmar seu pedido.'
})

/* Inicia o timer do PIX */
onMounted(() => {
  let segundos = 30 * 60 /* 30 minutos em segundos */

  const intervalo = setInterval(() => {
    segundos--
    const min = Math.floor(segundos / 60).toString().padStart(2, '0')
    const seg = (segundos % 60).toString().padStart(2, '0')
    timerPix.value = `${min}:${seg}`

    if (segundos <= 0) {
      clearInterval(intervalo)
      timerPix.value = 'Expirado!'
    }
  }, 1000)
})

/* Formata o número do cartão com espaços a cada 4 dígitos */
function formatarCartao() {
  let valor = cartao.value.numero.replace(/\D/g, '')
  valor = valor.replace(/(\d{4})/g, '$1 ').trim()
  cartao.value.numero = valor
}

/* Formata a validade no padrão MM/AA */
function formatarValidade() {
  let valor = cartao.value.validade.replace(/\D/g, '')
  if (valor.length >= 2) {
    valor = valor.slice(0, 2) + '/' + valor.slice(2)
  }
  cartao.value.validade = valor
}

/* 
  Gera o padrão visual do QR Code simulado
  Células pares/ímpares criam o padrão xadrez
*/
function celulaPix(i) {
  const linha = Math.floor((i - 1) / 7)
  const col = (i - 1) % 7
  /* Bordas e centro são escuros para simular QR Code */
  if (linha === 0 || linha === 6 || col === 0 || col === 6) return 'escuro'
  if (linha >= 1 && linha <= 2 && col >= 1 && col <= 2) return 'escuro'
  if (linha >= 4 && linha <= 5 && col >= 1 && col <= 2) return 'escuro'
  if (linha >= 1 && linha <= 2 && col >= 4 && col <= 5) return 'escuro'
  return (linha + col) % 2 === 0 ? 'escuro' : ''
}

/* Copia a chave PIX para a área de transferência */
async function copiarPix() {
  await navigator.clipboard.writeText(chavePix)
  pixCopiado.value = true
  setTimeout(() => pixCopiado.value = false, 3000)
}

/* Copia a linha digitável do boleto */
async function copiarBoleto() {
  await navigator.clipboard.writeText(linhaDigitavel)
  boletoCopiado.value = true
  setTimeout(() => boletoCopiado.value = false, 3000)
}

/* Confirma o pagamento — em produção chamaria o gateway */
function confirmarPagamento() {
  /* Validação básica do cartão */
  if (metodo.value === 'cartao') {
    if (!cartao.value.numero || !cartao.value.nome || !cartao.value.validade || !cartao.value.cvv) {
      alert('Preencha todos os dados do cartão!')
      return
    }
  }

  /* Mostra a tela de sucesso */
  pagamentoConfirmado.value = true
}
</script>