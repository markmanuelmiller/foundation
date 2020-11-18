const { exec } = require('child_process');
const path = require('path');

const createFile = require('../utils/createFile');

const databaseController = {};

databaseController.runQuery = (req, res, next) => {
  if (req.body.schema) {
    console.log(req.body.schema);
    // create the file
    createFile(req.body.schema);

    // const child = execFile('node', ['--version'], (error, stdout, stderr) => {
    // const child = execFile('node test.js', [], (error, stdout, stderr) => {
    const queryPath = path.resolve(__dirname, '../utils/query.js');
    const child = exec('node ' + queryPath, [], (error, stdout, stderr) => {
      if (error) {
        console.error('stderr', stderr);
      }
      console.log('stdout', stdout);
    });
  }

  next();
};

module.exports = databaseController;
