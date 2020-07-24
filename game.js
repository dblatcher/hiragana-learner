function initGame() {

    var holder = document.querySelector("#game")
    var template = document.querySelector("#gameTemplate")

    var state= {
        character:null,
        phase:0,
        constanentFilter: ["","K","T","S"],
    }

    function makefilter() {
        if (state.constanentFilter && state.constanentFilter.length > 0) {
            return function(character){return state.constanentFilter.includes(character.constanent) }
        }
        return function(character){return true }
    } 

    function startGame() {
        if (state.phase !== 0) {return reset()}
        state.character = hiragana.random(makefilter())
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

    reset()
    return state
}

gameState = initGame()