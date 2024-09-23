import os
import yaml

# Cesta ke složce, kde jsou projekty
projects_folder = './src/projects'

# Funkce na úpravu YAML dat
def update_id_in_yaml(file_path, folder_name):
    with open(file_path, 'r') as f:
        try:
            data = yaml.safe_load(f) or {}  # Načte YAML nebo prázdný slovník
        except yaml.YAMLError as exc:
            print(f"Chyba při načítání {file_path}: {exc}")
            return
    
    # Vygeneruj ID na základě názvu složky (lowercase s pomlčkami)
    new_id = folder_name.lower().replace(' ', '-').replace('_', '-')
    
    # Zkontroluj, jestli již existuje ID, a porovnej
    if 'id' in data:
        print(f"Soubor {file_path} již má ID '{data['id']}', nahrazuji s '{new_id}'")
    else:
        print(f"Soubor {file_path} nemá ID, přidávám '{new_id}'")

    # Aktualizuj nebo přidej ID na začátek dat
    data['id'] = new_id
    
    # Ulož aktualizovaný soubor zpět
    with open(file_path, 'w') as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False)

# Projde všechny složky ve složce projects
for root, dirs, files in os.walk(projects_folder):
    for dir_name in dirs:
        folder_path = os.path.join(root, dir_name)
        index_file = os.path.join(folder_path, 'index.yaml')
        
        # Zkontroluj, jestli soubor 'index.yaml' existuje
        if os.path.exists(index_file):
            update_id_in_yaml(index_file, dir_name)
        else:
            print(f"Soubor {index_file} neexistuje, preskakuji.")
