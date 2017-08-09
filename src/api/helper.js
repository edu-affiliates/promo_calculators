class Helper {

    putToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getFromLocalStorage(key) {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : '';
    }

    setCookie(cname, cvalue, exdays) {
        var expires;
        if (exdays > 0) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = "expires=" + d.toUTCString();
        } else {
            expires = 0;
        }
        // does not work on localhost
        let newCookie = `${cname}=${cvalue}; ${expires}; path=/; domain=.${generalOptions.hostname}`;
        document.cookie = newCookie;

    };
}
export let helper = new Helper();
