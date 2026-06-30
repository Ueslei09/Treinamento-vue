<template>
  <div>
    <div class="container mt-5 mb-5">

      <!-- Título do painel -->
      <h2 class="fw-bold mb-2">📊 Painel CRM</h2>
      <p class="text-muted mb-4">Análise de comportamento e vendas perdidas</p>

      <!-- Cards de resumo -->
      <div class="row g-3 mb-5">

        <!-- Total de ações -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-4 text-center">
            <div class="fs-1 fw-bold text-primary">{{ logs.length }}</div>
            <p class="text-muted mb-0">Total de Ações</p>
          </div>
        </div>

        <!-- Total de compras finalizadas -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-4 text-center">
            <div class="fs-1 fw-bold text-success">
              {{ logs.filter(l => l.ACAO === 'COMPRA_FINALIZADA').length }}
            </div>
            <p class="text-muted mb-0">Compras Finalizadas</p>
          </div>
        </div>

        <!-- Total de itens adicionados ao carrinho -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-4 text-center">
            <div class="fs-1 fw-bold text-warning">
              {{ logs.filter(l => l.ACAO === 'ADICIONOU_CARRINHO').length }}
            </div>
            <p class="text-muted mb-0">Adicionados ao Carrinho</p>
          </div>
        </div>

        <!-- Total de itens removidos — vendas perdidas -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm p-4 text-center">
            <div class="fs-1 fw-bold text-danger">
              {{ logs.filter(l => l.ACAO === 'REMOVEU_CARRINHO').length }}
            </div>
            <p class="text-muted mb-0">Vendas Perdidas</p>
          </div>
        </div>

      </div>

      <!-- Filtros -->
      <div class="d-flex gap-2 mb-4 flex-wrap">

        <!-- Filtro por tipo de ação -->
        <select
          v-model="filtroAcao"
          class="form-select w-auto"
        >
          <option value="">Todas as ações</option>
          <option value="ADICIONOU_CARRINHO">Adicionou ao Carrinho</option>
          <option value="REMOVEU_CARRINHO">Removeu do Carrinho</option>
          <option value="COMPRA_FINALIZADA">Compra Finalizada</option>
        </select>

        <!-- Filtro por e-mail do usuário -->
        <input
          v-model="filtroEmail"
          type="text"
          class="form-control w-auto"
          placeholder="Filtrar por e-mail..."
        >

        <!-- Botão limpar filtros -->
        <button
          class="btn btn-outline-secondary"
          @click="filtroAcao = ''; filtroEmail = ''"
        >
          Limpar Filtros
        </button>

      </div>

      <!-- Tabela de logs -->
      <div class="card border-0 shadow-sm">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-dark">
              <tr>
                <th>Data/Hora</th>
                <th>Usuário</th>
                <th>Ação</th>
                <th>Produto ID</th>
                <th>Pedido ID</th>
                <th>Valor</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              <!-- Mensagem se não houver logs -->
              <tr v-if="logsFiltrados.length === 0">
                <td colspan="7" class="text-center text-muted py-4">
                  Nenhum registro encontrado.
                </td>
              </tr>

              <!-- Percorre os logs filtrados -->
              <tr
                v-for="log in logsFiltrados"
                :key="log.ID"
                :class="corLinha(log.ACAO)"
              >
                <!-- Data e hora da ação -->
                <td class="small">{{ log.DATA_ACAO }}</td>

                <!-- E-mail do usuário -->
                <td class="small">{{ log.USUARIO_EMAIL }}</td>

                <!-- Badge colorido por tipo de ação -->
                <td>
                  <span :class="badgeAcao(log.ACAO)" class="badge">
                    {{ log.ACAO }}
                  </span>
                </td>

                <!-- ID do produto envolvido -->
                <td>{{ log.PRODUTO_ID || '—' }}</td>

                <!-- ID do pedido envolvido -->
                <td>{{ log.PEDIDO_ID || '—' }}</td>

                <!-- Valor envolvido -->
                <td>
                  <span v-if="log.VALOR" class="text-success fw-bold">
                    R$ {{ Number(log.VALOR).toFixed(2) }}
                  </span>
                  <span v-else class="text-muted">—</span>
                </td>

                <!-- Observação extra -->
                <td class="small text-muted">{{ log.OBSERVACAO || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Linhas coloridas por tipo de ação */
.linha-compra { background-color: #d1fae5; }   /* Verde claro — compra */
.linha-removeu { background-color: #fee2e2; }  /* Vermelho claro — removeu */
.linha-adicionou { background-color: #fef9c3; } /* Amarelo claro — adicionou */
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

const router = useRouter()

/* Lista de todos os logs do CRM */
const logs = ref([])

/* Filtros da tabela */
const filtroAcao = ref('')
const filtroEmail = ref('')

/* Carrega os logs ao abrir a tela */
onMounted(async () => {
  /* Verifica se é admin — proteção extra no frontend */
  const dadosSalvos = localStorage.getItem('dados_usuario')
  const usuario = dadosSalvos ? JSON.parse(dadosSalvos) : null

  if (!usuario || usuario.ADMIN !== 1) {
    alert('Acesso negado!')
    router.push('/')
    return
  }

  try {
    /* Busca todos os logs do banco */
    logs.value = await ApiMeuBanco.buscarLogsCRM()
    console.log('Logs CRM carregados:', logs.value)
  } catch (error) {
    console.error('Erro ao carregar logs CRM:', error)
  }
})

/* 
  Computed: filtra os logs conforme os filtros selecionados
  Recalcula automaticamente quando filtroAcao ou filtroEmail mudar
*/
const logsFiltrados = computed(() => {
  return logs.value.filter(log => {
    /* Filtra por ação se o filtro estiver preenchido */
    const passaAcao = !filtroAcao.value || log.ACAO === filtroAcao.value
    /* Filtra por e-mail se o filtro estiver preenchido */
    const passaEmail = !filtroEmail.value ||
      log.USUARIO_EMAIL.toLowerCase().includes(filtroEmail.value.toLowerCase())
    return passaAcao && passaEmail
  })
})

/* Retorna a classe CSS da linha conforme o tipo de ação */
function corLinha(acao) {
  if (acao === 'COMPRA_FINALIZADA') return 'linha-compra'
  if (acao === 'REMOVEU_CARRINHO') return 'linha-removeu'
  if (acao === 'ADICIONOU_CARRINHO') return 'linha-adicionou'
  return ''
}

/* Retorna a classe do badge conforme o tipo de ação */
function badgeAcao(acao) {
  if (acao === 'COMPRA_FINALIZADA') return 'bg-success'
  if (acao === 'REMOVEU_CARRINHO') return 'bg-danger'
  if (acao === 'ADICIONOU_CARRINHO') return 'bg-warning text-dark'
  return 'bg-secondary'
}
</script>