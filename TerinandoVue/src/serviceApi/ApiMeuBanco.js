import axios from 'axios';// Importa a biblioteca axios para fazer requisições HTTP

const api_url_Banco = 'http://localhost:3000/clientes-';// Define a URL base para a API de clientes do banco
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
            trow error; // Lança o erro para ser tratado pelo chamador
        }
    }
}