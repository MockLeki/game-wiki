from UnityPy import Environment
from UnityPy.classes import TextAsset
from pathlib import Path

game_dir = Path(r"E:\SteamLibrary\steamapps\common\Deskrawl Demo\Deskrawl_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
            print(f"Loaded: {f.name} ({f.stat().st_size} bytes)")
        except Exception as e:
            print(f"Failed: {f.name}: {e}")

print(f"\nTotal objects: {len(env.objects)}")

# Find all TextAssets
output_dir = Path(r"C:\Users\12243\Desktop\game1\.workbuddy\game_assets_v2")
output_dir.mkdir(exist_ok=True)

text_assets = []
for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, TextAsset) and data.m_Script:
            name = data.m_Name
            text = data.m_Script
            if isinstance(text, bytes):
                text = text.decode('utf-8', errors='replace')
            
            safe_name = name.replace('/', '_').replace('\\', '_')
            fpath = output_dir / f"{safe_name}.txt"
            fpath.write_text(text, encoding='utf-8')
            print(f"Saved: {name} ({len(text)} chars)")
            text_assets.append(name)
    except:
        pass

print(f"\nTotal TextAssets: {len(text_assets)}")
for name in text_assets:
    print(f"  {name}")
