'use strict';

let dir = require('node-dir');
let fs = require('fs');

// ---
// On every subdir, iterate over files.
// ---
const BASE_PATH = 'src/app/components/';

dir.files('./../' + BASE_PATH, function (err, files) {
  if (err) throw err;

  files = files.filter(function (file) {
    return file.indexOf('.js') > -1;
  });

  //we have an array of files now, so now we'll iterate that array
  files.forEach(function (path) {
    let content = fs.readFileSync(path);
    const importNameRegexExp = /(\/(?=[^/]*$))(.*js)/g;
    const importName = importNameRegexExp.exec(path)[2];
    let importNameWithoutExtension = importName.replace('.js', '');

    const contentRegex = /(function \()/;
    const contentRegexResult = contentRegex.exec(content);
    if (!contentRegexResult) {
      return;
    }

    let result = content.toString().replace(contentRegex, 'function ' + importNameWithoutExtension + '(');
    let output = result + 'export default ' + importNameWithoutExtension + ';';

    fs.writeFile(path, output, 'utf8', function (err) {
      if (err) return console.log(err);
    });

  });
});
