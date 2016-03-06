'use strict';

let dir = require('node-dir');
let fs = require('fs');

// ---
// Replace & clear temp file.
// ---

function replaceFileWith(toAppend) {
  fs.appendFile('message.js', toAppend, function (err) {
  });
}

function clearTempFile() {
  fs.writeFile('message.js', '', function () {
  });
}

// ---
// Map of the angular module declarations.
// ---
let map = new Map();

// ---
// Map of the imports from angular module declarations.
// ---
let imports = new Map();

// ---
// On every subdir, iterate over files.
// ---
const BASE_PATH = 'src/app/components/insights';

dir.files('./' + BASE_PATH, function (err, files) {
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
    const importValue = 'import ' + importNameWithoutExtension + ' from ' + '\'' + path.replace(BASE_PATH, '.') + '\'';

    const contentRegex = /(angular)(.*[\s\S]*)(module.*)(.*[\s\S]*)((provider|directive|factory|filter|service|value|constant|controller)\('\w+', )(.*[\s\S]*)(\);)/g;
    const contentRegexResult = contentRegex.exec(content);
    if (!contentRegexResult) {
      return;
    }

    const module = contentRegexResult[3];
    const declarationModuleValue = contentRegexResult[5] + importNameWithoutExtension + ')';
    if (map.get(module) == null) {
      map.set(module, []);
    }

    map.get(module).push(declarationModuleValue);

    if (imports.get(module) == null) {
      imports.set(module, []);
    }

    imports
      .get(module)
      .push(importValue);

    console.log('---------');

    let result = content.toString().replace(contentRegex, '$7');
  /*  if (result.indexOf('export default') > -1) {
      result = 'export default ' + result.replace('export default', '').trim();
    }*/

    console.log(result);
    console.log('---------end');

    fs.writeFile(path, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });

  clearTempFile();

  for (let item of imports) {
    replaceFileWith('--------------------------' + '\r\n');
    replaceFileWith(item[0] + '\r\n');

    for (let itm of item[1]) {
      replaceFileWith(itm.replace('.js', '') + '\r\n');
    }
  }

  for (let item of map) {
    replaceFileWith('--------------------------' + '\r\n');
    replaceFileWith(item[0] + '\r\n');

    for (let itm of item[1]) {
      replaceFileWith('.' + itm + '\r\n');
    }
  }

  console.log('done');
});
