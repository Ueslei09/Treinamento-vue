<template>
  <div>
    <main class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="card w-50 shadow p-4 text-black custom-card">

        <!-- ETAPA 1: Formulário de cadastro -->
        <div v-if="etapa === 1">
          <h2 class="text-center mb-4">Cadastro</h2>
          <form @submit.prevent="enviarCodigo">

            <div class="mb-3">
              <label class="form-label">Nome Completo</label>
              <input type="text" v-model="formulario.NOME" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Telefone</label>
              <input type="tel" v-model="formulario.TELEFONE" class="form-control">
            </div>

            <div class="mb-3">
              <label class="form-label">E-mail</label>
              <input type="email" v-model="formulario.EMAIL" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Senha</label>
              <input type="password" v-model="formulario.SENHA" class="form-control" required>
            </div>

            <!-- Botão desabilitado enquanto está enviando -->
            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="enviando"
            >
              {{ enviando ? 'Enviando código...' : 'Cadastrar' }}
            </button>

          </form>
        </div>

        <!-- ETAPA 2: Confirmação do código -->
        <div v-if="etapa === 2">
          <h2 class="text-center mb-2">Confirme seu e-mail</h2>
          <p class="text-center text-muted mb-4">
            Enviamos um código de 6 dígitos para <strong>{{ formulario.EMAIL }}</strong>
          </p>

          <form @submit.prevent="confirmarCodigo">

            <!-- Input do código com estilo grande -->
            <div class="mb-4">
              <label class="form-label fw-bold">Código de verificação</label>
              <input
                v-model="codigo"
                type="text"
                class="form-control text-center codigo-input"
                placeholder="000000"
                maxlength="6"
                required
              >
            </div>

            <button
              type="submit"
              class="btn btn-success w-100"
              :disabled="enviando"
            >
              {{ enviando ? 'Verificando...' : 'Confirmar Cadastro' }}
            </button>

            <!-- Botão para reenviar o código -->
            <button
              type="button"
              class="btn btn-link w-100 mt-2"
              @click="enviarCodigo"
              :disabled="enviando"
            >
              Reenviar código
            </button>

          </form>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-card {
  background-color: #d0e0ee !important;
}

/* Input do código grande e centralizado */
.codigo-input {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 12px;
  padding: 16px;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

const router = useRouter()

/* Controla qual etapa está sendo exibida: 1 = formulário, 2 = código */
const etapa = ref(1)

/* Controla o estado de carregamento para desabilitar botões */
const enviando = ref(false)

/* Código digitado pelo usuário */
const codigo = ref('')

/* Dados do formulário de cadastro */
const formulario = ref({
  NOME: '',
  TELEFONE: '',
  EMAIL: '',
  SENHA: ''
})

/* 
  ETAPA 1: Envia os dados e o código para o e-mail
  Muda para a etapa 2 após o envio
*/
async function enviarCodigo() {
  try {
    enviando.value = true

    /* Envia os dados para o servidor gerar e enviar o código */
    await ApiMeuBanco.enviarCodigoVerificacao(formulario.value)

    alert(`Código enviado para ${formulario.value.EMAIL}! Verifique sua caixa de entrada.`)

    /* Avança para a etapa de confirmação */
    etapa.value = 2

  } catch (error) {
    /* Mostra a mensagem de erro do servidor */
    const mensagem = error.response?.data?.error || 'Erro ao enviar código.'
    alert(mensagem)
    console.error(error)
  } finally {
    /* Para o carregamento independente do resultado */
    enviando.value = false
  }
}

/* 
  ETAPA 2: Verifica o código digitado
  Cria a conta se o código estiver correto
*/
async function confirmarCodigo() {
  try {
    enviando.value = true

    /* Envia o e-mail e o código para verificação */
    await ApiMeuBanco.confirmarCodigo(formulario.value.EMAIL, codigo.value)

    alert('Conta criada com sucesso! Faça login para continuar.')
    router.push('/entrar')

  } catch (error) {
    const mensagem = error.response?.data?.error || 'Código incorreto.'
    alert(mensagem)
    console.error(error)
  } finally {
    enviando.value = false
  }
}
</script>