# Nombre de tu Proyecto

Una descripción corta y concisa de tu proyecto. ¿Qué hace? ¿Cuál es su propósito principal?

## Tabla de Contenidos

* [Descripción General](#descripción-general)
* [Características](#características)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Instalación de Dependencias](#instalación-de-dependencias)
* [Correr el Proyecto Localmente](#correr-el-proyecto-localmente)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Uso](#uso)
* [Contribución](#contribución)
* [Licencia](#licencia)

---

## Descripción General

Proporciona una descripción más detallada de tu aplicación.
Por ejemplo: "Esta es una aplicación web para la cotización de alquiler de vehículos, que permite a los usuarios buscar coches, filtrar por diferentes criterios (compañía, categoría, capacidad, precio), seleccionarlos en una cotización y ver un resumen."

## Características

* Búsqueda y listado de vehículos.
* Filtros por [menciona tus filtros: ej., compañía, categoría, capacidad de maletas y pasajeros].
* Ordenamiento de resultados por [menciona tus ordenamientos: ej., relevancia, precio].
* Selección de hasta 5 vehículos para cotización.
* Vista detallada de tarifas con inclusiones.
* Barra inferior de cotización para navegar entre vehículos seleccionados.
* Interfaz de usuario responsiva.

## Tecnologías Utilizadas

* **React:** Para la construcción de la interfaz de usuario.
* **TypeScript:** Para un tipado estático y desarrollo más robusto.
* **Zustand:** Para la gestión de estado global de la aplicación.
* **Tailwind CSS:** Para el estilado de la interfaz de usuario.
* **Material-UI (MUI):** Utilizado para el componente `Slider` en los filtros de precio y `Popover` para el detalle de inclusiones.
* **Fetch API:** Para la carga de datos de vehículos desde archivos JSON locales.

## Instalación de Dependencias

Para poner en marcha el proyecto, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    ```
    ```bash
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    Este proyecto utiliza `npm` o `yarn` para la gestión de paquetes. Elige el comando según tu preferencia:

    **Usando npm:**
    ```bash
    npm install
    ```

    **Usando yarn:**
    ```bash
    yarn install
    ```
    *Nota: Asegúrate de tener Node.js y npm/yarn instalados en tu sistema.*

## Correr el Proyecto Localmente

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo.

**Para iniciar la aplicación:**

**Usando npm:**
```bash
npm start