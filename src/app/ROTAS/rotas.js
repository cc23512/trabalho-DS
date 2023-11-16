module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    
    const pacientesController = require("../CONTROLLERS/CON_pacientes");
    const paciController = new pacientesController();


    app.get("/", (req, res) => {
        res.render('../views/home/home')
    })

    // -----> Cadastro
    app.get("/cadastroPacientes", (req, res) => {
        res.render('../views/cadastro/telaDeCadastro')
        console.log("Acabou de usar a porta /cadastroPacientes");
    });
    app.post("/inclusaoNovoCliente", paciController.inserirPessoa()); 
    
    
    // -----> Login
    app.get("/login", (req, res) => {
        res.render('../views/paciente/telaDeLogin');
    });

    app.post("/login", (req, res) => {
        const { email, senha } = req.body;
        
        paciController.verificarCredenciais(email, senha)
            .then(paciente => {
                if (paciente) {
                    req.session.user = paciente;
                    res.redirect('/dashboard');
                    console.log(paciente);
                } else {
                    res.redirect('/login');
                }
            })
            .catch(erro => {
                console.log(erro);
                res.redirect('/login')
            });
    });
        
    // -----> Dashboard
    app.get("/dashboard", (req, res) => {
        if (req.session.user) {
            const paciente = req.session.user; 
            res.render('../views/paciente/dashboard', { paciente }); 
        } else {
            res.redirect('/login');
        }
    });
        

    // -----> Tabela Consultas
    app.get("/consultas", (req, res) => {
        if (req.session.user) {
            const paciente = req.session.user;
            
        
            paciController.consultarConsultas(paciente.idPaciente)
            .then(consultas => {
                res.render('../views/paciente/consultas/consultas', { paciente, consultas });
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).send("Erro ao buscar consultas.");
            });
        } else {
            res.redirect('/login');
        }
    });

    // -----> Agender Consultas
    app.get("/agendarConsultaPac", (req, res) => {
        if (req.session.user) {
            const paciente = req.session.user;
        
            paciController.obterListaDeMedicos()
                .then(medicos => {
                    res.render('../views/paciente/consultas/agendar', { paciente, medicos });
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao obter a lista de médicos.");
                });
        } else {
            res.redirect('/login');
        }
    });
    app.post("/agendar", paciController.cadastrarConsultaPac());

    // -----> Alterar consulta
    app.get("/alterarConsulta/:idConsulta", (req, res) => {
        if (req.session.user) {
            const paciente = req.session.user;
            const idConsulta = req.params.idConsulta;

            paciController.obterDetalhesConsulta(idConsulta)
                .then(consulta => {
                    res.render('../views/paciente/consultas/alterarConsulta', { paciente, consulta, idConsulta });
                    console.log(consulta);
                })
                .catch(erro => {
                    console.log(erro);
                    res.status(500).send("Erro ao obter detalhes da consulta.");
                });
        } else {
            res.redirect('/login');
        }
    });

    // Rota para lidar com o envio do formulário de alteração
    // Rota para lidar com o envio do formulário de alteração
    app.post("/alterarConsulta/:idConsulta", paciController.alterarConsultaPac());


    
};
