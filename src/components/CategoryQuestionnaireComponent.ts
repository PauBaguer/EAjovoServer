import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/

let categoryPunctuation: Map<string, number>;

let questionIndex = 0;

const questions = Array(
  {
    question: 'Do you fancy a realistic story instead of a fiction?',
    ifYes: () => {
      categoryPunctuation.set('MYSTERY', categoryPunctuation.get('MYSTERY')! + 1);
      categoryPunctuation.set('THRILLER', categoryPunctuation.get('THRILLER')! + 2);
      categoryPunctuation.set('ROMANCE', categoryPunctuation.get('ROMANCE')! + 3);
      categoryPunctuation.set('WESTERN', categoryPunctuation.get('WESTERN')! + 3);
      categoryPunctuation.set('CONTEMPORANY', categoryPunctuation.get('CONTEMPORANY')! + 3);
    },
    ifNo: () => {
      categoryPunctuation.set('SCI-FI', categoryPunctuation.get('SCI-FI')! + 3);
      categoryPunctuation.set('MYSTERY', categoryPunctuation.get('MYSTERY')! + 1);
      categoryPunctuation.set('DYSTOPIAN', categoryPunctuation.get('DYSTOPIAN')! + 3);
      categoryPunctuation.set('FANTASY', categoryPunctuation.get('FANTASY')! + 3);
    },
    yesQuestion: 1,
    noQuestion: 2,
  },

  {
    question: 'Nice to Hear! Do you like books based on old times?',
    ifYes: () => {
      categoryPunctuation.set('MYSTERY', categoryPunctuation.get('MYSTERY')! + 1);
      categoryPunctuation.set('THRILLER', categoryPunctuation.get('THRILLER')! + 1);
      categoryPunctuation.set('WESTERN', categoryPunctuation.get('WESTERN')! + 3);
    },
    ifNo: () => {
      categoryPunctuation.set('CONTEMPORANY', categoryPunctuation.get('CONTEMPORANY')! + 3);
      categoryPunctuation.set('SCI-FI', categoryPunctuation.get('SCI-FI')! + 2);
      categoryPunctuation.set('DYSTOPIAN', categoryPunctuation.get('DYSTOPIAN')! + 2);
      categoryPunctuation.set('WESTERN', categoryPunctuation.get('WESTERN')! - 2);
    },
    yesQuestion: 2,
    noQuestion: 3,
  },

  {
    question: 'Nice to Hear! Do you like magical worlds?',
    ifYes: () => {
      categoryPunctuation.set('FANTASY', categoryPunctuation.get('FANTASY')! + 3);
      categoryPunctuation.set('MYSTERY', categoryPunctuation.get('MYSTERY')! + 1);
    },
    ifNo: () => {
      categoryPunctuation.set('CONTEMPORANY', categoryPunctuation.get('CONTEMPORANY')! + 3);
      categoryPunctuation.set('SCI-FI', categoryPunctuation.get('SCI-FI')! + 3);
      categoryPunctuation.set('DYSTOPIAN', categoryPunctuation.get('DYSTOPIAN')! + 3);
    },
    yesQuestion: 3,
    noQuestion: 3,
  },

  {
    question: 'Nice to Hear! Do you like crime novels?',
    ifYes: () => {
      categoryPunctuation.set('MYSTERY', categoryPunctuation.get('MYSTERY')! + 3);
      categoryPunctuation.set('WESTERN', categoryPunctuation.get('WESTERN')! + 2);
      categoryPunctuation.set('DYSTOPIAN', categoryPunctuation.get('DYSTOPIAN')! + 2);
    },
    ifNo: () => {
      categoryPunctuation.set('ROMANCE', categoryPunctuation.get('ROMANCE')! + 3);
      categoryPunctuation.set('FANTASY', categoryPunctuation.get('FANTASY')! + 1);
      categoryPunctuation.set('SCI-FI', categoryPunctuation.get('SCI-FI')! + 1);
    },
    yesQuestion: -1,
    noQuestion: -1,
  },
);

function computeBestCategory() {
  let max = 0;
  let category = '';

  categoryPunctuation.forEach((v, k) => {
    if (v > max) {
      max = v;
      category = k;
    }
  });

  //push result to API

  return category;
}

@Component()
export class CategoryQuestionnaireComponent extends BaseComponent {
  START() {
    questionIndex = 0;
    categoryPunctuation = new Map<string, number>([
      ['SCI-FI', 0],
      ['MYSTERY', 0],
      ['THRILLER', 0],
      ['ROMANCE', 0],
      ['WESTERN', 0],
      ['DYSTOPIAN', 0],
      ['CONTEMPORANY', 0],
      ['FANTASY', 0],
    ]);

    return this.$send(YesNoOutput, {
      message: questions[questionIndex].question,
    });
  }

  @Intents(['YesIntent'])
  likesRelaistic() {
    console.log('YES INTENT');
    questions[questionIndex].ifYes();
    questionIndex = questions[questionIndex].yesQuestion;

    console.log(categoryPunctuation);

    if (questionIndex === -1) {
      const cat = computeBestCategory();
      return this.$send({
        message: `Thanks for your time!, your choosen category is: ${cat}`,
        listen: false,
      });
    }

    return this.$send(YesNoOutput, {
      message: questions[questionIndex].question,
    });
  }

  @Intents(['NoIntent'])
  likesFantasy() {
    console.log('NO INTENT');
    questions[questionIndex].ifNo();
    questionIndex = questions[questionIndex].noQuestion;

    console.log(categoryPunctuation);

    if (questionIndex === -1) {
      const cat = computeBestCategory();
      return this.$send({
        message: `Thanks for your time!, your choosen category is: ${cat}`,
        listen: false,
      });
    }

    return this.$send(YesNoOutput, { message: questions[questionIndex].question });
  }

  UNHANDLED() {
    return this.START();
  }
}
