import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { Photo, Album, Tag } from '../types';

// Configurar localforage para usar IndexedDB
localforage.config({
  name: 'PhotoManager',
  storeName: 'photos',
  description: 'Local storage for photo management app'
});

// Stores separados para cada tipo de dado
const photosStore = localforage.createInstance({ storeName: 'photos' });
const albumsStore = localforage.createInstance({ storeName: 'albums' });
const tagsStore = localforage.createInstance({ storeName: 'tags' });

export const useLocalStorage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Funções para Photos
  const savePhoto = async (photo: Photo): Promise<void> => {
    await photosStore.setItem(photo.id, photo);
  };

  const getPhoto = async (id: string): Promise<Photo | null> => {
    return await photosStore.getItem<Photo>(id);
  };

  const getAllPhotos = async (): Promise<Photo[]> => {
    const photos: Photo[] = [];
    await photosStore.iterate<Photo, void>((value) => {
      photos.push(value);
    });
    return photos.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  };

  const deletePhoto = async (id: string): Promise<void> => {
    await photosStore.removeItem(id);
  };

  const updatePhoto = async (id: string, updates: Partial<Photo>): Promise<void> => {
    const photo = await getPhoto(id);
    if (photo) {
      await savePhoto({ ...photo, ...updates });
    }
  };

  // Funções para Albums
  const saveAlbum = async (album: Album): Promise<void> => {
    await albumsStore.setItem(album.id, album);
  };

  const getAlbum = async (id: string): Promise<Album | null> => {
    return await albumsStore.getItem<Album>(id);
  };

  const getAllAlbums = async (): Promise<Album[]> => {
    const albums: Album[] = [];
    await albumsStore.iterate<Album, void>((value) => {
      albums.push(value);
    });
    return albums.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  };

  const deleteAlbum = async (id: string): Promise<void> => {
    await albumsStore.removeItem(id);
  };

  const updateAlbum = async (id: string, updates: Partial<Album>): Promise<void> => {
    const album = await getAlbum(id);
    if (album) {
      await saveAlbum({ ...album, ...updates, updatedAt: new Date() });
    }
  };

  // Funções para Tags
  const saveTag = async (tag: Tag): Promise<void> => {
    await tagsStore.setItem(tag.id, tag);
  };

  const getTag = async (id: string): Promise<Tag | null> => {
    return await tagsStore.getItem<Tag>(id);
  };

  const getAllTags = async (): Promise<Tag[]> => {
    const tags: Tag[] = [];
    await tagsStore.iterate<Tag, void>((value) => {
      tags.push(value);
    });
    return tags.sort((a, b) => b.count - a.count);
  };

  const deleteTag = async (id: string): Promise<void> => {
    await tagsStore.removeItem(id);
  };

  const updateTag = async (id: string, updates: Partial<Tag>): Promise<void> => {
    const tag = await getTag(id);
    if (tag) {
      await saveTag({ ...tag, ...updates });
    }
  };

  // Limpar todos os dados
  const clearAll = async (): Promise<void> => {
    await photosStore.clear();
    await albumsStore.clear();
    await tagsStore.clear();
  };

  useEffect(() => {
    // Inicialização
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    // Photos
    savePhoto,
    getPhoto,
    getAllPhotos,
    deletePhoto,
    updatePhoto,
    // Albums
    saveAlbum,
    getAlbum,
    getAllAlbums,
    deleteAlbum,
    updateAlbum,
    // Tags
    saveTag,
    getTag,
    getAllTags,
    deleteTag,
    updateTag,
    // Utils
    clearAll
  };
};
