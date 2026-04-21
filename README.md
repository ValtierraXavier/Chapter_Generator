# Chapter Generator
## Overview

CLI tool to effortlessly scaffold chapter files for study and projects.

- Started as a Bash-based tool and refactored to use Node.js (`fs/promises`)
- Both versions are available. 
## Usage

### Generate Files (v1)
```bash
npm run bashChapter <number>
```

### Generate Files (v2)
```bash
npm run chapter create <number>
```

### Manage Paths (v2)
```bash
npm run chapter path set <path>
npm run chapter path reset
npm run chapter path view
npm run chapter path last
```
## Examples (v1)

```bash
npm run bashChapter 3
```

### Output
Creates a folder and files:
```
Chapter3/
    chapter3.js
    chapter3_data.js
```

## Examples (v2)

### Create
```bash
npm run chapter create 3
```

### Output
Creates a folder and files:
```
Chapter3/
    chapter3.js
    chapter3_data.js
```

### Set
```bash
npm run chapter path set /Users/Projects
```

### Output
Sets current path for chapter folder:
```json
{
    "defaultPath": "/Users/Desktop",
    "currentPath": "/Users/Projects",
    "previousPath": "/Users/Desktop"
}
```

### Reset
```bash
npm run chapter path reset
```

### Output
Sets currentPath to defaultPath:
```
Current path is set to: /Users/Desktop
```

### View
```bash
npm run chapter path view
```

### Output
Displays current path setting:
```
Current path is set to: /Users/Desktop
```

### Last
```bash
npm run chapter path last
```

### Output
Sets currentPath to previousPath:
```
Current path is set to: /Users/Desktop
```

## Tech
- Bash (v1 with child_process)
- Node.js (v2 with node:fs/promises)

## Notes
- This is a small utility project to practice CLI tools. 
- Saves time by automating repetitive file scaffolding.
- Refactored to use Node.js FS module to create files directly with JavaScript. No bash script required!