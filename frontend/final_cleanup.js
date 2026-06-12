const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

// 1. Remove TS files and redundant files
function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
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

console.log("Starting final file cleanup...");
const allFiles = walk(srcDir);
allFiles.forEach(f => {
    if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        try {
            fs.unlinkSync(f);
            console.log(`Deleted source: ${f}`);
        } catch (e) {
            console.log(`Error deleting source ${f}: ${e.message}`);
        }
    }
});

const rootRemnants = [
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'vitest.config.ts',
    'playwright.config.ts',
    'playwright-fixture.ts',
    'src/vite-env.d.ts',
    'batch_ui_convert.js',
    'cleanup.bat',
    'cleanup_ts.js',
    'convert.js',
    'convert_ts_to_js.js',
    'final_convert.js',
    'final_polish.ps1',
    'conversion_debug.log',
    'conversion.log',
    'final_conversion.log',
    'dir_output.txt',
    'src/test_write_access.txt'
];

rootRemnants.forEach(f => {
    const p = path.join(rootDir, f);
    if (fs.existsSync(p)) {
        try {
            fs.unlinkSync(p);
            console.log(`Deleted remnant: ${f}`);
        } catch (e) {
            console.log(`Error deleting remnant ${f}: ${e.message}`);
        }
    }
});

// Delete self at the end if you want, but better to keep it for one more step or just delete it manually.
// For now, let's just finish the script.

console.log("Cleanup complete!");
