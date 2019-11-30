var methods = {}

/**
 * Returns a random int
 */
methods.randomInt = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Exportiert die Funktionen
module.exports = methods