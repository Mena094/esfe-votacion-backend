
## Endpoints

### Autenticación

#### Obtener Token de Administrador

- **Endpoint**: `POST /api/auth`
- **Descripción**: Autentica al administrador y devuelve un token JWT.
- **Parámetros de Entrada**:
  - `email`: Correo electrónico del administrador.
  - `password`: Contraseña del administrador.

#### Verificar Token

- **Endpoint**: `POST /api/auth/verify`
- **Descripción**: Verifica la validez del token JWT.

#### Obtener Token de Estudiante

- **Endpoint**: `POST /api/auth/estudiante`
- **Descripción**: Autentica a un estudiante y devuelve un token JWT.
- **Parámetros de Entrada**:
  - `codigo`: Código único del estudiante.

### Categoría

#### Obtener Todas las Categorías

- **Endpoint**: `GET /api/categoria`
- **Descripción**: Obtiene todas las categorías.

#### Obtener Participantes por Categoría

- **Endpoint**: `GET /api/categoria/:Id/participante`
- **Descripción**: Obtiene todos los participantes de una categoría específica.

#### Crear Nueva Categoría

- **Endpoint**: `POST /api/categoria`
- **Descripción**: Crea una nueva categoría.
- **Parámetros de Entrada**:
  - `Nombre`: Nombre de la categoría.
  - `Descripcion`: Descripción de la categoría.

#### Actualizar Categoría

- **Endpoint**: `PUT /api/categoria`
- **Descripción**: Actualiza una categoría existente.
- **Parámetros de Entrada**:
  - `Id`: ID de la categoría a actualizar.
  - `Nombre`: Nuevo nombre de la categoría.
  - `Descripcion`: Nueva descripción de la categoría.

#### Eliminar Categoría

- **Endpoint**: `DELETE /api/categoria/:Id`
- **Descripción**: Elimina una categoría según su ID.

### Concurso

#### Obtener Todos los Concursos

- **Endpoint**: `GET /api/concurso`
- **Descripción**: Obtiene todos los concursos.

#### Obtener Categorías por Concurso

- **Endpoint**: `GET /api/concurso/:Id/categoria`
- **Descripción**: Obtiene todas las categorías de un concurso específico.

#### Crear Nuevo Concurso

- **Endpoint**: `POST /api/concurso`
- **Descripción**: Crea un nuevo concurso.
- **Parámetros de Entrada**:
  - `Nombre`: Nombre del concurso.
  - `Descripcion`: Descripción del concurso.
  - `Estado`: Estado del concurso ("no-iniciado", "iniciado", "finalizado").
  - `Tipo`: Tipo de concurso ("votacion", "puntaje").
  - `Img`: URL de la imagen asociada al concurso (opcional).

#### Actualizar Concurso

- **Endpoint**: `PUT /api/concurso`
- **Descripción**: Actualiza un concurso existente.
- **Parámetros de Entrada**:
  - `Id`: ID del concurso a actualizar.
  - `Nombre`: Nuevo nombre del concurso.
  - `Descripcion`: Nueva descripción del concurso.
  - `Estado`: Nuevo estado del concurso.
  - `Tipo`: Nuevo tipo de concurso.
  - `Img`: Nueva URL de la imagen asociada al concurso (opcional).

#### Eliminar Concurso

- **Endpoint**: `DELETE /api/concurso/:Id`
- **Descripción**: Elimina un concurso según su ID

.

### Estadísticas

#### Obtener Todas las Estadísticas

- **Endpoint**: `GET /api/estadistica`
- **Descripción**: Obtiene todas las estadísticas generales.

#### Obtener Estadísticas por Carrera

- **Endpoint**: `GET /api/estadistica/carrera`
- **Descripción**: Obtiene estadísticas específicas por carrera.

### Participante

#### Obtener Todos los Participantes

- **Endpoint**: `GET /api/participante`
- **Descripción**: Obtiene todos los participantes.

#### Crear Nuevo Participante

- **Endpoint**: `POST /api/participante`
- **Descripción**: Crea un nuevo participante.
- **Parámetros de Entrada**:
  - `Nombre`: Nombre del participante.
  - `Codigo`: Código único del participante.
  - `IdCategoria`: ID de la categoría a la que pertenece el participante.

#### Actualizar Participante

- **Endpoint**: `PUT /api/participante`
- **Descripción**: Actualiza un participante existente.
- **Parámetros de Entrada**:
  - `Id`: ID del participante a actualizar.
  - `Nombre`: Nuevo nombre del participante.
  - `Codigo`: Nuevo código único del participante.
  - `IdCategoria`: Nuevo ID de la categoría a la que pertenece el participante.

#### Eliminar Participante

- **Endpoint**: `DELETE /api/participante/:Id`
- **Descripción**: Elimina un participante según su ID.

#### Votar por un Participante

- **Endpoint**: `POST /api/participante/voto`
- **Descripción**: Permite a un estudiante votar por un participante.
- **Parámetros de Entrada**:
  - `IdParticipante`: ID del participante a votar.

#### Registrar Puntaje para un Participante

- **Endpoint**: `PUT /api/participante/puntaje`
- **Descripción**: Permite a un estudiante registrar un puntaje para un participante.
- **Parámetros de Entrada**:
  - `IdParticipante`: ID del participante.
  - `Puntaje`: Puntaje otorgado.

### Votar

#### Votar por un Participante

- **Endpoint**: `POST /api/votar`
- **Descripción**: Permite a cualquier usuario votar por un participante en un concurso activo.
- **Parámetros de Entrada**:
  - `IdParticipante`: ID del participante a votar.

---

Espero que esta documentación te sea útil. Si tienes alguna pregunta o necesitas más detalles sobre algún aspecto específico, no dudes en preguntar.