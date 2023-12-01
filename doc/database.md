# Tablas
Orden correcto
1. **`anio` y `carrera`:**
   ```sql
   CREATE TABLE anio (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Nombre varchar(60) NOT NULL,
     PRIMARY KEY (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

   CREATE TABLE carrera (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Nombre varchar(60) NOT NULL,
     PRIMARY KEY (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
   ```

2. **`concurso`:**
   ```sql
   CREATE TABLE concurso (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Nombre varchar(100) NOT NULL,
     Descripcion varchar(255) DEFAULT NULL,
     Estado enum('no-iniciado','iniciado','finalizado') NOT NULL,
     Tipo enum('votacion','puntaje') NOT NULL,
     Img varchar(255) DEFAULT 'concurso',
     PRIMARY KEY (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
   ```

3. **`categoria`:**
   ```sql
   CREATE TABLE categoria (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Nombre varchar(100) NOT NULL,
     Descripcion varchar(255) DEFAULT NULL,
     IdConcurso int(11) NOT NULL,
     PRIMARY KEY (Id),
     KEY IdConcurso (IdConcurso),
     CONSTRAINT categoria_ibfk_1 FOREIGN KEY (IdConcurso) REFERENCES concurso (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
   ```

4. **`participante`:**
   ```sql
   CREATE TABLE participante (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Nombre varchar(100) NOT NULL,
     Codigo varchar(100) NOT NULL,
     IdCategoria int(11) NOT NULL,
     PRIMARY KEY (Id),
     KEY IdCategoria (IdCategoria),
     CONSTRAINT participante_ibfk_1 FOREIGN KEY (IdCategoria) REFERENCES categoria (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;
   ```

5. **`puntaje`:**
   ```sql
   CREATE TABLE puntaje (
     Id int(11) NOT NULL AUTO_INCREMENT,
     IdParticipante int(11) NOT NULL,
     Puntaje float NOT NULL,
     PRIMARY KEY (Id),
     KEY IdParticipante (IdParticipante),
     CONSTRAINT puntaje_ibfk_1 FOREIGN KEY (IdParticipante) REFERENCES participante (Id)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```

6. **`estudiante`:**
   ```sql
   CREATE TABLE estudiante (
     Id int(11) NOT NULL AUTO_INCREMENT,
     Codigo varchar(20) NOT NULL,
     IdAnio int(11) NOT NULL,
     IdCarrera int(11) NOT NULL,
     PRIMARY KEY (Id),
     KEY IdAnio (IdAnio),
     KEY IdCarrera (IdCarrera),
     CONSTRAINT estudiante_ibfk_1 FOREIGN KEY (IdAnio) REFERENCES anio (Id),
     CONSTRAINT estudiante_ibfk_2 FOREIGN KEY (IdCarrera) REFERENCES carrera (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=956 DEFAULT CHARSET=utf8;
   ```

7. **`voto`:**
   ```sql
   CREATE TABLE voto (
     Id int(11) NOT NULL AUTO_INCREMENT,
     IdEstudiante int(11) NOT NULL,
     IdParticipante int(11) NOT NULL,
     PRIMARY KEY (Id),
     KEY IdEstudiante (IdEstudiante),
     KEY IdParticipante (IdParticipante),
     CONSTRAINT voto_ibfk_1 FOREIGN KEY (IdEstudiante) REFERENCES estudiante (Id),
     CONSTRAINT voto_ibfk_2 FOREIGN KEY (IdParticipante) REFERENCES participante (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=1236 DEFAULT CHARSET=utf8;
   ```
