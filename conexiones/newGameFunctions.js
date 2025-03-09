function buildGame() {
  var label = document.getElementById("label0").value;
  label = `"${label}"`;
  var c0 = document.getElementById("clue0").value;
  var c1 = document.getElementById("clue1").value;
  var c2 = document.getElementById("clue2").value;
  var c3 = document.getElementById("clue3").value;
  var clues = [];
  clues.push(`"${c0}"`);
  clues.push(`"${c1}"`);
  clues.push(`"${c2}"`);
  clues.push(`"${c3}"`);
  clues = clues.map(function(x){ return x.toUpperCase(); })
  let easy = '"easy":[' + label.toUpperCase() + ",[" + clues + "]]";

  label = document.getElementById("label1").value;
  label = `"${label}"`;
  c0 = document.getElementById("clue4").value;
  c1 = document.getElementById("clue5").value;
  c2 = document.getElementById("clue6").value;
  c3 = document.getElementById("clue7").value;
  clues = [];
  clues.push(`"${c0}"`);
  clues.push(`"${c1}"`);
  clues.push(`"${c2}"`);
  clues.push(`"${c3}"`);
  clues = clues.map(function(x){ return x.toUpperCase(); })
  let medium = '"medium":[' + label.toUpperCase() + ",[" + clues + "]]";

  label = document.getElementById("label2").value;
  label = `"${label}"`;
  c0 = document.getElementById("clue8").value;
  c1 = document.getElementById("clue9").value;
  c2 = document.getElementById("clue10").value;
  c3 = document.getElementById("clue11").value;
  clues = [];
  clues.push(`"${c0}"`);
  clues.push(`"${c1}"`);
  clues.push(`"${c2}"`);
  clues.push(`"${c3}"`);
  clues = clues.map(function(x){ return x.toUpperCase(); })
  let harder = '"harder":[' + label.toUpperCase() + ",[" + clues + "]]";

  label = document.getElementById("label3").value;
  label = `"${label}"`;
  c0 = document.getElementById("clue12").value;
  c1 = document.getElementById("clue13").value;
  c2 = document.getElementById("clue14").value;
  c3 = document.getElementById("clue15").value;
  clues = [];
  clues.push(`"${c0}"`);
  clues.push(`"${c1}"`);
  clues.push(`"${c2}"`);
  clues.push(`"${c3}"`);
  clues = clues.map(function(x){ return x.toUpperCase(); })
  let difficult = '"difficult":[' + label.toUpperCase() + ",[" + clues + "]]";
  
  <!-- document.getElementById("newGame").innerHTML = "{" + easy + "," + medium + "," + harder + "," + difficult + "}"; -->

  var x = document.getElementById("newGame");
    x.style.display = "inline";

  document.getElementById('newGame').value = "{" + easy + "," + medium + "," + harder + "," + difficult + "}";

}