const fs = require('fs');
const args = process.argv.slice(2);
const searchStrings = [
    "spring.datasource.url=",
    "spring.datasource.username=",
    "spring.datasource.password="
];

if (args.length !== searchStrings.length) {
    console.log("Invalid arguments passed to file");
    process.exit(1);
}

fs.readFile("src/main/resources/application.properties", 'utf8', function(err, data) {
  let formatted = data;
  for (let i = 0; i < 3; i++) {
        let searchString = searchStrings[i];
        let re = new RegExp('^.*' + searchString + '.*$', 'gm');
        formatted = formatted.replace(re, searchString + args[i]);
  }

  fs.writeFile("src/main/resources/application.properties", formatted, 'utf8', function(err) {
    if (err){
      console.log(err);
      process.exit(2);
    }
  });
});