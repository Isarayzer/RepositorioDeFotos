import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Fade,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useApp } from '../context/AppContext';
import PhotoUploader from './PhotoUploader';

const Home: React.FC = () => {
  const { photos, albums, tags, setCurrentPage, setSearchFilters } = useApp();
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);
  const [prevPhotosLength, setPrevPhotosLength] = useState(photos.length);

  // Detectar quando novas fotos são adicionadas
  useEffect(() => {
    if (photos.length > prevPhotosLength) {
      // Pegar os IDs das novas fotos adicionadas
      const newPhotoIds = photos
        .slice(0, photos.length - prevPhotosLength)
        .map(p => p.id);
      setRecentlyAdded(newPhotoIds);
    }
    setPrevPhotosLength(photos.length);
  }, [photos.length]);

  const favoritePhotos = photos.filter(p => p.favorite);
  const recentPhotos = [...photos].sort((a, b) => {
    const dateA = a.dateAdded instanceof Date ? a.dateAdded : new Date(a.dateAdded);
    const dateB = b.dateAdded instanceof Date ? b.dateAdded : new Date(b.dateAdded);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, 10);

  const handleNavigateToPhotos = () => {
    setSearchFilters({ searchText: '', tags: [], albums: [] });
    setCurrentPage('photos');
  };

  const handleNavigateToFavorites = () => {
    setSearchFilters({ searchText: '', tags: [], albums: [], favorites: true });
    setCurrentPage('photos');
  };

  const handleNavigateToTags = () => {
    setCurrentPage('tags');
  };

  const handleClosePreview = () => {
    setRecentlyAdded([]);
  };

  const recentlyAddedPhotos = photos.filter(p => recentlyAdded.includes(p.id));

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Bem-vindo ao Photo Manager
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Organize suas fotos, crie álbuns e gerencie suas memórias de forma inteligente.
        </Typography>
      </Box>

      {/* Preview das Fotos Recém-Adicionadas */}
      {recentlyAddedPhotos.length > 0 && (
        <Fade in={true}>
          <Paper sx={{ p: 3, mb: 4, border: '2px solid', borderColor: 'success.main' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="success.main">
                Fotos Adicionadas com Sucesso! ({recentlyAddedPhotos.length})
              </Typography>
              <IconButton onClick={handleClosePreview} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              {recentlyAddedPhotos.map((photo) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={photo.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      paddingBottom: '100%',
                      overflow: 'hidden',
                      borderRadius: 1,
                      boxShadow: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s',
                      },
                    }}
                    onClick={handleNavigateToPhotos}
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {photo.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>
      )}

      {/* Upload Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Adicionar Fotos
        </Typography>
        <PhotoUploader />
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={handleNavigateToPhotos}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <PhotoLibraryIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {photos.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de Fotos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={() => setCurrentPage('albums')}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <FolderIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {albums.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Álbuns
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={handleNavigateToTags}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <LocalOfferIcon sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {tags.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tags
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardActionArea onClick={handleNavigateToFavorites}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <FavoriteIcon sx={{ fontSize: 48, color: 'error.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {favoritePhotos.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Favoritos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Photos Preview */}
      {recentPhotos.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Fotos Recentes
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={handleNavigateToPhotos}
            >
              Ver todas
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {recentPhotos.map((photo) => (
              <Grid item xs={6} sm={4} md={2.4} key={photo.id}>
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={handleNavigateToPhotos}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
