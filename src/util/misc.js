import { processData } from './googleRoutines';

export const getNameFromEmail = (email) => email.match(/(.*)@.*/)[1]
.split('.')
.map(([firstLetter, ...restLetters]) => [ firstLetter.toUpperCase(), ...restLetters ].join('') )
.join(' ')

export const getUniqElements = (arr, attribute) =>
  Array.from(new Set(arr.map(item => item[attribute])));

export const classifyScore = (savedSkills) => {
  const scores = Object.keys(savedSkills).map(
    skill => parseInt(savedSkills[skill]["Score"])
  )
  
  const score = scores.reduce((acc, s) => s + acc, 0) / scores.length;

  switch(true){
    case score < 1:
      return "N/A";
    case score < 1.5:
      return "Developing";
    case score < 2:
      return "Proficient A";
    case score < 2.5:
      return "Proficient B";
    case score < 3:
      return "Accomplished A";
    case score === 3:
      return "Accomplished B";
    default:
      return "";
  }
}

export const devGoogle = (parameters) => {
  fetch('/return.json').then(
    response => response.json()
  ).then(({ framework, returns }) => {
    processData(JSON.stringify({ framework, returns, reportReturns: returns }), parameters)
  })
}
