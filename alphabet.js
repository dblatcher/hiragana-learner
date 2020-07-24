function Alphabet(data) {
    var characters = {}
    for (var i=0; i<data.length; i++) {
        characters[data[i][1]] = new Character(data[i][1], data[i][0],{
            phonetic: data[i][2]
        })   
    }
    this.characters = characters
}

Object.defineProperties(Alphabet.prototype,{
    identifiers: {
        get: function () {
            return Object.keys(this.characters)
        }
    },
    characterArray: {
        get: function() {
            var that = this
            return Object.keys(this.characters).map(function(identifer){return that.characters[identifer]})
        }
    },
    constanents: {
        get: function() {
            var output = []
            var all = this.characterArray.map(function(character){return character.constanent})
            for (var i=0; i<all.length; i++) {
                if (output.indexOf(all[i]) === -1) {output.push(all[i])}
            }
            return output
        }
    },
})

Alphabet.prototype.decode = function(input) {
    var decodedCharacters = [];
    var that = this

    function getNextCharacter() {
        //TO DO - check for identifiers that are substrings of another 
        var characterLength = 0
        for (var i = 0; i<that.identifiers.length; i++) {
            characterLength = that.identifiers[i].length
            if (input.substring(0,characterLength).toUpperCase() == that.identifiers[i]) {
                decodedCharacters.push(that.characters[that.identifiers[i]])
                input = input.substring(characterLength)
                return
            }
        }
        decodedCharacters.push (input.substring(0,1))
        input = input.substring(1)
    }

    while (input.length > 0) {
        getNextCharacter()
    }

    return decodedCharacters
}

Alphabet.prototype.write = function(input,options) {
    var characters = this.decode(input)

    var output = ""
    for (var i=0; i<characters.length; i++) {
        if (typeof characters[i] === 'string') {
            output += characters[i]
            continue
        }
        output += characters[i].html
    }
    return output
}

Alphabet.prototype.random = function(filterFunction) {
    var set = filterFunction ? this.characterArray.filter(filterFunction) : this.characterArray
    var i = Math.floor(Math.random() * set.length)
    return set[i]
}