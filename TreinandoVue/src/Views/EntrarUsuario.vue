<template>
    <main class="container-fluid d-flex justify-content-center align-items-center vh-100">
  <div class="card w-50  shadow p-4 text-black custom-card">
        <h2 class="text-center mb-4">Login</h2>

          <form @submit.prevent="efetuarLogin">
            <div class="mb-3">
            <label class="form-label">E-mail</label>
            <!-- v-model conecta o input com a variável 'email' do JavaScript -->
            <input 
              v-model="email" 
              type="email" 
              class="form-control" 
              placeholder="seu-email@exemplo.com"
              required
            >
          </div>
            <!-- Campo de Senha -->
          <div class="mb-4">
            <label class="form-label">Senha</label>
            <!-- v-model conecta o input com a variável 'senha' do JavaScript -->
            <input 
              v-model="senha" 
              type="password" 
              class="form-control" 
              placeholder="Digite sua senha"
              required
            >
          </div>
          <div class="d-flex gap-2 justify-content-end">
            <button type="submit" class="btn btn-primary">Entre</button>
          </div>

            
          </form>

       

           

  </div>


    </main>
</template>
<style scoped>

 .card{
  background-color: #d0e0ee !important;
 }
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'
import { useCarrinhoStore } from '../stores/carrinhoStore.js'
/* ✅ Importa o UserStore */
import { useUserStore } from '../stores/UserStore.js'

const carrinhoStore = useCarrinhoStore()
/* ✅ Inicializa o UserStore */
const userStore = useUserStore()
const email = ref('')
const senha = ref('')
const router = useRouter()

async function efetuarLogin() {
  try {
    const dadosUsuario = await ApiMeuBanco.login(email.value, senha.value)
    console.log('Dados recebidos do banco:', dadosUsuario)

    const usuarioLogado = Array.isArray(dadosUsuario) ? dadosUsuario[0] : dadosUsuario

    if (usuarioLogado) {

      /* ✅ Salva no store — atualiza isAdmin automaticamente */
      userStore.login(usuarioLogado)
      localStorage.setItem('user_token', 'logado_com_sucesso')

      /* ✅ Restaura o carrinho imediatamente após o login */
      await carrinhoStore.restaurarCarrinho(usuarioLogado.EMAIL)

      const nomeExibição = usuarioLogado.NOME || usuarioLogado.nome || 'Usuário'
      alert(`Login realizado com sucesso! Bem-vindo, ${nomeExibição}.`)

      router.push('/')

    } else {
      alert('E-mail ou senha incorretos no banco de dados.')
    }
  } catch (erro) {
    alert('Erro ao efetuar login: Credenciais inválidas.')
    console.error('Erro detalhado no login:', erro)
  }
}
</script>