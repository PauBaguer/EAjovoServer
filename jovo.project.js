const { ProjectConfig } = require('@jovotech/cli-core');

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  endpoint: '${JOVO_WEBHOOK_URL}',
  plugins: [
    // Add Jovo CLI plugins here
  ],
  defaultStage: 'dev',

  stages: {
    dev: {
      endpoint: '${JOVO_WEBHOOK_URL}',
      // ...
    },
    prod: {
      endpoint: process.env.ENDPOINT_PROD,
      // ...
    },
  },
});

module.exports = project;
