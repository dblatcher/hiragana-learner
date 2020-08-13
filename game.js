function initGame(alphabet) {

    var holder = document.querySelector("#game")
    var template = document.querySelector("#gameTemplate")

    var filterTemplate = document.querySelector("#filterTemplate")
    var textInput, answerForm;    

    var state= {
        character:null,
        previousCharacter: null,
        phase:0,
        constanentFilter: [],
        roundsWon: 0,
        roundsPlayed: 0,
    }

    function makefilter() {
        if (state.constanentFilter && state.constanentFilter.length > 0) {
            return function(character){return character !== state.previousCharacter && state.constanentFilter.includes(character.constanent) }
        }
        return function(character){return character !== state.previousCharacter}
    } 

    function handleNextButton() {
        if (state.phase == 0) {return startGame()}
        if (state.phase == 1) {return showAnswer()}
        if (state.phase == 2) {return startGame()}
    }

    function startGame() {
        state.character = alphabet.random(makefilter())
        holder.querySelector('[data-role=question]').innerHTML = state.character.html
        holder.querySelector('[data-role=answer]').innerHTML = ""
        textInput.value = ""
        textInput.classList.remove('correct')
        textInput.classList.remove('wrong')
        state.phase = 1
    }

    function showAnswer() {
        holder.querySelector('[data-role=answer]').innerHTML = state.character.phonetic
        state.roundsPlayed++
        if (textInput.value.toUpperCase() === state.character.phonetic.toUpperCase()) {
            state.roundsWon++
            textInput.classList.add('correct')
        } else {
            textInput.classList.add('wrong')
        }
        updateScores()
        state.previousCharacter = state.character
        state.phase = 2
    }

    function updateScores() {
        var scoreCount = holder.querySelector('[data-role=score-count]')
        var roundCount = holder.querySelector('[data-role=round-count]')
        scoreCount.innerText = state.roundsWon
        roundCount.innerText = state.roundsPlayed
    }

    function makefilterButtons() {

        var filters = holder.querySelector('.filters')

        function makefilterButton(constanent, isChecked) {
            var node = filterTemplate.content.cloneNode(true)
            let nodeInput = node.querySelector('input');
            let nodeLabel = node.querySelector('label');
            let nodeSpan = node.querySelector('span');
            var constanentDisplayValue = constanent === "" ? "~" : constanent 
            nodeSpan.innerText = constanentDisplayValue
            nodeLabel.setAttribute('for', "filter-"+constanent)
            nodeInput.setAttribute('id', "filter-"+constanent)
            nodeInput.checked = isChecked
            nodeInput.addEventListener('change', function(event){
                var index = state.constanentFilter.indexOf(constanent)
                if (this.checked && index === -1) {
                    state.constanentFilter.push(constanent)
                    
                } else if (!this.checked && index !== -1) {
                    state.constanentFilter.splice(index,1)
                    
                }
            })
            return node
        }

        alphabet.constanents.forEach(function (constanent) {
            filters.appendChild(makefilterButton(constanent,state.constanentFilter.includes(constanent)))
        })
    }

    function reset() {
        state.phase=0
        state.roundsWon=0
        state.roundsPlayed=0
        state.character=null

        while (holder.childElementCount > 0) {
            holder.removeChild(holder.firstChild)
        }
        holder.appendChild(template.content.cloneNode(true))
        holder.querySelector('[data-role=next-button]').addEventListener('click',handleNextButton)
        holder.querySelector('[data-role=restart-button]').addEventListener('click',reset)
        updateScores()

        answerForm = holder.querySelector('[data-role=answer-form]') 
        textInput = holder.querySelector('[type=text]')
        answerForm.addEventListener('submit',function(event){
            event.preventDefault()
            handleNextButton()
        })
        makefilterButtons()
    }

    reset()
    
    return state
}

gameState = initGame(hiragana)