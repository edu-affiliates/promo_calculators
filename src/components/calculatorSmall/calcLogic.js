//return object that contain current service name
export const currentService = (tree, serviceID) => {
    if (serviceID) {
        return tree.service[serviceID];
    }
    return tree.service[Object.keys(tree.service)[0]];
};

//return all services from api
export const currentServiceList = (tree) => {
    return tree.tree.undefined.services;
};

export const currentLevelList = (tree, serviceID) => {
    const levelsID = currentService(tree, serviceID).level;
    let levels = levelsID.map((levelID) => {
        return tree.level[levelID];
    });
    return levels.sort((a, b) => {
        return parseInt(a.order) - parseInt(b.order);
    });
};

export const currentLevel = (tree, id = 0) => {
    return currentLevelList(tree)[id];
};

export const currentDeadlineList = (tree, serviceID, levelID) => {
    const deadlineID = currentLevel(tree).deadline;
    let deadlines = deadlineID.map((deadlineID) => {
        return tree.deadline[deadlineID];
    }).reverse();
    return deadlines;
};

export const currentDeadline = (tree, id = 0) => {
    return currentDeadlineList(tree)[id];
};

//compare current and max page number and set last one if its smaller
export const checkMaxPageNumber = (numPage, maxNumPage) => {
    if (numPage > maxNumPage) return maxNumPage;
    return numPage;
};