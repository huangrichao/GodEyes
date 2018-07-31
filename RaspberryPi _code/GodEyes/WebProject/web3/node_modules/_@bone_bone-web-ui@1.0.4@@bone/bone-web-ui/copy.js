/**
 * Created by zhangguo on 17/9/12.
 */

const fse = require('fs-extra');

const excludeds = [
	'node_modules/_@alife_next@0.19.24@@alife/next/node_modules',
	'CHANGELOG.md',
	'package.json',
	'README.md',
	'index.scss',
	'_index.scss'
];
const re = new RegExp(excludeds.join('|'), 'gi');
const package = require('./package.json');
const name = package.scripts.update.replace(/.+@alife\/|@.*/g, '');
const version = package.scripts.update.replace(/[^0-9.]+/g, '');

const filter = (src, dest) => {
	re.lastIndex = 0;
	return !re.test(src);
};

fse.copy(`node_modules/_@alife_next@${version}@@alife/next`, '', {filter})
	.then(() => {
		console.log('copy component success!')
	})
	.catch(err => {
		console.error(err);
	});