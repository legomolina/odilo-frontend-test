# OdiloFrontedTest

## Prueba

Se ha implementado una página base `search` que contiene un header con la barra de búsqueda y luego un grid responsive con los resultados.

También hay un footer con un paginador para obtener más resultados si hubiese más de una página.

Se ha usado un interceptor pero en vez de para peticiones erróneas, para añadir la cabecera de autenticación con la API_KEY, en el archivo `environment`.

Cuando se hace click en un usuario, tal como se especifica, si tiene una score > 20 carga el perfil en una pestaña nueva y, además, se abre un modal con (en vez de un gráfico) un listado de los primeros 5 repositorios de la api.

## Consideraciones

### Diseño y librerías externasl

Para elaborar el diseño no se ha usado ninguna librería ni framework CSS ni diseño de Figma.

Librerías usadas:
 - `ColorThief` para obtener el color del avatar en los cards de los usuarios. (https://www.npmjs.com/package/colorthief) 
 - `angular-fontawesome` para los iconos. (https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

### Linting

Se ha añadido angular-eslint para lintear el código y tenerlo todo igual. Se puede ajustar más en profundidad incluyendo más reglas en el archivo de configuración.

### Store

En vez de usar una store tipo rx-js, ng-xs o Akita he probado a usar `signals`, la nueva forma de reactividad introducida a parti de Angular 16.

En vez de crear reducers, actions, effects etc he creado una clase base `Store` que usa un signal como base y con eso obtengo la reactividad. No creo que en un entorno de producción sea aconsejable implementarlo pero funciona perfectamente y ya he visto alguna librería que hace algo similar.

La idea de esto es seguir una metodología más ágil como podemos encontrar en otros frameworks.

### Componentes

Aunque he componentizado ciertas cosas, me he dejado otras que por ámbito y tiempo tampoco he creído necesario (he hecho anotaciones en el código).

El módulo `shared` incluye componentes reusables en el resto de módulos.
El módulo `core` incluye servicios y utilidades comunes para todo el código

### Commits

Me he enfrascado demasiado en programar y no he hecho commits, fallo mío.
