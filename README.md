# Panderia Backend
## Descripción General 
La panadería XXX requiere manejar la siguiente información: Usuarios, Pedidos y Cajas de Pan, por lo tanto, el modelo de datos fue diseñado alrededor de estos objetos. En cuanto a la lógica de negocio se identificó las siguientes funciones:
- Ingresar de las Cajas de Pan(Restringido a usuario Administrador)
- Ver los pedidos que han sido realizados(Restringido a usuario Administrador)
- El cliente puede autenticarse y realizar pedidos
- Ver los pedidos que han sido realizados(Restringido a usuario Repartidor)
- Ver los tipos de cajas de panes e imágenes
## Arquitectura
Para la implementación de esta solución fue empleado el framework Express.js para la construcción de los endpoints necesarios para interactuar con el sistema mediante consultas HTTP, PostgreSQL como base de datos, y algunas librerías adicionales para cargar imágenes(Multer), Token para autenticación(JWToken) y un conector para la base de datos PostgreSQL.
## Enfoque
La solución está pensada para que los usuarios(Administrador, Cliente y Delivery) pueda utilizar el sistema en función del rol que cumplen dentro de la panadería, es decir, tienen ciertas restricciones basadas en cómo se ha declarado en los requerimientos. Por lo tanto, los usuarios deben primero iniciar sesión con sus credenciales previamente creadas. El diseño de la base de datos y la implementación de lógica de negocio permiten crecer en cuanto a usuarios y la gestión de las órdenes, sin embargo, en función del tamaño de información que se maneje, será necesario considerar un diseño más eficiente.
## Metodología
Para implementar la solución se aplicó la siguiente metodología:
- Análisis: Revisión y entendimiento del enunciado.
- Requerimiento: Identificación y definición de objetos y comportamientos.
- Diseño: Diseño del modelo de datos en función de los objetos identificados y sus correspondientes comportamiento a nivel de sistema.
- Desarrollo: Implementación del código basado en el diseño.
# Mejoras

## Diseño

-   Se puede considerar la entrega a distintos lugares pero de un solo pedido.
-   Almacenar las direcciones para evitar el ingreso constante en cada pedido.
-   Considerar otros estados del pedido cuando el cliente desee cancelar
-   Es necesario aclarar el uso de direcciones

## Implementación

-   Configuración de la base de datos con variables de entorno, así como otros valores críticos como el Token
-   Integrar procedimientos almacenados o Trigger para algunas funciones directamente en la base de datos como el cálculo del total del pedio
- Permitir el ingreso del pedido en conjunto con los detalles del pedido
- Mejorar la seguridad general de la aplicación

# Despliegue Local
## Requisitos
- Node.js 18.13.0
- PostgreSQL
## Pasos para Desplegar
- Crear una instancia de PostgreSQL
- Crear el usuario **postgres** con la contraseña **mysecretpassword**
- Crear la base de datos con el nombre **panaderia**
- Actualizar los valores del archivo config/db.js con los valores de su servidor:

``` Javascript const  sql  =  postgres({
host :  '172.27.27.196', // Postgres ip address[s] or domain name[s]
port :  5432, // Postgres server port[s]
database :  'panaderia', // Name of database to connect to
username :  'postgres', // Username of database user
password :  'mysecretpassword', // Password of database user
});
```
- Para crear las tablas necesarias se provee el script `db_model.sql`
- Es necesario crear al menos un usuario tipo “Administrador”
- Instalar las dependencias con `npm install`
- Arrancar la aplicación con `npm run start`
- Para realizar las pruebas de los endpoints se debe utilizar Postman, ya que se provee el archivo `Bakery.postman_collection.json` que debe ser importando desde postman.
- **Importante:**  Para cada `endpoint` tiene restricción de tipo de usuario, por lo tanto, es necesario primero iniciar sesión con el usuario y contraseña. Luego guardar el token que nos genera el inicio de sesión para poder copiarlo en cada consulta que vayamos a efectuar. Entonces, en cada consulta se coloca el token que es de tipo **Bearer Token**, y además es necesario enviar el `username` a través del `body` campo `login_username` para validar si el usuario tiene acceso a este `endpoint`.