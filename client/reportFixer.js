const parser = require('fast-xml-parser');
const convertBack = require('fast-xml-parser').j2xParser;
const fs = require('fs');
const fileName = 'reports/ut_report.xml';
const encoding = 'utf8';

const options = {
  attributeNamePrefix: '@_',
  ignoreAttributes: false
};

fs.readFile(fileName, encoding, (err, xml) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonObj = parser.parse(xml, options);

  jsonObj.testExecutions.file = jsonObj.testExecutions.file.map(o => ({
    ...o,
    '@_path': 'client/' + o['@_path']
  }));

  const xmlOptions = {
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    ignoreAttributes: false,
    format: true,
    indentBy: '  '
  };

  const jparser = new convertBack(xmlOptions);
  const newXML = jparser.parse(jsonObj);

  fs.writeFile(fileName, newXML, encoding, err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
