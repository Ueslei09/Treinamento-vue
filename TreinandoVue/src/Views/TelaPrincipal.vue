<template>
   <main class="container-fluid">
    <div id="myCarousel" class="carousel slide carousel-dark" data-bs-ride="carousel">
      <!-- Indicadores Corrigidos (Bootstrap 5 usa botões) -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <!-- Slides do Carrossel (Classes corrigidas para carousel-item) -->
      <div class="carousel-inner text-center p-5 bg-light rounded">
        <div class="carousel-item active">
          <img src="/imagens/fernandozhiminaicela-clock-3166784_1920.jpg" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
           <img src="/imagens/imagem003.jpg" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
          <img src="/imagens/imagem001.jpg" class="d-block w-100" alt="Slide 1">
        </div>
      </div>

      <!-- Controles reposicionados para fora do carousel-inner -->
      <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próximo</span>
      </button>
    </div>
</main>
<main class="container">
<div class="row">
  <div class="col-md-4">
    <img src="/imagens/imagem004.jpg" alt="imagem homem em pé" class="imagem004">
    <figcaption>Figura 1: Homem em pé</figcaption>
  </div>
  <div class="col-md-8 text">
    <p class="mb-4 text-break">Sinto lhe arrancar as asas
Gostaria de compartilhar
A dor de tua queda,
É morte o que vem depois de vida
E fim o que vem depois de começo.

E a itinerária aliança que nos une
É o que corrompe meu coração,
Tragado me sinto no momento
Que em ti penetro,
A hemorragia se torna densa.

Confuso fico ao tentar expressar
Só posso dizer que te amo
Mas contigo não da para ficar

É obsessivo,
É obsceno,
É mórbido,
É imoral...
<img src="/imagens/imagem005.jpg" alt="cachorro" class="imagem005">
<figcaption>Figura 2: Cachorro</figcaption>
</p>
  </div>
</div>
</main>

<main class="container mt-5">
   <h2 class="text-center mb-5 fw-bold text-dark">Feed de Publicações</h2>
 <!-- Mensagem exibida caso o Firebird esteja sem nenhum post ainda -->
    <div v-if="posts.length === 0" class="text-center text-muted my-5">
    <p class="fs-5">Nenhuma publicação encontrada no momento.</p>

    </div>

    <!-- Grid que renderiza os cards do feed -->
    <div class="row justify-content-center">
      <!-- O v-for percorre cada item da tabela POSTAGEM trazido pelo Node -->
      <div v-for="post in posts" :key="post.ID" class="col-md-8 mb-4">

        <div class="card shadow-sm border-0 custom-card">

          <!-- Cabeçalho (Quem postou e a data) -->
          <div class="card-header bg-white d-flex justify-content-between align-items-center py-3 border-0">
            <span class="fw-bold text-primary">👤 {{ post.AUTOR_EMAIL }}</span>
            <small class="text-muted fw-semibold">{{ post.DATA_POST }}</small>
          </div>
          <!-- Imagem cadastrada (Só carrega a tag se houver um link preenchido) -->
          <img 
            v-if="post.IMAGEM" 
            :src="post.IMAGEM" 
            class="card-img-top img-feed" 
            alt="Imagem da publicação"
          >
          <!-- Corpo do Card com o Texto -->
          <div class="card-body py-4 bg-light rounded-bottom">
            <p class="card-text fs-5 text-dark m-0">{{ post.TEXTO }}</p>
          </div>
        </div>
      </div>
    </div>

</main>
</template>
<style scoped>
#myCarousel {
  width: 100%;
  height: 500px; /* Ajuste a altura conforme necessário */

}
.carousel-inner{
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 100%;
  
}
.imagem004{
 margin-top: 20px;
 width: 100%;
}
.text{
margin-top: 20px;
font-family: calibri;
font-size: 18px;

}
.imagem005{
  margin-top: 20px;
  width: 100%;
 
}
figcaption{
  font-size: 9px;
  margin-top: 5px;
  font-family: calibri;
}

</style>
<script setup>

import { ref, onMounted } from 'vue'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

// Cria a lista reativa que vai armazenar as postagens do banco
const posts = ref([])

// O gancho onMounted executa a busca automaticamente assim que a Home abre
onMounted(async () => {
 try {
    // Puxa a lista atualizada de posts da tabela do Firebird
    posts.value = await ApiMeuBanco.buscarPosts()
    console.log("Postagens carregadas do Firebird:", posts.value)
  } catch (error) {
    console.error('Erro ao renderizar o feed na Home:', error)
  }

});


</script>
  

  