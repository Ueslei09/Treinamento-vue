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
  }
}
  
