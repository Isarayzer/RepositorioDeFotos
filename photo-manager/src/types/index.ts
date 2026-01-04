// Tipos principais da aplicação

export interface Photo {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
  dateAdded: Date;
  dateTaken?: Date;
  width?: number;
  height?: number;
  tags: string[];
  albums: string[];
  favorite: boolean;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoId?: string;
  photoIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  count: number;
}

export interface ViewMode {
  type: 'grid' | 'list';
  gridSize: 'small' | 'medium' | 'large' | 'xlarge';
}

export interface SearchFilters {
  searchText: string;
  tags: string[];
  albums: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  favorites?: boolean;
}

export interface AppState {
  photos: Photo[];
  albums: Album[];
  tags: Tag[];
  selectedPhotos: string[];
  currentView: ViewMode;
  searchFilters: SearchFilters;
  fullscreenPhotoId: string | null;
}
