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

// CORREÇÃO: Como o banco devolve um Array, extraímos o primeiro objeto encontrado
    // Se a resposta já for um objeto direto, o código também aceita perfeitamente
    const usuarioLogado = Array.isArray(dadosUsuario) ? dadosUsuario[0] : dadosUsuario;
   if (usuarioLogado) {

    // ==========================================
    // 👉 O CÓDIGO ENTRA EXATAMENTE AQUI:
    // ==========================================
    // Salva o token no navegador para o roteador saber que ele está logado
    localStorage.setItem('user_token', 'logado_com_sucesso')
    
    // Opcional: Salva os dados do próprio usuário para usar depois se quiser
    localStorage.setItem('dados_usuario', JSON.stringify(usuarioLogado))
    
    // Busca o nome do banco em maiúsculo (NOME) ou minúsculo (nome) para saudar
      const nomeExibição = usuarioLogado.NOME || usuarioLogado.nome || 'Usuário';
      alert(`Login realizado com sucesso! Bem-vindo, ${nomeExibição}.`);
    
    

    
   // 4. Redireciona o usuário para a página do Feed/Home
      router.push('/') 
}
 else {
      alert('E-mail ou senha incorretos no banco de dados.');
    }
  }
  catch (erro) {
    alert('Erro ao efetuar login: Credenciais inválidas.');
    console.error('Erro detalhado no login:', erro);
  }

};



</script>