import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Checkbox,
  Box,
  Tooltip,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Photo } from '../types';
import { useApp } from '../context/AppContext';
import { formatFileSize } from '../utils/helpers';
import PhotoEditor from './PhotoEditor';
import AIAnalysis from './AIAnalysis';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const {
    selectedPhotos,
    setSelectedPhotos,
    toggleFavorite,
    deletePhoto,
    setFullscreenPhotoId,
    currentView,
    updatePhoto,
  } = useApp();

  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [aiAnalyzingPhoto, setAiAnalyzingPhoto] = useState<Photo | null>(null);

  const handleSelectPhoto = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const handleDeletePhoto = async (photoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar esta foto?')) {
      await deletePhoto(photoId);
    }
  };

  const handleToggleFavorite = async (photoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await toggleFavorite(photoId);
  };

  const handleOpenFullscreen = (photoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFullscreenPhotoId(photoId);
  };

  const handleEditPhoto = (photo: Photo, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingPhoto(photo);
  };

  const handleAIAnalysis = (photo: Photo, event: React.MouseEvent) => {
    event.stopPropagation();
    setAiAnalyzingPhoto(photo);
  };

  const handleSaveEdit = async (editedImageUrl: string) => {
    if (editingPhoto) {
      const updatedPhoto = { ...editingPhoto, url: editedImageUrl };
      await updatePhoto(updatedPhoto);
      setEditingPhoto(null);
    }
  };

  const getGridSize = () => {
    switch (currentView.gridSize) {
      case 'small': return 2;
      case 'medium': return 3;
      case 'large': return 4;
      case 'xlarge': return 6;
      default: return 3;
    }
  };

  if (photos.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Nenhuma foto encontrada
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Faça upload de fotos para começar
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={getGridSize()} key={photo.id}>
          <Card
            sx={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
            onClick={() => handleSelectPhoto(photo.id)}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height={currentView.gridSize === 'small' ? 150 : currentView.gridSize === 'medium' ? 200 : 250}
                image={photo.url}
                alt={photo.name}
                sx={{ objectFit: 'cover' }}
              />
              <Checkbox
                checked={selectedPhotos.includes(photo.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPhoto(photo.id);
                }}
              />
              {photo.favorite && (
                <FavoriteIcon
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'error.main',
                  }}
                />
              )}
            </Box>
            <CardActions sx={{ justifyContent: 'space-between', px: 1, py: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Visualizar em tela cheia">
                  <IconButton size="small" onClick={(e) => handleOpenFullscreen(photo.id, e)}>
                    <FullscreenIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar foto">
                  <IconButton size="small" onClick={(e) => handleEditPhoto(photo, e)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Análise com IA">
                  <IconButton size="small" onClick={(e) => handleAIAnalysis(photo, e)} color="secondary">
                    <AutoAwesomeIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={photo.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
                  <IconButton
                    size="small"
                    onClick={(e) => handleToggleFavorite(photo.id, e)}
                  >
                    {photo.favorite ? (
                      <FavoriteIcon fontSize="small" color="error" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleDeletePhoto(photo.id, e)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 100 }}>
                {formatFileSize(photo.size)}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}

      {/* Photo Editor Dialog */}
      {editingPhoto && (
        <PhotoEditor
          photo={editingPhoto}
          open={!!editingPhoto}
          onClose={() => setEditingPhoto(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* AI Analysis Dialog */}
      {aiAnalyzingPhoto && (
        <AIAnalysis
          photo={aiAnalyzingPhoto}
          open={!!aiAnalyzingPhoto}
          onClose={() => setAiAnalyzingPhoto(null)}
        />
      )}
    </Grid>
  );
};

export default PhotoGrid;
