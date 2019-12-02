var methods = {}

/**
 * Returns a random int
 */
methods.randomInt = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
};

/**
 * Returns, if youtube url is valid
 */
methods.validateYouTubeUrl = link => {
    if(link.includes('https://www.youtube.com/') || link.includes('https://youtu\.be/')) return true;
    else return false;
}

/**
 * Returns a 'currently not available' text
 */
methods.notAvailable = (msg) => {
    let text = 'Dieser Befehl ist momentan leider nicht verfügbar. Aber bald!';
    return text;
};

// Exportiert die Funktionen
module.exports = methods