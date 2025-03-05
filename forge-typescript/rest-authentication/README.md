# README.md

## 1. Clean Architecture.
Este proyecto está basado en la idea de **Robert Cecil Martin**, que defiende la idea de separar la lógica de negocio y las reglas de la aplicación de los detalles de implementación. El modelo en el que nos basaremos habla de 4 áreas en las que dividir todo proyecto de Software:

1. Las **Entities** se sitúan en el núcleo de la arquitectura y representan la parte más fundamental del negocio. Se definen como **objetos o estructuras que contienen tanto la información como las reglas de negocio más elementales**, sin depender de detalles técnicos o frameworks externos. Al estar completamente aisladas de la tecnología, permiten que la aplicación mantenga una base sólida, independiente de cualquier implementación específica.

2. Los **Use Cases** se encargan de la lógica de la aplicación. Su labor consiste en **coordinar y orquestar las operaciones que involucran a las entidades para cumplir con los requerimientos del sistema**. Al gestionar el flujo de datos entre las capas, se aseguran de que las entidades realicen su trabajo sin que la lógica de negocio dependa de detalles sobre cómo se mostrarán los datos o en qué tipo de base de datos se almacenarán.

3. Los **Presenters** forman parte de la capa de interfaz y **se encargan de transformar los datos producidos por los casos de uso en formatos adecuados para la presentación** (por ejemplo, HTML o JSON). **También realizan el proceso inverso** al recibir información de la interfaz de usuario, adaptándola para que los casos de uso la entiendan correctamente. De este modo, sirven como puente entre la lógica interna de la aplicación y la forma en que los usuarios interactúan con el sistema.

4. La **Database** se encuentra en la parte más externa de la arquitectura. **Su responsabilidad es ocuparse de la persistencia de datos**, pudiendo utilizar cualquier tecnología concreta, como bases de datos SQL o NoSQL, sin que esto afecte directamente a las capas internas. Para lograrlo, se basa en interfaces o contratos definidos por las capas internas, evitando que la lógica de negocio dependa de detalles de implementación 

## 2. File System Explanation.
En este apartado se explican las distintas carpetas que van a componer nuestro proyecto, qué ficheros irán dentro de cada una de ellas y qué funciones deben desarrollar:

1. Carpeta **Presentation** --> Contiene todos los ficheros que se encargan de gestionar las comunicaciones de nuestra API. Es donde encontramos la implemetación de herramientas como Express, Fastify... Deberíamos de poder cambiar de herramienta sin tener que afectar el resto de ficheros de la aplicación.

2. Carpeta **Domain** --> Contiene todos los ficheros que definen las entidades de negocio. Esta carpeta no puede contener ficheros con dependencias externas, pues una dependencia en esta carpeta implicaría que las implementaciones de as tecnologías usasdas en el proyecto están afectando a la definición del negocio.

3. Carpeta **Infraestructure** --> Es el punto intermedio entre el dominio y la  presentación. Es el lugar en el que almacenaremos los adaptadores, es decir, el lugar en el que almacenamos las implementaciones de las capas de dominio para las tecnologías empleadas en el proyecto.

## 3. Express Server.
El servidor se define dentro del fichero `presentation/server.ts`, se genera con un constructor que recibe parámetros de configuración para cumplir el **Principio de Responsabilidad Única**, haciendo que nuestra clase esté abierta a la expansión, pero cerrada a la modificación.

## 4. About the Project.
En esta sección se explicarán algunas de las deciones que se han tomado durante el desarrollo del proyecto con el obetivo de poder entenderlas y analizarlas.

### 4.1. Glossary.

- **Barrel File** --> Achivo que exporta varios módulos desde una carpeta, lo que permite realizar importaciones más limpias y compactas en otras partes del proyecto

### 4.2. Managing Environment Variables.
 A partir de la versión `20.x.y` de Node la gestión de las variables de entorno viene incluida y no necesitaríamos hacer uso de librerías externas, lo que reduce la dependencia de paquetes de otros usuarios.
 En este tutorial se explica cómo podríamos trabajar con dos librerías externas: `dotenv` y `env-var`. Estas librerías deberán ser incluidas en la versión de producción de la app y, para poder instalarlas ejecutaremos el comando:
 
```BASH
npm i dotenv env-var
```

Se debe tener en cuenta que las variables de entorno se almacenan como cadenas de texto `strings`, pero algunas de ellas contentrán valores numéricos, como por ejemplo la variable `PORT`, que contiene un valor `int`. Es por ello que una de las cosas que se tienen que tener en cuenta durante la gestión de las variables es el parseo al tipo adecuado para cada una de ellas.

En este proyecto las configuración de las variables de entorno se guardan dentro del fichero `src/config/envs.ts`. Será en este archivo donde se hagan las comprobaciones necesarias para verificar que las variables existen antes de poder cargar la app y parsearlas al tipo adecuado para cada una.

Este fichero funciona como una abstracción de los paquetes para gestión de varables de entorno que hemos incorporado al programa.

### 4.3. Managing Application Routes.
Las rutas de la aplicación son los distintos end-points que van a atender las peticiones que hagan los usuarios.

Para poder gestionar de una manera sencilla todas las rutas que maneja nuestra aplicación generamos el fichero `src/presentation/router.ts`. Que almacenará los entry-points a los distintos controladores para las distintas funcionalidades de nuestra aplicación.

Estructura del proyecto para gestión de end-points:
```bash
|- presentation
|\- router.ts
||- controller.ts
|\- auth
| \-controller.auth.ts
| |-routes.auth.ts
```

Dentro de la carpeta de presentación se generarán carpetas en función de los  distintos servicios que prestará la aplicación. Por ejemplo en este caso usaremos la carpeta `auth` para almacenar toda la lógica asociada a los servicios de autenticación de la aplicación.

El fichero `src/presentation/auth/routes.auth.ts` se encarga de almacenar las rutas que existen dentro del servicio, pero no debe contener la implementación que define como se lleva a cabo el servicio. Para este propósito se utiliza el fichero `src/presentation/auth/controller.auth.ts` y, posteriormente, se hace una inyección de dependencias al file `routes.auth.ts`.

---
*Apunte.*
Cuando se tiene un conjunto de argumentos que son enviados como parámetros a una función, en JavaScript, pueden obviarse Dejándo una función mucho más simple.
```TypeScript
    const controller = new AuthController();
    router.post('/login', (req, res) => controller.loginUser(req, resp) )
```
Haciendo que la declaración anterior sea equivalente a:
```TypeScript
    const controller = new AuthController();
    router.post('/login', controller.loginUser)
```

### 4.4. Data Transfer Objects (DTOs)
Un DTO es un **objeto diseñado exclusivamente para transportar datos entre diferentes partes de la aplicación o incluso entre aplicaciones distintas**. Su principal finalidad es aislar la lógica de negocio de los detalles de transporte de información. De este modo, las capas internas (por ejemplo, los casos de uso y las entidades) permanecen limpias y libres de las particularidades de cómo se formatean o transmiten los datos, facilitando así la mantenibilidad


## 5. About the Database.
Este proyecto usará una base de datos de tipo `mongoDB` para persistir datos. Esta base de datos se cargará al sistema usando `Docker`.

### 5.1. Docker-Compose.
Este fichero es muy crítico, ya que los ficheros de tipo `.yml` tienen formatos específicos en los que, como en Python, las tabulaciones modifican el significado de los elementos que están escritos en él.
```bash
version: '3.8'
services:
    mongo-db:
        image: mongo:6.0.6
        restart: always
        environment:
            MONGO_INITDB_ROOT_USERNAME: mongo-user
            MONGO_INITDB_ROOT_PASSWORD: mongo-password
        volumes:
            - ./mongo:/data/db
        ports:
            - 27017:27017
```

- **mongo-db** --> Es el nombre del **servicio que queremos montar dentro del contenedor**. En este caso queremos montar una imagen de tipo `mongodb`, es por ello que indicamos `mongo-db` como nombre del servicio. Si quisiéramos otro tipo de servicio podríamos usar `postgres` o `my-sql` (entre otros).
- **restart: always** --> Indica que, cada vez que se inicie Docker Desktop se iniciará el servicio.
- **environment** --> Hace referencia a las **variables de entorno que requiere el contendor para poder componerse**. El contenido de este apartado dependerá de los servicios que queramos levantar. En el caso de `mongo-db` se necesitan estas dos variables.
- **volumnes** --> **Permite a los datos gestionados en tiempo de ejecución persistir más allá de la vida del contenedor**. Es decir, nos permite almacenar dentro del espacio local de la computadora.
La ruta describe lo siguiente:
./mongo --> Hace referencia a la **ruta relativa de la carpeta que nuestro sistema usará para poder almacenar los datos**.
/data/db --> Hace referencia a la **ruta que nuestro contenedor usa para almacenar los datos**.
Al final estamos generando un *puente* que conecta la carpeta en la que se almacenan los ficheros de la base de datos durante la ejecución del contenedor con la ruta en la que nuestro sistema persistirá los datos una vez se haya apagado el contenedor.
- **ports** --> Define los **puertos que usaremos para comunicarnos entre nuestra máquina local y el contenedor**. La primera parte de la asignación hace referencia al puerto de nuestra  máquina que reservamos para poder enviar peticiones y la segunda parte hace referencia al puerto que usa el contenedor para comunicarse con nuestra máquina.
Es decir, cuando queremos enviar una petición a la base de datos tenemos que enviarla a nuestro puerto 27017, y cuando el contenedor quiera comunicarse con nosotros lo hará usando el puerto 27017.

### 5.2. Mongoose.
Es un **Object Document Mapping** (ODM) para Node.js que facilita la interacción con bases de datos MongoDB. Su principal función es **proporcionar una capa de abstracción que permite definir esquemas estructurados para los documentos de MongoDB**, ofreciendo validación de datos, conversión de tipos y mecanismos para gestionar relaciones entre documentos.
