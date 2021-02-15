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
      );
    }

    function loadBodyParts(){
      switch(numError){
        case 0:
          document.querySelector('#body-image').src = `./assets/images/gallows.jpg`;
        break;

        case 1:
          document.querySelector('#body-image').src = `./assets/images/gallows+head.jpg`;
        break;

        case 2:
           document.querySelector('#body-image').src = `./assets/images/gallows+head+torso.jpg`;
        break;

        case 3:
          document.querySelector('#body-image').src = `./assets/images/galllows+head+torso+arm.jpg`;
        break;

        case 4:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg`;
        break;

        case 5:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg+arm`;
        break;

        case 6:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg+2arm`;
        break;
        default:
      }
    }

    function checkWord(){
      for(let x = 0; x< word.length; x++){
        for(let y = 0; y < guessedWord; y++){
          if(word[x] == guessedWord[y]){
            wordToBeGuessed[x] == word[x]
          }
        }
      }
    }

})