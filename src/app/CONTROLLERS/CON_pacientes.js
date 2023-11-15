const paciDAO = require("../BD/DAO_pacientes");
const bd = require("../../config/database");

class CON_pacientes{
    // ...

    inserirPessoa() {
        return function(req, res) {
            const PacienteDAO = new paciDAO(bd);
            const { nome, sobrenome, telefone, email, senha } = req.body;

            PacienteDAO.inserirPessoaEJS(nome, sobrenome, telefone, email, senha)
                .then(() => {
                    console.log("Registro inserido com sucesso!");
                    res.send("Chegou aqui o meninao"); // Redireciona o usuário para a página inicial ou outra página desejada
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao inserir o registro.");
                });
        };
    }

    verificarCredenciais(email, senha) {
        return new Promise((resolve, reject) => {
            const PacienteDAO = new paciDAO(bd);

            PacienteDAO.buscarPacientePorCredenciais(email, senha)
                .then(paciente => {
                    resolve(paciente);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao verificar credenciais.");
                });
        });
    }

    consultarConsultas(idPaciente) {
        return new Promise((resolve, reject) => {
            const PacienteDAO = new paciDAO(bd);

            PacienteDAO.consultarConsultas(idPaciente)
                .then(consultas => {
                    resolve(consultas);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao consultar consultas.");
                });
        });
    }

}

module.exports = CON_pacientes;