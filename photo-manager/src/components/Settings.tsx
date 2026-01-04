import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  AlertTitle,
  Divider,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useApp } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings: React.FC = () => {
  const { photos, albums, tags } = useApp();
  const storage = useLocalStorage();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clearDataDialogOpen, setClearDataDialogOpen] = useState(false);
  const [deleteOptions, setDeleteOptions] = useState({
    photos: true,
    albums: true,
    tags: true,
  });

  const handleExportData = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    setError(null);

    try {
      // Prepare data for export
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        photos: photos,
        albums: albums,
        tags: tags,
      };

      // Convert to JSON
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportSuccess(true);
    } catch (err) {
      setError('Erro ao exportar dados. Por favor, tente novamente.');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportSuccess(false);
    setError(null);

    try {
      const fileContent = await file.text();
      const importData = JSON.parse(fileContent);

      // Validate data structure
      if (!importData.version || !importData.photos || !importData.albums || !importData.tags) {
        throw new Error('Formato de arquivo inválido');
      }

      // Limpar todos os dados existentes primeiro
      await storage.clearAll();

      // Importar fotos para IndexedDB
      await Promise.all(
        importData.photos.map((photo: any) => storage.savePhoto(photo))
      );

      // Importar álbuns para IndexedDB
      await Promise.all(
        importData.albums.map((album: any) => storage.saveAlbum(album))
      );

      // Importar tags para IndexedDB
      await Promise.all(
        importData.tags.map((tag: any) => storage.saveTag(tag))
      );

      setImportSuccess(true);

      // Reload page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError('Erro ao importar dados. Verifique se o arquivo está correto.');
      console.error('Import error:', err);
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleClearAllData = async () => {
    try {
      // Deletar dados selecionados usando o storage hook
      if (deleteOptions.photos) {
        const allPhotos = await storage.getAllPhotos();
        await Promise.all(allPhotos.map(photo => storage.deletePhoto(photo.id)));
      }

      if (deleteOptions.albums) {
        const allAlbums = await storage.getAllAlbums();
        await Promise.all(allAlbums.map(album => storage.deleteAlbum(album.id)));
      }

      if (deleteOptions.tags) {
        const allTags = await storage.getAllTags();
        await Promise.all(allTags.map(tag => storage.deleteTag(tag.id)));
      }

      // Recarregar a página para refletir as mudanças
      window.location.reload();
    } catch (err) {
      console.error('Error clearing data:', err);
      setError('Erro ao limpar dados. Por favor, tente novamente.');
      setClearDataDialogOpen(false);
    }
  };

  const handleToggleDeleteOption = (option: 'photos' | 'albums' | 'tags') => {
    setDeleteOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const isAnyOptionSelected = deleteOptions.photos || deleteOptions.albums || deleteOptions.tags;

  const handleCloseDialog = () => {
    setClearDataDialogOpen(false);
    // Reset para todos selecionados quando fechar
    setDeleteOptions({
      photos: true,
      albums: true,
      tags: true,
    });
  };

  const totalSize = photos.reduce((sum, photo) => sum + photo.size, 0);
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Configurações
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Gerencie seus dados e configurações do aplicativo
        </Typography>
      </Box>

      {/* Success/Error Messages */}
      {exportSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setExportSuccess(false)}>
          <AlertTitle>Backup realizado com sucesso!</AlertTitle>
          Seus dados foram exportados. Guarde o arquivo em um local seguro.
        </Alert>
      )}

      {importSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Importação bem-sucedida!</AlertTitle>
          Seus dados foram restaurados. A página será recarregada em breve...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          <AlertTitle>Erro</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Storage Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informações de Armazenamento
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Total de Fotos:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {photos.length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Total de Álbuns:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {albums.length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Total de Tags:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {tags.length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Espaço Utilizado (estimado):
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatSize(totalSize)}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Backup Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Backup e Restauração
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Faça backup dos seus dados para não perder suas fotos, álbuns e tags. Você pode restaurar os dados a qualquer momento.
        </Typography>

        <Stack spacing={2}>
          {/* Export Backup */}
          <Box>
            <Button
              variant="contained"
              startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
              onClick={handleExportData}
              disabled={isExporting || photos.length === 0}
              fullWidth
            >
              {isExporting ? 'Exportando...' : 'Exportar Backup'}
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Salva todas as suas fotos, álbuns e tags em um arquivo JSON
            </Typography>
          </Box>

          <Divider />

          {/* Import Backup */}
          <Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={isImporting ? <CircularProgress size={20} /> : <UploadFileIcon />}
              disabled={isImporting}
              fullWidth
            >
              {isImporting ? 'Importando...' : 'Restaurar Backup'}
              <input
                type="file"
                accept="application/json"
                hidden
                onChange={handleImportData}
              />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Restaura dados de um arquivo de backup anterior
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Danger Zone */}
      <Paper sx={{ p: 3, border: '1px solid', borderColor: 'error.main' }}>
        <Typography variant="h6" gutterBottom color="error">
          Zona de Perigo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Esta ação é irreversível. Todos os seus dados serão perdidos permanentemente.
        </Typography>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverIcon />}
          onClick={() => setClearDataDialogOpen(true)}
          fullWidth
        >
          Limpar Todos os Dados
        </Button>
      </Paper>

      {/* Clear Data Confirmation Dialog */}
      <Dialog
        open={clearDataDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione o que deseja deletar. Esta ação é irreversível:
          </DialogContentText>

          <FormGroup sx={{ mt: 3, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteOptions.photos}
                  onChange={() => handleToggleDeleteOption('photos')}
                  color="error"
                />
              }
              label={`${photos.length} foto(s)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteOptions.albums}
                  onChange={() => handleToggleDeleteOption('albums')}
                  color="error"
                />
              }
              label={`${albums.length} álbum(ns)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteOptions.tags}
                  onChange={() => handleToggleDeleteOption('tags')}
                  color="error"
                />
              }
              label={`${tags.length} tag(s)`}
            />
          </FormGroup>

          <Alert severity="warning">
            Recomendamos fazer um backup antes de continuar!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button
            onClick={handleClearAllData}
            color="error"
            variant="contained"
            disabled={!isAnyOptionSelected}
          >
            Sim, Limpar {deleteOptions.photos && deleteOptions.albums && deleteOptions.tags ? 'Tudo' : 'Selecionados'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
