import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const TagsView: React.FC = () => {
  const { tags, photos, createTag, deleteTagGlobal, setSearchFilters, setCurrentPage } = useApp();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const handleCreateTag = async () => {
    if (newTagName.trim()) {
      await createTag(newTagName.trim());
      setNewTagName('');
      setCreateDialogOpen(false);
    }
  };

  const handleDeleteTag = async (tagId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar esta tag de todas as fotos?')) {
      await deleteTagGlobal(tagId);
    }
  };

  const handleTagClick = (tagName: string) => {
    setSearchFilters({
      searchText: '',
      tags: [tagName],
      albums: [],
    });
    setCurrentPage('photos'); // Volta para a página de fotos
  };

  // Calcular tamanho da tag baseado na frequência
  const getTagSize = (count: number) => {
    const maxCount = Math.max(...tags.map(t => t.count));
    const minSize = 0.875; // 14px
    const maxSize = 2; // 32px
    const size = minSize + ((count / maxCount) * (maxSize - minSize));
    return `${size}rem`;
  };

  const sortedTags = [...tags].sort((a, b) => b.count - a.count);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Tags
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tags.length} tag{tags.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Criar Tag
        </Button>
      </Box>

      {/* Tag Cloud */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tag Cloud
        </Typography>
        {tags.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
            Nenhuma tag criada. Adicione tags às suas fotos para começar.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              py: 2,
            }}
          >
            {tags.filter(t => t.count > 0).map((tag) => (
              <Chip
                key={tag.id}
                label={`${tag.name} (${tag.count})`}
                onClick={() => handleTagClick(tag.name)}
                color="primary"
                sx={{
                  fontSize: getTagSize(tag.count),
                  height: 'auto',
                  py: 1,
                  px: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.2s',
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* All Tags List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Todas as Tags
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {tags.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
            Nenhuma tag disponível
          </Typography>
        ) : (
          <List>
            {sortedTags.map((tag, index) => (
              <React.Fragment key={tag.id}>
                <ListItem
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      cursor: 'pointer',
                    },
                    borderRadius: 1,
                  }}
                  onClick={() => handleTagClick(tag.name)}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(e) => handleDeleteTag(tag.id, e)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <LocalOfferIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {tag.name}
                        </Typography>
                        <Chip
                          label={tag.count}
                          size="small"
                          color={tag.count > 0 ? 'primary' : 'default'}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        Usado {tag.count} {tag.count === 1 ? 'vez' : 'vezes'}
                        {tag.createdAt && ` • Criada ${format(new Date(tag.createdAt), 'dd/MM/yyyy')}`}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < tags.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Create Tag Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Criar Nova Tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome da Tag"
            fullWidth
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateTag();
              }
            }}
            helperText="Digite o nome da tag e pressione Enter ou clique em Criar"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreateTag} variant="contained" disabled={!newTagName.trim()}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TagsView;
