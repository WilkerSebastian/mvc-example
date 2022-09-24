import App from "./App.js";

const PORT = process.env.PORT || 8080
const app = new App()

app.server.listen(PORT, () => {

    console.log(`servidor rondando na porta ${PORT}, http://localhost:${PORT}/`)

}) 