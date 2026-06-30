import { defineStore } from 'pinia'
/* 
  defineStore cria um "armazém global" de dados
  que qualquer componente Vue pode acessar e modificar
*/
export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: [],           // 👈 itens do carrinho
    totalItens: 0,
    valorTotal: 0
  }),

  actions: {
    atualizarCarrinho(itens) {
      this.itens = itens

      this.totalItens = itens.reduce(
        (soma, item) => soma + item.QUANTIDADE,
        0
      )

      this.valorTotal = itens.reduce(
        (soma, item) => soma + item.QUANTIDADE * item.VALOR,
        0
      )

      // 💾 salva no localStorage
      localStorage.setItem('carrinho', JSON.stringify(itens))
    },

    restaurarCarrinho() {
      const dados = localStorage.getItem('carrinho')
      if (dados) {
        this.atualizarCarrinho(JSON.parse(dados))
      }
    },

    limparCarrinho() {
      this.itens = []
      this.totalItens = 0
      this.valorTotal = 0
      localStorage.removeItem('carrinho')
    }
  }
})