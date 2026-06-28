 
 <template>
 <main class="container">
 <h1>Meus Dados Cadastrais</h1>
    <!-- Mostra um aviso caso não encontre o usuário logado -->
    <p v-if="!usuarioLogado">Nenhum usuário logado ou carregando dados...</p>
    
    <!-- Lista os clientes na tela de forma dinâmica -->
     <ul v-else class="lista-cliente">
      <li >
        <p>
          <strong>Nome:{{ usuarioLogado.NOME || usuarioLogado.nome}}</strong><br>
          <strong>Telefone:{{usuarioLogado.TELEFONE || usuarioLogado.telefone }}</strong><br>
          <strong>Email:{{ usuarioLogado.EMAIL || usuarioLogado.email }}</strong>
        </p>
      </li>
       
     </ul>
    </main>

</template>

<script setup>

 import { ref, onMounted } from 'vue';
 //import { ApiMEuBanco } from './serviceApi/ApiMeuBanco.js';
 import{ApiMeuBanco} from '../serviceApi/ApiMeuBanco.js';

 // Criamos uma variável reativa para guardar um único objeto (e não um array/lista)
 const usuarioLogado = ref(null);

 const buscarDados = async () => {
  try {
    // 1. Pega do localStorage o texto salvo no momento do login
   const dadosSalvos = localStorage.getItem('dados_usuario');

  if (dadosSalvos) {
    // 2. Converte o texto JSON de volta para um objeto JavaScript
    usuarioLogado.value = JSON.parse(dadosSalvos);
   }
  } 
   catch (error) {
   console.error('Erro ao buscar dados:', error);
  }
 };
 
  onMounted(() => {
    buscarDados();
  });


</script>