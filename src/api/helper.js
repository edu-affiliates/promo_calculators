class Helper {

    putToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getFromLocalStorage(key) {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
    }
}
export let helper = new Helper();
