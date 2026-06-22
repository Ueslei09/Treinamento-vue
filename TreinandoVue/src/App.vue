<template>
    <div class="container-fluid">
    <header class="nav row" >
    <h1 class=" col-3">Treinando Vue</h1>   
    <router-link class=" link-1 col-3" to="/">Home</router-link>
    <router-link class=" link-2 col-3" to="/cadastro">Buscar Dados</router-link>
     <router-link class=" link-3 col-3" to="/trazer">Trazer Dados</router-link>
    </header>
     <RouterView/>
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
h1,.link-1,.link-2,.link-3{
    font-family: calibri;
    font-size: 18px;
    text-decoration: none;
    color: white;
}
h1{
    margin: 0;
    padding: 0;
}


</style>