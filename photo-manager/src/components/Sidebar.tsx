import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useApp } from '../context/AppContext';

const DRAWER_WIDTH = 280;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    albums,
    tags,
    photos,
    searchFilters,
    setSearchFilters,
    createAlbum,
    deleteAlbum,
    deleteTagGlobal,
  } = useApp();

  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');

  const handleCreateAlbum = async () => {
    if (newAlbumName.trim()) {
      await createAlbum(newAlbumName, newAlbumDescription || undefined);
      setNewAlbumName('');
      setNewAlbumDescription('');
      setAlbumDialogOpen(false);
    }
  };

  const handleDeleteAlbum = async (albumId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar este álbum?')) {
      await deleteAlbum(albumId);
    }
  };

  const handleDeleteTag = async (tagId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar esta tag?')) {
      await deleteTagGlobal(tagId);
    }
  };

  const handleAlbumClick = (albumId: string, event: React.MouseEvent) => {
    const album = albums.find(a => a.id === albumId);
    if (album) {
      const isSelected = searchFilters.albums.includes(albumId);

      if (isSelected) {
        // Se já está selecionado, desmarca
        setSearchFilters({
          ...searchFilters,
          albums: searchFilters.albums.filter(a => a !== albumId),
        });
      } else {
        // Se Shift está pressionado, adiciona à seleção
        // Senão, substitui a seleção
        if (event.shiftKey) {
          setSearchFilters({
            ...searchFilters,
            albums: [...searchFilters.albums, albumId],
          });
        } else {
          setSearchFilters({
            ...searchFilters,
            albums: [albumId],
          });
        }
      }
    }

    // Fecha o drawer mobile após seleção
    if (isMobile) {
      onMobileClose();
    }
  };

  const handleTagClick = (tagName: string, event: React.MouseEvent) => {
    const isSelected = searchFilters.tags.includes(tagName);

    if (isSelected) {
      // Se já está selecionado, desmarca
      setSearchFilters({
        ...searchFilters,
        tags: searchFilters.tags.filter(t => t !== tagName),
      });
    } else {
      // Se Shift está pressionado, adiciona à seleção
      // Senão, substitui a seleção
      if (event.shiftKey) {
        setSearchFilters({
          ...searchFilters,
          tags: [...searchFilters.tags, tagName],
        });
      } else {
        setSearchFilters({
          ...searchFilters,
          tags: [tagName],
        });
      }
    }

    // Fecha o drawer mobile após seleção
    if (isMobile) {
      onMobileClose();
    }
  };

  const handleShowAllPhotos = () => {
    setSearchFilters({
      searchText: '',
      tags: [],
      albums: [],
    });

    // Fecha o drawer mobile após seleção
    if (isMobile) {
      onMobileClose();
    }
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 2 }}>
      {/* All Photos */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={searchFilters.albums.length === 0 && searchFilters.tags.length === 0}
            onClick={handleShowAllPhotos}
          >
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText
              primary="Todas as Fotos"
              secondary={`${photos.length} fotos`}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Albums */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            ÁLBUNS
          </Typography>
          <IconButton size="small" onClick={() => setAlbumDialogOpen(true)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        {albums.length === 0 ? (
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: 'block' }}>
            Nenhum álbum criado
          </Typography>
        ) : (
          <List dense>
            {albums.map((album) => (
              <ListItem
                key={album.id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => handleDeleteAlbum(album.id, e)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={searchFilters.albums.includes(album.id)}
                  onClick={(e) => handleAlbumClick(album.id, e)}
                >
                  <ListItemIcon>
                    <FolderIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={album.name}
                    secondary={`${album.photoIds.length} fotos`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Tags */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          TAGS
        </Typography>

        {tags.length === 0 ? (
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: 'block' }}>
            Nenhuma tag criada
          </Typography>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ px: 1 }}>
            {tags.filter(t => t.count > 0).map((tag) => (
              <Chip
                key={tag.id}
                icon={<LocalOfferIcon fontSize="small" />}
                label={`${tag.name} (${tag.count})`}
                size="small"
                onClick={(e) => handleTagClick(tag.name, e)}
                onDelete={(e) => handleDeleteTag(tag.id, e)}
                color={searchFilters.tags.includes(tag.name) ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Create Album Dialog */}
      <Dialog open={albumDialogOpen} onClose={() => setAlbumDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Criar Novo Álbum</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Álbum"
            fullWidth
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
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
          <Button onClick={() => setAlbumDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreateAlbum} variant="contained" disabled={!newAlbumName.trim()}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
