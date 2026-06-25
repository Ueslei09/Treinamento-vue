<template>
    <div class="container-fluid">
    <header class="nav row" >
    <h1 class=" col-2">Treinando Vue</h1>   
    <router-link class=" link-1 col-2" to="/">Home</router-link>
    <router-link class=" link-2 col-2" to="/cadastro">Buscar Dados</router-link>
     <router-link class=" link-3 col-2" to="/trazer">Trazer Dados</router-link>
     
     <div class="col-2"> 
        <button class="btn btn-primary me-4"><router-link class=" link-4 col-2" to="/cadastrar">Cadastrar</router-link></button> 
        <button class="btn btn-primary">Entre</button>
        
     </div>
     
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
</style>