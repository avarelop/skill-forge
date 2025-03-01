# Apuntes: Gestores de Paquetes y Dependencias

## 1. Gestor de Paquetes

Un **gestor de paquetes** es una *herramienta esencial* que permite **instalar**, **actualizar** y **eliminar** paquetes de software, estableciendo un estándar en los proyectos, especialmente en entornos como **Node.js**. Esta herramienta facilita la integración y administración de componentes que se requieren durante el desarrollo.

### 1.1 NPM

**NPM** es el gestor de paquetes por defecto para *Node.js*. Se lanzó en **2010** como un proyecto de *Isaac Z. Schlueter* y ha sido fundamental para la organización y manejo de dependencias en el ecosistema de Node.js.

### 1.2 Yarn

**Yarn** es otro gestor de paquetes, construido originalmente por **Facebook** y mantenido por **Google**. Se desarrolló sobre la base del registro de NPM, lo que permite que los paquetes instalados con NPM sean compatibles con Yarn. Su creación respondió a la necesidad de mejorar la *seguridad* y el *rendimiento* que ofrecía la primera versión de NPM. Además, **Yarn 2** introduce características novedosas como **"Plug n Play"** y **"Zero Installation"**, aportando mejoras en seguridad y eficiencia.

## 2. Conceptos Relacionados

### 2.1 Paquete

Un **paquete** es una *unidad de software* que puede ser instalada, actualizada y eliminada. En términos prácticos, se trata de una carpeta que puede contener varios módulos y que se registra en el archivo `package.json`, permitiendo su **gestión centralizada** dentro del proyecto.

### 2.2 Módulo

Un **módulo** se refiere a un archivo o conjunto de archivos que pueden ser importados en otros archivos para reutilizar código. Los módulos se dividen en dos categorías principales:

#### 2.2.1 Módulo Local

Los *módulos locales* se encuentran dentro del mismo proyecto en desarrollo, facilitando la **organización interna** del código.

#### 2.2.2 Módulo Global

Los *módulos globales* se instalan a nivel del sistema operativo y pueden ser utilizados en diferentes proyectos, permitiendo una **utilización compartida** de funcionalidades comunes.

## 3. Gestor de Dependencias

Un **gestor de dependencias** organiza y administra los paquetes que se utilizan en un proyecto, proporcionando herramientas que facilitan y agilizan el proceso de desarrollo. Además de integrar soluciones de terceros que resuelven problemas comunes, este gestor permite la publicación de paquetes propios, optimizando el flujo de trabajo y permitiendo que los desarrolladores se enfoquen en la creación de sus aplicaciones con mayor eficiencia.

## 4. Creación de un Proyecto Node.js con NPM

Para iniciar un proyecto en *Node.js* utilizando **NPM**, el primer paso consiste en **inicializar el proyecto**. Esto se realiza mediante el comando `npm init`, que abre un asistente interactivo para la creación del archivo `package.json` con los valores por defecto. Si se desea evitar la interacción manual y aceptar todos los valores por defecto, se puede utilizar el flag `-y`:

```bash
npm init -y
```

Uno de los aspectos importantes al configurar el archivo `package.json` es definir el "**entry point**" o punto de entrada del proyecto. Este es el archivo que se ejecutará al iniciar el proyecto, ya sea mediante el comando `npm start` o utilizando otros scripts definidos en el mismo archivo. Un ejemplo de cómo se especifica el entry point es:

```bash
"main": "src/index.js"
```

Asimismo, es posible configurar detalles adicionales como el autor del proyecto. Esto se hace agregando la información correspondiente en el `package.json`, por ejemplo:

```bash
"author": "Alvaro Valera <alvaro@samara.energy>"
```

Estos pasos y configuraciones iniciales son fundamentales para estructurar un proyecto Node.js de manera organizada y facilitar la administración de sus dependencias y scripts a lo largo de su desarrollo.

```bash
npm install
```

Este comando instalará las dependencias definidas en el archivo `package.json` y creará una carpeta llamada `node_modules` donde se almacenarán los paquetes instalados.

## 5. Instalación de Dependencias

Existen dos formas principales de instalar dependencias en un proyecto Node.js: **instalación local** e **instalación global**.

### 5.1 Instalación Local

La instalación local se realiza mediante el comando:

```bash
npm install <package-name>
``` 

Dentro de las instalaciones locales, se pueden utilizar los siguientes flags:

- `-D` o `--save-dev`: Instala una dependencia como dependencia de desarrollo.
- `-O` o `--save-optional`: Instala una dependencia como dependencia opcional.
- `-B` o `--save-bundle`: Instala una dependencia como dependencia de bundle.

La principal diferencia entre las dependencias de desarrollo y las de producción es que las **dependencias de desarrollo** se utilizan únicamente durante el proceso de desarrollo y no se incluirán en el proyecto final.


### 5.2 Instalación Global

Cuando queremos instalar una dependencia global, podemos utilizar el flag `-g` o `--global`.
```bash
npm install -g <package-name>
```

```bash
npm install --global <package-name>
``` 

Para poder revisar los paquetes instalados globalmente, podemos utilizar el comando:

```bash
npm list -g --depth=0
```

### 5.3 Instalación de Múltiples Dependencias

Siempre que las dependencias tengan el mismo objetivo (ya sea producción o desarrollo), se pueden instalar todas las dependencias pasándolas como argumentos en un único comando:

```bash
npm install <package-name> <package-name> ... <package-name>
```
