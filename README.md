# Chapter Generator
CLI tool to efforlessly scaffold chapter files for study/projects.
- Started as a bash-based tool and refactored to use node:fs/promises.
- Both versions available. 
## Usage
Bash version(v1):
```
npm run newChap <chapterNumber>
```
NodeFS version(v2):
```
node chapterGenerator.fs.js <chapterNumber>
```

## Example 
Bash Version(v1):
```
npm run newChap 3
```
NodeFS version(v2):
```
node chapterGenerator.fs.js 3
```

## Output
Creates a folder:
```
Chapter3/
    chapter3.js
    chapter3_data.js
```

## Tech
- Node.js
- Bash(child_process)(v1)

## Notes
- This is a small utility project to practice CLI tools. 
- Got tired of manually creating my chapter files for Eloquent Javascript so i automated the process. 
- Saves 10 - 20 seconds of typing.
- Refactored to use Node FS module to create files directly with js. No bash script required!