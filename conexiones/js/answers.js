  var puzzleID = 0;
  var z0 = json[puzzleID].easy;
  var z1 = json[puzzleID].medium;
  var z2 = json[puzzleID].harder;
  var z3 = json[puzzleID].difficult;
  document.getElementById("easy").value = z0[0];
  document.getElementById("clue00").value = z0[1][0];
  document.getElementById("clue01").value = z0[1][1];
  document.getElementById("clue02").value = z0[1][2];
  document.getElementById("clue03").value = z0[1][3];
  document.getElementById("medium").value = z1[0];
  document.getElementById("clue10").value = z1[1][0];
  document.getElementById("clue11").value = z1[1][1];
  document.getElementById("clue12").value = z1[1][2];
  document.getElementById("clue13").value = z1[1][3];
  document.getElementById("harder").value = z2[0];
  document.getElementById("clue20").value = z2[1][0];
  document.getElementById("clue21").value = z2[1][1];
  document.getElementById("clue22").value = z2[1][2];
  document.getElementById("clue23").value = z2[1][3];
  document.getElementById("difficult").value = z3[0];
  document.getElementById("clue30").value = z3[1][0];
  document.getElementById("clue31").value = z3[1][1];
  document.getElementById("clue32").value = z3[1][2];
  document.getElementById("clue33").value = z3[1][3];
  const nextButton = document.getElementById("nextButton");
  nextButton.addEventListener("click", function() {
  puzzleID++;
  var z0 = json[puzzleID].easy;
  var z1 = json[puzzleID].medium;
  var z2 = json[puzzleID].harder;
  var z3 = json[puzzleID].difficult;
  document.getElementById("easy").value = z0[0];
  document.getElementById("clue00").value = z0[1][0];
  document.getElementById("clue01").value = z0[1][1];
  document.getElementById("clue02").value = z0[1][2];
  document.getElementById("clue03").value = z0[1][3];
  document.getElementById("medium").value = z1[0];
  document.getElementById("clue10").value = z1[1][0];
  document.getElementById("clue11").value = z1[1][1];
  document.getElementById("clue12").value = z1[1][2];
  document.getElementById("clue13").value = z1[1][3];
  document.getElementById("harder").value = z2[0];
  document.getElementById("clue20").value = z2[1][0];
  document.getElementById("clue21").value = z2[1][1];
  document.getElementById("clue22").value = z2[1][2];
  document.getElementById("clue23").value = z2[1][3];
  document.getElementById("difficult").value = z3[0];
  document.getElementById("clue30").value = z3[1][0];
  document.getElementById("clue31").value = z3[1][1];
  document.getElementById("clue32").value = z3[1][2];
  document.getElementById("clue33").value = z3[1][3];
  document.getElementById("newPuzzle").innerHTML = "";
  });

  const form = document.querySelector('#puzzleForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    var easyClues = '{"easy":[' + '"' + data.easy + '",[';
    easyClues += '"' + data.clue00 + '"' ;
    easyClues += ',"' + data.clue01 + '"' ;
    easyClues += ',"' + data.clue02 + '"' ;
    easyClues += ',"' + data.clue03 + '"]],' ;

    var mediumClues = '"medium":[' + '"' + data.medium + '",[';
    mediumClues += '"' + data.clue10 + '"' ;
    mediumClues += ',"' + data.clue11 + '"' ;
    mediumClues += ',"' + data.clue12 + '"' ;
    mediumClues += ',"' + data.clue13 + '"]],' ;

    var harderClues = '"harder":[' + '"' + data.harder + '",[';
    harderClues += '"' + data.clue20 + '"' ;
    harderClues += ',"' + data.clue21 + '"' ;
    harderClues += ',"' + data.clue22 + '"' ;
    harderClues += ',"' + data.clue23 + '"]],' ;

    var difficultClues = '"difficult":[' + '"' + data.difficult + '",[';
    difficultClues += '"' + data.clue30 + '"' ;
    difficultClues += ',"' + data.clue31 + '"' ;
    difficultClues += ',"' + data.clue32 + '"' ;
    difficultClues += ',"' + data.clue33 + '"]]}' ;

//  console.log(easyClues + mediumClues + harderClues + difficultClues);

    document.getElementById("newPuzzle").innerHTML = easyClues + mediumClues + harderClues + difficultClues;

    // fetch('your-api-endpoint', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  });

  function resetForm() {
  document.getElementById("puzzleForm").reset();
}

