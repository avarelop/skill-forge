# Apuntes: Gestores de Paquetes y Dependencias

## 1. Gestor de Paquetes

Un gestor de paquetes es una herramienta esencial que permite instalar, actualizar y eliminar paquetes de software, estableciendo un estándar en los proyectos, especialmente en entornos como Node.js. Esta herramienta facilita la integración y administración de componentes que se requieren durante el desarrollo.

### 1.1 NPM

NPM es el gestor de paquetes por defecto para Node.js. Se lanzó en 2010 como un proyecto de Isaac Z. Schlueter y ha sido fundamental para la organización y manejo de dependencias en el ecosistema de Node.js.

### 1.2 Yarn

Yarn es otro gestor de paquetes, construido originalmente por Facebook y mantenido por Google. Se desarrolló sobre la base del registro de NPM, lo que permite que los paquetes instalados con NPM sean compatibles con Yarn. Su creación respondió a la necesidad de mejorar la seguridad y el rendimiento que ofrecía la primera versión de NPM. Además, Yarn 2 introduce características novedosas como "Plug n Play" y "Zero Installation", aportando mejoras en seguridad y eficiencia.

## 2. Conceptos Relacionados

### 2.1 Paquete

Un paquete es una unidad de software que puede ser instalada, actualizada y eliminada. En términos prácticos, se trata de una carpeta que puede contener varios módulos y que se registra en el archivo `package.json`, permitiendo su gestión centralizada dentro del proyecto.

### 2.2 Módulo

Un módulo se refiere a un archivo o conjunto de archivos que pueden ser importados en otros archivos para reutilizar código. Los módulos se dividen en dos categorías principales: los módulos locales, que se encuentran dentro del mismo proyecto en desarrollo, y los módulos globales, que se instalan a nivel del sistema operativo y pueden ser utilizados en diferentes proyectos.

## 3. Gestor de Dependencias

Un gestor de dependencias organiza y administra los paquetes que se utilizan en un proyecto, proporcionando herramientas que facilitan y agilizan el proceso de desarrollo. Además de integrar soluciones de terceros que resuelven problemas comunes, este gestor permite la publicación de paquetes propios, optimizando el flujo de trabajo y permitiendo que los desarrolladores se enfoquen en la creación de sus aplicaciones con mayor eficiencia.
