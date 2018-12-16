function doesCloseTokenMatch(closeToken, openToken) {
    switch (closeToken) {
        case ')': 
            return openToken === '(';
        case '}': 
            return openToken === '{';
        case ']': 
            return openToken === '[';
    }
}

function isClosing(char) {
    let closeTokens = [')', '}', ']'];

    return closeTokens.includes(char);
}

function isValid(tokens, history = [], index = 0) {
    let token = tokens[index];
    let done = index === tokens.length - 1;

    if (tokens.length === 0) {
        return false;
    }

    if (!done) {
        if (isClosing(token)) {
            if (doesCloseTokenMatch(token, history.shift()) === false) {
                return false;
            }
        } else {
            history.unshift(token);
        }
        
        return isValid(tokens, history, index + 1);
    }

    return true;
}

module.exports = str => isValid(str.split(''));