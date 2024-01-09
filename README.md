# PRUEBA FULL STACK RED 5G

Prueba de conocimientos Desarrollador FullStack con JS y PHP

## Requisitos

- PHP >= 7.3
- JS - NODE 
- Composer
- Laravel >= 8.0
- Base de datos MySQL

## Configuración inicial

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
cd proyecto

##Instala las dependencias del proyecto.
composer install

##Configuración de la base de datos
Crea una base de datos en MySQL llamada prueba.
Configura tus credenciales de la base de datos en el archivo .env.
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=prueba
DB_USERNAME=root
DB_PASSWORD=

##Ejecuta las migraciones para llenar la base de datos con datos de prueba.
php artisan migrate --seed

##Inicio de sesión
Para iniciar sesión, utiliza las siguientes credenciales:

Usuario: admin
Contraseña: admin

##Pruebas
#Pruebas del backend
Para probar el software del backend, sigue estos pasos:

Inicia el servidor de desarrollo de Laravel.
php artisan serve

Abre un navegador web y navega a http://localhost:8000.
Inicia sesión con las credenciales proporcionadas.

#Pruebas del frontend
Para probar el software del frontend, sigue estos pasos:

Navega al directorio del proyecto de Angular.
cd angular-proyecto

Instala las dependencias del proyecto.
npm install

Inicia el servidor de desarrollo de Angular.
ng serve

Abre un navegador web y navega a http://localhost:420012.

##Licencia
Este proyecto está licenciado bajo la Licencia MIT - vea el archivo LICENSE.md para más detalles.
