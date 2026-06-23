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
</template>
<style scoped>
#myCarousel {
  width: 100%;
  height: 500px; /* Ajuste a altura conforme necessário */

}
.carousel-inner{
 margin: 20px;
  
  display: flex;
  align-items: center;
  
  height: 100%;
  
}

</style>
  

  