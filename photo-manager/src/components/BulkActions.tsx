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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useApp } from '../context/AppContext';

const BulkActions: React.FC = () => {
  const {
    selectedPhotos,
    setSelectedPhotos,
    tags,
    albums,
    photos,
    addTagsToPhoto,
    removeTagFromPhoto,
    addPhotosToAlbum,
    deletePhotos,
    createAlbum,
    movePhotosToAlbum,
    copyPhotosToAlbum,
    searchFilters,
  } = useApp();

  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [editTagDialogOpen, setEditTagDialogOpen] = useState(false);
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [createAlbumDialogOpen, setCreateAlbumDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
  const [moveToAlbum, setMoveToAlbum] = useState<string>('');
  const [moveAction, setMoveAction] = useState<'move' | 'copy'>('move');
  const [newTagInput, setNewTagInput] = useState('');
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');

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
      await deletePhotos(selectedPhotos);
    }
  };

  const handleMoveOrCopy = async () => {
    if (!moveToAlbum) return;

    const currentAlbumId = searchFilters.albums[0]; // Get first selected album in filter

    if (moveAction === 'move' && currentAlbumId) {
      await movePhotosToAlbum(selectedPhotos, currentAlbumId, moveToAlbum);
    } else {
      await copyPhotosToAlbum(selectedPhotos, moveToAlbum);
    }

    setMoveToAlbum('');
    setMoveDialogOpen(false);
    setSelectedPhotos([]);
  };

  const handleClearSelection = () => {
    setSelectedPhotos([]);
  };

  const handleRemoveTagFromSelected = async (tagToRemove: string) => {
    for (const photoId of selectedPhotos) {
      await removeTagFromPhoto(photoId, tagToRemove);
    }
  };

  const handleCreateAlbumFromDialog = async () => {
    if (newAlbumName.trim()) {
      const newAlbum = await createAlbum(newAlbumName.trim(), newAlbumDescription || undefined);
      // Adiciona o novo álbum à seleção
      setSelectedAlbums([...selectedAlbums, newAlbum.name]);
      setNewAlbumName('');
      setNewAlbumDescription('');
      setCreateAlbumDialogOpen(false);
    }
  };

  // Obter todas as tags das fotos selecionadas
  const getSelectedPhotosTags = (): string[] => {
    const selectedPhotosData = photos.filter(p => selectedPhotos.includes(p.id));
    const allTags = selectedPhotosData.flatMap(p => p.tags);
    return [...new Set(allTags)]; // Remove duplicatas
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
              Adicionar Tags
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={() => setEditTagDialogOpen(true)}
              size="small"
              fullWidth={{ xs: true, sm: false }}
            >
              Editar Tags
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FolderIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={() => setAlbumDialogOpen(true)}
              size="small"
              fullWidth={{ xs: true, sm: false }}
            >
              Adicionar a Álbum
            </Button>
            {searchFilters.albums.length > 0 && (
              <Button
                variant="contained"
                color="info"
                startIcon={<DriveFileMoveIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
                onClick={() => {
                  setMoveAction('move');
                  setMoveDialogOpen(true);
                }}
                size="small"
                fullWidth={{ xs: true, sm: false }}
              >
                Mover/Copiar
              </Button>
            )}
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

      {/* Edit Tags Dialog */}
      <Dialog open={editTagDialogOpen} onClose={() => setEditTagDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Tags das Fotos Selecionadas</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, mt: 2 }}>
            <Box sx={{ mb: 2 }}>
              <strong>{selectedPhotos.length}</strong> foto(s) selecionada(s)
            </Box>

            {/* Current Tags */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ fontWeight: 'bold', mb: 1 }}>Tags presentes nas fotos selecionadas:</Box>
              {getSelectedPhotosTags().length === 0 ? (
                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  Nenhuma tag nas fotos selecionadas
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {getSelectedPhotosTags().map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTagFromSelected(tag)}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Add New Tags */}
            <Box>
              <Box sx={{ fontWeight: 'bold', mb: 1 }}>Adicionar novas tags:</Box>
              <Autocomplete
                multiple
                freeSolo
                options={tags.map(t => t.name)}
                value={selectedTags}
                onChange={(_, newValue) => setSelectedTags(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} size="small" />
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
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTagDialogOpen(false)}>Fechar</Button>
          <Button onClick={handleAddTags} variant="contained" disabled={selectedTags.length === 0}>
            Adicionar Tags Selecionadas
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add to Albums Dialog */}
      <Dialog open={albumDialogOpen} onClose={() => setAlbumDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Adicionar Fotos a Álbuns
            <Button
              startIcon={<FolderIcon />}
              onClick={() => setCreateAlbumDialogOpen(true)}
              size="small"
              variant="outlined"
            >
              Criar Álbum
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {albums.length === 0 ? (
            <Box sx={{ py: 3, textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>Nenhum álbum disponível.</Box>
              <Button
                variant="contained"
                startIcon={<FolderIcon />}
                onClick={() => setCreateAlbumDialogOpen(true)}
              >
                Criar Primeiro Álbum
              </Button>
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

      {/* Create Album Dialog (from Add to Albums) */}
      <Dialog open={createAlbumDialogOpen} onClose={() => setCreateAlbumDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Criar Novo Álbum</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Álbum"
            fullWidth
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateAlbumFromDialog();
              }
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição (opcional)"
            fullWidth
            multiline
            rows={3}
            value={newAlbumDescription}
            onChange={(e) => setNewAlbumDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateAlbumDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreateAlbumFromDialog} variant="contained" disabled={!newAlbumName.trim()}>
            Criar e Selecionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Move/Copy Photos Dialog */}
      <Dialog open={moveDialogOpen} onClose={() => setMoveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Mover ou Copiar Fotos</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Escolha uma ação:</FormLabel>
              <RadioGroup
                value={moveAction}
                onChange={(e) => setMoveAction(e.target.value as 'move' | 'copy')}
              >
                <FormControlLabel
                  value="move"
                  control={<Radio />}
                  label="Mover (remove do álbum atual)"
                />
                <FormControlLabel
                  value="copy"
                  control={<Radio />}
                  label="Copiar (mantém no álbum atual)"
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ mb: 1 }}>Álbum de destino:</FormLabel>
              <Select
                value={moveToAlbum}
                onChange={(e) => setMoveToAlbum(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecione um álbum
                </MenuItem>
                {albums
                  .filter(a => !searchFilters.albums.includes(a.id))
                  .map(album => (
                    <MenuItem key={album.id} value={album.id}>
                      {album.name} ({album.photoIds.length} fotos)
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleMoveOrCopy}
            variant="contained"
            disabled={!moveToAlbum}
            startIcon={moveAction === 'move' ? <DriveFileMoveIcon /> : <ContentCopyIcon />}
          >
            {moveAction === 'move' ? 'Mover' : 'Copiar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkActions;
