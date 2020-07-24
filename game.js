function initGame(alphabet) {

    var holder = document.querySelector("#game")
    var template = document.querySelector("#gameTemplate")

    var filterTemplate = document.querySelector("#filterTemplate")
    var filters = document.querySelector('#filters')

    var state= {
        character:null,
        phase:0,
        constanentFilter: [],
    }

    function makefilter() {
        if (state.constanentFilter && state.constanentFilter.length > 0) {
            return function(character){return state.constanentFilter.includes(character.constanent) }
        }
        return function(character){return true }
    } 

    function startGame() {
        if (state.phase !== 0) {return reset()}
        state.character = alphabet.random(makefilter())
        holder.querySelector('[data-role=question]').innerHTML = state.character.html
        state.phase = 1
    }

    function showAnswer() {
        if (state.phase !== 1) {return false}
        holder.querySelector('[data-role=answer]').innerHTML = state.character.phonetic
        state.phase = 2
    }

    function reset() {
        state.phase=0
        state.character=null

        while (holder.childElementCount > 0) {
            holder.removeChild(holder.firstChild)
        }
        holder.appendChild(template.content.cloneNode(true))
        holder.querySelector('[data-role=start-button]').addEventListener('click',startGame)
        holder.querySelector('[data-role=answer-button]').addEventListener('click',showAnswer)
        holder.querySelector('[data-role=restart-button]').addEventListener('click',reset)
    }

    function makefilterButtons() {

        function makefilterButton(constanent) {
            var node = filterTemplate.content.cloneNode(true)
            let nodeInput = node.querySelector('input');
            let nodeLabel = node.querySelector('label');
            let nodeSpan = node.querySelector('span');
            var constanentDisplayValue = constanent === "" ? "~" : constanent 
            nodeSpan.innerText = constanentDisplayValue
            nodeLabel.setAttribute('for', "filter-"+constanent)
            nodeInput.setAttribute('id', "filter-"+constanent)
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
            filters.appendChild(makefilterButton(constanent))
        })
    }

    makefilterButtons()
    reset()
    return state
}

gameState = initGame(hiragana)