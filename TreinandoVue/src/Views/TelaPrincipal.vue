<template>
  <div>
   <div class="container-fluid">
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
  </div>
<div class="container animar">
<div class="row">
  <figure class="col-md-4">
    <img src="/imagens/imagem004.jpg" alt="imagem homem em pé" class="imagem004">
    <figcaption>Figura 1: Homem em pé</figcaption>
  </figure>
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
</p>
 <!-- CORREÇÃO: A imagem e a legenda ficam dentro de <figure> fora do <p> -->
  <figure class="mt-3">
    <img src="/imagens/imagem005.jpg" alt="cachorro" class="imagem005">
    <figcaption>Figura 2: Cachorro</figcaption>
  </figure>

  </div>
</div>
</div>

<div class="container mt-5 animar">
   <h2 class="text-center mb-5 fw-bold text-dark">Feed de Publicações</h2>

 <!-- Mensagem exibida caso o Firebird esteja sem nenhum post ainda -->
    <div v-if="posts.length === 0" class="text-center text-muted my-5">
    <p class="fs-5">Nenhuma publicação encontrada no momento.</p>

    </div>

    <!-- Grid que renderiza os cards do feed -->
    <div class="row justify-content-center" v-else>
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
          class="card-img-top img-feed-retrato" 
           alt="Imagem da publicação"
          >
          <!-- Corpo do Card com o Texto -->
          <div class="card-body py-4 bg-light rounded-bottom">
            <p class="card-text fs-5 text-dark m-0">{{ post.TEXTO }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
   <!-- Seção principal da loja com espaçamento vertical (my-5) -->
  <div class="container mt-5 mb-5 animar">
     <!-- Título centralizado da seção -->
      <h2 class="text-center fw-bold mb-5">Produtos à Venda</h2>

 <!-- Mensagem se não houver produtos cadastrados -->
  <div v-if="produtos.length === 0" class="text-center text-muted my-5">
    <p class="fs-5">Nenhum produto cadastrado ainda.</p>
  </div>
  <!-- Grid com os cards dos produtos -->
  <div class="row g-4" v-else>

     <!-- Percorre cada produto retornado pelo banco -->
    <div v-for="produto in produtos" :key="produto.ID" class="col-md-3 animar">

    <div class="card h-100 shadow-sm border-0">
       <!-- 
          Imagem do produto salva no servidor
          :src monta a URL completa: http://localhost:3000 + /uploads/arquivo.jpg
        -->
        <img
          v-if="produto.IMAGEM"
          :src="`http://localhost:3000${produto.IMAGEM}`"
          class="card-img-top img-produto"
          alt="Imagem do produto"
        >
         <div class="card-body d-flex flex-column">

           <!-- Nome do produto -->
          <h5 class="card-title fw-bold">{{ produto.NOME }}</h5>

          <!-- Descrição do produto -->
          <p class="card-text text-muted small">{{ produto.DESCRICAO }}</p>
           <!-- Preço e botão de comprar -->
          <div class="mt-auto d-flex justify-content-between align-items-center">

             <span class="fw-bold text-success fs-5">
              R$ {{ Number(produto.VALOR).toFixed(2) }}
            </span>
            <!-- Quantidade disponível -->
            <small class="text-muted">Qtd: {{ produto.QUANTIDADE }}</small>
            <button class="btn btn-dark btn-sm">Comprar</button>
          </div>

         </div>




    </div>


    </div>


  </div>

  </div>
  </div>
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
/* 📐 REGRA 1: CLÁSSICA / QUADRADA (1080px x 1080px) -> Proporção 1:1 */
.img-feed-classica {
  width: 100%;
  aspect-ratio: 1 / 1; /* Força a proporção quadrada perfeita */
  object-fit: cover;   /* Centraliza e preenche o espaço sem amassar a foto */
}

/* 📐 REGRA 2: RETRATO / VERTICAL (1080px x 1350px) -> Proporção 4:5 */
.img-feed-retrato {
  width: 100%;
  aspect-ratio: 4 / 5; /* Padrão vertical do Instagram */
  object-fit: cover;
}

/* 📐 REGRA 3: PAISAGEM / HORIZONTAL (1080px x 566px / 538px) -> Proporção ~1.91:1 */
.img-feed-paisagem {
  width: 100%;
  aspect-ratio: 1080 / 538; /* Força exatamente a proporção horizontal desejada */
  object-fit: cover;
}

.card-body {
  background-color: #f8f9fa; 
}
.animar {
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animar.visivel {
  opacity: 1;
  transform: scale(1);
}

/* Imagem quadrada que preenche sem distorcer */
.img-produto {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

/* Hover que levanta o card ao passar o mouse */
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

</style>
<script setup>

import { ref, onMounted } from 'vue'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

// Cria a lista reativa que vai armazenar as postagens do banco
const posts = ref([])
/* Variável reativa que armazena a lista de produtos do banco */
const produtos = ref([])

// O gancho onMounted executa a busca automaticamente assim que a Home abre
onMounted(async () => {
 try {
     /* Busca as postagens do feed */
    posts.value = await ApiMeuBanco.buscarPosts()
    console.log('Postagens carregadas:', posts.value)

     /* Busca os produtos da loja */
    produtos.value = await ApiMeuBanco.buscarProdutos()
    console.log('Produtos carregados:', produtos.value)


  } catch (error) {
    console.error('Erro ao renderizar o feed na Home:', error)
  }

  /* 
    Inicia o observer de scroll DEPOIS de carregar os dados
    Assim os elementos já existem no DOM quando o observer começa
  */
  setTimeout(() => {
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
      if (entry.isIntersecting) {

         /* Adiciona a classe que ativa a animação de zoom */
          entry.target.classList.add('visivel')

           /* Para de observar — anima só uma vez */
          observer.unobserve(entry.target)

      }


     })

   } ,{ threshold: 0.15 })
    /* Observa todos os elementos com a classe .animar */
    document.querySelectorAll('.animar').forEach(el => observer.observe(el))

  },300)

});






</script>
  

  