const paciDAO = require("../BD/DAO_pacientes");
const bd = require("../../config/database");

class CON_pacientes{
    // ...

    // cadastro paciente no bd
    inserirPessoa() {
        return function(req, res) {
            const PacienteDAO = new paciDAO(bd);
            const { nome, sobrenome, telefone, email, senha } = req.body;

            PacienteDAO.inserirPessoaEJS(nome, sobrenome, telefone, email, senha)
                .then(() => {
                    console.log("Registro inserido com sucesso!");
                    res.redirect("/login"); 
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao inserir o registro.");
                });
        };
    }

    // ---> verificação de login
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

    // ---> consultar consultas
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

    // ---> agender Consultas
    cadastrarConsultaPac() {
        return function(req, res) {
            const PacienteDAO = new paciDAO(bd);
            const { idMedico, idPaciente, dataConsulta, tipoDeConsulta, statusDaConsulta } = req.body;

            PacienteDAO.agendarConsultaPac(idMedico, idPaciente, dataConsulta, tipoDeConsulta, statusDaConsulta)
                .then(() => {
                    console.log("Registro inserido com sucesso!");
                    res.redirect("/consultas"); 
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao inserir o registro.");
                });
        };
    }

    // ---> obter dados dos medicos para o form agender consulta
    obterListaDeMedicos() {
        return new Promise((resolve, reject) => {
            const PacienteDAO = new paciDAO(bd);  // Certifique-se de ter um DAO para os médicos
            PacienteDAO.obterTodosOsMedicos()
                .then(medicos => {
                    resolve(medicos);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao obter a lista de médicos.");
                });
        });
    }

    consultarConsultaPorId(req, res, next) {
        if (req.session.user) {
            const paciente = req.session.user;
            const idConsulta = req.params.idConsulta;

            const PacienteDAO = new paciDAO(bd);

            PacienteDAO.alterarConsulta(idConsulta)
                .then(consulta => {
                    res.render('../views/paciente/consultas/alterarConsulta', { paciente, consulta });
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao obter os detalhes da consulta para alteração.");
                });
        } else {
            res.redirect('/login');
        }
    }

    alterarConsulta(idConsulta, dataConsulta, tipoDeConsulta, statusDaConsulta) {
        return new Promise((resolve, reject) => {
            const PacienteDAO = new paciDAO(bd);

            PacienteDAO.alterarConsulta(idConsulta, dataConsulta, tipoDeConsulta, statusDaConsulta)
                .then(() => {
                    resolve();
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao alterar a consulta.");
                });
        });
    }
}



module.exports = CON_pacientes;