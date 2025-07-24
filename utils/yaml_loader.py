import yaml
import os


class YAMLLoader:
    def __init__(self):
        pass

    def load_yaml(self, file_path):
        """Load and parse YAML file"""
        try:
            if not os.path.exists(file_path):
                print(f"YAML file not found: {file_path}")
                return {}

            with open(file_path, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f)
                return data if data else {}

        except yaml.YAMLError as e:
            print(f"Error parsing YAML file {file_path}: {e}")
            return {}
        except Exception as e:
            print(f"Error loading YAML file {file_path}: {e}")
            return {}

    def save_yaml(self, data, file_path):
        """Save data to YAML file"""
        try:
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path, "w", encoding="utf-8") as f:
                yaml.dump(data, f, default_flow_style=False, allow_unicode=True)
            return True

        except Exception as e:
            print(f"Error saving YAML file {file_path}: {e}")
            return False
