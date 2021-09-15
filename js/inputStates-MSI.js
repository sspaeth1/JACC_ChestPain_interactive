let slides = [],
  indexKey = [],
  history = [],
  newSlide,
  grabTree = document.getElementById("leftLines");

const createSlide = (table, row) => {
  fetch("js/data_" + table + ".json")
    .then((response) => response.json())
    .then((json) => {
      let data = json;
      for (let i in data) {
        slides.push(data[i]);
      }
      fetch("js/indexKey_" + table + ".js")
        .then((response) => response.json())
        .then((json) => {
          for (let i in json) {
            indexKey.push(json[i]);
          }
          let setEventListnerAnswers = Array.from(document.getElementsByClassName("answerSelection")),
            // setStateID = data[row].stateID,
            // stateIndex = data.indexOf(data[row]),
            grabSelectionBlock = document.getElementById("selectionBlock"),
            grabActionBlock = document.getElementById("actionBlock"),
            grabNotesBlock = document.getElementById("notesBlock"),
            answerArray = [data[row].answer1, data[row].answer2, data[row].answer3, data[row].answer4, data[row].answer5, data[row].answer6],
            answerGoToRow = [
              data[row].answer1_go_to,
              data[row].answer2_go_to,
              data[row].answer3_go_to,
              data[row].answer4_go_to,
              data[row].answer5_go_to,
              data[row].answer6_go_to,
            ];
          //clear for new slide
          grabActionBlock.innerHTML = "";
          grabSelectionBlock.innerHTML = "";
          grabNotesBlock.innerHTML = "";

          let addAction = () => {
            if (data[row].action_1 != "") {
              let actionBlock = document.createElement("div");
              actionBlock.setAttribute("class", "action green");
              let actionBlockTitle = document.createElement("span");
              actionBlockTitle.innerHTML = "Action";
              grabActionBlock.appendChild(actionBlock);
              actionBlock.appendChild(actionBlockTitle);
              let actionBlockText = document.createElement("p");
              actionBlockText.innerHTML = data[row].action_1;
              actionBlock.appendChild(actionBlockText);
            }
          };
          addAction();

          let addQuestion = () => {
            let createQuestion = document.createElement("div");
            createQuestion.setAttribute("id", "prompQuestion");
            grabSelectionBlock.appendChild(createQuestion);
            let selectQuestion = document.getElementById("prompQuestion");
            selectQuestion.innerHTML = data[row].question;
          };
          addQuestion();
          let addAnswerSections = () => {
            if (data[row].answer1 == "") {
              console.log("no answers");
            } else {
              for (let i = 0; i < answerArray.length; i++) {
                if (answerArray[i] != "") {
                  let selectQuestion = document.getElementById("prompQuestion");
                  let newAnswer = document.createElement("div");
                  newAnswer.setAttribute("class", "answerSelection");
                  selectQuestion.parentElement.appendChild(newAnswer);
                  newAnswer.innerHTML = answerArray[i];
                  // answer number index of current slide
                  let answerIndex = Object.values(Object.values(indexKey)[i])[0];
                  let answerIndexPlusOne = Object.values(Object.values(indexKey)[i])[0] + 1;
                  // let answerIndex =   data[row]["answer" + [i] +_"go_to"];

                  // row - current index in indexKeys

                  //Current Slide index
                  let currentSlide = slides.indexOf(slides[row]);

                  //get go-to-slide in current slide object
                  let reparseGetAnswerRowInDataJSON = "answer" + answerIndexPlusOne + "_go_to";

                  // this Slides go-to-index
                  let newSlideStateID = data[row][reparseGetAnswerRowInDataJSON];
                  newAnswer.addEventListener("mouseenter", () => {
                    newSlide = newSlideStateID;

                    // console.log(data.findIndex((find) => data[0]));
                    // console.log("go to: ", reparseGetAnswerRowInDataJSON);

                    // console.log(slides.indexOf(slides[row]) + "current slide");
                  });

                  // current slide
                  // console.log(" current Slide: " + currentSlide + " , current slide go_to: " + slides[currentSlide][reparseGetAnswerRowInDataJSON]);

                  newAnswer.addEventListener("click", () => {
                    console.log(
                      "index selected: " + answerIndex + "  " + reparseGetAnswerRowInDataJSON + ": " + data[row][reparseGetAnswerRowInDataJSON]
                    );
                    //remove the last slide by setting grabselectionblock to ""
                    grabSelectionBlock.innerHTML = "";
                    // index selected > gets the go to specific answer which is stateID >  find stateId match get new row # which is data[...]

                    // function if
                    const createNewSlideAndAddToHistory = () => {
                      history.push(row);
                      console.log("history: " + history);
                      return newSlideStateID;
                    };

                    row = slides.findIndex((find) => {
                      if (find.objectID == newSlideStateID) {
                        return createNewSlideAndAddToHistory();
                      }
                    });

                    let createMilestoneTree = (row) => {
                      grabTree.innerHTML = "";
                      let acute = document.createElement("p");
                      acute.setAttribute("class", "treeleft");
                      acute.innerHTML = "Acute";
                      grabTree.appendChild(acute);

                      const addMilestone = (milestoneName) => {
                        let newTreeMile = document.createElement("p");
                        newTreeMile.setAttribute("class", "treeleft");
                        newTreeMile.innerHTML = milestoneName;
                        acute.appendChild(newTreeMile);
                      };

                      let acute_milestones = [
                        "Obvious Non-cardiac Cause",
                        "Obvious Non-ischemic Cardiac Cause",
                        "STEMI",
                        "Other ACS",
                        "Low Risk",
                        "Intermediate Risk",
                        "High Risk",
                        "No Known CAD",
                        "Recent Negative Test",
                        "Prior Inconclusive or Mildly Abnormal Stess Test ≤1 year",
                        "Prior Moderate-Severely Abnormal ≤1 year",
                        "Normal Stress Test (or mildly abnormal)",
                        "Moderate-Severe Ischemia",
                        "No CAD/Minimal Stenosis",
                        "Obstructive CAD",
                        "High-Risk CAD or Frequent Angina",
                        "Intermediate Stenosis",
                        "Intermediate/Inconclusive Stenosis",
                        "FFR-CT ≤0.8 or Moderate-Severe Ischemia",
                        "FFR-CT >0.8 or < Moderate-Severe Ischemia",
                        "Known CAD",
                        "Non-obstructive CAD",
                        "Obstructive CAD__1",
                        "High-Risk CAD or Frequent Angina__1",
                        "FFR-CT ≤0.8 or Moderate-Severe Ischemia__1",
                        "FFR-CT >0.8 or < Moderate-Severe Ischemia__1",
                        "Abnormal Functional Test",
                        "Normal Functional Test",
                        "stable",
                        "No Known CAD__1",
                        "Low Risk__1",
                        "Intermediate/High Risk",
                        "No CAD",
                        "Non-obstructive CAD__1",
                        "Obstructive CAD__2",
                        "FFR-CT ≤0.8 or Moderate-Severe Ischemia__2",
                        "FFR-CT >0.8 or < Moderate-Severe Ischemia__2",
                        "High-Risk CAD or Frequent Angina__2",
                        "Tests Inconclusive",
                        "Mild Ischemia",
                        "Moderate-Severe Ischemia__1",
                        "Persistent symptoms",
                        "Known CAD__1",
                        "Non-obstructive CAD__2",
                        "Obstructive CAD__3",
                        "Intensification of Preventive Strategies and Option to Defer Testing",
                        "Persistent symptoms__1",
                        "FFR-CT ≤0.8 or Moderate-Severe Ischemia__3",
                        "FFR-CT >0.8 or < Moderate-Severe Ischemia__3",
                        "Intensify GDMT and Option to Defer Testing",
                        "High-Risk CAD or Frequent Angina__3",
                        "No ischemia",
                        "Mild Ischemia__1",
                        "Moderate-Severe Ischemia__2",
                        "Invasive Coronary Angiography with FFR or IFR",
                        "CCTA",
                        "GDMT",
                        "Discharge",
                        "Optimize Preventive Therapies",
                        "Continue Preventive Therapies",
                        "Invasive Coronary Angiography",
                        "Defer Invasive Coronary Angiography",
                        "Preventive strategies and option to defer testing",
                        "INOCA Pathway",
                      ];
                      acute_milestones.forEach((el) => {
                        if (data[row][el]) {
                          addMilestone(el);
                        }
                      });

                      for (let k in data[row]) {
                        if (data[row][k] == "true") {
                          let newTreeMile = document.createElement("p");
                          newTreeMile.setAttribute("class", "treeleft item");
                          acute.appendChild(newTreeMile);
                          console.log(data[row][k]);
                        }
                      }
                      if (data[row].end) {
                        console.log("this is the end");
                        acute.lastChild.setAttribute("class", "end");
                      }
                    };
                    createMilestoneTree(row);

                    table = newSlideStateID.split("_")[0];
                    createSlide(table, row);
                  });
                }
              }
            }
          };
          addAnswerSections();

          let addNotes = () => {
            if (data[row].notes != "") {
              let notesBlock = document.createElement("div");
              notesBlock.setAttribute("class", "notes");
              let notesBlockTitle = document.createElement("span");
              notesBlockTitle.innerHTML = "Notes";
              grabNotesBlock.appendChild(notesBlock);
              notesBlock.appendChild(notesBlockTitle);
              let notesBlockText = document.createElement("p");
              notesBlockText.innerHTML = data[row].notes;
              notesBlock.appendChild(notesBlockText);
            }
          };

          addNotes();
        });
      //.catch((err) => console.log(err));
    });
  //.catch((err) => console.log(err));
};

//init
createSlide("acute", 0);

//start over button
document.getElementById("btnStartOver").addEventListener("click", () => {
  createSlide("acute", 0);
  grabTree.innerHTML = "";
});

document.getElementById("btnBack").addEventListener("click", () => {
  createSlide("acute", history.pop());
  console.log("history: " + history);
});

// console.log('******', indexKey.map( find =>{ if(answerGoToRow[0] == Object.keys(find)){return Object.values(find)[0] }}), '*******')
// console.log("******", Object.values(indexKey)[1], "*******");
