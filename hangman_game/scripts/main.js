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
    let numError = 0;
    

    let wordToBeGuessed = []; 
    let guessedWord = [];
    
    
    let chosenWord = words[Math.floor(Math.random() * words.length)];
  
    let word = chosenWord.split("");
    

    function choseWord(){
         numError = 0;
         wordToBeGuessed = []; 
         guessedWord = [];
         chosenWord = words[Math.floor(Math.random() * words.length)];
  
         word = chosenWord.split('');
         
         for(let i = 0;i < word.length;i++){
        guessedWord.push("__");
         
      }
      $('.new-word').replaceWith(
        `<div class='new-word'><h1>${guessedWord.join(" ")}</h1></div>`
      );
      $(".key").removeClass('highlight');
      loadBodyParts()
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
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+arm.jpg`;
        break;

        case 4:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg.jpg`;
        break;

        case 5:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg+arm.jpg`;
        break;

        case 6:
          document.querySelector('#body-image').src = `./assets/images/gallows+head+torso+2leg+2arm.jpg`;
        break;
        default:
      }
    }

    choseWord();

    function checkWord(){
      for(let x = 0; x< word.length; x++){
        for(let y = 0; y < wordToBeGuessed.length; y++){
          if(word[x] == wordToBeGuessed[y]){
            guessedWord[x] = word[x]
          }
        }
      }
      $(".new-word").replaceWith(
        `<div class="new-word"><h1>${guessedWord.join(" ")}</h1></div>`
      );
    
    }

    let failureSound = new Audio('./assets/sounds/failure.wav');
    let victorySound = new Audio('./assets/sounds/victory.wav');

    function playGame(letter){
      if(numError > 5){
        
        failureSound.play();

        setTimeout(function(){
          if(confirm('You lost! Do you want to play again?')){
            choseWord()
          }
          else{
          }
        },300);
        return;
      }

      else if(word.join('') == guessedWord.join('')){
        setTimeout(function(){
          if(confirm('You win! Do you wanna play again?')){
            choseWord();
          }
          else{
          }
        },300);
        return;
      }

      else {
        if(wordToBeGuessed.includes(letter)){
          return; 
        }
        wordToBeGuessed.push(letter)
          if(word.includes(letter)){
            checkWord()
          }
          else {
            numError++
          }
          loadBodyParts()
        

        if(word.join('') == guessedWord.join('')){
          victorySound.play()
          setTimeout(function(){
            if(confirm('You win!')){
              choseWord();
            }
            else{
            }
          },300)
          return;
        }

        if(numError > 5){
          failureSound.play()

          $('.error-message').replaceWith(
            `<div class='error-message'><h4>Sorry! You have been hanged.The answer was</h4></div>`  
          );
          $('.guessed-word').replaceWith(
             `<div class='guessed-word'><h2>${chosenWord}</h2></div>`
          );
          
          setTimeout(function(){
            
            if(confirm('You experienced a painful death!You wanna play again')){
              choseWord()
              $('.error-message').hide()
              $('.guessed-word').hide()
            }
            else{    
            }
            
          },300)
          return;      
        }
      }
    }
    $(".key").on("click", function(event) {
      $(this).addClass("highlight");
      let char = event.target.innerHTML.toLocaleLowerCase();
      playGame(char)
    });

    document.addEventListener("keydown", event => {
      const { key } = event;
      capitalKey = key.toUpperCase();
      $(`span:contains(${capitalKey})`).addClass("highlight");
      playGame(key);
    });
  


})