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
import { useRouter } from 'vue-router' // CORRIGIDO: 1. Importa o roteador do Vue
// Importa o arquivo onde está o código da sua imagem (ajuste o caminho se necessário)
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js' 
const email = ref('')
const senha = ref('')
const router = useRouter() // CORRIGIDO: 2. Ativa o roteador para poder usar o router.push

async function efetuarLogin() {
    try{
 // Chama o novo método passando os valores reativos das caixas de texto (.value)
    const dadosUsuario = await ApiMeuBanco.login(email.value, senha.value);
    
    // Se chegou aqui sem cair no catch, as credenciais estão certas no banco!
    
    console.log('Dados recebidos do banco:', dadosUsuario);
    // ==========================================
    // 👉 O CÓDIGO ENTRA EXATAMENTE AQUI:
    // ==========================================
    // Salva o token no navegador para o roteador saber que ele está logado
    localStorage.setItem('user_token', 'logado_com_sucesso')
    
    // Opcional: Salva os dados do próprio usuário para usar depois se quiser
    localStorage.setItem('dados_usuario', JSON.stringify(dadosUsuario))
    
    alert('Login realizado com sucesso! Bem-vindo.');
    
    // 3. Redireciona o usuário logado direto para a tela de Buscar Dados automaticamente
    router.push('/cadastro') 
}
catch (erro) {
        // Se caiu aqui, houve algum erro na requisição ou as credenciais estão erradas
        alert('Erro ao efetuar login: ' + erro.message);
        console.error('Erro ao efetuar login:', erro);
    
}
};



</script>