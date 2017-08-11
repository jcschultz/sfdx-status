let shellInterval = require('shell-interval');
let fs = require('fs');
let sfdxConfigObj = null;
let sfdxCommand  = 'sfdx force:source:status -a -u ';
const currentDir = process.cwd();
const sfdxConfigFile = currentDir + '/.sfdx/sfdx-config.json';

if (!fs.existsSync(sfdxConfigFile)) {
	console.error('The sfdx config file could not be found.');
	return;
}

sfdxConfigObj = require(sfdxConfigFile);
sfdxCommand += sfdxConfigObj.defaultusername;

console.log('defaultusername: ' + sfdxConfigObj.defaultusername);
console.log('command: ' + sfdxCommand);

shellInterval({
	options: {
		command: sfdxCommand,
		time: 240
	},
	onExec: function(err, stdout, stderr) {
		if (err) throw err;
		console.log(Date.now());
		console.log(stdout);
	},
	onFinish: function() {
		console.log('sfdx-status is exiting');
	},
	
});