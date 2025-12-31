import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queriesDir = path.join(__dirname, '..', 'docs', 'queries');

// Recursively find all .md files in subdirectories
function findMarkdownFiles(dir, baseDir = dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...findMarkdownFiles(fullPath, baseDir));
        } else if (item.endsWith('.md')) {
            files.push({ from: fullPath, name: item });
        }
    }
    
    return files;
}

// Find all markdown files in nested folders
const mdFiles = findMarkdownFiles(queriesDir);

// Move files to root queries directory
for (const file of mdFiles) {
    const targetPath = path.join(queriesDir, file.name);
    
    // Skip if file is already in the root
    if (file.from === targetPath) {
        continue;
    }
    
    // Move the file
    fs.renameSync(file.from, targetPath);
    console.log(`Moved: ${path.relative(queriesDir, file.from)} -> ${file.name}`);
}

// Remove empty directories
function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            removeEmptyDirs(fullPath);
            
            // Check if directory is now empty
            if (fs.readdirSync(fullPath).length === 0) {
                fs.rmdirSync(fullPath);
                console.log(`Removed empty directory: ${path.relative(queriesDir, fullPath)}`);
            }
        }
    }
}

removeEmptyDirs(queriesDir);

console.log('Documentation structure flattened successfully!');
