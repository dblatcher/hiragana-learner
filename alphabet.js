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
    }
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

var hiraganaData = [
    [0x3042,"A"],
    [0x3044,"I"],
    [0x3046,"U"],
    [0x3048,"E"],
    [0x304A,"O"],
    [0x304B,"KA"],
    [0x304C,"GA"],
    [0x304D,"KI"],
    [0x304E,"GI"],
    [0x304F,"KU"],
    [0x3050,"GU"],
    [0x3051,"KE"],
    [0x3052,"GE"],
    [0x3053,"KO"],
    [0x3054,"GO"],
    [0x3055,"SA"],
    [0x3056,"ZA"],
    [0x3057,"SI","SHI"],
    [0x3058,"ZI","JI"],
    [0x3059,"SU"],
    [0x305A,"ZU"],
    [0x305B,"SE"],
    [0x305C,"ZE"],
    [0x305D,"SO"],
    [0x305E,"ZO"],
    [0x305F,"TA"],
    [0x3060,"DA"],
    [0x3061,"TI","CHI"],
    [0x3062,"DI","JI"],
    [0x3064,"TU","TSU"],
    [0x3065,"DU","ZU"],
    [0x3066,"TE"],
    [0x3067,"DE"],
    [0x3068,"TO"],
    [0x3069,"DO"],
    [0x306A,"NA"],
    [0x306B,"NI"],
    [0x306C,"NU"],
    [0x306D,"NE"],
    [0x306E,"NO"],
    [0x306F,"HA"],
    [0x3070,"BA"],
    [0x3071,"PA"],
    [0x3072,"HI"],
    [0x3073,"BI"],
    [0x3074,"PI"],
    [0x3075,"HU","FU"],
    [0x3076,"BU"],
    [0x3077,"PU"],
    [0x3078,"HE"],
    [0x3079,"BE"],
    [0x307A,"PE"],
    [0x307B,"HO"],
    [0x307C,"BO"],
    [0x307D,"PO"],
    [0x307E,"MA"],
    [0x307F,"MI"],
    [0x3080,"MU"],
    [0x3081,"ME"],
    [0x3082,"MO"],
    [0x3084,"YA"],
    [0x3086,"YU"],
    [0x3088,"YO"],
    [0x3089,"RA"],
    [0x308A,"RI"],
    [0x308B,"RU"],
    [0x308C,"RE"],
    [0x308D,"RO"],
    [0x308F,"WA"],
    [0x3090,"WI"],
    [0x3091,"WE"],
    [0x3092,"WO"],
    [0x3093,"N"],
    [0x3094,"VU"]
]

var hiragana = new Alphabet(hiraganaData)

document.getElementById('target').innerHTML = hiragana.write('ku watou tosi. hiragana desuka?')
