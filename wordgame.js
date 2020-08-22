function initWordGame(wordList) {
    var state = {
        word: null,
        previousWord: null,
        options : [],
        score:0,
        roundsPlayed:0,
        phase: 0,
    }

    var holder = document.querySelector('#game')
    var questionTemplate = document.querySelector('template#question')
    var optionTemplate = document.querySelector('template#options')
    
    function pickNextWordAndOptions() {
        state.previousWord = state.word
        var filteredList = wordList.filter(function(item){return item !== state.previousWord})

        var index = Math.floor(Math.random() * filteredList.length)
        state.word = filteredList[index]
        state.options = [state.word]

        addRandomOptions(5)
 
        state.options.sort(function(a,b) {return Math.random() - Math.random()})

        function addRandomOptions(number) {
            var remainingWords
            for (var i=0; i<number; i++) {
                remainingWords = wordList.filter(function (word) {
                    return state.options.indexOf(word) === -1
                })
                if (remainingWords.length === 0 ) {return} 
                state.options.push(remainingWords[Math.floor(Math.random() * remainingWords.length)])
            }
        }
    }

    function populate() {
        holder.querySelector('[role="wordToGuess"]').innerHTML= state.word.write()
        holder.querySelector('[role="answer"]').innerText= "??";
        holder.querySelector('[role="feedback"]').innerText= "...";
        holder.querySelector('[role="score"]').innerText= state.score.toString()+"/"+state.roundsPlayed.toString();

        var optionsDiv = holder.querySelector('[role="options"]')
        while (optionsDiv.childElementCount > 0) {
            optionsDiv.removeChild(optionsDiv.firstChild)
        }
        var node, button
        for (var i=0; i<state.options.length; i++ ) {
            node = optionTemplate.content.cloneNode(true)
            button = node.querySelector('button')
            button.innerText = state.options[i].translation
            button.addEventListener('click', makeOptionHandler(state.options[i]))
            optionsDiv.appendChild(node)
        }
    }

    function makeOptionHandler(word) {
        return function() {
            if (state.phase != 0) {return false}
            
            state.phase = 1;
            holder.querySelector('[role="answer"]').innerText= state.word.translation + " (" + state.word.text + ")";
            state.roundsPlayed++;
            if (word === state.word) {
                state.score++;
                holder.querySelector('[role="feedback"]').innerText= 'correct';
            } else {
                holder.querySelector('[role="feedback"]').innerText= 'Wrong!';
            }
        }
    }

    function handleNextButton() {
        if (state.phase !=1) {return false}
        state.phase = 0
        pickNextWordAndOptions()
        populate()
    }


    function reset() {
        while (holder.childElementCount > 0) {
            holder.removeChild(holder.firstChild)
        }
        holder.appendChild(questionTemplate.content.cloneNode(true))

        var nextButton = holder.querySelector('[role="next-button"]')
        nextButton.addEventListener('click', handleNextButton)
    }

    reset()
    pickNextWordAndOptions()
    populate()
}

initWordGame([].concat(...katakanaWordList, ...hiraganaWordList) )