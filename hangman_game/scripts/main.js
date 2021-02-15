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
        `<div class='new-word'><h1>${wordToBeGuessed.join(' ')}</h1></div>`
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
        for(let y = 0; y < wordToBeGuessed; y++){
          if(word[x] == wordToBeGuessed[y]){
            guessedWord[x] == word[x]
          }
        }
      }
    }

    let failureSound = new Audio('./assets/sounds/failure.wav');
    let victorySound = new Audio('./assets/sounds/victory.wav');

    function playGame(letter){
      if(numError > 5){
        failureSound.play();
        if(comfirm('You lost! Do you want to play again?')){
          choseWord()
          return;
        }
        else if(word.join('') == wordToBeGuessed.join('')){
          if(confirm('You win! Do you wanna play again?')){
            choseWord()
            return;
          }
        }
        else{
          if(wordToBeGuessed.includes(letter)){
            return; 
          }
          wordToBeGuessed.push(letter)
          if(word.includes(letter)){
            checkWord()
          }
          else{
            numError++
          }
          loadBodyParts()
        }

        if(word.join('') == guessedWord('')){
          victorySound.play()
          return;
        }

        if(numError > 5){
          failureSound.play()
          choseWord()
        }
        else{
          return;
        }

      }

    }
    $(".key").on("click", function(event) {
      $(this).addClass("highlight");
      let char = event.target.innerHTML.toLocaleLowerCase();
      playGame(char)
    })

    document.addEventListener("keydown", event => {
      const { key } = event;
      console.log("key:", key);
      capitalKey = key.toUpperCase();
      $(`span:contains(${capitalKey})`).addClass("highlight");
      playGame(key);
    });
  


})