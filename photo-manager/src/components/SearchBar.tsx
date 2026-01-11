import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useApp } from '../context/AppContext';
import { Photo } from '../types';

interface SearchBarProps {
  filteredPhotos: Photo[];
}

const SearchBar: React.FC<SearchBarProps> = ({ filteredPhotos }) => {
  const { searchFilters, setSearchFilters, currentView, setCurrentView, selectedPhotos, setSelectedPhotos, albums } = useApp();
  const [searchText, setSearchText] = useState(searchFilters.searchText);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    setSearchFilters({ ...searchFilters, searchText: value });
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchFilters({ ...searchFilters, searchText: '' });
  };

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView) {
      setCurrentView({ ...currentView, gridSize: newView as any });
    }
  };

  const handleToggleFavorites = () => {
    setSearchFilters({
      ...searchFilters,
      favorites: searchFilters.favorites ? undefined : true,
    });
  };

  const handleRemoveTagFilter = (tag: string) => {
    setSearchFilters({
      ...searchFilters,
      tags: searchFilters.tags.filter(t => t !== tag),
    });
  };

  const handleRemoveAlbumFilter = (album: string) => {
    setSearchFilters({
      ...searchFilters,
      albums: searchFilters.albums.filter(a => a !== album),
    });
  };

  const handleSelectAll = () => {
    const allPhotoIds = filteredPhotos.map(photo => photo.id);
    setSelectedPhotos(allPhotoIds);
  };

  const handleDeselectAll = () => {
    setSelectedPhotos([]);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="stretch"
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Buscar fotos..."
          value={searchText}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Tooltip title="Filtrar favoritos">
            <IconButton
              onClick={handleToggleFavorites}
              color={searchFilters.favorites ? 'error' : 'default'}
              size="small"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>

          <ToggleButtonGroup
            value={currentView.gridSize}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
          <ToggleButton value="small">
            <Tooltip title="Grade pequena">
              <GridViewIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="medium">
            <Tooltip title="Grade média">
              <ViewModuleIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="large">
            <Tooltip title="Grade grande">
              <ViewComfyIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="xlarge">
            <Tooltip title="Grade extra grande">
              <ViewListIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
        </Box>
      </Stack>

      {/* Active Filters */}
      {(searchFilters.tags.length > 0 || searchFilters.albums.length > 0 || searchFilters.favorites) && (
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {searchFilters.favorites && (
            <Chip
              label="Favoritos"
              color="error"
              size="small"
              onDelete={() => setSearchFilters({ ...searchFilters, favorites: undefined })}
            />
          )}
          {searchFilters.tags.map(tag => (
            <Chip
              key={tag}
              label={`Tag: ${tag}`}
              size="small"
              onDelete={() => handleRemoveTagFilter(tag)}
              color="primary"
            />
          ))}
          {searchFilters.albums.map(albumId => {
            const album = albums.find(a => a.id === albumId);
            return (
              <Chip
                key={albumId}
                label={`Álbum: ${album?.name || albumId}`}
                size="small"
                onDelete={() => handleRemoveAlbumFilter(albumId)}
                color="secondary"
              />
            );
          })}
        </Stack>
      )}

      {/* Selection Controls */}
      {filteredPhotos.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CheckBoxIcon />}
            onClick={handleSelectAll}
            disabled={selectedPhotos.length === filteredPhotos.length}
          >
            Selecionar Todas ({filteredPhotos.length})
          </Button>
          {selectedPhotos.length > 0 && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckBoxOutlineBlankIcon />}
                onClick={handleDeselectAll}
              >
                Desselecionar Todas
              </Button>
              <Chip
                label={`${selectedPhotos.length} foto(s) selecionada(s)`}
                color="info"
                size="small"
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
