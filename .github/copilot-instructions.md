# DevOps Jogja Website - AI Coding Instructions

## Architecture Overview

This is a Flask-based community website with a content-driven architecture using Markdown files and YAML configuration. The app follows a simple MVC pattern with specialized utility classes for content processing.

### Core Components
- **Flask App** (`app.py`): Single-file application with route handlers and template filters
- **Content Parsers** (`utils/`): Specialized classes for Markdown and YAML processing
- **Content-First Design**: Blog posts, events, and static data stored as files in `content/`
- **Tailwind CSS**: Utility-first styling compiled via npm scripts

## Key Architectural Patterns

### Content Management System
- **Markdown Files**: All blog posts (`content/blog/`) and events (`content/event/`) use frontmatter YAML + Markdown body
- **YAML Data**: Static content like organizer profiles (`content/organizer.yaml`) and about page (`content/about.yaml`)
- **Slug-Based URLs**: Filenames become URL slugs (e.g., `my-post.md` → `/blog/my-post`)

### Custom Parsers Architecture
- `MarkdownParser`: Handles frontmatter extraction, Markdown→HTML conversion, date filtering, and content queries
- `YAMLLoader`: Simple YAML file loader with error handling
- Both are instantiated once in `app.py` and reused across requests

## Development Workflows

### CSS Development
```bash
# Watch mode for development
npm run build-css

# Production build (minified)
npm run build-css-prod
```

### Content Creation
- Blog posts: Create `.md` files in `content/blog/` with YAML frontmatter
- Events: Create `.md` files in `content/event/` with required fields (date, time, location, type)
- Template frontmatter includes: title, date, author, excerpt, tags, featured_image

### Running the Application
```bash
# Development (port 3000, debug mode)
python app.py

# Flask CLI alternative
export FLASK_APP=app.py && flask run
```

## Project-Specific Conventions

### Date Handling
- All dates use `YYYY-MM-DD` format in frontmatter
- Template filters `date` and `date_format` handle date parsing and formatting
- `get_upcoming_events()` filters by comparing dates to current date

### Content Structure Requirements
- Blog posts require: `title`, `date`, `author`, `excerpt`, `tags`
- Events require: `title`, `date`, `time`, `location`, `type`, `registration_url`
- Frontmatter is parsed with `yaml.safe_load()`, content with Python Markdown

### Template Organization
- `base.html`: Contains full HTML structure, meta tags, and navigation
- Directory-based templates: `blog/`, `event/` subdirectories mirror URL structure
- Template inheritance: All pages extend `base.html` with blocks

### Error Handling
- 404/500 handlers in `app.py` render custom error templates
- Content parsers return `None` or empty dict on errors, never raise exceptions
- File operations use `os.path.exists()` checks before processing

## Deployment & Infrastructure

### Docker Multi-Stage Build
- Uses `python:3.11-slim` base with Node.js for Tailwind compilation
- Non-root user `appuser` for security
- Health check on port 5000
- CSS built during Docker build process

### Port Configuration
- Development: Port 3000 (`python app.py`)
- Production: Port 5000 (Docker container)
- Flask runs with `host="0.0.0.0"` for container compatibility

### Directory Auto-Creation
Application automatically creates required directories on startup:
- `content/blog/`, `content/event/`
- `static/organizer/`, `static/images/`

## Integration Points

### Static Assets
- Images stored in `static/images/` and `static/organizer/`
- Compiled CSS at `static/css/output.css`
- Custom JavaScript at `static/js/main.js`

### Template Data Flow
- Homepage aggregates latest blogs + upcoming events
- All content routes use parser methods for data retrieval
- YAML content loaded on-demand per request (no caching)

### Content Query Methods
- `get_all_posts()`: Returns all posts sorted by date (newest first)
- `get_upcoming_events()`: Filters future events by date comparison
- `get_post_by_slug()`: Single post retrieval by filename
- `get_posts_by_tag()`: Tag-based filtering
- `search_posts()`: Text search in title and content
