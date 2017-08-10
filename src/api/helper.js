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

}
export default  new Helper()
