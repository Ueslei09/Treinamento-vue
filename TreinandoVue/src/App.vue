<template>
    <div class="container-fluid">
    <header class="nav row" >
    <h1 class=" col-1">Treinando Vue</h1>   
    <router-link class=" link-1 col-1" to="/">Home</router-link>
    <router-link class=" link-2 col-2" to="/cadastro">Buscar Dados</router-link>
     <router-link class=" link-3 col-2" to="/trazer">Trazer Dados</router-link>
     <router-link class=" link-6 col-1" to="/publicar-produto">Produtos</router-link>

     
     <!-- 
  d-flex: coloca os botões lado a lado (flexbox)
  gap-2: espaçamento entre os botões
  align-items-center: alinha tudo no centro verticalmente
-->
     
     <div class="col-2 d-flex gap-2 align-items-center"> 
        <button class="btn btn-primary "><router-link class=" link-4 " to="/cadastrar">Cadastrar</router-link></button> 
        <button class="btn btn-primary "><router-link class=" link-5 " to="/entrar">Entrar</router-link></button>
        
       <button class="btn btn-primary" @click="realizarLogout">Sair</button>
         
     </div>
     <!-- Botão do carrinho com contador dinâmico -->
<div class="col-2 d-flex gap-2 align-items-center">
  <button class="btn btn-primary position-relative">
    <router-link class="link-5" to="/carrinho-produto">

      <!-- Ícone do carrinho -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>

      <!-- 
        Badge contador — só aparece quando há itens no carrinho
        position-absolute: flutua sobre o ícone no canto superior direito
      -->
      <span 
        v-if="carrinhoStore.totalItens > 0"
        class="badge-carrinho"
      >
        {{ carrinhoStore.totalItens }}
      </span>

      <!-- Valor total ao lado do ícone -->
      | R$ {{ carrinhoStore.valorTotal.toFixed(2) }}

    </router-link>
  </button>

 <!-- Link CRM — aparece somente para administradores -->
<router-link
  v-if="userStore.isAdmin"
  class="link-1 col-1"
  to="/crm"
>
  📊 CRM
</router-link>
</div>
</header> 
<!-- ✅ RouterView com animação blur — estava faltando! -->
    <div ref="viewWrapper" style="opacity: 1; margin-top: 80px;">
      <RouterView />
   </div>
</div>
     

   
</template>
<style scoped>

header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    background-color: black;

      /* Fixa o header no topo da página */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Fica na frente de todo o conteúdo */
   
    
}
h1,.link-1,.link-2,.link-3, .link-6{
    font-family: calibri;
    font-size: 16px;
    text-decoration: none;
    color: white;
}
h1{
    margin: 0;
    padding: 0;
}
 .link-1:hover{
    color:aquamarine;
    transition: color 0.3s ease;
}
 .link-2:hover{
    color:aquamarine;
    transition: color 0.3s ease;
}
 .link-3:hover{
    color:aquamarine;
    transition: color 0.3s ease;
}
.link-6:hover{
     color:aquamarine;
    transition: color 0.3s ease;
}
.btn:hover{
    background-color: white;
     transition: color 0.3s ease;
     color: black;
     font-family: calibri;
    
}


.link-4{
    text-decoration: none;
    color: white;
    font-family: calibri;
}
.link-4:hover{
    color:black;
    transition: color 0.3s ease;
}
.link-5{
    text-decoration: none;
    color: white;
    font-family: calibri;
}
.link-5:hover{
    color:black;
    transition: color 0.3s ease;
}
/* Badge vermelho que aparece sobre o ícone do carrinho */
.badge-carrinho {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Necessário para o badge se posicionar corretamente */
.btn {
  position: relative;
}


</style>


<script setup>
import { useRouter, useRoute } from 'vue-router'  // ✅ useRoute adicionado
import { ref, watch } from 'vue'
import { useCarrinhoStore } from './stores/carrinhoStore.js'
import { onMounted } from 'vue'
import { ApiMeuBanco } from './serviceApi/ApiMeuBanco.js'
/* Computed que verifica se o usuário logado é admin */
import { useUserStore } from './stores/UserStore'




const carrinhoStore = useCarrinhoStore()
const router = useRouter()
const route = useRoute()
const viewWrapper = ref(null)
const userStore = useUserStore()


onMounted(async () => {
  userStore.carregarUsuario()

  if (userStore.usuario) {
    await carrinhoStore.restaurarCarrinho(userStore.usuario.EMAIL)
  }
})

watch(() => route.path, () => {
    const el = viewWrapper.value
  if (!el) return

  // Fade + blur saindo
  el.style.transition = 'opacity 0.3s ease, filter 0.3s ease'
  el.style.opacity = '0'
  el.style.filter = 'blur(12px)'

  setTimeout(() => {
    // Reseta sem animação
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.filter = 'blur(12px)'

    // Fade + blur entrando
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.5s ease, filter 0.5s ease'
      el.style.opacity = '1'
      el.style.filter = 'blur(0px)'
    })
  }, 300)






})

function realizarLogout() {
  userStore.logout()
  carrinhoStore.limparCarrinho()
  router.push('/entrar')
}



</script>