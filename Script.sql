

create table Medico
(
    idMedico int identity primary key not null,
    nomeMedico varchar(20) not null,
    sobrenomeMed varchar(30) not null,
    especialidade varchar (30) not null

)

create table Paciente
(
    idPaciente int identity primary key not null,
    nomePaciente varchar(20),
    sobrenomePac varchar(30),
    telefone varchar(20),
    email varchar(100) not null,
    senha varchar(20) not null
)

create table Consulta
(
    idConsulta int identity primary key not null,
    idMedico int not null foreign key references Clinica.Medico(idMedico),
    idPaciente int not null foreign key references Clinica.Paciente(idPaciente),
    dataConsulta datetime not null,
    tipoDeConsulta varchar(30) not null,
    statusDaConsulta varchar(30) not null,
)

