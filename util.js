const path = require('path');
const fs = require('fs');
const { stat, existsSync, writeFile, readdir, } = fs;

/**
 * Will generate an object based on filesystem.
 */

const fsutil = {

    tree: function tree(directory, depth, done) {
        depth = Number.isInteger(depth) ? directory.split('/').length : 0;

        var results = {
            path: directory,
            depth: depth,
            total: 0,
            files: [],
            map: [],
            hashmap: {}
        };

        readdir (directory, (err, list) => {
            if (err) return done(err);

            var count = list.length;
            results.total = count;

            if (!count) return done(null, results);

            list.forEach((file, index, files) => {

                const relativepath = path.join(directory, file);
                const absolutepath = path.resolve(relativepath);
                const parsedpath = path.parse(absolutepath);
                const metadata = {
                    directory: directory,
                    path_absolute: absolutepath,
                    path_relative: relativepath,
                    filebase: parsedpath.base,
                    filename: parsedpath.name,
                    fileext: parsedpath.ext,
                    hidden: file.startsWith('.'),
                    depth: depth
                };

                stat(relativepath, (err, stat) => {

                    if (stat && stat.isDirectory()) {

                        this.tree(relativepath, depth, function (err, res) {

                            const directoryInfo = Object.assign(metadata, {
                                type: 'directory',
                                total: res.files.length,
                                files: res.files
                            });

                            results.files.push(directoryInfo);
                            results.map.push(...res.map);
                            results.hashmap = Object.assign(results.hashmap, res.hashmap);

                            if (!--count) done(null, results);
                        })

                    } else {

                        const fileInfo = Object.assign(metadata, {
                            type: 'file'
                        });

                        results.files.push(fileInfo);
                        results.map.push({ [fileInfo.path_relative]: fileInfo });
                        results.hashmap[fileInfo.path_relative] = fileInfo;
                        
                        if (!--count) done(null, results);
                    }
                });
            });
        });
    }
};

/**
 * I'm using this for find and replace but progromatically...
 */
fsutil.tree('./app/view', null, function (err, res) {

    var jsfiles = Object.values(res.hashmap)
        .filter(file => file.fileext === '.md')
        // .filter(file => file.filebase.endsWith(''));

    jsfiles.forEach(js => {
        // console.log(js.filename)
        // var namespace = js.directory.split('/').join('.').replace('app.', 'Demo.') + '.' + js.filename;

        fs.readFile(js.path_relative, 'utf8', function (err, data) {
            if (err) throw err;
            
            console.log(js.path_relative);
                        
            var updates;
            updates = findAndReplace(
                data, 
                /url\: 'data\/companies.json'/gm,
                `url: '${js.directory}/data.json'`
            );
            
            // uncomment to make real changes
            // fs.writeFile(js.path_relative, updates, 'utf8', function (err) {
            //     if (err) throw err;
            // });

        });
    });
    // console.log(matches);
    // createFile('view_dir_structure.json', JSON.stringify(res, null, 4));
});

function findAndReplace(data, find, replace) {
    if (!data || !find || !replace) throw new Error('Missing Param');
    if (!data.search(find)) {
        console.log('no match found');
        return data;
    }
    var modified = data.replace(find, replace);

    console.log('------------------------------------------------------------------------------');
    console.log(modified);
    return modified
}

/**
 * Does not overwrite an existing file
 */
function createFile(filename, content) {
    if (existsSync(filename)) return console.log(filename + ' already exists - exiting');
    const data = new Uint8Array(Buffer.from(content));
    writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log(filename + ' created.');
    });
}

function apppendToFile(filename, content) {
    try {
        fd = fs.openSync(filename, 'a');
        fs.appendFileSync(fd, content, 'utf8');
        console.log(filename + ' updated.');
    } catch (err) {
        throw err;
    } finally {
        if (fd) fs.closeSync(fd);
    }
}