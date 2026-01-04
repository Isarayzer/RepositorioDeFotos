import React, { useEffect } from 'react';
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useApp } from '../context/AppContext';
import { formatFileSize } from '../utils/helpers';
import { format } from 'date-fns';

const FullscreenViewer: React.FC = () => {
  const {
    fullscreenPhotoId,
    setFullscreenPhotoId,
    toggleFavorite,
    getFilteredPhotos,
  } = useApp();

  const photos = getFilteredPhotos();
  const currentPhoto = photos.find(p => p.id === fullscreenPhotoId);
  const currentIndex = photos.findIndex(p => p.id === fullscreenPhotoId);

  const handleClose = () => {
    setFullscreenPhotoId(null);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setFullscreenPhotoId(photos[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setFullscreenPhotoId(photos[currentIndex + 1].id);
    }
  };

  const handleToggleFavorite = async () => {
    if (currentPhoto) {
      await toggleFavorite(currentPhoto.id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!fullscreenPhotoId) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'f':
          handleToggleFavorite();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [fullscreenPhotoId, currentIndex]);

  if (!currentPhoto) return null;

  return (
    <Dialog
      open={!!fullscreenPhotoId}
      onClose={handleClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
            zIndex: 1,
          }}
        >
          <Typography variant="h6" color="white">
            {currentPhoto.name}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 8,
          }}
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {currentIndex < photos.length - 1 && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        )}

        {/* Footer */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'white' }}>
            <IconButton onClick={handleToggleFavorite} sx={{ color: 'white' }}>
              {currentPhoto.favorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <Typography variant="body2">
              {currentIndex + 1} / {photos.length}
            </Typography>

            {currentPhoto.width && currentPhoto.height && (
              <Typography variant="body2">
                {currentPhoto.width} x {currentPhoto.height}
              </Typography>
            )}

            <Typography variant="body2">
              {formatFileSize(currentPhoto.size)}
            </Typography>

            <Typography variant="body2">
              {format(currentPhoto.dateAdded, 'dd/MM/yyyy HH:mm')}
            </Typography>

            {currentPhoto.tags.length > 0 && (
              <Stack direction="row" spacing={1}>
                {currentPhoto.tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FullscreenViewer;
