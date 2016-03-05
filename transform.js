'use strict';

var dir = require('node-dir');
var fs = require('fs');

// ---
// Iterate over all subdirs.
// ---

dir.subdirs('./src/app', function (err, subdirs) {
  if ( err ) throw err;
  //we have an array of subdirs now, so now we'll iterate that array
  subdirs.forEach(function (path) {
    actionOnDir(path);
  });
});

function readContent(path, callback) {
  fs.readFile(path, function (err, content) {
    if ( err ) return callback(err);
    callback(null, content);
  })
}

function appendToTemp(toAppend) {
  fs.appendFile('message.js', toAppend, function (err) {
  });
}

// ---
// On every subdir, iterate over files.
// ---

function actionOnDir(path) {
  dir.files(path, function (err, files) {
    if ( err ) throw err;

    files = files.filter(function (file) {
      return file.indexOf('.js') > -1;
    });

    //we have an array of files now, so now we'll iterate that array
    files.forEach(function (path) {
      readContent(path, function (err, content) {
        const importNameRegexExp = /(\/(?=[^/]*$))(.*js)/g;
        const importName = importNameRegexExp.exec(path)[2];
        var message = 'import ' + importName.replace('.js', '') + ' from ' + '\'' + path + '\'';
        appendToTemp(message);

        const contentRegex = /(angular)(.*[\s\S]*)((directive|factory|service|value|constant|controller)\('\w+', )(.*[\s\S]*)(\);)/g;
        let contentRegexResult = contentRegex.exec(content);
        console.log(contentRegexResult);
        /* var result = data.replace(/string to be replaced/g, 'replacement');

         fs.writeFile(path, result, 'utf8', function (err) {
         if ( err ) return console.log(err);
         });*/
      });
    });
  });
}

/*dir.readFiles('./src/app', { match: /userActivityEventsConstants.js$/, },
 function (err, content, next) {
 if ( err ) throw err;
 console.log('content:', content);
 next();
 },
 function (err, files) {
 if ( err ) throw err;
 console.log('finished reading files:', files);
 });*/
