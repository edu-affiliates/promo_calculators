"use strict";

class Helper {
    putToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getFromLocalStorage(key) {
        const item = localStorage.getItem(key)
        if (item) return JSON.parse(item)
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ))
        return matches ? decodeURIComponent(matches[1]) : ''
    }

    truncateDecimals (num, digits) {
        var numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    
        return parseFloat(finalResult);
    }

}
export default  new Helper()
