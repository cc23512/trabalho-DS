class DAO_pacientes{

    // construtor
    constructor(bd){
        this._bd = bd;
    }
    
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



} // end da classe

module.exports = DAO_pacientes;