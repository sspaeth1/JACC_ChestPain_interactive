fetch("js/data.json")
.then(response => response.json())
.then(json => {
    let data = json;
    console.log(json)

// import indexKey from 'indexKey';

// console.log(indexKey);

let indexKey = 
[
    {
     acute_2: 0,
    },
    {
     acute_3: 1,
    },
    {
     acute_4: 2,
    },
    {
     acute_5: 3,
    },
    {
     acute_6: 4,
    }
];



createSlide = (row) => {
    let setEventListnerAnswers = Array.from(document.getElementsByClassName('answerSelection')),
        _row = 0,   
        setStateID = data[_row].stateID,
        stateIndex = data.indexOf(data[_row]),
        grabSelectionBlock = document.getElementById('selectionBlock'),
        createQuestion = document.createElement('div'),
        answerArray = [data[_row].answer1, data[_row].answer2, data[_row].answer3, data[_row].answer4, data[_row].answer5, data[_row].answer6],
        answerGoToRow = [data[_row].answer1_go_to, data[_row].answer2_go_to, data[_row].answer3_go_to, data[_row].answer4_go_to, data[_row].answer5_go_to, data[_row].answer6_go_to];
        localStorage.setItem('index', _row);

        createQuestion.setAttribute('id', 'prompQuestion');
        grabSelectionBlock.appendChild(createQuestion);
        let selectQuestion = document.getElementById('prompQuestion');
        selectQuestion.innerHTML = data[_row].question;




        addAnswerSections = ()=>{
    
        for(let i =0; i < answerArray.length ; i++){
            if(answerArray[i] != ""){
            let newAnswer = document.createElement('div');
                    newAnswer.setAttribute('class', 'answerSelection')
                    selectQuestion.parentElement.appendChild(newAnswer);
                    newAnswer.innerHTML = answerArray[i];
                    _row = Object.values(Object.values(indexKey)[i])[0];
                    newAnswer.addEventListener('click', ()=> {
                        grabSelectionBlock.innerHTML ="";
                        createSlide(_row);
                        alert('new slide');
                    });
                    console.log("answer: " , answerArray[i], '\n', 
                                 "answer index go to ",  answerGoToRow[i], '\n',
                                 "index from goTo:", Object.values(Object.values(indexKey)[i])[0] );     
            }
        }
        }
        addAnswerSections();
}

//init
createSlide(0)


 // console.log('******', indexKey.map( find =>{ if(answerGoToRow[0] == Object.keys(find)){return Object.values(find)[0] }}), '*******')
 console.log('******', Object.values(indexKey)[1], '*******')






//  setEventListnerAnswers.forEach(el => {
//      el.addEventListener('click', ()=> alert( JSON.stringify(data[1])) );
//  });

}
 );
