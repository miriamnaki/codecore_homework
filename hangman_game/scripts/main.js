$(document).ready(()=>{
  let words = [
    'yearn',
    'revival',
    'brink',
    'elephant',
    'seminar',
    'appearance',
    'petty',
    'bleed',
    'honest',
    'approve']

    let wordToBeGuessed = [];
    let guessedWord = [];
    let numError = 0;

    let chosenWord = words[Math.floor(Math.random() * words.length)];

    
    let word = chosenWord.split('');
    function choseWord(){
      for(let i = 0;i < word.length;i++){
        guessedWord.push('__')
      }
      $('.new-word').replaceWith(
        `<div class='new-word'><h1>${guessedWord.join(' ')}</h1></div>`
      )
    }

})