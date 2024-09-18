import yaml
import os

# Funkce pro načtení YAML souboru
def load_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

# Funkce pro zápis YAML souboru
def save_yaml(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        yaml.dump(data, file, allow_unicode=True)

# Funkce pro odstranění všeho kromě 'usecase'
def keep_only_usecase(file_path):
    try:
        # Načti YAML soubor
        data = load_yaml(file_path)
        
        # Ponechej jen klíč 'usecase', pokud existuje
        if 'usecase' in data:
            filtered_data = {'usecase': data['usecase']}
        else:
            filtered_data = {}

        # Ulož upravený soubor zpět
        save_yaml(file_path, filtered_data)
        return True
    except Exception as e:
        print(f"Chyba při zpracování souboru {file_path}: {e}")
        return False

# Funkce pro procházení složek a zpracování souborů index.yaml
def process_yaml_projects(projects_dir):
    total_files = 0
    processed_files = 0

    for project in os.listdir(projects_dir):
        project_path = os.path.join(projects_dir, project)
        index_file_path = os.path.join(project_path, 'index.yaml')

        # Ověř, že cesta je složka a obsahuje soubor 'index.yaml'
        if os.path.isdir(project_path):
            total_files += 1
            if os.path.isfile(index_file_path):
                success = keep_only_usecase(index_file_path)
                if success:
                    print(f"Zpracováno: {index_file_path}")
                    processed_files += 1
                else:
                    print(f"Nelze zpracovat: {index_file_path}")
            else:
                print(f"Složka {project_path} neobsahuje soubor 'index.yaml'")
    
    print(f"Celkový počet složek: {total_files}")
    print(f"Úspěšně zpracovaných souborů: {processed_files}")
    print(f"Nepřepsaných složek (bez 'index.yaml' nebo s chybou): {total_files - processed_files}")

# Použití
# Zde nastav složku, kde jsou tvé projekty (src/projects)
projects_dir = "src/projects"

# Spusť zpracování
process_yaml_projects(projects_dir)
