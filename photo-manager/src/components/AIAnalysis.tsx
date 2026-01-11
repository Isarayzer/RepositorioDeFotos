import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Chip,
  Alert,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Photo } from '../types';
import { useApp } from '../context/AppContext';
import { getObjectsFromImage } from '../utils/aiDetection';

interface AIAnalysisProps {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ open, photo, onClose }) => {
  const { addTagsToPhoto } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!photo) return;

    setAnalyzing(true);
    setError(null);
    setDetectedObjects([]);

    try {
      const objects = await getObjectsFromImage(photo.url);
      setDetectedObjects(objects);
    } catch (err) {
      setError('Erro ao analisar a imagem. Tente novamente.');
      console.error('Erro na análise:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAddAllTags = async () => {
    if (photo && detectedObjects.length > 0) {
      await addTagsToPhoto(photo.id, detectedObjects);
      onClose();
    }
  };

  const handleAddTag = async (tag: string) => {
    if (photo) {
      await addTagsToPhoto(photo.id, [tag]);
      setDetectedObjects(prev => prev.filter(t => t !== tag));
    }
  };

  if (!photo) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon color="primary" />
          Análise com IA - {photo.name}
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* Image Preview */}
        <Box
          sx={{
            mb: 3,
            textAlign: 'center',
            '& img': {
              maxWidth: '100%',
              maxHeight: 200,
              borderRadius: 1,
            },
          }}
        >
          <img src={photo.url} alt={photo.name} />
        </Box>

        {/* Analyze Button */}
        {!analyzing && detectedObjects.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleAnalyze}
              size="large"
            >
              Analisar com IA
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
              Detecta objetos, animais, pessoas e muito mais!
            </Typography>
          </Box>
        )}

        {/* Loading */}
        {analyzing && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
              Analisando imagem com IA...
            </Typography>
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Results */}
        {detectedObjects.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Objetos detectados ({detectedObjects.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {detectedObjects.map((object) => (
                <Chip
                  key={object}
                  label={object}
                  color="secondary"
                  onClick={() => handleAddTag(object)}
                  icon={<AutoAwesomeIcon />}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 2 }} color="text.secondary">
              Clique em uma tag para adicioná-la individualmente
            </Typography>
          </Box>
        )}

        {!analyzing && detectedObjects.length === 0 && !error && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Clique no botão acima para iniciar a análise da imagem com Inteligência Artificial.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        {detectedObjects.length > 0 && (
          <Button onClick={handleAddAllTags} variant="contained">
            Adicionar Todas as Tags
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AIAnalysis;
