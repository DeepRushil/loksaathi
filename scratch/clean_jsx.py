import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace : JSX.Element with nothing or : React.ReactNode
    # We'll use : React.ReactNode for safer typing in components
    new_content = re.sub(r':\s*JSX\.Element', ': React.ReactNode', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned {filepath}")

src_dir = r'c:\Users\hp\.gemini\antigravity\scratch\election-assistant\src'
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            clean_file(os.path.join(root, file))
