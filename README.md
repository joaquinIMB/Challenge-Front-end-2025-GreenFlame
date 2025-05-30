# Challenge-Front-end-2025-GreenFlame

Este proyecto es una aplicación web para la cotización de alquiler de vehículos. Su propósito principal es permitir a los usuarios buscar, filtrar y seleccionar coches para una cotización personalizada. La aplicación detalla la información de cada vehículo y sus tarifas, ofreciendo una experiencia interactiva para gestionar la selección de hasta cinco vehículos antes de proceder con la cotización final.

## Tabla de Contenidos

* [Descripción General]
* [Características]
* [Tecnologías Utilizadas]
* [Instalación de Dependencias]
* [Correr el Proyecto Localmente]
* [Estructura del Proyecto]
* [Uso]

---

## Descripción General

Este proyecto es una aplicación web dinámica para la cotización de alquiler de vehículos creada con Vite. Permite a los usuarios buscar y visualizar una lista de coches disponibles, aplicando diversos filtros como la compañía rentadora, la categoría del auto, la capacidad de maletas y pasajeros, y un rango de precios. Los resultados pueden ser ordenados por relevancia o precio (ascendente/descendente).

La aplicación destaca por su interactividad, permitiendo a los usuarios seleccionar hasta cinco vehículos para una cotización personalizada. Al seleccionar un coche, este se añade a una barra inferior fija que muestra los detalles clave del vehículo actual de la cotización y permite navegar entre los coches seleccionados. También ofrece una vista detallada de las inclusiones tarifarias al hacer clic en un ícono de información, presentando los detalles de forma clara en un popover.

El propósito principal del proyecto es proporcionar una herramienta eficiente y fácil de usar para que los clientes gestionen su selección de vehículos de alquiler y obtengan un resumen claro de su cotización antes de finalizar la reserva.

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

## Instalación de Dependencias

Para poner en marcha el proyecto, seguí estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/joaquinIMB/Challenge-Front-end-2025-GreenFlame.git
    ```
    ```bash
    cd Challenge-Front-end-2025-GreenFlame
    ```

2.  **Instala las dependencias:**
    Este proyecto utiliza `pnpm` o `yarn` para la gestión de paquetes. Elegí el comando según tu preferencia:

    **Usando npm:**
    ```bash
    pnpm install
    ```

    **Usando yarn:**
    ```bash
    yarn install
    ```
    *Nota: Asegurate de tener Node.js y npm/yarn instalados en tu sistema.*

## Correr el Proyecto Localmente

Una vez que las dependencias estén instaladas, podes iniciar el servidor de desarrollo.

**Para iniciar la aplicación en dev:**

**Usando pnpm:**
```bash
pnpm run dev
Usando yarn:

Bash

yarn run dev


Estructura del proyecto


├── public/                    # Archivos estáticos accesibles directamente por el navegador
│   ├── cars/                  # Imágenes de coches (posiblemente de tu imageMapper)
│   │   └── ...
│   ├── company_logos/         # Logos de compañías de alquiler
│   │   └── ...
│   ├── fonts/                 # Archivos de fuentes personalizados
│   │   └── ...
│   ├── icons_logos/           # Archivos SVG de iconos (check-logo.svg, arrow-icon.svg, etc.)
│   │   ├── arrow-icon.svg
│   │   ├── arrow-blue-tobottom.svg
│   │   ├── check-logo.svg
│   │   ├── chevron-icon-b.svg
│   │   ├── close-icon.svg
│   │   ├── filter-icon.svg
│   │   ├── info-icon.svg
│   │   ├── logo-anato.svg
│   │   ├── logo-aerocivil.svg
│   │   ├── logo-ce.svg
│   │   ├── logo-greenflame.svg
│   │   ├── logo-iata.svg
│   │   ├── logo-sic.svg
│   │   ├── logo-supertransporte.svg
│   │   ├── logo-udr.svg
│   │   └── social-*.svg (instagram, facebook, etc.)
│   ├── carsJSON.json          # Archivo JSON con los datos de los vehículos
│   └── vite.svg               # Icono por defecto de Vite (si usas Vite)
├── src/                       # Código fuente de tu aplicación React
│   ├── assets/                # Archivos estáticos que pueden ser procesados por tu bundler (imágenes, videos, etc.)
│   │   └── ...
│   ├── components/            # Componentes React reutilizables
│   │   ├── CarCard/
│   │   │   ├── CarCard.tsx
│   │   │   └── CarCard.types.ts
│   │   ├── CarDetail/
│   │   │   ├── CarDetail.tsx
│   │   │   └── CarDetail.types.ts
│   │   ├── CarFeatures/       # (Si es un componente separado para las características del coche)
│   │   │   └── ...
│   │   ├── CollapsibleSection/
│   │   │   └── CollapsibleSection.tsx
│   │   ├── Filters/
│   │   │   ├── Filters.tsx
│   │   │   └── FilterItem.ts  # Contiene los datos iniciales de los filtros (rentalCompaniesData, etc.)
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── HeaderCard/
│   │   │   └── HeaderCard.tsx
│   │   ├── RateInclusionsPopover/
│   │   │   ├── RateInclusionsPopover.tsx
│   │   │   └── RateInclusionsPopover.types.ts
│   │   └── SelectedCarsBar/
│   │       ├── SelectedCarsBar.tsx
│   │       └── SelectedCarsBar.types.ts
│   ├── stores/                # Gestión de estado con Zustand
│   │   └── carStore.ts
│   ├── types/                 # Definiciones de tipos de TypeScript para datos
│   │   └── CarData.types.ts
│   ├── utils/                 # Funciones de utilidad
│   │   ├── companyData.ts     # Mapeo de nombres de compañía a iconos, etc.
│   │   └── imageMapper.ts     # Lógica para obtener URLs de imágenes de coches
│   ├── App.css                # Estilos CSS globales (pueden ser de Tailwind o CSS vanilla)
│   ├── App.tsx                # Componente raíz de la aplicación
│   ├── index.css              # Punto de entrada de CSS para Tailwind (generalmente)
│   └── main.tsx               # (o index.tsx) Punto de entrada principal de la aplicación React
├── .gitignore                 # Archivos y carpetas a ignorar por Git
├── package.json               # Dependencias del proyecto y scripts
├── tailwind.config.js         # Configuración de Tailwind CSS
├── tsconfig.json              # Configuración del compilador TypeScript
└── vite.config.ts             # Configuración de Vite (si usas Vite)
Uso
Una vez que la aplicación esté cargada en tu navegador, vas a poder:

Explorar vehículos: Navegá por la lista principal de vehículos disponibles.
Filtrar resultados: Utilizá el panel de filtros a la izquierda para refinar tu búsqueda por:
Compañía rentadora: Seleccioná las marcas de alquiler deseadas.
Categoría del auto: Elegí el tipo de vehículo (ej. Económico, SUV, Lujo).
Capacidad de maletas: Filtrá por el número de maletas grandes y pequeñas que puede transportar el coche.
Cantidad de pasajeros: Seleccioná el número de asientos requeridos.
Rango de precio (COP): Ajustá el slider o introducí valores manualmente para establecer un rango de precios.
Ordenar resultados: Utilizá las opciones de ordenamiento para organizar la lista por relevancia, precio (menor a mayor) o precio (mayor a menor).
Seleccionar vehículos para cotización: Hacé clic en el botón "Seleccionar" en la tarjeta de cada vehículo para añadirlo a tu cotización (hasta un máximo de 5).
Ver detalles de tarifa: Hacé clic en el ícono de información azul junto al nombre de la tarifa en la tarjeta del coche para ver un popover con las inclusiones detalladas de esa tarifa.
Gestionar cotización en la barra inferior: Una vez que hayas seleccionado al menos un coche, aparecerá una barra fija en la parte inferior de la pantalla.
Navegá entre los coches seleccionados usando las flechas de navegación (hacia arriba y hacia abajo).
Visualizá la marca, el nombre de la tarifa, el grupo del vehículo, la imagen y los precios en COP y USD del vehículo actual.
Hacé clic en "Eliminar" para quitar el vehículo mostrado de tu cotización.
