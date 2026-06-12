const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

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
    // Rough stripping
    content = content.replace(/interface\s+\w+\s*(?:extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, '');
    content = content.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
    content = content.replace(/\s+as\s+[A-Z][A-Za-z0-9_]*/g, '');
    content = content.replace(/:\s*(?:string|number|boolean|any|void|unknown|never|object|symbol)/g, '');
    // React specific types
    content = content.replace(/:\s*React\.FC(?:<[^>]*>)?/g, '');
    content = content.replace(/:\s*React\.ReactNode/g, '');
    content = content.replace(/:\s*React\.HTMLAttributes<[^>]*>/g, '');
    // Generic parameters in functions
    content = content.replace(/<[A-Z][A-Za-z0-9_]*>(?=\s*\()/g, '');

    return content;
}

try {
    const files = walk(srcDir);
    console.log(`Found ${files.length} files in src`);

    files.forEach(file => {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            console.log(`Processing ${file}`);
            const content = fs.readFileSync(file, 'utf8');
            const stripped = stripTypes(content);
            const newFile = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');

            fs.writeFileSync(newFile, stripped);
            fs.unlinkSync(file);
            console.log(`Converted ${file} to ${newFile}`);
        }
    });

    // Cleanup root TS files if any
    const rootFiles = ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'vite.config.ts', 'tailwind.config.ts', 'vitest.config.ts', 'playwright.config.ts', 'playwright-fixture.ts'];
    rootFiles.forEach(f => {
        const full = path.join(rootDir, f);
        if (fs.existsSync(full)) {
            fs.unlinkSync(full);
            console.log(`Deleted root file ${f}`);
        }
    });

    console.log('Batch conversion finished successfully');
} catch (err) {
    console.error('Error during batch conversion:', err);
}
