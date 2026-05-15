# 1. Pasos para ejecución:
  1.1. El primer paso para ejecutar el proyecto es levantar la imagen docker que tiene la base de datos en Mongo, para poder usar Mongoose desde el proyecto: Se debe ejecutar en la raíz del proyecto:

   docker run -d ^
--name mongo ^
-p 27017:27017 ^
-e MONGO_INITDB_ROOT_USERNAME=root ^
-e MONGO_INITDB_ROOT_PASSWORD=secret ^
mongo:6.0

 1.2. Antes de iniciar el proyecto, es recomendado limpiar las colecciones usando los siguientes comandos en la raíz del proyecto:
  docker exec -it mongo mongosh -u root -p secret --authenticationDatabase admin
  use nest_persistencia
  db.countries.deleteMany({})
  db.travelplans.deleteMany({})
  db.users.deleteMany({})
  
1.3. Asimismo, una vez se levante el contenedor, se debe iniciar el proyecto con: npm run start:dev

1.4. Para probar los endpoints, la url base es: http://localhost:3000/api/v1

# 2. Arquitectura interna y flujo de cache:
El backend fue desarrollado utilizando NestJS siguiendo principios de arquitectura limpia y separación de responsabilidades. La aplicación se organiza en módulos independientes, donde cada módulo encapsula su propia lógica de negocio, persistencia y exposición de endpoints HTTP.

La arquitectura se compone principalmente de:

Controllers: encargados de recibir las peticiones HTTP y delegar la lógica a los servicios correspondientes.
Services: contienen la lógica de negocio de la aplicación.
Providers: utilizados para integrar servicios externos y encapsular lógica reutilizable.
Schemas de Mongoose: definen la estructura de persistencia en MongoDB mediante Mongoose.

El módulo principal de la aplicación es travel-plan, responsable de gestionar los planes de viaje. Este módulo depende del módulo countries, el cual se encarga de validar la existencia de los países asociados a cada plan de viaje.

El módulo countries implementa una estrategia híbrida de consulta:

Primero busca el país en la base de datos local.
Si el país no existe localmente, consume una API externa de países mediante un provider especializado.
La información obtenida desde la API externa se almacena posteriormente en la base de datos local para evitar consultas repetidas y mejorar el rendimiento.

Esta arquitectura permite:

desacoplamiento entre módulos,
reutilización de lógica,
facilidad de mantenimiento,
escalabilidad,
y una clara separación entre la lógica de negocio, la persistencia y las integraciones externas.

# 3. Reporte de cambios:
- UserModule: Se crea el módulo user siguiendo la arquitectura definida para el proyecto, incluyendo:
controller para la exposición de endpoints HTTP,
service para la lógica de negocio,
pipe para validaciones y transformaciones,
y schema de Mongoose para persistencia en MongoDB.
Además, se implementa un endpoint para la creación de usuarios.
- Actualización del esquema TravelPlan:
Se incorpora la lista de gastos asociada a cada plan de viaje.
Los gastos se modelan mediante un esquema independiente (ExpenseSchema) para mantener una estructura modular y reutilizable.
Se agrega el campo userId para asociar cada plan de viaje con un usuario específico del sistema.

# 4. Pruebas de los endpoints:
1. Primero se debe probar POST http://localhost:3000/api/v1/users con el body:
   {
    "nombre": "Julian",
    "email": "julian@email.com"
   }
   si se usa postman, lo ideal es guardarl el _id del user.
2. Ahora POST http://localhost:3000/api/v1/travel-plans
   {
    "titulo": "Diciembre",
    "fecha_inicio": "2026-12-10",
    "fecha_fin": "2026-12-30",
    "pais": "COl",
    "usuario": "{{user1}}" -> _id del usuario
}
3. Ahora POST http://localhost:3000/api/v1/travel-plans/{{_id}}/expenses ({{_id}}-> _id del travel).
{
    "descripcion":"Prima de Diciembre",
    "monto": 100000,
    "categoria": "Vacaciones"
}

4. Ahora GET http://localhost:3000/api/v1/travel-plans
5. Ahora GET http://localhost:3000/api/v1/travel-plans/{{_id}}
6. Ahora DELETE http://localhost:3000/api/v1/travel-plans/{{_id}}
