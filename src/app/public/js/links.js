const editar = id => window.location.href = `/user/edit/${Base64.encode(id)}`

function deletar(id , nome)  {

    window.confirm(`deseja realmente excluir o usuario ${nome}?`) ? window.location.href = `/user/del/${Base64.encode(id)}` : null

}