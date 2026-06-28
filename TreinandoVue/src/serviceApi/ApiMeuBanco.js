import axios from 'axios';// Importa a biblioteca axios para fazer requisições HTTP

const api_url_Banco = 'http://localhost:3000/clientes';// Define a URL base para a API de clientes do banco
// Define um objeto ApiMeuBanco que contém métodos para interagir com a API do banco
export const ApiMeuBanco = {
    // Define um método assíncrono listar para obter a lista de clientes do banco
    async listar(){
        // Tenta fazer a requisição GET para a API do banco
        try{
            const resposta = await axios.get(api_url_Banco);// Faz a requisição GET para a URL definida e aguarda a resposta
            // Retorna os dados da resposta, que devem conter a lista de clientes
            return resposta.data;
        }
        // Se ocorrer um erro durante a requisição, ele será capturado aqui
        catch(error){
            console.error('Erro ao listar clientes:', error);// Loga o erro para 
            throw error; // Lança o erro para ser tratado pelo chamador
        }
    },

 // ADICIONE ESTE NOVO MÉTODO PARA O LOGIN:
  async login(EMAIL, SENHA) {
    try {
        // CORREÇÃO: Filtrando com EMAIL e SENHA em maiúsculas na URL
        const resposta = await axios.get(`${api_url_Banco}?EMAIL=${EMAIL}&SENHA=${SENHA}`);

            // Verifica se a API encontrou o usuário no Array
        if (resposta.data && resposta.data.length > 0) {
            return resposta.data[0]; // Retorna apenas o usuário logado
        } else {
            throw new Error('E-mail ou senha incorretos.');
        }
    } catch (error) {
      console.error('Erro ao efetuar login no banco:', error);
      throw error; // Lança o erro para o componente Vue exibir a mensagem na tela
    }
  },
  // 📝 ADICIONE ESTE MÉTODO: Busca os posts do Firebird para mostrar na Home
  async buscarPosts() {
    try {
      const resposta = await axios.get('http://localhost:3000/postagens')
      return resposta.data
    } catch (error) {
      console.error('Erro ao buscar postagens do Firebird:', error)
      throw error
    }
  },
    // 📝 ADICIONE ESTE MÉTODO: Envia uma nova postagem do Vue para o Node salvar no Firebird
  async salvarPost(dadosPost) {
    try {
      const resposta = await axios.post('http://localhost:3000/postagens', dadosPost)
      return resposta.data
    } catch (error) {
      console.error('Erro ao salvar postagem no Firebird:', error)
      throw error
    }
  },

  // ✅ NOVO: Busca todos os produtos cadastrados para exibir na loja
  async buscarProdutos() {
    try {
      const resposta = await axios.get('http://localhost:3000/produtos')
      return resposta.data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }


  },
// ✅ NOVO: Envia o formulário com imagem para cadastrar um produto no banco
  // formData = objeto FormData que contém texto + arquivo de imagem juntos
  async salvarProduto(formData) {
   try {
     const resposta = await axios.post('http://localhost:3000/produtos', formData, {
     // Deixa o axios detectar automaticamente o Content-Type como multipart/form-data
        // Necessário para o Multer no servidor conseguir ler o arquivo enviado
        headers: { 'Content-Type': 'multipart/form-data' }

     })
     return resposta.data
   


   }catch (error) {
      console.error('Erro ao salvar produto:', error)
      throw error
    }

  },
   /* ========================================
     MÉTODOS DO CARRINHO
     ======================================== */

  /* 
    Busca todos os itens do carrinho do usuário logado
    email = e-mail do usuário para filtrar no banco
  */

     async buscarCarrinho(email) {

      try {

         const resposta = await axios.get(`http://localhost:3000/carrinho/${email}`)
      return resposta.data

      }catch (error) {
      console.error('Erro ao buscar carrinho:', error)
      throw error
    }


     },
     /* 
    Adiciona um produto ao carrinho
    Se o produto já existir, o servidor soma a quantidade automaticamente
  */

     async atualizarQuantidade(id, QUANTIDADE, USUARIO_EMAIL) {

      try {

          const resposta = await axios.put(`http://localhost:3000/carrinho/${id}`, {
              QUANTIDADE,     /* Nova quantidade */
        USUARIO_EMAIL   /* E-mail do usuário para o log do CRM */

          });
           return resposta.data

      }catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
      throw error
    }
     },

      /* 
    Remove um item do carrinho
    id = ID do item no carrinho
  */

     async removerDoCarrinho(id, USUARIO_EMAIL, PRODUTO_ID) {

        try {
            const resposta = await axios.delete(`http://localhost:3000/carrinho/${id}`, {

                data: { USUARIO_EMAIL, PRODUTO_ID } /* axios.delete envia body dentro de 'data' */

            });
             return resposta.data

        } catch (error) {
      console.error('Erro ao remover do carrinho:', error)
      throw error
    }

     },

     /* ========================================
     MÉTODOS DO PEDIDO
     ======================================== */

  /*  Finaliza a compra enviando todos os itens selecionados
    USUARIO_EMAIL = quem está comprando
    ITENS = array de produtos selecionados no carrinho
    VALOR_TOTAL = soma de todos os itens
  */

     async finalizarPedido(USUARIO_EMAIL, ITENS, VALOR_TOTAL) {

      try {
          const resposta = await axios.post('http://localhost:3000/pedido', {

            USUARIO_EMAIL,
            ITENS,        /* Ex: [{PRODUTO_ID: 1, NOME: 'Foto', VALOR: 50, QUANTIDADE: 2}] */
             VALOR_TOTAL
          });
          return resposta.data

      }catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      throw error
    }

     },

     /* ========================================
     MÉTODOS DO CRM
     ======================================== */

  /* 
    Busca todos os logs do CRM para a tela de análise
    de vendas perdidas e comportamento dos clientes
  */
  async buscarLogsCRM() {
    try {
      const resposta = await axios.get('http://localhost:3000/crm')
      return resposta.data
    } catch (error) {
      console.error('Erro ao buscar logs CRM:', error)
      throw error
    }
  }

}
  
