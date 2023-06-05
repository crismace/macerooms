# PFC - MACEROOMS
![Badge en Desarollo](https://img.shields.io/badge/license-open-brightgreen)
![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)


## ✅ Tecnologías empleadas

* Front

    * React - 18.2

    * Node - 18.12 LTS

* Back:

    * SpringBoot - 3.0.5

    * Java - 17

    * JWT

    * Swagger-UI

* Base de datos:

    * MariaDB

## 💡 Programas necesarios
* VSCODE
* IDE Java a tu elección (ECLIPSE, INTELLIJ, STS)
* MariaDB 11.0
* Cliente GIT

## 📁 Acceso al proyecto
 1. Se debe hacer un git clone del repositorio

## 💻 Prerrequisitos

1. Tener arrancado mariadb en el puerto por defecto 3306

2. Ejecutar el dump entregado en la base de datos

3. Configurar adecuadamente dentro del proyecto del back src/main/resources el fichero application.properties acorde a tu sistema/bbdd.

        spring.jpa.hibernate.ddl-auto=update
        spring.datasource.url=jdbc:mariadb://localhost:3306/macerooms
        spring.datasource.username=root
        spring.datasource.password=
        spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
        #spring.jpa.show-sql: true

        security.basic.enabled=false

        spring.servlet.multipart.max-file-size=100MB
        spring.servlet.multipart.max-request-size=100MB
        #Sustituye el asterisco por tu nombre de usuario
        carpetaImagenes=C:\\Users\\*\\Desktop\\proyecto-fin-de-ciclo\\front-macerooms\\public\\images
        rutaRelativaImagenes=/images/

        #Cada cuantos minutos se ejecuta la tarea de validacion automatica de reservas
        minutosValidacionAuto=3
        #Dias que tienen que pasar para que se valida una reserva
        diasValidacion=3

## 🛠️ Ejecuta el proyecto

Front

    1. Abrir un cmd dentro de la ruta front-macerooms
    2. Ejecutar el comando
        $ npm install
    3. Ejecutar el comando
        $ npm run start
    
Back

    1. Dentro de eclipse File -> Import -> Maven -> Existing maven projects
    2. Pulsas browse y seleccionas la ruta back-macerooms
    3. Seleccionas el check macerooms
    4. Pulsa sobre finish
    5. Una vez haya terminado de importar todo eclipse (ver esquina inferior derecha), debes ir a /macerooms/src/main/java/macerooms/app/MaceroomsApplication.java
    6. Click derecho -> Run as -> Java application

## 🔗 Rutas
         
         Front: http://localhost:3000/
         Back (Swagger): http://localhost:8080/swagger-ui/index.html