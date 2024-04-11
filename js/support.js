		function getTutorialPage (tutorialPage) {
			let pageHtml = tutorialPage.concat(".html");
  			fetch(pageHtml)
  			.then(res => res.text())
  			.then(txt => document.getElementById("demo").innerHTML = txt);
		}

		function rewind() {
			var mediaElement = document.getElementById("video"); 
    		mediaElement.pause(); 
    		mediaElement.currentTime = 0;
		}

		function sfsg(){
			console.log("SFSG")
		}

