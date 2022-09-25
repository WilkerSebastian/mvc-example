// a classe que tem os métodos para validamos um CPF
class CPF {
    constructor() {
        "user_strict"; function r(r) {
            for (var t = null, n = 0; 9 > n; ++n)
                t += r.toString().charAt(n) * (10 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i
        } function t(r) {
            for (var t = null, n = 0; 10 > n; ++n)
                t += r.toString().charAt(n) * (11 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i
        } var n = "CPF Inválido", i = "CPF Válido"; this.gera = function () {
            for (var n = "", i = 0; 9 > i; ++i)
                n += Math.floor(9 * Math.random()) + ""; var o = r(n), a = n + "-" + o + t(n + "" + o); return a
        }, this.valida = function (o) {
            for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a.substring(9, 11), v = 0; 10 > v; v++)
                if ("" + u + f == "" + v + v + v + v + v + v + v + v + v + v + v)
                    return n; var c = r(u), e = t(u + "" + c); return f.toString() === c.toString() + e.toString() ? i : n
        }
    }
    validaBoolean(cpf) {

        return this.valida(cpf) == "CPF Válido"

    }
}

// função para validar email
function validarEmail(email) {
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

// função para validar o formulario
function validar() {

    let valido = true

    // array dos htmls 
    const campos = [

        $("#nome"),
        $("#email"),
        $("#cpf"),
        $("#data_nascimento"),
        $("#senha")

    ]

    // passamos verificando se o input está vazio
    campos.forEach((elemento) => {

        if (elemento.val().trim() == "") {

            valido = false
            elemento.css("border", "1px solid red")

        } else {

            elemento.css("border", "none")

        }

    })

    // validamos o campo email
    if(!validarEmail(campos[1].val())) {

        valido = false
        campos[1].css("border", "1px solid red")

    } else {

        campos[1].css("border", "none")

    }

    // validamos o campo CPF
    if(!new CPF().validaBoolean(campos[2].val())) {

        valido = false
        campos[2].css("border", "1px solid red")

    } else {

        campos[2].css("border", "none")

    }

    return valido

}