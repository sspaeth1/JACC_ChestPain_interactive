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
        setStateID = data[row].stateID,
        stateIndex = data.indexOf(data[row]),
        grabSelectionBlock = document.getElementById('selectionBlock'),
        createQuestion = document.createElement('div'),
        answerArray = [data[row].answer1, data[row].answer2, data[row].answer3, data[row].answer4, data[row].answer5, data[row].answer6],
        answerGoToRow = [data[row].answer1_go_to, data[row].answer2_go_to, data[row].answer3_go_to, data[row].answer4_go_to, data[row].answer5_go_to, data[row].answer6_go_to];
        localStorage.setItem('index', row);

        grabSelectionBlock.innerHTML = "";
        createQuestion.setAttribute('id', 'prompQuestion');
        grabSelectionBlock.appendChild(createQuestion);
        let selectQuestion = document.getElementById('prompQuestion');
        selectQuestion.innerHTML = data[row].question;




        addAnswerSections = ()=>{
    
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
        addAnswerSections();
}

//init
createSlide(0)

document.getElementById('btnStartOver').addEventListener('click', ()=> createSlide(0) );

 // console.log('******', indexKey.map( find =>{ if(answerGoToRow[0] == Object.keys(find)){return Object.values(find)[0] }}), '*******')
 console.log('******', Object.values(indexKey)[1], '*******')






//  setEventListnerAnswers.forEach(el => {
//      el.addEventListener('click', ()=> alert( JSON.stringify(data[1])) );
//  });

}
 );
