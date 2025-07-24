# DevOps Jogja Community Website

A modern community website built with Flask and Tailwind CSS for DevOps Jogja community.

## Quick Start

### Clone and Setup
```bash
git clone https://github.com/devops-jogja/devops-jogja-website.git
cd devops-jogja-website

# Setup Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup Node.js dependencies and build CSS
npm install
npm run build-css

# Run the application
python app.py
```

Visit `http://localhost:5000`

## Development

### Project Structure
```
devops-jogja-website/
├── app.py                 # Main Flask app
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── tailwind.config.js    # Tailwind configuration
├── static/               # Static assets
├── templates/            # HTML templates
├── content/              # Content files
├── utils/                # Utility modules
└── README.md            # This file
```

### Adding Content

#### Blog Posts
Create Markdown files in `content/blog/`:
```markdown
---
title: "Your Post Title"
date: "2024-01-15"
author: "Your Name"
tags: ["DevOps", "Docker"]
---

Your blog content here...
```

#### Events
Create Markdown files in `content/event/`:
```markdown
---
title: "Event Name"
date: "2024-02-20"
location: "Venue"
type: "Workshop"
---

Event description...
```

### Development Commands
```bash
# Watch CSS changes
npm run build-css

# Run with auto-reload
export FLASK_ENV=development
flask run

# Run with Docker
docker-compose up
```

## Deployment

### Docker
```bash
docker build -t devops-jogja-website .
docker run -p 5000:5000 devops-jogja-website
```

### Docker Compose
```bash
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.
