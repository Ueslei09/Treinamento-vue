import { createRouter, createWebHistory } from 'vue-router'

import TelaPrincipal from  '../Views/TelaPrincipal.vue'
import BuscarDados from    '../Views/BuscarDados.vue'
import TrazerDados from    '../Views/TrazerDados.vue'
import CadastraUsuario from '../Views/CadastraUsuario.vue'
import EntrarUsuario from '../Views/EntrarUsuario.vue'
import PublicarProdutos from '../Views/PublicarProdutos.vue'
import CarrinhoProduto from '@/Views/CarrinhoProduto.vue'
import EditarProduto from '../Views/EditarProduto.vue'
/* Importa a View do CRM */
import PainelCRM from '../Views/PainelCRM.vue'
import GetPagamento from '../Views/GetPagamento.vue'





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
/* Adiciona no array routes */
{
  path: '/crm',
  name: 'Painel CRM',
  component: PainelCRM,
  meta: { requerAutenticacao: true } /* Só logado acessa */
},
/* Adiciona no array routes */
{
  path: '/pagamento',
  name: 'Pagamento',
  component: GetPagamento,
  meta: { requerAutenticacao: true }
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// ✅ Cola o novo no lugar:
router.beforeEach((to, from, next) => {
  const usuarioLogado = localStorage.getItem('user_token')
  const dadosSalvos = localStorage.getItem('dados_usuario')
  const usuario = dadosSalvos ? JSON.parse(dadosSalvos) : null

  if (to.meta.requerAutenticacao && !usuarioLogado) {
    alert('Acesso negado! Você precisa entrar na sua conta.')
    return next('/entrar')
  }

  if (to.meta.requerAdmin && (!usuario || usuario.ADMIN !== 1)) {
    alert('Acesso negado! Área restrita para administradores.')
    return next('/')
  }

  next()
})

export default router
