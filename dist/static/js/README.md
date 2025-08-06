# JavaScript Organization - DevOps Jogja Website

## File Structure

```
static/js/
├── main.js         # Global JavaScript functionality for all pages
├── homepage.js     # Homepage-specific interactive features
└── README.md       # This documentation file
```

## File Descriptions

### main.js
- **Purpose**: Contains global JavaScript functionality that applies to all pages
- **Features**:
  - Mobile menu toggle
  - Smooth scrolling for anchor links
  - Navbar scroll effects
  - Code copy functionality
  - Global utilities

### homepage.js
- **Purpose**: Homepage-specific interactive features and animations
- **Modules**:
  - `ElectronAnimation`: Handles the animated atom/electron background
  - `SponsorsSlider`: Manages sponsor logo carousel functionality
  - `PerformanceMonitor`: Tracks page performance and responsive behavior
- **Features**:
  - Parallax mouse movement effects
  - Scroll-based particle animations
  - Twinkling particle effects
  - Sponsor slider controls
  - Mobile optimization

## Usage

### In Templates
```html
<!-- Global JavaScript (included in base.html) -->
<script src="{{ url_for('static', filename='js/main.js') }}"></script>

<!-- Page-specific JavaScript (in page templates) -->
<script src="{{ url_for('static', filename='js/homepage.js') }}"></script>
```

### Accessing Modules
Homepage modules are exported to the global scope for debugging and potential extension:
```javascript
// Access modules from browser console
window.DevOpsJogja.ElectronAnimation
window.DevOpsJogja.SponsorsSlider
window.DevOpsJogja.PerformanceMonitor
```

## Benefits of This Organization

1. **Separation of Concerns**: Global vs page-specific functionality
2. **Better Caching**: Page-specific JS only loads when needed
3. **Maintainability**: Easier to find and modify specific features
4. **Performance**: Reduced initial payload for non-homepage pages
5. **Code Reusability**: Modular structure allows easy extension
6. **Debugging**: Clear module boundaries make debugging easier

## Adding New Features

### For Global Features (all pages):
Add to `main.js`

### For Page-Specific Features:
1. Create new file: `static/js/[page-name].js`
2. Include in template: `{% block extra_js %}<script src="..."></script>{% endblock %}`
3. Follow the modular pattern used in `homepage.js`
