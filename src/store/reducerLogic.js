/** return all services from api **/
export const allServiceList = (tree) => {

    /** convert the default services to array **/
    let defaultServices = Object.keys(tree.service).map((serviceID) => {
        return tree.service[serviceID];
    });

    /** sort array of the default services by order property**/
    defaultServices = defaultServices.sort((a, b) => {
        return parseInt(a.order) - parseInt(b.order);
    });
    /** filter array of all services except of the default services **/
    const services = tree.tree.undefined.services.filter((s) => {
        return !tree.service[s.id];
    });
    /**  return concatenated  array of default and all services**/
    return defaultServices.concat(services);
};


export const currentLevelList = (tree, serviceID) => {
    const levelsID = tree.service[serviceID].level;
    let levels = levelsID.map((levelID) => {
        return tree.level[levelID];
    });
    return levels.sort((a, b) => {
        return parseInt(a.order) - parseInt(b.order);
    });
};

export const currentDeadlineList = (tree, levelID) => {
    const deadlineID = tree.level[levelID].deadline;
    let deadlines = deadlineID.map((deadlineID) => {
        return tree.deadline[deadlineID];
    }).reverse();
    return deadlines;
};


//compare current and max page number and set last one if its smaller
export const checkMaxPageNumber = (numPage, maxNumPage) => {
    if (numPage > maxNumPage) return maxNumPage;
    if(isNaN(numPage)) return 1;
    return numPage;
};

export const filterServices = (allServices, search) => {
    return allServices.filter((service) => {
        return service.name.toLocaleLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
};
