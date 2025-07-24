import os
import re
import markdown
import yaml
from datetime import datetime
from pathlib import Path


class MarkdownParser:
    def __init__(self):
        self.md = markdown.Markdown(extensions=["meta", "codehilite", "fenced_code"])

    def parse_file(self, file_path):
        """Parse a markdown file and extract metadata and content"""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Split frontmatter and content
            if content.startswith("---"):
                try:
                    _, frontmatter, body = content.split("---", 2)
                    metadata = yaml.safe_load(frontmatter.strip())
                except ValueError:
                    # No frontmatter found
                    metadata = {}
                    body = content
            else:
                metadata = {}
                body = content

            # Convert markdown to HTML
            html_content = self.md.convert(body)

            # Get slug from filename
            slug = Path(file_path).stem

            # Combine metadata with parsed content
            post_data = {
                "slug": slug,
                "content": html_content,
                "raw_content": body,
                "file_path": file_path,
                **metadata,
            }

            # Reset markdown instance for next use
            self.md.reset()

            return post_data

        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None

    def get_all_posts(self, directory):
        """Get all posts from a directory"""
        posts = []

        if not os.path.exists(directory):
            return posts

        for filename in os.listdir(directory):
            if filename.endswith(".md"):
                file_path = os.path.join(directory, filename)
                post = self.parse_file(file_path)
                if post:
                    posts.append(post)

        # Sort by date (newest first)
        posts.sort(key=lambda x: x.get("date", ""), reverse=True)
        return posts

    def get_post_by_slug(self, directory, slug):
        """Get a specific post by slug"""
        file_path = os.path.join(directory, f"{slug}.md")
        if os.path.exists(file_path):
            return self.parse_file(file_path)
        return None

    def get_latest_posts(self, directory, limit=5):
        """Get latest posts limited by number"""
        posts = self.get_all_posts(directory)
        return posts[:limit]

    def get_upcoming_events(self, directory, limit=5):
        """Get upcoming events (future dates)"""
        events = self.get_all_posts(directory)
        today = datetime.now().date()

        # Filter upcoming events
        upcoming = []
        for event in events:
            if "date" in event:
                try:
                    event_date = datetime.strptime(event["date"], "%Y-%m-%d").date()
                    if event_date >= today:
                        upcoming.append(event)
                except ValueError:
                    continue

        # Sort by date (earliest first for upcoming events)
        upcoming.sort(key=lambda x: x.get("date", ""))
        return upcoming[:limit]

    def get_posts_by_tag(self, directory, tag):
        """Get posts filtered by tag"""
        posts = self.get_all_posts(directory)
        tagged_posts = []

        for post in posts:
            if "tags" in post and tag in post["tags"]:
                tagged_posts.append(post)

        return tagged_posts

    def search_posts(self, directory, query):
        """Search posts by title and content"""
        posts = self.get_all_posts(directory)
        results = []
        query_lower = query.lower()

        for post in posts:
            # Search in title
            if "title" in post and query_lower in post["title"].lower():
                results.append(post)
                continue

            # Search in content
            if query_lower in post["raw_content"].lower():
                results.append(post)
                continue

        return results
