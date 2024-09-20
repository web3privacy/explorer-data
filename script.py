import os
import yaml

# Cesta ke složce, kde jsou projekty
projects_folder = './src/projects'

# Počítadla
total_files = 0
updated_files = 0
skipped_files = 0

# Projde všechny soubory v složce projects
for root, dirs, files in os.walk(projects_folder):
    for file in files:
        if file == 'index.yaml':
            total_files += 1
            file_path = os.path.join(root, file)

            # Načti obsah YAML souboru
            with open(file_path, 'r') as f:
                try:
                    data = yaml.safe_load(f)
                except yaml.YAMLError as exc:
                    print(f"Chyba při načítání {file_path}: {exc}")
                    continue
            
            # Zkontroluj, jestli chybí 'have_token'
            if 'third_party_dependency' not in data:
                print(f"Pridavam 'have_token' do {file_path}")
                data['third_party_dependency'] = False  # Přidá položku have_token s hodnotou False
                updated_files += 1

                # Ulož aktualizovaný YAML soubor zpět
                with open(file_path, 'w') as f:
                    yaml.dump(data, f, default_flow_style=False, sort_keys=False)
            else:
                print(f"Soubor {file_path} již obsahuje 'have_token', preskakuji.")
                skipped_files += 1

# Výsledný souhrn
print("\n--- SOUHRN ---")
print(f"Celkový počet souborů zpracovaných: {total_files}")
print(f"Počet souborů aktualizovaných: {updated_files}")
print(f"Počet souborů preskocených (již obsahují 'have_token'): {skipped_files}")
