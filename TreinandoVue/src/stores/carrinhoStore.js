import { defineStore } from 'pinia'
/* 
  defineStore cria um "armazém global" de dados
  que qualquer componente Vue pode acessar e modificar
*/
export const useCarrinhoStore = defineStore('carrinho', {

  /* 
    state = os dados globais do carrinho
    Como um ref() mas acessível em qualquer componente
  */
  state: () => ({
    /* Total de itens no carrinho — aparece no ícone */
    totalItens: 0,
    /* Valor total dos itens — aparece ao lado do ícone */
    valorTotal: 0
  }),

  actions: {
    /* 
      Atualiza o contador e valor total do carrinho
      Chamado sempre que o carrinho mudar
    */
    atualizarCarrinho(itens) {
      /* Soma todas as quantidades dos itens */
      this.totalItens = itens.reduce((soma, item) => soma + item.QUANTIDADE, 0)
      /* Soma todos os valores (quantidade × valor unitário) */
      this.valorTotal = itens.reduce((soma, item) => soma + (item.QUANTIDADE * item.VALOR), 0)
    },

    /* Zera o carrinho após finalizar a compra */
    limparCarrinho() {
      this.totalItens = 0
      this.valorTotal = 0
    }
  }
})