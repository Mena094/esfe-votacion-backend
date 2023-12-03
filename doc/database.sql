CREATE TABLE `Concurso` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Estado` ENUM ('no-iniciado', 'iniciado', 'finalizado') NOT NULL,
  `Tipo` ENUM ('votacion', 'puntaje') NOT NULL,
  `Img` varchar(255) DEFAULT "concurso"
);

CREATE TABLE `Categoria` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `IdConcurso` int(11) NOT NULL
);

CREATE TABLE `Participante` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Codigo` varchar(100) NOT NULL,
  `IdCategoria` int(11) NOT NULL
);

CREATE TABLE `Puntaje` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `IdParticipante` int(11) NOT NULL,
  `Puntaje` float NOT NULL
);

CREATE TABLE `Juez` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Representa` varchar(100) NOT NULL,
  `Codigo` varchar(6) NOT NULL
);

CREATE TABLE `Voto` (
  `Id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `IdJuez` int(11) NOT NULL,
  `IdParticipante` int(11) NOT NULL,
  `Calificacion` int NOT NULL
);

CREATE INDEX `IdConcurso` ON `Categoria` (`IdConcurso`);

CREATE INDEX `IdCategoria` ON `Participante` (`IdCategoria`);

CREATE INDEX `IdParticipante` ON `Puntaje` (`IdParticipante`);

CREATE INDEX `IdJuez` ON `Voto` (`IdJuez`);

CREATE INDEX `IdParticipante` ON `Voto` (`IdParticipante`);

ALTER TABLE `Categoria` ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`IdConcurso`) REFERENCES `Concurso` (`Id`);

ALTER TABLE `Participante` ADD CONSTRAINT `participante_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `Categoria` (`Id`);

ALTER TABLE `Puntaje` ADD CONSTRAINT `puntaje_ibfk_1` FOREIGN KEY (`IdParticipante`) REFERENCES `Participante` (`Id`);

ALTER TABLE `Voto` ADD CONSTRAINT `voto_ibfk_1` FOREIGN KEY (`IdJuez`) REFERENCES `Juez` (`Id`);

ALTER TABLE `Voto` ADD CONSTRAINT `voto_ibfk_2` FOREIGN KEY (`IdParticipante`) REFERENCES `Participante` (`Id`);
