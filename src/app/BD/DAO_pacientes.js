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

    consultarEmail(idConsulta) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT consulta.*, m.nomeMedico
                FROM Consulta AS consulta
                JOIN Medico m ON consulta.idMedico = m.idMedico
                WHERE consulta.idConsulta = ?;
            `;

            this._bd.query(sql, [idConsulta], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao consultar consultas.");
                }

                // Supondo que o ID da consulta seja único, pegamos apenas o primeiro resultado
                const consulta = resultados[0];
                resolve(consulta);
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