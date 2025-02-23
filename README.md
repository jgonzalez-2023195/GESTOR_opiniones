Gestor de Opiniones

Este es un sistema de gestión de opiniones similar a las publicaciones de Facebook, desarrollado con Node.js, Express y MongoDB. Permite a los usuarios crear publicaciones, interactuar con comentarios y gestionar su perfil.

Instrucciones de Instalación

1. Clona este repositorio en tu máquina local: git clone https://github.com/tu-usuario/gestor-opiniones.git

2. Entra en la carpeta del proyecto: cd gestor-opiniones

3. Instala las dependencias necesarias: npm i

4. Inicia el servidor: npm run dev

Funcionalidades Principales

1. Autenticación y Perfil de Usuario

Registro e inicio de sesión con correo electrónico o nombre de usuario y contraseña.

Edición del perfil (nombre de usuario y contraseña con verificación de la anterior).

No se permite la eliminación de cuentas para preservar la integridad de los datos.

2. Gestión de Publicaciones

Crear publicaciones con título, categoría y texto.

Editar y eliminar publicaciones propias.

No se permite la eliminación de publicaciones de otros usuarios.

3. Comentarios en Publicaciones

Comentar en publicaciones.

Editar y eliminar comentarios propios.

4. Gestión de Categorías

Administrador gestiona las categorías (crear, editar, eliminar).

Usuarios solo pueden asignar categorías a sus publicaciones.

Una categoría por defecto debe existir al iniciar el proyecto.

Almacenamiento de Imágenes y Videos

Publicaciones: Las imágenes y videos usados en publicaciones se almacenan en uploads/publication.

Categorías: Las imágenes relacionadas con categorías se guardan en uploads/category.

Usuarios: Las imágenes de perfil de usuario se guardan en uploads/user.

Tecnologías Usadas

Backend: Node.js, Express, MongoDB.

Autenticación: JSON Web Tokens (JWT).

Almacenamiento de Archivos: Multer.

Autores

Desarrollador: JG (José González)

Licencia

Este proyecto se distribuye bajo la licencia MIT.

