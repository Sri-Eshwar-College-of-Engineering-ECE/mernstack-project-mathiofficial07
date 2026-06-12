const fs = require('fs');
const path = require('path');

function stripTypes(content) {
    try {
        // Remove Interfaces
        content = content.replace(/interface\s+\w+\s*(?:extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '');
        // Remove type aliases
        content = content.replace(/type\s+\w+\s*=\s*[\s\S]*?;/g, '');
        // Remove 'as X'
        content = content.replace(/\s+as\s+[A-Z]\w+/g, '');
        // Remove Type annotations
        content = content.replace(/:\s*[A-Z]\w+(?:\[\])?/g, '');
        content = content.replace(/:\s*(?:string|number|boolean|any|void|unknown|never)/g, '');
        // Remove generics <T>
        content = content.replace(/<\s*[A-Z]\w*\s*>/g, '');
        // Remove non-null assertions !
        content = content.replace(/!/g, '');
        return content;
    } catch (e) {
        console.error("Error stripping types:", e);
        return content;
    }
}

function processDirectory(dir) {
    console.log(`Processing directory: ${dir}`);
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const stripped = stripTypes(content);
                const newExt = file.endsWith('.tsx') ? '.jsx' : '.js';
                const newPath = filePath.replace(/\.tsx?$/, newExt);

                console.log(`Converting ${filePath} -> ${newPath}`);
                fs.writeFileSync(newPath, stripped, 'utf8');
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error(`Failed to convert ${filePath}:`, err);
            }
        }
    }
}

const targetDir = path.join(__dirname, 'src');
processDirectory(targetDir);
console.log('Conversion complete.');
