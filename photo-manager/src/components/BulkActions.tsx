import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  Autocomplete,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useApp } from '../context/AppContext';

const BulkActions: React.FC = () => {
  const {
    selectedPhotos,
    setSelectedPhotos,
    tags,
    albums,
    addTagsToPhoto,
    addPhotosToAlbum,
    deletePhoto,
  } = useApp();

  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');

  if (selectedPhotos.length === 0) return null;

  const handleAddTags = async () => {
    const tagsToAdd = selectedTags.length > 0 ? selectedTags : [newTagInput];
    for (const photoId of selectedPhotos) {
      await addTagsToPhoto(photoId, tagsToAdd.filter(t => t.trim()));
    }
    setSelectedTags([]);
    setNewTagInput('');
    setTagDialogOpen(false);
  };

  const handleAddToAlbums = async () => {
    for (const albumName of selectedAlbums) {
      const album = albums.find(a => a.name === albumName);
      if (album) {
        await addPhotosToAlbum(album.id, selectedPhotos);
      }
    }
    setSelectedAlbums([]);
    setAlbumDialogOpen(false);
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Tem certeza que deseja deletar ${selectedPhotos.length} foto(s)?`)) {
      for (const photoId of selectedPhotos) {
        await deletePhoto(photoId);
      }
      setSelectedPhotos([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedPhotos([]);
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 3, backgroundColor: 'primary.light', color: 'white' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <strong>{selectedPhotos.length}</strong> foto(s) selecionada(s)
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LocalOfferIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={() => setTagDialogOpen(true)}
              size="small"
              fullWidth={{ xs: true, sm: false }}
            >
              Tags
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FolderIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={() => setAlbumDialogOpen(true)}
              size="small"
              fullWidth={{ xs: true, sm: false }}
            >
              Álbum
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={handleDeleteSelected}
              size="small"
              fullWidth={{ xs: true, sm: false }}
            >
              Deletar
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearSelection}
              size="small"
              sx={{ color: 'white', borderColor: 'white' }}
              fullWidth={{ xs: true, sm: false }}
            >
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Add Tags Dialog */}
      <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Tags às Fotos Selecionadas</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            freeSolo
            options={tags.map(t => t.name)}
            value={selectedTags}
            onChange={(_, newValue) => setSelectedTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Digite ou selecione tags"
                helperText="Pressione Enter para adicionar uma nova tag"
              />
            )}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddTags} variant="contained" disabled={selectedTags.length === 0}>
            Adicionar Tags
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add to Albums Dialog */}
      <Dialog open={albumDialogOpen} onClose={() => setAlbumDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Fotos a Álbuns</DialogTitle>
        <DialogContent>
          {albums.length === 0 ? (
            <Box sx={{ py: 3, textAlign: 'center' }}>
              Nenhum álbum disponível. Crie um álbum primeiro.
            </Box>
          ) : (
            <List>
              {albums.map((album) => (
                <ListItem key={album.id} disablePadding>
                  <Checkbox
                    checked={selectedAlbums.includes(album.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAlbums([...selectedAlbums, album.name]);
                      } else {
                        setSelectedAlbums(selectedAlbums.filter(a => a !== album.name));
                      }
                    }}
                  />
                  <ListItemText
                    primary={album.name}
                    secondary={`${album.photoIds.length} fotos`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlbumDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleAddToAlbums}
            variant="contained"
            disabled={selectedAlbums.length === 0}
          >
            Adicionar a Álbuns
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkActions;
