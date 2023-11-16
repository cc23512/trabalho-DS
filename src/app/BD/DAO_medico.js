class DAO_medico{
    
    constructor(bd){
        this._bd = bd;
    };

    inserirMedicoEJS(nomeMedico, sobrenomeMed, especialidade, emailMed, senhaMed) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Medico (nomeMedico, sobrenomeMed, especialidade, emailMed, senhaMed) VALUES (?, ?, ?, ?, ?)";

            this._bd.query(sql, [nomeMedico, sobrenomeMed, especialidade, emailMed, senhaMed], (erro) => {
            if (erro) {
                console.log(erro);
                return reject("Erro ao inserir o registro.");
            }
            resolve();
            });
        });
    }

    // ---> verificação de Login
    buscarMedicoPorCredenciais(emailMed, senhaMed) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Medico WHERE emailMed = ? AND senhaMed = ?";
            this._bd.query(sql, [emailMed, senhaMed], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao buscar paciente por credenciais.");
                }
                if (resultados.length === 0) {
                    return resolve(null); // Nenhum paciente encontrado
                }
                const medico = resultados[0];
                resolve(medico);
            });
        });
    }

    consultarConsultasMed(idMedico) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Consulta WHERE idMedico = ?";
            this._bd.query(sql, [idMedico], (erro, resultados) => {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao consultar consultas do médico.");
                }
                resolve(resultados);
            });
        });
    }
}

module.exports = DAO_medico;