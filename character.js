function Character(identifier, charCode, config) {
    if (!config) {config = {}}
    this.identifier = identifier.toUpperCase()
    this.charCode = charCode
    this.phonetic = config.phonetic || identifier 
}

Object.defineProperties(Character.prototype,{
    vowel: {
        get: function() {
            if (this.identifier.length === 1) {
                return ["A","E","I","O","U"].indexOf(this.identifier) !== -1 ? this.identifier : ""
            }
            return this.identifier.charAt(1)
        }
    },
    constanent: {
        get: function() {
            if (this.identifier.length === 1) {
                return ["A","E","I","O","U"].indexOf(this.identifier) === -1 ? this.identifier : ""
            }
            return this.identifier.charAt(0)
        }
    },
    html: {
        get: function() {
            return "&#" + this.charCode + ";"
        }
    },
    span: {
        get: function() {
            var node = document.createElement('span')
            node.innerHTML = this.html
            return node
        }
    }
})

