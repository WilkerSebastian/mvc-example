import App from "./App.js"; // importamos a classe de aplicação

const PORT = process.env.PORT || 8080 // criamos uma variavel que armazena a porta do env ou a 8080
const app = new App() // criamos um novo objeto de aplicação

app.server.listen(PORT, () => { // abrimos o servidor na porta definida

    console.log(`servidor rondando na porta ${PORT}, http://localhost:${PORT}/`)

}) 