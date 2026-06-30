import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null
  }),

  getters: {
    isAdmin: (state) => state.usuario?.ADMIN === 1,
    estaLogado: (state) => !!state.usuario
  },

  actions: {
    carregarUsuario() {
      const dados = localStorage.getItem('dados_usuario')
      if (dados) {
        this.usuario = JSON.parse(dados) // 🔥 ponto crítico
      }
    },

    login(usuario) {
      this.usuario = usuario
      localStorage.setItem('dados_usuario', JSON.stringify(usuario))
    },

    logout() {
      this.usuario = null
      localStorage.removeItem('dados_usuario')
    }
  }
})