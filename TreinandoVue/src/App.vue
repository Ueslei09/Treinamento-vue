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
     
   
     
    </header>
  <<div ref="viewWrapper" style="opacity: 1;">
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


</style>


<script setup>
import { useRouter, useRoute } from 'vue-router'  // ✅ useRoute adicionado
import { ref, watch } from 'vue'


const router = useRouter()
const route = useRoute()
const viewWrapper = ref(null)

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
  // Apaga o token do disco do navegador
  localStorage.removeItem('user_token')
  localStorage.removeItem('dados_usuario') // Se tiver salvo os dados do usuário
  
  alert('Você saiu do sistema!')
  
  // Manda o usuário de volta para a tela de login
  router.push('/entrar')
}
</script>