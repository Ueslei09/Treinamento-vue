import { createRouter, createWebHistory } from 'vue-router'

import TelaPrincipal from  '../Views/TelaPrincipal.vue'
import BuscarDados from    '../Views/BuscarDados.vue'
import TrazerDados from    '../Views/TrazerDados.vue'
import CadastraUsuario from '../Views/CadastraUsuario.vue'
import EntrarUsuario from '../Views/EntrarUsuario.vue'
import PublicarProdutos from '../Views/PublicarProdutos.vue'
import CarrinhoProduto from '@/Views/CarrinhoProduto.vue'
import EditarProduto from '../Views/EditarProduto.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: TelaPrincipal
},
  {
    path: '/cadastro',
    name: 'Buscar Dados',
    component: BuscarDados,
     meta: { requerAutenticacao: true }// Bloqueia o acesso direto sem login
  },
  {
    path: '/trazer',
    name: 'Trazer Dados',
    component: TrazerDados,
     meta: { requerAutenticacao: true } // Bloqueia o acesso direto sem login
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar Usuário',
    component: CadastraUsuario
  },
  {
    path: '/entrar',
    name: 'Entrar Usuário',
    component: EntrarUsuario
  },
  {
   path: '/publicar-produto',
  name: 'Publicar Produtos',
  component: PublicarProdutos,
  meta: { requerAutenticacao: true } // Só usuário logado pode publicar

  },
  {
  path:'/carrinho-produto',
  name:'Carrinho Produtos',
  component: CarrinhoProduto,
  meta:{ reuqerAutenticacao: true} // Só usuário logado pode publicar
},
/* Adiciona no array routes */
{
  path: '/editar-produto/:id',
  name: 'Editar Produto',
  component: EditarProduto,
  meta: { requerAutenticacao: true }
},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 👮 O GUARDA DA ÁRVORE DE ROTAS (Verifica as permissões antes de carregar a tela)
router.beforeEach((to, from, next) => {
  // Checa se existe a marcação de login salvo no navegador do usuário
  const usuarioLogado = localStorage.getItem('user_token')

  // Se a rota que o usuário quer ir exige autenticação, mas ele NÃO está logado
  if (to.meta.requerAutenticacao && !usuarioLogado) {
    alert('Acesso negado! Você precisa entrar na sua conta para acessar esta funcionalidade.')
    next('/entrar') // Redireciona o usuário direto para a tela de Login
  } else {
    next() // Se estiver logado ou se for uma rota pública, permite a passagem livre
  }
})

export default router
