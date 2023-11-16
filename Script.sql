CREATE TABLE Medico (
    idMedico INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nomeMedico VARCHAR(20) NOT NULL,
    sobrenomeMed VARCHAR(30) NOT NULL,
    especialidade VARCHAR(30) NOT NULL,
    emailMed VARCHAR(100) NOT NULL,
    senhaMed VARCHAR(20) NOT NULL
);

CREATE TABLE Paciente (
    idPaciente INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nomePaciente VARCHAR(20),
    sobrenomePac VARCHAR(30),
    telefone VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE Consulta (
    idConsulta INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idMedico INT NOT NULL,
    idPaciente INT NOT NULL,
    dataConsulta DATE NOT NULL,
    horaConsulta TIME NOT NULL,
    tipoDeConsulta VARCHAR(30) NOT NULL,
    statusDaConsulta VARCHAR(30) NOT NULL,
    FOREIGN KEY (idMedico) REFERENCES Medico(idMedico),
    FOREIGN KEY (idPaciente) REFERENCES Paciente(idPaciente)
);
