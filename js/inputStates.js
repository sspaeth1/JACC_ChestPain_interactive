fetch("js/data.json")
.then(response => response.json())
.then(json => {
    let data = json;

    fetch("js/indexKey.js")
    .then(response => response.json())
    .then(json =>{
        let indexKey = json;

// let indexKey;
// fetch("js/indexKey.js")
// .then(response => indexKey = response);

// import indexKey from 'indexKey';

let createSlide = (row) => {
    let setEventListnerAnswers = Array.from(document.getElementsByClassName('answerSelection')),  
        setStateID = data[row].stateID,
        stateIndex = data.indexOf(data[row]),
        grabSelectionBlock = document.getElementById('selectionBlock'),
        grabActionBlock = document.getElementById('actionBlock'),
        grabNotesBlock = document.getElementById('notesBlock'),
        history = [],
        answerArray = [data[row].answer1, data[row].answer2, data[row].answer3, data[row].answer4, data[row].answer5, data[row].answer6],
        answerGoToRow = [data[row].answer1_go_to, data[row].answer2_go_to, data[row].answer3_go_to, data[row].answer4_go_to, data[row].answer5_go_to, data[row].answer6_go_to];
        localStorage.setItem('index', row);
        //clear for new slide
        grabActionBlock.innerHTML = "";
        grabSelectionBlock.innerHTML = "";
        grabNotesBlock.innerHTML = "";

    let addAction =()=>{
        if(data[row].action != ""){
            let actionBlock = document.createElement('div');
            actionBlock.setAttribute('class', 'action green');
            let actionBlockTitle = document.createElement('span');
            actionBlockTitle.innerHTML = 'Action';
            grabActionBlock.appendChild(actionBlock);
            actionBlock.appendChild(actionBlockTitle);
            let actionBlockText = document.createElement('p');
            actionBlockText.innerHTML = data[row].action;
            actionBlock.appendChild(actionBlockText);

        }
    }
    addAction();

    let addQuestion = () => {
       let createQuestion = document.createElement('div');
        createQuestion.setAttribute('id', 'prompQuestion');
        grabSelectionBlock.appendChild(createQuestion);
        let selectQuestion = document.getElementById('prompQuestion');
        selectQuestion.innerHTML = data[row].question;
    }
    addQuestion();

    let addAnswerSections = ()=>{
    
        for(let i =0; i < answerArray.length ; i++){
            if(answerArray[i] != ""){
                let selectQuestion = document.getElementById('prompQuestion');
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

        let addNotes =()=>{
            if(data[row].notes != ""){
                let notesBlock = document.createElement('div');
                notesBlock.setAttribute('class', 'notes');
                let notesBlockTitle = document.createElement('span');
                notesBlockTitle.innerHTML = 'Notes';
                grabNotesBlock.appendChild(notesBlock);
                notesBlock.appendChild(notesBlockTitle);
                let notesBlockText = document.createElement('p');
                notesBlockText.innerHTML = data[row].notes;
                notesBlock.appendChild(notesBlockText);
        
            }
        }


        addNotes();
}



//init
createSlide(0)

document.getElementById('btnStartOver').addEventListener('click', ()=> createSlide(0) );

 // console.log('******', indexKey.map( find =>{ if(answerGoToRow[0] == Object.keys(find)){return Object.values(find)[0] }}), '*******')
 console.log('******', Object.values(indexKey)[1], '*******')


    }
    );

}
);
