import { App } from '@jovotech/framework';
import { NlpjsNlu } from '@jovotech/nlu-nlpjs';
import { LangEn } from '@nlpjs/lang-en';
import { LangEs } from '@nlpjs/lang-es';
import { WebPlatform } from '@jovotech/platform-web';

import { GlobalComponent } from './components/GlobalComponent';
import { LoveHatePizzaComponent } from './components/LoveHatePizzaComponent';
import { CategoryQuestionnaireComponent } from './components/CategoryQuestionnaireComponent';

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [GlobalComponent, LoveHatePizzaComponent, CategoryQuestionnaireComponent],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/marketplace
  |
  */
  plugins: [
    new WebPlatform({
      plugins: [
        new NlpjsNlu({
          input: {
            supportedTypes: ['TEXT', 'TRANSCRIBED_SPEECH', 'SPEECH'],
          },
          useModel: false,
          modelsPath: './models',
          languageMap: {
            en: LangEn,
            es: LangEs,
          },
        }),
      ],
    }),
    // Add Jovo plugins here
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,
});

export { app };
