# Chapter Generator
CLI tool to efforlessly scaffold chapter files for study/projects.
## Usage
```
npm run newChap <chapterNumber>
```

## Example 
```
npm run newChap 3
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
- Bash(child_process)

## Notes
- This is a small utility project to practice CLI tools. 
- Got tired of manually creating my chapter files for Eloquent Javascript so i automated the process. 
- Saves 10 - 20 seconds of typing.