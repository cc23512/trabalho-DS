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
    agendarConsultaPac(idMedico, idPaciente, dataConsulta, tipoDeConsulta, statusDaConsulta) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Consulta (idMedico, idPaciente, dataConsulta, tipoDeConsulta, statusDaConsulta) VALUES (?, ?, ?, ?, ?)";

            this._bd.query(sql, [idMedico, idPaciente, dataConsulta, tipoDeConsulta, statusDaConsulta], (erro) => {
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

    alterarConsulta(idConsulta, dataConsulta, tipoDeConsulta, statusDaConsulta) {
    return new Promise((resolve, reject) => {
        // Verifica se os valores estão presentes antes de construir a query SQL
        if (dataConsulta === undefined || tipoDeConsulta === undefined || statusDaConsulta === undefined) {
            reject("Dados de consulta ausentes");
            return;
        }

        const sql = `
            UPDATE Consulta
            SET dataConsulta = ?, tipoDeConsulta = ?, statusDaConsulta = ?
            WHERE idConsulta = ?`;

        this.db.query(sql, [dataConsulta, tipoDeConsulta, statusDaConsulta, idConsulta], (erro, resultado) => {
            if (erro) {
                console.log(erro);
                reject("Erro ao atualizar a consulta.");
            } else {
                resolve();
            }
        });
    });
}
} 

module.exports = DAO_pacientes;