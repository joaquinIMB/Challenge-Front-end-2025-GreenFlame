// src/utils/imageMapper.ts

const IMAGE_FILENAMES = [
  "2020-kia-rio-s-sedan-black",
  "2020-kia-rio-s-sedan-white",
  "2020-toyota-corolla-le-sedan-black",
  "2020-toyota-corolla-le-sedan-white",
  "2021-ford-edge-titanium-suv-black",
  "2021-ford-edge-titanium-suv-white",
  "2021-kia-soul-s-5door-hatchback-black",
  "2021-kia-soul-s-5door-hatchback-white",
  "2021-tesla-model-3-standard-range-plus-sedan-black",
  "2021-tesla-model-3-standard-range-plus-sedan-white",
  "2021-toyota-camry-se-sedan-black",
  "2021-toyota-camry-se-sedan-white",
  "2021-volkswagen-jetta-s-sedan-black",
  "2021-volkswagen-jetta-s-sedan-white",
  "2022-chrysler-pacifica-touring-l-minivan-black",
  "2022-chrysler-pacifica-touring-l-minivan-white",
  "2022-toyota-rav4-xle-premium-suv-black",
  "2022-toyota-rav4-xle-premium-suv-blue",
  "2022-toyota-rav4-xle-premium-suv-white",
];

// Función para normalizar una cadena de texto para la comparación
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/o similar/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-.]/g, "")
    .replace(/-+/g, "-")
    .trim();
};

// Mapeo de marcas a imágenes de fallback
const BRAND_FALLBACK_IMAGES: Record<string, string> = {
  kia: "/cars/2021-kia-soul-s-5door-hatchback-black.png",
  toyota: "/cars/2020-toyota-corolla-le-sedan-black.png",
  ford: "/cars/2021-ford-edge-titanium-suv-black.png",
  tesla: "/cars/2021-tesla-model-3-standard-range-plus-sedan-black.png",
  volkswagen: "/cars/2021-volkswagen-jetta-s-sedan-black.png",
  chrysler: "/cars/2022-chrysler-pacifica-touring-l-minivan-black.png",
};

// Verificar si un nombre de archivo existe
const fileExists = (filenameWithoutExtension: string): boolean => {
  return IMAGE_FILENAMES.includes(filenameWithoutExtension);
};

export const getCarImageUrl = (
  thumbFilename: string | undefined, 
  carNameDetails: string,
  carBrandName: string,
  defaultColor: "black" | "white" | "blue" = "black"
): string => {
  if (thumbFilename) {
    const normalizedThumb = normalizeString(thumbFilename).replace(
      /\.png$/,
      ""
    );
    if (fileExists(normalizedThumb)) {
      return `/cars/${normalizedThumb}.png`;
    }

    const thumbBase = normalizedThumb.replace(
      /-black$|-white$|-grey$|-blue$/,
      ""
    );
    const potentialMatches = IMAGE_FILENAMES.filter((filename) =>
      normalizeString(filename).startsWith(thumbBase)
    );

    const preferredMatch = potentialMatches.find((filename) =>
      filename.includes(defaultColor)
    );
    if (preferredMatch) {
      return `/cars/${preferredMatch}.png`;
    }
    const whiteMatch = potentialMatches.find((filename) =>
      filename.includes("white")
    );
    if (whiteMatch) {
      return `/cars/${whiteMatch}.png`;
    }
    const blueMatch = potentialMatches.find((filename) =>
      filename.includes("blue")
    );
    if (blueMatch) {
      return `/cars/${blueMatch}.png`;
    }
    if (potentialMatches.length > 0) {
      return `/cars/${potentialMatches[0]}.png`;
    }
  }

  const normalizedCarName = normalizeString(carNameDetails);

  for (const filename of IMAGE_FILENAMES) {
    const normalizedFilename = normalizeString(filename);

    // Extrae la marca y modelo principal para buscar coincidencias
    const parts = normalizedCarName.split("-");
    const mainModelName =
      parts.length > 2
        ? parts.slice(0, 3).join("-")
        : parts.slice(0, 2).join("-");

    if (normalizedFilename.includes(mainModelName)) {
      // Preferir el color por defecto si existe una opción para ese color
      if (filename.includes(defaultColor)) {
        return `/cars/${filename}.png`;
      }
      // Si no hay preferencia de color o no se encuentra el color exacto, tomar la primera coincidencia
      // que no tenga un color explícito (asumiendo que es una imagen "genérica" de ese modelo)
      if (
        !normalizedFilename.includes("black") &&
        !normalizedFilename.includes("white") &&
        !normalizedFilename.includes("blue")
      ) {
        return `/cars/${filename}.png`;
      }
    }
  }

  // Extrae la primera palabra del nombre del coche para usarla como marca
  const brandToMatch = carBrandName.split(" ")[0];
  const normalizedBrand = normalizeString(brandToMatch);

  if (BRAND_FALLBACK_IMAGES[normalizedBrand]) {
    console.warn(
      `No se encontró una imagen específica para: "${carNameDetails}" (thumb: ${
        thumbFilename || "N/A"
      }). Usando imagen de fallback genérica para la marca "${brandToMatch}".`
    );
    return BRAND_FALLBACK_IMAGES[normalizedBrand];
  }

  // Si no se encontró ninguna coincidencia
  console.warn(
    `No se encontró ninguna imagen (específica o por marca) para: "${carNameDetails}" (thumb: ${
      thumbFilename || "N/A"
    }). Devolviendo placeholder genérico.`
  );

  // Devolver una imagen genérica por defecto o la primera que tengamos si la lista no está vacía.
  if (IMAGE_FILENAMES.length > 0) {
    const fallbackFilename =
      IMAGE_FILENAMES.find((f) => f.includes("black")) ||
      IMAGE_FILENAMES.find((f) => f.includes("white")) ||
      IMAGE_FILENAMES[0];
    return `/cars/${fallbackFilename}.png`;
  }

  return "/cars/placeholder.png";
};
