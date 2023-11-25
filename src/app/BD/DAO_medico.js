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
        // seleciona tudo da consulta "c" e o Paciente.nomePaciente da tabela consulta , entra na tabela paciente, pela consulta.idPaciente
        // e pega o paciente, e interliga com o idMedico fazendo assim printar o nome do paciente na tabela :)
        const sql = "SELECT c.*, p.nomePaciente FROM Consulta c JOIN Paciente p ON c.idPaciente = p.idPaciente WHERE idMedico = ?"; 
        this._bd.query(sql, [idMedico], (erro, resultados) => {
            if (erro) {
                console.log(erro);
                return reject("Erro ao consultar consultas do médico.");
            }
            resolve(resultados);
        });
    });
}

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
}

module.exports = DAO_medico;