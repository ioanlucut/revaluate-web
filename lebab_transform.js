'use strict';

let exec = require('child_process').exec;
let dir = require('node-dir');
const BASE_PATH = 'src/app/common/';
let path = './' + BASE_PATH;

dir.files(path, function (err, files) {
  if (err) throw err;
  files = files.filter(function (file) {
    return file.indexOf('.js') > -1;
  });

  files.forEach(function (path) {
    let cmd = 'lebab ' + path + ' -o ' + path;
    console.log(cmd);

    exec(cmd, function (error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });
  });
});
