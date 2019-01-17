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

    setCookie(name, value, options) {
        options = options || {};
      
        var expires = options.expires;
      
        if (typeof expires == "number" && expires) {
          var d = new Date();
          d.setTime(d.getTime() + expires * 1000);
          expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
          options.expires = expires.toUTCString();
        }
      
        value = encodeURIComponent(value);
      
        var updatedCookie = name + "=" + value;
      
        for (var propName in options) {
          updatedCookie += "; " + propName;
          var propValue = options[propName];
          if (propValue !== true) {
            updatedCookie += "=" + propValue;
          }
        }
      
        document.cookie = updatedCookie;
    }

    truncateDecimals (num, digits) {
        let numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    
        return parseFloat(finalResult);
    }

    getUrlParam(param) {
        const urlParams = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
                let pair = e.split('=');
                if (pair.length === 1 && pair[0] === "")
                return p;
                let key = decodeURIComponent(pair[0]);
                let value = decodeURIComponent(pair[1]);
                p[key] = (pair.length > 1) ? value : '';
                return p
            }, {}
        );
        return urlParams[param]
    }

    isFakeAccount(ref_id) {
        const fake_ref_ids = ['24', '1497', '2572', '2685', '2721', '2758', '2780', '2823', '2862', '2881', '2958', '2960', '3000', '3001', '3003', '3031', '3032', '3033'];
        let is_fake_id = false;
        fake_ref_ids.map( (value) => { if (value === ref_id) is_fake_id = true } );
        
        if (ref_id === undefined) is_fake_id = true;        
        
        return is_fake_id
    }

    validateGlobalEmail(value) {
        const pattern = new RegExp('^([a-zA-Z0-9_\\+\\.-]+)@([a-zA-Z0-9\\.-]+)\\.([a-zA-Z\\.]{2,6})$');
        return pattern.test(value);
    };

}
export default  new Helper()
