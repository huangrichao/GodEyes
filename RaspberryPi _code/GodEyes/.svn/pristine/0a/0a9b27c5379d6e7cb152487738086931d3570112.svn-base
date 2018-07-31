/**
 * Created by zhangguo on 17/9/12.
 */

const fs = require('fs');
const fse = require('fs-extra');

const excludeds = [
    'node_modules/@alife/next/node_modules',
    'CHANGELOG.md',
    'package.json',
    'README.md',
    ".gitignore",
    "index.js",
    "index.scss",
    "_index.scss"
];
const re = new RegExp(excludeds.join('|'), 'gi');
const package = require('./package.json');
const version = package.scripts.update.replace(/[^0-9.]+/g, '');

const replace = (src, dest) => {
    dest = dest || '/';
    src = src.replace(new RegExp(`node_modules/_@alife_dpl-iot@${version}@@alife/dpl-iot`, 'g'), dest);

    fs.readFile(src, 'utf8', function (err, data) {
        if (err) {
            //console.log(err);
            return;
        }

        let result = data.replace(/@alife\/next/g, '@bone/bone-web-ui');

        fs.writeFile(src, result, 'utf8', function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

    });
}

const filter = (src, dest) => {
    re.lastIndex = 0;

    let bool = !re.test(src);

    setTimeout(() => bool && replace(src, dest), 500);

    return bool;
};

fse.copy(`node_modules/_@alife_dpl-iot@${version}@@alife/dpl-iot`, '', { filter })
    .then(() => {
        console.log('copy component success!')
    })
    .catch(err => {
        console.error(err);
    });