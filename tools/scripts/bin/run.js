#!/usr/bin/env node

require('@oclif/command').run()
.then(require('@oclif/command/flush'))
// eslint-disable-next-line node/no-extraneous-require
.catch(require('@oclif/errors/handle'));
