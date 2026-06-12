const fs = require('fs');
const path = require('path');

const deleteFilesByExtension = (dir, exts) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            deleteFilesByExtension(fullPath, exts);
        } else {
            if (exts.includes(path.extname(fullPath))) {
                try {
                    fs.unlinkSync(fullPath);
                    console.log(`Deleted ${fullPath}`);
                } catch (e) {
                    console.error(`Failed to delete ${fullPath}: ${e.message}`);
                }
            }
        }
    }
};

const deleteDir = (dir) => {
    if (fs.existsSync(dir)) {
        try {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`Deleted directory ${dir}`);
        } catch (e) {
            console.error(`Failed to delete directory ${dir}: ${e.message}`);
        }
    }
}

// Target directories
const srcDir = path.join(__dirname, 'src');
const rootDir = __dirname;
const supabaseDir = path.join(__dirname, 'supabase');
const integrationsSupabaseDir = path.join(__dirname, 'src', 'integrations', 'supabase');

// Execute logic
deleteFilesByExtension(srcDir, ['.ts', '.tsx']);
deleteFilesByExtension(rootDir, ['.ts', '.tsx']);
deleteDir(supabaseDir);
deleteDir(integrationsSupabaseDir);

console.log('Cleanup script finished.');
