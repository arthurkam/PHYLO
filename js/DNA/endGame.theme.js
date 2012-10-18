
(function(){
	$.endGame = {
		//dusplays message of completing the game
		complete : function() {
			var self = this;
			$.protocal.sendEndGameScore("completed", function(data) {
				self.events();
				self.score("completed",data.best_score);
				//var msg = "<b>Congratulations!</b> You have solved the puzzle";
				var msg = window.lang.body.play.gameselect["end of game"]["field 3"];
				$("#endGame-text").html(msg);
				$("#endGame-learnMore-content").html("This disease is related to diseases etc, you are helping...etc");
				$("#endGame").fadeIn();
			});

		},
		//displays message of bailing out
		bail : function() {
			var self = this;
			$.protocal.sendEndGameScore("bail", function(data) {
				self.events();
				self.score("bail",data.best_score);
				//var msg = "Too bad! You did not succeed to solve this puzzle!";
				var msg = window.lang.body.play.gameselect["end of game"]["field 4"];
				$("#endGame-text").html(msg);
				$("#endGame-learnMore-content").html("This disease is related to diseases etc, you are helping...etc");
				$("#endGame").fadeIn();
			});

		},
		//scores the game
		score : function(status, highscore) {
			//gets current score		
			var setDefault = "<i class='icon-star-empty'></i><i class='icon-star-empty'></i><i class='icon-star-empty'></i>";	
			$("#endGame-score-result").html(setDefault);
			if(status == "bail")
				return;
			
			var currentScore = $.phylo.currentScore;
			var par = $.sequence.par;

			if(par < currentScore && currentScore < highscore) {
				setDefault = "<i class='icon-star'></i><i class='icon-star'></i><i class='icon-star-empty'></i>";	

			} else if( highscore <= currentScore) {
				setDefault = "<i class='icon-star'></i><i class='icon-star'></i><i class='icon-star'></i>";	

			} else { //exactly par score
				setDefault = "<i class='icon-star'></i><i class='icon-star-empty'></i><i class='icon-star-empty'></i>";	
			}
			$("#endGame-score-result").html(setDefault);
		},
		//events for the end game messages
		//new game or replay game
		events : function() {
			$("#endGame-learnMore-content").hide();
		
			$("#endGame-learnMore-tag button").unbind().click(function() {
				$("#endGame-learnMore-content").slideToggle("fast",function() {

				});
			});

			$("#endGame-new button").unbind().click(function() {
				window.location.reload(true);
				window.location.hash = "#!play";
			});
				
			$("#endGame-replay button").unbind().click(function(){
				$.main.clear();
				$("#endGame").fadeOut();
				$("#tree").html("");
				$("#gameBoard").html("<img src='img/loading.gif'/>");
				$.protocal.replay();
				$("#countDown-text").html("<img src='img/loading.gif'/>");
				$("#countDown").fadeIn();
			});	
		},
		//a pop up message to check if really want to bail out from the game
		runAway : function() {
			$("#runaway").unbind().click(function() {
				$.helper.popUp("You sure you want to bail out from this puzzle?", function(status) {
					if(status == "ok") {
						$.endGame.bail();
						$.timer.active = false;
					}
				});
			});	
		}
	}
})();
