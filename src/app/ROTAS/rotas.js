module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    
    const pacientesController = require("../CONTROLLERS/CON_pacientes");
    const paciController = new pacientesController();


    app.get("/", (req, res) => {
        res.render('home')
    })

    // -----> Cadastro
    app.get("/cadastroPacientes", (req, res) => {
        res.render('telaDeCadastro')
        console.log("Acabou de usar a porta /cadastroPacientes");
    });
    
    app.post("/inclusaoNovoCliente", paciController.inserirPessoa()); 


    // -----> Login
    app.get("/login", (req, res) => {
        res.render('telaDeLogin');
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

    app.get("/dashboard", (req, res) => {
        if (req.session.user) {
            const paciente = req.session.user; 
            res.render('dashboard', { paciente }); 
        } else {
            res.redirect('/login');
        }
    });

    app.get("/consultas", (req, res) => {
    if (req.session.user) {
        const paciente = req.session.user;

        // Adicione a lógica para buscar as consultas do paciente
        paciController.consultarConsultas(paciente.idPaciente)
            .then(consultas => {
                res.render('consultas', { paciente, consultas });
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).send("Erro ao buscar consultas.");
            });
    } else {
        res.redirect('/login');
    }
});


};
