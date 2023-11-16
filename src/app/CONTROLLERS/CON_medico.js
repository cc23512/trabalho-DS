const medDao = require("../BD/DAO_medico");
const bd = require("../../config/database");

class CON_medico{
    inserirMedico() {
        return function(req, res) {
            const MedicoDAO = new medDao(bd);
            const { nomeMedico, sobrenomeMed, especialidade, emailMed, senhaMed } = req.body;

            MedicoDAO.inserirMedicoEJS(nomeMedico, sobrenomeMed, especialidade, emailMed, senhaMed)
                .then(() => {
                    console.log("Registro inserido com sucesso!");
                    res.redirect("/loginMed"); 
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao inserir o registro.");
                });
        };
    }

    // ---> verificação de login
    verificarCredenciaisMed(emailMed, senhaMed) {
        return new Promise((resolve, reject) => {
            const MedicoDAO = new medDao(bd);

            MedicoDAO.buscarMedicoPorCredenciais(emailMed, senhaMed)
                .then(medico => {
                    resolve(medico);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao verificar credenciais.");
                });
        });
    }

    consultarConsultasMed(idMedico) {
        return new Promise((resolve, reject) => {
            const MedicoDAO = new medDao(bd);

            MedicoDAO.consultarConsultasMed(idMedico)
                .then(consultas => {
                    resolve(consultas);
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Erro ao consultar consultas do médico.");
                });
        });
    }

}

module.exports = CON_medico;