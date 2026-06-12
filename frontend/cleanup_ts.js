const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

function stripTypes(content) {
    // Simple type stripping logic
    return content
        .replace(/interface\s+\w+\s*(?:extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '') // Remove interfaces
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '') // Remove type aliases
        .replace(/\b(public|private|protected|readonly)\b\s+/g, '') // Remove modifiers
        .replace(/:\s*([A-Z]\w*(\s*\|\s*[A-Z]\w*)*|string|number|boolean|any|void|unknown|never|object|symbol)(\[\])?(\s*\|\s*null|\s*\|\s*undefined)*/g, '') // Remove type annotations
        .replace(/<[A-Z]\w*(\s*,\s*[A-Z]\w*)*>/g, '') // Remove generic type parameters
        .replace(/\bimport\s+type\b/g, 'import') // Convert import type to import
        .replace(/\s+as\s+[A-Z]\w*/g, ''); // Remove 'as' assertions
}

function finalizeConversion() {
    const files = getAllFiles(srcDir);
    console.log(`Scanning ${files.length} files in src...`);

    files.forEach(file => {
        const ext = path.extname(file);
        if (ext === '.tsx' || ext === '.ts') {
            const jsExt = ext === '.tsx' ? '.jsx' : '.js';
            const jsFile = file.slice(0, -ext.length) + jsExt;

            if (fs.existsSync(jsFile)) {
                console.log(`Duplicate found. Deleting ${file}`);
                fs.unlinkSync(file);
            } else {
                console.log(`Converting ${file} to ${jsExt}`);
                const content = fs.readFileSync(file, 'utf8');
                const stripped = stripTypes(content);
                fs.writeFileSync(jsFile, stripped);
                fs.unlinkSync(file);
            }
        }
    });

    // Root configuration cleanup
    const rootTSFiles = [
        'tsconfig.json',
        'tsconfig.app.json',
        'tsconfig.node.json',
        'vite.config.ts',
        'tailwind.config.ts',
        'vitest.config.ts',
        'playwright.config.ts',
        'playwright-fixture.ts',
        'src/vite-env.d.ts'
    ];

    rootTSFiles.forEach(relPath => {
        const fullPath = path.join(rootDir, relPath);
        if (fs.existsSync(fullPath)) {
            console.log(`Deleting TS configuration: ${relPath}`);
            fs.unlinkSync(fullPath);
        }
    });

    console.log('Final conversion and cleanup complete!');
}

finalizeConversion();
