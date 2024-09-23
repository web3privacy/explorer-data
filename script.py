import os

# Cesta ke složce, kde jsou projekty
projects_folder = './src/projects'

# Počítadla
total_folders = 0
renamed_folders = 0
skipped_folders = 0

# Projde všechny složky v složce projects
for root, dirs, files in os.walk(projects_folder):
    for dir_name in dirs:
        total_folders += 1  # Započítáme každou složku
        
        # Získáme původní cestu ke složce
        original_path = os.path.join(root, dir_name)

        # Převést název složky na lowercase a nahradit mezery a podtržítka pomlčkami
        new_dir_name = dir_name.lower().replace(' ', '-').replace('_', '-')
        new_path = os.path.join(root, new_dir_name)

        # Pokud je původní název jiný než nový (abychom předešli zbytečným přejmenováním)
        if original_path != new_path:
            try:
                os.rename(original_path, new_path)
                print(f"Přejmenovávám složku: '{original_path}' -> '{new_path}'")
                renamed_folders += 1
            except OSError as e:
                print(f"Chyba při přejmenování složky {original_path}: {e}")
        else:
            print(f"Složka '{original_path}' již má správný název, preskakuji.")
            skipped_folders += 1

# Výsledný souhrn
print("\n--- SOUHRN ---")
print(f"Celkový počet složek: {total_folders}")
print(f"Počet přejmenovaných složek: {renamed_folders}")
print(f"Počet přeskočených složek (již správné): {skipped_folders}")
