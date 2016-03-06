'use strict';

let dir = require('node-dir');
let fs = require('fs');
var recast = require('recast');
var Printer = require("recast/lib/printer").Printer;

// ---
// On every subdir, iterate over files.
// ---
const BASE_PATH = './../src/app/common/common/interceptors';

dir.files(BASE_PATH, function (err, files) {
  if (err) throw err;

  files = files.filter(function (file) {
    return file.indexOf('.js') > -1;
  });

  //we have an array of files now, so now we'll iterate that array
  files.forEach(function (path) {
    let content = fs.readFileSync(path);
    var ast = recast.parse(content.toString());
    var output = recast.printWithComments(ast, {
      tabWidth: 2,
      reuseWhitespace: false,
      quote: 'single',
      trailingComma: true,
    }).code;

    fs.writeFile(path, output, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
});
