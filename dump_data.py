from UnityPy import Environment
from UnityPy.classes import MonoBehaviour
from pathlib import Path
import json

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
        except:
            pass

# Dump ChatStaticData and ALL MonoBehaviours
for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, MonoBehaviour):
            tree = None
            try:
                tree = data.read_typetree()
            except:
                try:
                    # Try raw dump
                    if hasattr(data, 'm_GameObject'):
                        go = data.m_GameObject
                        print(f"MonoBehaviour: {data.m_Name}, GO: {go}, PathID: {obj.path_id}")
                except:
                    pass
                
            if tree:
                # Convert to JSON-safe
                def clean(obj):
                    if isinstance(obj, dict):
                        return {k: clean(v) for k, v in obj.items()}
                    elif isinstance(obj, list):
                        return [clean(x) for x in obj]
                    elif isinstance(obj, (bytes, bytearray)):
                        try:
                            return obj.decode('utf-8', errors='replace')
                        except:
                            return f"<bytes {len(obj)}>"
                    elif hasattr(obj, 'path_id'):
                        return f"PPtr({obj.path_id})"
                    else:
                        return str(obj) if not isinstance(obj, (int, float, str, bool)) else obj
                
                cleaned = clean(tree)
                if 'm_Script' in cleaned:
                    del cleaned['m_Script']
                if cleaned:
                    print(f"\n{data.m_Name}: {json.dumps(cleaned, ensure_ascii=False, indent=2)[:500]}")
    except Exception as e:
        pass

print("\nDone.")
