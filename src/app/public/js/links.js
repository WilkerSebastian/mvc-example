/*

    Base64 é um algoritmo de codificação (encoding) que permite transformar qualquer caractere 
    de qualquer idioma em um alfabeto que consiste em letras latinas, dígitos e sinais. 
    Com isso podemos converter caracteres especiais como os logogramas chineses, emoji e até 
    imagens em uma sequência “legível” (para qualquer computador), que pode ser salvo e/ou 
    transferido para qualquer outro lugar. É utilizado frequentemente para transmitir dados binários 
    por meio de transmissões que lidam apenas com texto, como, por exemplo, para enviar imagens e 
    arquivos em anexo por e-mail.

    E nesse caso estamos usando apenas para demonstrar que nunca é bom deixar a mostra informações 
    como id sem criptografia, por mas que base64 não é um algoritmo de criptografia, ele ira servir
    para não deixar o id de forma númerica na URL

    exemplo

    sem criptografia, perceba que p usuario poderia simplesmente mudar o número na URL e teria acesso indevido
    /user/edit/1

    com criptografia de base64
    /user/edit/MQ==

    então num caso real use uma criptografia de verdade como usamos no exemplo da senha do usuario

*/

const editar = id => window.location.href = `/user/edit/${Base64.encode(id)}` // função que redireciona para pagina de edição do usuario

// função que recebe um id e nome
function deletar(id , nome)  {

    // redirecionamos a pagina para deletar o ususario mas antes pedimos confirmação
    window.confirm(`deseja realmente excluir o usuario ${nome}?`) ? window.location.href = `/user/del/${Base64.encode(id)}` : null

}