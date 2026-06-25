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
       // Faz um GET na rota de clientes filtrando pelo e-mail e senha digitados
            const resposta = await axios.get(`${api_url_Banco}?email=${EMAIL}&senha=${SENHA}`);
            
            // O JSON Server retorna um array. Se encontrar o usuário, o tamanho será maior que 0
            if (resposta.data.length > 0) {
                return resposta.data[0]; // Retorna os dados do usuário encontrado
            } else {
                // Se o array vier vazio, cria um erro manualmente para avisar que a senha está errada
                throw new Error('E-mail ou senha incorretos.');
            }
    } catch (error) {
      console.error('Erro ao efetuar login no banco:', error);
      throw error; // Lança o erro para o componente Vue exibir a mensagem na tela
    }
  }
}
  
