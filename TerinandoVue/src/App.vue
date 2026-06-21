<template>
 <div>
  <h1>ola mundo</h1>
 </div>

</template>
//import { ref, onMounted } from 'vue';
<script>
 import { ref, onMounted } from 'vue';
 //import { ApiMEuBanco } from './serviceApi/ApiMeuBanco.js';
 import{ApiMEuBanco} from './serviceApi/ApiMeuBanco.js';

 const ref =([]);

 const buscarDados = async () => {
  try {
   const response = await ApiMEuBanco.get('/dados');
   ref.value = response.data;
  } catch (error) {
   console.error('Erro ao buscar dados:', error);
  }
 };
  onMounted(() => {
    buscarDados();
  });


</script>