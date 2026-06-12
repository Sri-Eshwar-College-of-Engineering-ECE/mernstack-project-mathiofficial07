const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

function stripTypes(content) {
    // Remove interfaces
    content = content.replace(/interface\s+\w+\s*(?:extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '');
    // Remove type aliases
    content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
    // Remove 'as' assertions (be careful with 'import ... as')
    content = content.replace(/\s+as\s+[A-Z][A-Za-z0-9_]*/g, '');
    // Remove type annotations from variables and parameters (e.g., : string, : Props)
    // This regex is tricky, let's target common patterns
    content = content.replace(/:\s*(?:string|number|boolean|any|void|unknown|never|object|symbol)/g, '');
    content = content.replace(/:\s*[A-Z][A-Za-z0-9_]*(?:\[\])?(?=[\s,=;)])/g, ''); // Simple class/interface names
    content = content.replace(/<\s*[A-Z][A-Za-z0-9_]*\s*>/g, ''); // Simple generics
    // Remove React generics like React.FC<Props>
    content = content.replace(/React\.FC<[^>]+>/g, 'React.FC');

    return content;
}

const srcDir = path.join(process.cwd(), 'src');
const allFiles = walk(srcDir);

allFiles.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (file.includes('node_modules')) return;

        console.log(`Processing: ${file}`);
        const content = fs.readFileSync(file, 'utf8');
        const stripped = stripTypes(content);

        const newFile = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
        fs.writeFileSync(newFile, stripped);
        fs.unlinkSync(file);
        console.log(`Converted to: ${newFile}`);
    }
});

console.log('Conversion complete!');
