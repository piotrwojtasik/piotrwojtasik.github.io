#!/usr/bin/env node

const rewire = require('rewire');

const gulpCli = rewire('gulp-cli');

gulpCli.__get__('cli').moduleName = 'gulp-v4';

gulpCli();
