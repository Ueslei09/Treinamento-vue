import { defineStore } from 'pinia'
import { ApiMeuBanco } from '../serviceApi/ApiMeuBanco.js'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    /* Lista de itens do carrinho */
    itens: [],
    /* Total de itens — aparece no ícone */
    totalItens: 0,
    /* Valor total — aparece ao lado do ícone */
    valorTotal: 0
  }),

  actions: {
    /* Atualiza o store com os itens recebidos */
    atualizarCarrinho(itens) {
      this.itens = itens

      /* Soma todas as quantidades */
      this.totalItens = itens.reduce(
        (soma, item) => soma + item.QUANTIDADE, 0
      )

      /* Soma todos os valores */
      this.valorTotal = itens.reduce(
        (soma, item) => soma + item.QUANTIDADE * item.VALOR, 0
      )
    },

    /* 
      Busca o carrinho do banco usando o e-mail do usuário
      Chamado ao navegar entre páginas e ao fazer login
    */
    async restaurarCarrinho(email) {
      try {
        /* Busca os itens do banco — não do localStorage */
        const itens = await ApiMeuBanco.buscarCarrinho(email)
        this.atualizarCarrinho(itens)
      } catch (error) {
        console.error('Erro ao restaurar carrinho:', error)
      }
    },

    /* Zera o carrinho após logout ou finalizar compra */
    limparCarrinho() {
      this.itens = []
      this.totalItens = 0
      this.valorTotal = 0
    }
  }
})