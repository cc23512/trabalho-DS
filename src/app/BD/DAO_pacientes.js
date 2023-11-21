const nodemailer = require('nodemailer');


class DAO_pacientes{

    // construtor
    constructor(bd){
        this._bd = bd;
    }
    
    // ---> cadastro paciente no bd
    inserirPessoaEJS(nome, sobrenome, telefone, email, senha) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Paciente (nomePaciente, sobrenomePac, telefone, email, senha) VALUES (?, ?, ?, ?, ?)";

            this._bd.query(sql, [nome, sobrenome, telefone, email, senha], (erro) => {
            if (erro) {
                console.log(erro);
                return reject("Erro ao inserir o registro.");
            }
            resolve();
            });
        });
    }
    
    // ---> verificação de Login
    buscarPacientePorCredenciais(email, senha) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Paciente WHERE email = ? AND senha = ?";
            this._bd.query(sql, [email, senha], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao buscar paciente por credenciais.");
                }
                if (resultados.length === 0) {
                    return resolve(null); // Nenhum paciente encontrado
                }
                const paciente = resultados[0];
                resolve(paciente);
            });
        });
    }

    // ---> consultar Consultas
    consultarConsultas(idPaciente) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT consulta.*, m.nomeMedico
                FROM Consulta AS consulta
                JOIN Medico m ON consulta.idMedico = m.idMedico
                WHERE consulta.idPaciente = ?;
            `;

            this._bd.query(sql, [idPaciente], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao consultar consultas.");
                }

                resolve(resultados);
            });
        });
    }

    // ---> agender Consultas
    agendarConsultaPac(idMedico, idPaciente, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Consulta (idMedico, idPaciente, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta) VALUES (?, ?, ?, ?, ?, ?)";

            this._bd.query(sql, [idMedico, idPaciente, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta], (erro) => {
            if (erro) {
                console.log(erro);
                return reject("Erro ao inserir o registro.");
            }
            resolve();
            });
        });
    }

    // ---> obter dados dos medicos para o form agender consulta
    obterTodosOsMedicos() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Medico";
            this._bd.query(sql, (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao obter a lista de médicos.");
                }
                resolve(resultados);
            });
        });
    }

    // ---> alterar consulta
    alterarConsultaPac(idConsulta, dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE Consulta SET dataConsulta = ?, horaConsulta = ?, tipoDeConsulta = ?, statusDaConsulta = ? WHERE idConsulta = ?";
            this._bd.query(sql, [dataConsulta, horaConsulta, tipoDeConsulta, statusDaConsulta, idConsulta], (erro) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao atualizar a consulta.");
                }
                resolve();
            });
        });
    }

    // exibir consulta paciente
    obterDetalhesConsulta(idConsulta) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Consulta WHERE idConsulta = ?";
            this._bd.query(sql, [idConsulta], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao obter detalhes da consulta.");
                }
                if (resultados.length === 0) {
                    return resolve(null); // Nenhuma consulta encontrada
                }
                const consulta = resultados[0];
                resolve(consulta);
            });
        });
    }

    // excluir consulta paciente
    excluirConsultaPac(idConsulta) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Consulta WHERE idConsulta = ?";
            this._bd.query(sql, [idConsulta], (erro) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao excluir a consulta.");
                }
                resolve();
            });
        });
    }

    enviarEmailConsulta(paciente, consulta, medico) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cc23512@g.unicamp.br', // substitua pelo seu e-mail do Gmail
            pass: 'abacatedoce966', // substitua pela sua senha do Gmail
        },
    });

    console.log(consulta);

    // Verifique se consulta não é null ou undefined antes de acessar suas propriedades
    if (consulta) {
        const mailOptions = {
            from: 'cc23512@g.unicamp.br',
            to: paciente.email,
            subject: 'Consulta Agendada',
            html: `
                <p>Olá ${paciente.nome},</p>
                <p>Sua consulta foi agendada com sucesso para o médico ${medico.nomeMedico}.</p>
                <p>Data: ${consulta.dataConsulta}</p>
                <p>Hora: ${consulta.horaConsulta}</p>
                <p>Tipo de Consulta: ${consulta.tipoDeConsulta}</p>
                <p>Status: ${consulta.statusDaConsulta}</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
        });
    } else {
        console.log('Erro: Consulta é nula ou indefinida.');
    }
    

    
    }

    obterUltimaConsultaInserida() {
            return new Promise((resolve, reject) => {
                const sql = "SELECT MAX(idConsulta) AS ultimaConsulta FROM Consulta";

                this._bd.query(sql, (erro, resultados) => {
                    if (erro) {
                        console.log(erro);
                        return reject("Erro ao obter a última consulta inserida.");
                    }

                    const ultimaConsulta = resultados[0].ultimaConsulta;
                    resolve(ultimaConsulta);
                });
            });
        }


   
} 

module.exports = DAO_pacientes;