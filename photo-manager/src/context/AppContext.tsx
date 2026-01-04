import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Photo, Album, Tag, ViewMode, SearchFilters } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId, createObjectURL, readImageMetadata, filterPhotos } from '../utils/helpers';

interface AppContextType {
  // Estado
  photos: Photo[];
  albums: Album[];
  tags: Tag[];
  selectedPhotos: string[];
  currentView: ViewMode;
  searchFilters: SearchFilters;
  fullscreenPhotoId: string | null;
  darkMode: boolean;
  isLoading: boolean;

  // Ações - Photos
  addPhotos: (files: File[]) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addTagsToPhoto: (photoId: string, tags: string[]) => Promise<void>;
  removeTagFromPhoto: (photoId: string, tag: string) => Promise<void>;

  // Ações - Albums
  createAlbum: (name: string, description?: string) => Promise<Album>;
  deleteAlbum: (id: string) => Promise<void>;
  addPhotosToAlbum: (albumId: string, photoIds: string[]) => Promise<void>;
  removePhotoFromAlbum: (albumId: string, photoId: string) => Promise<void>;

  // Ações - Tags
  createTag: (name: string, color?: string) => Promise<Tag>;
  deleteTagGlobal: (tagId: string) => Promise<void>;

  // Ações - UI
  setSelectedPhotos: (photoIds: string[]) => void;
  setCurrentView: (view: ViewMode) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setFullscreenPhotoId: (id: string | null) => void;
  toggleDarkMode: () => void;

  // Funções auxiliares
  getFilteredPhotos: () => Photo[];
  getAlbumPhotos: (albumId: string) => Photo[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const storage = useLocalStorage();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>({ type: 'grid', gridSize: 'medium' });
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchText: '',
    tags: [],
    albums: [],
  });
  const [fullscreenPhotoId, setFullscreenPhotoId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do storage ao iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedPhotos, loadedAlbums, loadedTags] = await Promise.all([
          storage.getAllPhotos(),
          storage.getAllAlbums(),
          storage.getAllTags(),
        ]);
        setPhotos(loadedPhotos);
        setAlbums(loadedAlbums);
        setTags(loadedTags);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Adicionar fotos
  const addPhotos = async (files: File[]) => {
    const newPhotos: Photo[] = [];

    for (const file of files) {
      const id = generateId();
      const url = createObjectURL(file);
      const metadata = await readImageMetadata(file);

      const photo: Photo = {
        id,
        file,
        url,
        name: file.name,
        size: file.size,
        type: file.type,
        dateAdded: new Date(),
        width: metadata.width,
        height: metadata.height,
        tags: [],
        albums: [],
        favorite: false,
      };

      await storage.savePhoto(photo);
      newPhotos.push(photo);
    }

    setPhotos(prev => [...newPhotos, ...prev]);
  };

  // Deletar foto
  const deletePhoto = async (id: string) => {
    await storage.deletePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));

    // Remover das seleções
    setSelectedPhotos(prev => prev.filter(pId => pId !== id));

    // Remover dos álbuns
    const updatedAlbums = albums.map(album => ({
      ...album,
      photoIds: album.photoIds.filter(pId => pId !== id),
    }));
    for (const album of updatedAlbums) {
      await storage.updateAlbum(album.id, { photoIds: album.photoIds });
    }
    setAlbums(updatedAlbums);
  };

  // Toggle favorito
  const toggleFavorite = async (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      const updated = { ...photo, favorite: !photo.favorite };
      await storage.updatePhoto(id, { favorite: updated.favorite });
      setPhotos(prev => prev.map(p => p.id === id ? updated : p));
    }
  };

  // Adicionar tags à foto
  const addTagsToPhoto = async (photoId: string, newTags: string[]) => {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;

    const updatedTags = [...new Set([...photo.tags, ...newTags])];
    await storage.updatePhoto(photoId, { tags: updatedTags });
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, tags: updatedTags } : p));

    // Atualizar contagem de tags
    for (const tagName of newTags) {
      const existingTag = tags.find(t => t.name === tagName);
      if (existingTag) {
        await storage.updateTag(existingTag.id, { count: existingTag.count + 1 });
      } else {
        const newTag = await createTag(tagName);
        setTags(prev => [...prev, newTag]);
      }
    }
  };

  // Remover tag da foto
  const removeTagFromPhoto = async (photoId: string, tag: string) => {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;

    const updatedTags = photo.tags.filter(t => t !== tag);
    await storage.updatePhoto(photoId, { tags: updatedTags });
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, tags: updatedTags } : p));

    // Atualizar contagem de tags
    const existingTag = tags.find(t => t.name === tag);
    if (existingTag && existingTag.count > 0) {
      await storage.updateTag(existingTag.id, { count: existingTag.count - 1 });
      setTags(prev => prev.map(t => t.id === existingTag.id ? { ...t, count: t.count - 1 } : t));
    }
  };

  // Criar álbum
  const createAlbum = async (name: string, description?: string): Promise<Album> => {
    const album: Album = {
      id: generateId(),
      name,
      description,
      photoIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await storage.saveAlbum(album);
    setAlbums(prev => [album, ...prev]);
    return album;
  };

  // Deletar álbum
  const deleteAlbum = async (id: string) => {
    await storage.deleteAlbum(id);
    setAlbums(prev => prev.filter(a => a.id !== id));
  };

  // Adicionar fotos ao álbum
  const addPhotosToAlbum = async (albumId: string, photoIds: string[]) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    const updatedPhotoIds = [...new Set([...album.photoIds, ...photoIds])];
    await storage.updateAlbum(albumId, { photoIds: updatedPhotoIds });
    setAlbums(prev => prev.map(a => a.id === albumId ? { ...a, photoIds: updatedPhotoIds, updatedAt: new Date() } : a));

    // Atualizar fotos
    for (const photoId of photoIds) {
      const photo = photos.find(p => p.id === photoId);
      if (photo && !photo.albums.includes(albumId)) {
        const updatedAlbums = [...photo.albums, albumId];
        await storage.updatePhoto(photoId, { albums: updatedAlbums });
        setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, albums: updatedAlbums } : p));
      }
    }
  };

  // Remover foto do álbum
  const removePhotoFromAlbum = async (albumId: string, photoId: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    const updatedPhotoIds = album.photoIds.filter(id => id !== photoId);
    await storage.updateAlbum(albumId, { photoIds: updatedPhotoIds });
    setAlbums(prev => prev.map(a => a.id === albumId ? { ...a, photoIds: updatedPhotoIds, updatedAt: new Date() } : a));

    // Atualizar foto
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      const updatedAlbums = photo.albums.filter(id => id !== albumId);
      await storage.updatePhoto(photoId, { albums: updatedAlbums });
      setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, albums: updatedAlbums } : p));
    }
  };

  // Criar tag
  const createTag = async (name: string, color?: string): Promise<Tag> => {
    const tag: Tag = {
      id: generateId(),
      name,
      color,
      count: 1,
    };
    await storage.saveTag(tag);
    return tag;
  };

  // Deletar tag globalmente
  const deleteTagGlobal = async (tagId: string) => {
    const tag = tags.find(t => t.id === tagId);
    if (!tag) return;

    // Remover tag de todas as fotos
    const photosWithTag = photos.filter(p => p.tags.includes(tag.name));
    for (const photo of photosWithTag) {
      const updatedTags = photo.tags.filter(t => t !== tag.name);
      await storage.updatePhoto(photo.id, { tags: updatedTags });
    }

    setPhotos(prev => prev.map(p => ({
      ...p,
      tags: p.tags.filter(t => t !== tag.name),
    })));

    await storage.deleteTag(tagId);
    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  // Toggle modo escuro
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Obter fotos filtradas
  const getFilteredPhotos = (): Photo[] => {
    return filterPhotos(
      photos,
      searchFilters.searchText,
      searchFilters.tags,
      searchFilters.albums,
      searchFilters.favorites
    );
  };

  // Obter fotos de um álbum
  const getAlbumPhotos = (albumId: string): Photo[] => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return [];
    return photos.filter(p => album.photoIds.includes(p.id));
  };

  const value: AppContextType = {
    photos,
    albums,
    tags,
    selectedPhotos,
    currentView,
    searchFilters,
    fullscreenPhotoId,
    darkMode,
    isLoading,
    addPhotos,
    deletePhoto,
    toggleFavorite,
    addTagsToPhoto,
    removeTagFromPhoto,
    createAlbum,
    deleteAlbum,
    addPhotosToAlbum,
    removePhotoFromAlbum,
    createTag,
    deleteTagGlobal,
    setSelectedPhotos,
    setCurrentView,
    setSearchFilters,
    setFullscreenPhotoId,
    toggleDarkMode,
    getFilteredPhotos,
    getAlbumPhotos,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
