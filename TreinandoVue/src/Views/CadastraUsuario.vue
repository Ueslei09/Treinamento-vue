<template>
     <!-- 
    d-flex: ativa o flexbox
    justify-content-center: centraliza na horizontal
    align-items: center: centraliza na vertical
    vh-100: faz o container ocupar 100% da altura da tela 
  -->
  <main class="container-fluid d-flex justify-content-center align-items-center vh-100">
    
    <!-- 
      w-100: ocupa a largura disponível
      shadow: adiciona uma sombra elegante
      p-4: espaçamento interno confortável
      text-white: deixa todos os textos internos brancos 
    -->
    <div class="card w-50 h-50 shadow p-4 text-black custom-card">
        <!-- mb-4: adiciona um espaçamento inferior de 1rem -->
      <h2 class="text-center mb-4">Cadastro</h2>
      
      <!-- O conteúdo do seu formulário entra aqui -->
        <form @submit.prevent="cadastrarUsuario">

        </form>

    </div>

  </main>
</template>
<style scoped>

 .card{
  background-color: #c4daf0 !important;
 }
</style>
<script setup>
// Importa a função ref do Vue para criar variáveis reativas
import { ref } from 'vue';

// Cria um objeto reativo chamado "formulario" que contém os campos do formulário
const formulario = ref({
  nome: '',
  telefone: '',
  email: '',
  senha: ''    // Mapeia para a nova coluna SENHA
});

// Função
const cadastrarUsuario = async () => {
    // Faz uma requisição POST para o endpoint de cadastro, enviando os dados do formulário
try {
    
    const resposta = await fetch('http://localhost:3000/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario.value)
    });
    // Verifica se a resposta foi bem-sucedida e exibe uma mensagem apropriada
     if (resposta.ok) {
      alert('Cadastrado com sucesso!');
      formulario.value = { nome: '', telefone: '', email: '', usuario: '', senha: '' };
    }else {
      alert('Erro ao salvar.');
    }
  } catch (erro) {
    console.error(erro);
    } 

};
</script>

