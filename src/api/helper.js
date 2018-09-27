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

    // truncateDecimals(number, digits) {
    //     var multiplier = Math.pow(10, digits),
    //         adjustedNum = number * multiplier,
    //         truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    
    //     return truncatedNum / multiplier;
    // };

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
