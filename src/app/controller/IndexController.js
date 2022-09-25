/*

    A camada de controle é responsável por intermediar as requisições enviadas 
    pelo View com as respostas fornecidas pelo Model, processando os dados que 
    o usuário informou e repassando para outras camadas. 

*/
class IndexController { // exportando a classe IndexController 

    index(req, res) { // index será um método

        return res.render("index")

    }

}

export default new IndexController()