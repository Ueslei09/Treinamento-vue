import { createRouter, createWebHistory } from 'vue-router'

import TelaPrincipal from  '../Views/TelaPrincipal.vue'
import BuscarDados from    '../Views/BuscarDados.vue'
import TrazerDados from    '../Views/TrazerDados.vue'
import CadastraUsuario from '../Views/CadastraUsuario.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TelaPrincipal
},
  {
    path: '/cadastro',
    name: 'Buscar Dados',
    component: BuscarDados
  },
  {
    path: '/trazer',
    name: 'Trazer Dados',
    component: TrazerDados
  },
  {
    path: '/cadastrar',
    name: 'Cadastrar Usuário',
    component: CadastraUsuario
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
