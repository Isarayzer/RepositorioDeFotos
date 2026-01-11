import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  Box,
  IconButton,
  Slider,
  Typography,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import ContrastIcon from '@mui/icons-material/Contrast';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { Photo } from '../types';

interface PhotoEditorProps {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
  onSave: (editedPhotoUrl: string) => void;
}

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ open, photo, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
  });
  const [activeControl, setActiveControl] = useState<string>('brightness');
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (photo && open) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = photo.url;
      img.onload = () => {
        setOriginalImage(img);
        drawImage(img, adjustments);
      };
    }
  }, [photo, open]);

  useEffect(() => {
    if (originalImage) {
      drawImage(originalImage, adjustments);
    }
  }, [adjustments, originalImage]);

  const drawImage = (img: HTMLImageElement, adj: Adjustments) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamanho do canvas baseado na rotação
    const angle = (adj.rotation * Math.PI) / 180;
    const isRotated = adj.rotation % 180 !== 0;

    if (isRotated) {
      canvas.width = img.height;
      canvas.height = img.width;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Salvar estado
    ctx.save();

    // Aplicar rotação
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // Aplicar flip
    const scaleX = adj.flipHorizontal ? -1 : 1;
    const scaleY = adj.flipVertical ? -1 : 1;
    ctx.scale(scaleX, scaleY);

    ctx.translate(-img.width / 2, -img.height / 2);

    // Aplicar filtros CSS
    ctx.filter = `
      brightness(${adj.brightness}%)
      contrast(${adj.contrast}%)
      saturate(${adj.saturation}%)
    `;

    // Desenhar imagem
    ctx.drawImage(img, 0, 0);

    // Restaurar estado
    ctx.restore();
  };

  const handleRotateLeft = () => {
    setAdjustments(prev => ({
      ...prev,
      rotation: (prev.rotation - 90) % 360,
    }));
  };

  const handleRotateRight = () => {
    setAdjustments(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
  };

  const handleFlipHorizontal = () => {
    setAdjustments(prev => ({
      ...prev,
      flipHorizontal: !prev.flipHorizontal,
    }));
  };

  const handleFlipVertical = () => {
    setAdjustments(prev => ({
      ...prev,
      flipVertical: !prev.flipVertical,
    }));
  };

  const handleReset = () => {
    setAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
    });
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        onSave(url);
        onClose();
      }
    }, 'image/jpeg', 0.95);
  };

  const handleAdjustmentChange = (key: keyof Adjustments, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!photo) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          backgroundColor: '#1e1e1e',
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography variant="h6" color="white">
          Editar Foto: {photo.name}
        </Typography>
        <Box>
          <IconButton onClick={handleReset} sx={{ color: 'white', mr: 1 }}>
            <UndoIcon />
          </IconButton>
          <IconButton onClick={handleSave} sx={{ color: 'white', mr: 1 }}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Canvas Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            overflow: 'auto',
            backgroundColor: '#2a2a2a',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Controls Panel */}
        <Box
          sx={{
            width: 300,
            p: 2,
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            overflowY: 'auto',
          }}
        >
          {/* Rotation & Flip Controls */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="white" gutterBottom>
              Rotação
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              <IconButton onClick={handleRotateLeft} sx={{ color: 'white' }}>
                <RotateLeftIcon />
              </IconButton>
              <IconButton onClick={handleRotateRight} sx={{ color: 'white' }}>
                <RotateRightIcon />
              </IconButton>
            </Stack>
            <Typography variant="caption" color="rgba(255,255,255,0.7)" align="center" display="block" sx={{ mb: 2 }}>
              {adjustments.rotation}°
            </Typography>

            <Typography variant="subtitle2" color="white" gutterBottom>
              Espelhar
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button
                variant={adjustments.flipHorizontal ? "contained" : "outlined"}
                onClick={handleFlipHorizontal}
                size="small"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Horizontal
              </Button>
              <Button
                variant={adjustments.flipVertical ? "contained" : "outlined"}
                onClick={handleFlipVertical}
                size="small"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Vertical
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Control Selector */}
          <ToggleButtonGroup
            value={activeControl}
            exclusive
            onChange={(_, value) => value && setActiveControl(value)}
            fullWidth
            size="small"
            sx={{ mb: 3 }}
          >
            <ToggleButton value="brightness" sx={{ color: 'white' }}>
              <BrightnessHighIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="contrast" sx={{ color: 'white' }}>
              <ContrastIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="saturation" sx={{ color: 'white' }}>
              <InvertColorsIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Brightness */}
          {activeControl === 'brightness' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="white" gutterBottom>
                Brilho: {adjustments.brightness}%
              </Typography>
              <Slider
                value={adjustments.brightness}
                onChange={(_, value) => handleAdjustmentChange('brightness', value as number)}
                min={0}
                max={200}
                sx={{ color: 'primary.main' }}
              />
            </Box>
          )}

          {/* Contrast */}
          {activeControl === 'contrast' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="white" gutterBottom>
                Contraste: {adjustments.contrast}%
              </Typography>
              <Slider
                value={adjustments.contrast}
                onChange={(_, value) => handleAdjustmentChange('contrast', value as number)}
                min={0}
                max={200}
                sx={{ color: 'primary.main' }}
              />
            </Box>
          )}

          {/* Saturation */}
          {activeControl === 'saturation' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="white" gutterBottom>
                Saturação: {adjustments.saturation}%
              </Typography>
              <Slider
                value={adjustments.saturation}
                onChange={(_, value) => handleAdjustmentChange('saturation', value as number)}
                min={0}
                max={200}
                sx={{ color: 'primary.main' }}
              />
            </Box>
          )}

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Action Buttons */}
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              fullWidth
            >
              Salvar Edição
            </Button>
            <Button
              variant="outlined"
              startIcon={<UndoIcon />}
              onClick={handleReset}
              fullWidth
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Resetar
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              fullWidth
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PhotoEditor;
