# CLAUDE.MD - Project Guide for Claude Code

## Project Overview

**Photo Manager** is a modern web-based photo management application with intelligent organization, advanced search, and local storage capabilities. This is a frontend-only MVP (v0.1.0) built with React + TypeScript.

## Quick Context

- **Type:** Web Application (SPA)
- **Version:** 0.1.0 (MVP)
- **Status:** Functional Development
- **Stack:** React 18 + TypeScript + Material-UI + Vite
- **Storage:** IndexedDB via LocalForage (frontend-only, no backend)
- **Language:** Portuguese (documentation and UI)

## Project Structure

```
Organização de Fotos/
├── README.md              # Project overview
├── PRD.md                 # Complete product requirements
├── INICIO_RAPIDO.md       # Quick start guide
├── ESTRUTURA.md           # Structure documentation
└── photo-manager/         # Main application
    ├── src/
    │   ├── components/    # React components
    │   ├── context/       # AppContext (state management)
    │   ├── hooks/         # Custom hooks
    │   ├── types/         # TypeScript definitions
    │   └── utils/         # Helpers and theme
    ├── public/
    └── Documentação/      # Extended documentation
```

## Key Technical Details

### Core Technologies
- **React 18.2.0** with TypeScript
- **Material-UI 5.15.0** for components
- **Vite 5.0.8** as build tool
- **LocalForage 1.10.0** for IndexedDB storage
- **React Dropzone 14.2.3** for file uploads
- **Date-fns 3.0.6** for date handling

### Main Components
- `PhotoUploader.tsx` - Drag-and-drop upload interface
- `PhotoGrid.tsx` - Responsive gallery (4 size options)
- `FullscreenViewer.tsx` - Fullscreen photo viewer
- `SearchBar.tsx` - Advanced search and filters
- `Sidebar.tsx` - Navigation and organization
- `BulkActions.tsx` - Batch operations

### State Management
- Context API via `AppContext.tsx`
- Local storage hook: `useLocalStorage.ts`
- No Redux/external state library

### Architecture Patterns
- Component-based architecture
- Context API for global state
- Custom hooks for reusable logic
- TypeScript for type safety
- Material-UI theming system

## Critical Information

### Known Issues
1. **Images don't persist after page reload (F5)**
   - Albums, tags, and metadata persist ✅
   - Images are lost on reload ❌
   - Workaround: Don't reload during use
   - Fix planned for v0.2.0

### What Works
- ✅ Drag-and-drop photo upload
- ✅ Responsive gallery (4 sizes)
- ✅ Fullscreen viewer
- ✅ Album system
- ✅ Tag system
- ✅ Advanced search and filters
- ✅ Favorites
- ✅ Light/dark theme
- ✅ 100% local storage (no backend)

## Development Guidelines

### Running the App
```bash
cd photo-manager
npm install          # First time only
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
```

### Code Standards
- Use TypeScript strictly
- Follow React hooks best practices
- Use Material-UI components consistently
- Portuguese for comments and documentation
- Functional components only (no class components)
- Keep components focused and single-purpose

### File Organization
- Components in `src/components/`
- Types in `src/types/index.ts`
- Utilities in `src/utils/`
- Context in `src/context/`
- Custom hooks in `src/hooks/`

### Testing
- No automated tests currently implemented
- Manual testing required
- Check against CHECKLIST.md

## Common Tasks

### Adding a New Component
1. Create `.tsx` file in `src/components/`
2. Add type definitions to `src/types/index.ts`
3. Import in `App.tsx` or parent component
4. Update documentation if user-facing

### Modifying State
1. Check `AppContext.tsx` for global state
2. Use context hooks: `usePhotos`, `useAlbums`, `useTags`
3. Update types in `src/types/index.ts`

### Styling Changes
1. Use Material-UI `sx` prop for component-level styles
2. Theme definitions in `src/utils/theme.ts`
3. Follow existing color scheme and spacing

### Adding Dependencies
```bash
cd photo-manager
npm install <package-name>
```

## Important Files to Reference

### For Understanding Codebase
- `src/types/index.ts` - All TypeScript interfaces
- `src/context/AppContext.tsx` - State management
- `photo-manager/Documentação/ARCHITECTURE.md` - Architecture details
- `photo-manager/Documentação/DEVELOPMENT.md` - Dev guide

### For Features & Requirements
- `PRD.md` - Complete product requirements
- `photo-manager/Documentação/PROJECT_SUMMARY.md` - Executive summary
- `photo-manager/Documentação/INTERFACE_GUIDE.md` - UI/UX guide

### For Issues & Limitations
- `photo-manager/Documentação/KNOWN_ISSUES.md` - Known problems
- `photo-manager/Documentação/CHECKLIST.md` - Feature verification

## Working with This Project

### When Adding Features
1. Check PRD.md for planned features
2. Review ARCHITECTURE.md for patterns
3. Update relevant documentation
4. Test thoroughly (no automated tests)
5. Update CHANGELOG.md

### When Fixing Bugs
1. Check KNOWN_ISSUES.md first
2. Reproduce the issue
3. Identify affected components
4. Test fix thoroughly
5. Document if it's a known issue resolution

### When Refactoring
1. Maintain existing component APIs
2. Don't break localStorage compatibility
3. Update TypeScript types if needed
4. Test all affected features
5. Update documentation

## Build & Deployment

### Development
- Hot reload enabled via Vite
- Port: 3000 (configurable in vite.config.ts)
- No environment variables needed

### Production Build
```bash
npm run build        # Outputs to dist/
npm run preview      # Test production build locally
```

### Deployment Notes
- Static site (no server needed)
- Can deploy to: Vercel, Netlify, GitHub Pages, etc.
- All data is client-side (IndexedDB)
- No API keys or secrets required

## Communication Preferences

### Language
- Code comments: Portuguese
- Documentation: Portuguese
- Git commits: Portuguese
- UI text: Portuguese

### Code Style
- Use descriptive variable names
- Add comments for complex logic
- Follow existing patterns
- Prioritize readability

### Response Format
- Be concise and direct
- Provide code examples when helpful
- Reference specific files with line numbers
- Explain reasoning for architectural decisions

## Version History

- **v0.1.0** (Current) - MVP Release
  - Core photo management features
  - Known issue: Image persistence

- **v0.2.0** (Planned)
  - Fix image persistence issue
  - Additional features TBD

## Git Workflow

- Main branch: Development
- Current worktree: `recursing-brattain`
- Commit messages: Portuguese, descriptive
- Recent commits:
  - `b10abdc` - Fix backup functionality and add upload preview
  - `dfa25f3` - Initial commit

## Additional Resources

- Full documentation: `photo-manager/Documentação/INDEX.md`
- Quick start: `INICIO_RAPIDO.md`
- Architecture: `photo-manager/Documentação/ARCHITECTURE.md`
- Development guide: `photo-manager/Documentação/DEVELOPMENT.md`

## Notes for Claude

1. **Always check** `PRD.md` for feature requirements before implementing
2. **Reference** `KNOWN_ISSUES.md` before investigating bugs
3. **Follow** existing patterns in `AppContext.tsx` for state management
4. **Use** TypeScript strictly - check `types/index.ts`
5. **Test** changes manually - no automated test suite
6. **Update** documentation when adding features
7. **Preserve** Portuguese language in all user-facing elements
8. **Remember** image persistence issue when working with photo storage

## Contact & Support

- Project owner: Local development
- Documentation: Comprehensive MD files in repository
- Issues: Track in KNOWN_ISSUES.md

---

**Last Updated:** January 2026
**Maintained by:** Project Team
**For:** Claude Code Assistant
