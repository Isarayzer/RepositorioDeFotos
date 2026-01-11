import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MenuIcon from '@mui/icons-material/Menu';
import { useApp } from './context/AppContext';
import PhotoUploader from './components/PhotoUploader';
import PhotoGrid from './components/PhotoGrid';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import FullscreenViewer from './components/FullscreenViewer';
import BulkActions from './components/BulkActions';
import TagsView from './components/TagsView';
import Home from './components/Home';
import Settings from './components/Settings';

const DRAWER_WIDTH = 280;

const App: React.FC = () => {
  const { darkMode, toggleDarkMode, isLoading, getFilteredPhotos, photos, currentPage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredPhotos = getFilteredPhotos();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <PhotoCameraIcon sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Photo Manager
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
            {photos.length} fotos
          </Typography>
          <Tooltip title={darkMode ? 'Modo claro' : 'Modo escuro'}>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          marginLeft: { xs: 0, md: `${DRAWER_WIDTH}px` },
          marginTop: '64px',
          minHeight: 'calc(100vh - 64px)',
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Container maxWidth={false}>
          {/* Home View */}
          {currentPage === 'home' && <Home />}

          {/* Tags View */}
          {currentPage === 'tags' && <TagsView />}

          {/* Settings View */}
          {currentPage === 'settings' && <Settings />}

          {/* Photos View */}
          {currentPage === 'photos' && (
            <>
              {/* Search Bar */}
              <SearchBar filteredPhotos={filteredPhotos} />

              {/* Bulk Actions */}
              <BulkActions />

              {/* Photo Grid */}
              <PhotoGrid photos={filteredPhotos} />
            </>
          )}
        </Container>
      </Box>

      {/* Fullscreen Viewer */}
      <FullscreenViewer />
    </Box>
  );
};

export default App;
