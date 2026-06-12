const fs = require('fs');
const path = require('path');

const logFile = path.join(process.cwd(), 'conversion_debug.log');
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

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
    // Remove 'as' assertions
    content = content.replace(/\s+as\s+[A-Z][A-Za-z0-9_]*/g, '');
    // Remove generic type parameters from functions and classes
    content = content.replace(/<\s*[A-Z][A-Za-z0-9_]*\s*>/g, '');
    // Remove type annotations from variables and parameters
    content = content.replace(/:\s*(?:string|number|boolean|any|void|unknown|never|object|symbol)/g, '');
    // Remove common React types
    content = content.replace(/:\s*React\.FC(?:<[^>]*>)?/g, '');
    content = content.replace(/:\s*React\.ReactNode/g, '');
    content = content.replace(/:\s*React\.HTMLAttributes<[^>]*>/g, '');
    content = content.replace(/:\s*React\.ButtonHTMLAttributes<[^>]*>/g, '');
    content = content.replace(/:\s*React\.InputHTMLAttributes<[^>]*>/g, '');

    return content;
}

const srcDir = path.join(process.cwd(), 'src', 'components', 'ui');
log(`Starting conversion in: ${srcDir}`);

if (!fs.existsSync(srcDir)) {
    log(`Directory not found: ${srcDir}`);
    process.exit(1);
}

const allFiles = walk(srcDir);
log(`Found ${allFiles.length} files`);

allFiles.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        log(`Processing: ${file}`);
        try {
            const content = fs.readFileSync(file, 'utf8');
            const stripped = stripTypes(content);

            const newFile = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
            fs.writeFileSync(newFile, stripped);
            fs.unlinkSync(file);
            log(`Converted to: ${newFile}`);
        } catch (e) {
            log(`Error processing ${file}: ${e.message}`);
        }
    }
});

log('Conversion complete!');
