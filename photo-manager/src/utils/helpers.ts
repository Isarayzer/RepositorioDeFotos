// Funções auxiliares

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

export const readImageMetadata = async (file: File): Promise<{ width?: number; height?: number; dateTaken?: Date }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({});
    };
    img.src = URL.createObjectURL(file);
  });
};

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const filterPhotos = (
  photos: any[],
  searchText: string,
  tags: string[],
  albums: string[],
  favorites?: boolean
): any[] => {
  return photos.filter(photo => {
    // Filtro de texto
    if (searchText) {
      const search = searchText.toLowerCase();
      const matchesName = photo.name.toLowerCase().includes(search);
      const matchesTags = photo.tags.some((tag: string) => tag.toLowerCase().includes(search));
      if (!matchesName && !matchesTags) return false;
    }

    // Filtro de tags
    if (tags.length > 0) {
      const hasAllTags = tags.every(tag => photo.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    // Filtro de álbuns
    if (albums.length > 0) {
      const inAlbum = albums.some(album => photo.albums.includes(album));
      if (!inAlbum) return false;
    }

    // Filtro de favoritos
    if (favorites !== undefined && photo.favorite !== favorites) {
      return false;
    }

    return true;
  });
};
