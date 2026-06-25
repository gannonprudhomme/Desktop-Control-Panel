const fs = require('fs');
const path = require('path');

const bundlePath = path.resolve(__dirname, '../dist/desktop-control-panel.js');
const parcelRuntimeDeclaration = 'var parcelRequire;';
const bundle = fs.readFileSync(bundlePath, 'utf8');

if (!bundle.startsWith(parcelRuntimeDeclaration)) {
  fs.writeFileSync(bundlePath, `${parcelRuntimeDeclaration}${bundle}`);
}
