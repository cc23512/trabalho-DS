const paciDAO = require("../BD/DAO_pacientes");
const bd = require("../../config/database");
const nodemailer = require('nodemailer');


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
    return function (req, res) {
        const PacienteDAO = new paciDAO(bd);
        const { idMedico, idPaciente, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta } = req.body;

        // Agende a consulta
        PacienteDAO.agendarConsultaPac(idMedico, idPaciente, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta)
            .then(() => {
                // Obtenha os detalhes do paciente
                const paciente = req.session.user;

                // Obtenha a última idConsulta
                PacienteDAO.obterUltimaConsultaInserida()
                    .then((idConsulta) => {
                        // Obtenha os detalhes da consulta recém-agendada
                        PacienteDAO.obterDetalhesConsulta(idConsulta)
                            .then(consulta => {
                                // Obtenha os detalhes do médico associado à consulta
                                PacienteDAO.obterTodosOsMedicos(idMedico)
                                    .then(medicos => {
                                        const medico = medicos[0]; // Assumindo que há apenas um médico com o ID fornecido

                                        // Envie o e-mail
                                        PacienteDAO.enviarEmailConsulta(paciente, consulta, medico)
                                            .then(() => {
                                                res.redirect("/consultas");
                                            })
                                            .catch(erro => {
                                                console.log(erro);
                                                res.status(500).send("Erro ao enviar e-mail de confirmação.");
                                            });
                                    })
                                    .catch(erro => {
                                        console.log(erro);
                                        res.status(500).send("Erro ao obter detalhes do médico.");
                                    });
                            })
                            .catch(erro => {
                                console.log(erro);
                                res.status(500).send("Erro ao obter detalhes da consulta.");
                            });
                    })
                    .catch(erro => {
                        console.log(erro);
                        res.status(500).send("Erro ao obter a última consulta inserida.");
                    });
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

    // ---> exiber consulta paciente
    obterDetalhesConsulta(idConsulta) {
        return new Promise((resolve, reject) => {
            const PacienteDAO = new paciDAO(bd); // Crie uma instância do DAO aqui
            PacienteDAO.obterDetalhesConsulta(idConsulta)
                .then(consulta => {
                    resolve(consulta);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao obter detalhes da consulta.");
                });
        });
    }

    // ---> Alterar consulta
    alterarConsultaPac() {
        return function (req, res) {
            const PacienteDAO = new paciDAO(bd);
            const idConsulta = req.params.idConsulta;
            const { dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta } = req.body;

            PacienteDAO.alterarConsultaPac(idConsulta, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta)
                .then(() => {
                    console.log("Consulta alterada com sucesso!");
                    res.redirect("/consultas");
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao alterar a consulta.");
                });
        };
    }

    // ---> excluir consulta paciente
    excluirConsultaPac() {
        return function (req, res) {
            const PacienteDAO = new paciDAO(bd);
            const idConsulta = req.params.idConsulta;

            PacienteDAO.excluirConsultaPac(idConsulta)
                .then(() => {
                    console.log("Consulta excluída com sucesso!");
                    res.redirect("/consultas");
                })
                .catch((erro) => {
                    console.log(erro);
                    res.status(500).send("Erro ao excluir a consulta.");
                });
        };
    }

    

}
module.exports = CON_pacientes;