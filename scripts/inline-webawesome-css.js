const fs = require('fs');
const path = require('path');

const outputDirectory = path.resolve(__dirname, '../.context');
const javascriptPath = path.join(outputDirectory, 'webawesome.js');
const stylesheetPath = path.join(outputDirectory, 'webawesome.css');

const javascript = fs.readFileSync(javascriptPath, 'utf8');
const stylesheet = fs.readFileSync(stylesheetPath, 'utf8');
const injectStyles = `
const webAwesomeStyles = document.createElement('style');
webAwesomeStyles.dataset.webAwesome = 'true';
webAwesomeStyles.textContent = ${JSON.stringify(stylesheet)};
document.head.appendChild(webAwesomeStyles);
`;

fs.writeFileSync(javascriptPath, `${injectStyles}\n${javascript}`);
fs.rmSync(stylesheetPath);
