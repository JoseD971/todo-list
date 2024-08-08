const LocalStorageController = ((() => {

    const storageAvailable = (type) => {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }

    const isFirstTime = () => {
        if(localStorage.getItem('was_visited')) return;
        localStorage.setItem('was_visited', 1);
        return true;
    }

    const search = (item) => {
        if(localStorage.getItem(item) === null || localStorage.getItem(item) == '') return false;
        console.log(item);
        var storedInfo = JSON.parse(localStorage.getItem(item));
        console.log(storedInfo);
        return storedInfo;
    }

    const storage = (type, value) => {
        if(!storageAvailable('localStorage')) return; 
        localStorage.setItem(type, JSON.stringify(value));
        search(type);
    }

    // const remove = () => {
    //     if(!storageAvailable('localStorage')) return; 
    //     localStorage.removeItem(type, JSON.stringify(value));
    //     search(type);
    // }

    return {search, storage, isFirstTime}
})());

export default LocalStorageController;