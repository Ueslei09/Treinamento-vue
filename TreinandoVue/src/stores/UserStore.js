import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null
  }),

  getters: {
    isLogado: (state) => !!state.usuario,
    isAdmin: (state) => Number(state.usuario?.ADMIN) === 1
  },

  actions: {
    setUsuario(usuario) {
      this.usuario = usuario
      localStorage.setItem('dados_usuario', JSON.stringify(usuario))
    },

    carregarUsuario() {
      const dados = localStorage.getItem('dados_usuario')
      if (dados) {
        this.usuario = JSON.parse(dados)
      }
    },

    logout() {
      this.usuario = null
      localStorage.removeItem('dados_usuario')
      localStorage.removeItem('user_token')
    }
  }
})