function run(){
    var highscores = JSON.parse(localStorage.getItem('highscores')) || []

    //we need to sort the scores from high to low
    highscores.sort(function(a,b){
        return b.score - a.score
    })


    //create elements to display each score
    for (var i = 0; i < 5; i++) {
        var li =  document.createElement('li')
        li.textContent = highscores[i].initials + ' - ' + highscores[i].score;

        var ol =  document.getElementById('scores');
        ol.append(li)
        
    }

    //append to the scores ol

}

run()