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

# Find all unique MonoBehaviour class names
class_counts = {}
class_examples = {}

for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, MonoBehaviour) and data.m_Script:
            script = data.m_Script
            if hasattr(script, 'm_ClassName'):
                cls = script.m_ClassName
                class_counts[cls] = class_counts.get(cls, 0) + 1
                if cls not in class_examples:
                    class_examples[cls] = {
                        'name': data.m_Name,
                        'path_id': obj.path_id
                    }
    except:
        pass

# Print classes, focusing on game data related ones
print(f"Total unique MonoBehaviour classes: {len(class_counts)}")
print(f"Total MonoBehaviours: {sum(class_counts.values())}\n")

# Look for keywords
keywords = ['affix', 'modifier', 'talent', 'skill', 'stat', 'buff', 'effect', 
            'equipment', 'item', 'attribute', 'ability']
            
for cls, count in sorted(class_counts.items(), key=lambda x: -x[1]):
    if count > 2 or any(kw in cls.lower() for kw in keywords):
        ex = class_examples[cls]
        print(f"  {cls}: {count} instances (e.g. '{ex['name']}')")
