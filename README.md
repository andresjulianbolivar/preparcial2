1. Pasos para ejecución:
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


3. Reporte de cambios:
