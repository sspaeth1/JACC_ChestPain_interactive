
   export let addAnswerSections = ()=>{
    
    for(let i =0; i < answerArray.length ; i++){
        if(answerArray[i] != ""){
        let newAnswer = document.createElement('div');
                newAnswer.setAttribute('class', 'answerSelection')
                selectQuestion.parentElement.appendChild(newAnswer);
                newAnswer.innerHTML = answerArray[i];
                row = Object.values(Object.values(indexKey)[i])[0];
                newAnswer.addEventListener('click', ()=> {
                    grabSelectionBlock.innerHTML ="";
                    createSlide(row);
                });  }
       }
    }