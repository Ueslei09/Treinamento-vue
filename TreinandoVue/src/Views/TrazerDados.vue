 
 <template>
 <div class="container">
  <h1>Teste de Dados</h1>
   <!-- Mostra um aviso enquanto os dados carregam -->
    <p v-if="dados.length === 0">Carregando dados...</p>
    <!-- Lista os clientes na tela de forma dinâmica -->
     <ul v-else class="lista-cliente">
      <li v-for="clientes in dados" :key="clientes.id">
        <p>
          <strong>Nome:{{ clientes.NOME}}</strong><br>
          <strong>Telefone:{{ clientes.TELEFONE }}</strong><br>
          <strong>Email:{{ clientes.EMAIL }}</strong>
        </p>
      </li>
       
     </ul>
 </div>

</template>

<script setup>

 import { ref, onMounted } from 'vue';
 //import { ApiMEuBanco } from './serviceApi/ApiMeuBanco.js';
 import{ApiMeuBanco} from '../serviceApi/ApiMeuBanco.js';

 const dados = ref([]);

 const buscarDados = async () => {
  try {
   const response = await ApiMeuBanco.listar();
   dados.value = response;
  } catch (error) {
   console.error('Erro ao buscar dados:', error);
  }
 };
  onMounted(() => {
    buscarDados();
  });


</script>