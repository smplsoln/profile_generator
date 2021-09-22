const { RSA_X931_PADDING } = require('constants');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });

const questionKey = 'question';
const answerKey = 'answer';

const askQuestion = function(qNum, questionsArr, surveyResult, handleSurveyResult) {
  if (qNum >= questionsArr.length) {
    console.log("End of Survey!");
    handleSurveyResult(surveyResult);
    rl.close();
    return;
  }

  const questionStr = questionsArr[qNum];
  rl.question(questionStr + ' : ', (answer) => {
    let response = {}; // { questionKey: questionStr, answerKey: answer };
    response[questionKey] = questionStr;
    response[answerKey] = answer;
    surveyResult.push(response);
    qNum++;
    askQuestion(qNum, questionsArr, surveyResult, handleSurveyResult);
  });
};

let profile = '';
const displaySurveyResult = function(surveyResult) {
  console.log({ surveyResult });
  console.log('Your awesome profile:');
  profile = '\t';
  let i = 0;
  for (const response of surveyResult) {
    profile = profile + answers[i] + response[answerKey];
    i++;
  }
  console.log(profile);
};

const questions = [
  "What's your name? Nicknames are also acceptable :)",
  "What's an activity you like doing?",
  "What do you listen to while doing that?",
  "Which meal is your favourite (eg: dinner, brunch, etc.)",
  "What's your favourite thing to eat for that meal?",
  "Which sport is your absolute favourite?",
  "What is your superpower? In a few words, tell us what you are amazing at!"
];

const answers = [
  "",
  " loves ",
  ", and listening to ",
  ". most loved meal of the day is ",
  ", and in it likes to have ",
  ". Enjoys a game of ",
  ". And most of all is amazing at "
];

let qNum = 0;
let surveyResult = [];
askQuestion(qNum, questions, surveyResult, displaySurveyResult);
