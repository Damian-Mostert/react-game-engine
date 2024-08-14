const fs = require('fs');
const path = require('path');

// Regular expression to match the file name pattern {X}__0{index}.png
const regex = /^(.+)__0(\d+)\.png$/;

// Get the list of files in the current directory
fs.readdir(process.cwd(), (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const match = file.match(regex);
        if (match) {
            const [_, prefix, index] = match;
            const newFileName = `${prefix} (${Number(index)}).png`;

            // Rename the file
            fs.rename(path.join(process.cwd(), file), path.join(process.cwd(), newFileName), err => {
                if (err) {
                    console.error('Error renaming file:', err);
                } else {
                    console.log(`Renamed: ${file} -> ${newFileName}`);
                }
            });
        }
    });
});
