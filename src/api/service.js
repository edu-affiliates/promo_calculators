"use strict";

import {normalize, schema} from 'normalizr'
import generalOptions from '../config/generalOptions'
import {checkAccess, fetchStats, getData, checkCoupon, discountValue, discountInfo} from '../api/api'


// taking JSON with a schema definition
// and returning nested entities with their IDs,
// gathered in dictionaries.
const deadlineSchema = new schema.Entity('deadline');

const levelSchema = new schema.Entity('level', {
    deadline: [deadlineSchema]
});

const serviceSchema = new schema.Entity('service', {
    level: [levelSchema]
});

const treeSchema = new schema.Entity('tree', {
    services_tree: [serviceSchema]
});


// parse url ant set up parameters for stats
export function getStats() {
    const urlParams = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
            let pair = e.split('=');
            if(pair.length === 1 && pair[0] === "")
              return p;
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1]);
            p[key] = (pair.length > 1) ? value : '';
            return p
        }, {}
    );
    
    const clientParams = {
        segment_id: generalOptions.segment_id,
        rid: generalOptions.rid,
        referrer_url: document.referrer,
        origin_url: window.location.protocol + '//' +
        window.location.host +
        window.location.pathname + /**/
        window.location.search +
        window.location.hash
    };
    return Object.assign({}, clientParams, urlParams)
}

export function sendStats(stats, xsrf) {
    return fetchStats(stats, xsrf)
        .then(
            (response) => {
                // console.log(response)
            },
            (fail) => {
                console.log(fail)
            }
        )
}

export function getUserCheckAccess() {
    return checkAccess()
        .then(
            (response) => {
                return JSON.parse(response)
            },
            (fail) => {
                console.log(fail)
            }
        )
}

export function getUserDiscount() {
    return discountValue()
        .then(
            (response) => {
                const dscArray = JSON.parse(response).info.map((item) => {
                    return item.amount;
                });
                return Math.max(...dscArray);
            },
            (fail) => {
                console.log(fail)
            }
        )
}
export function getUserDiscountInfo() {
    return discountInfo()
        .then(
            (response) => {
                return response.info.discount;
            },
            (fail) => {
                console.log(fail)
            }
        )
}

export function getTree(servicesID = generalOptions.service_ids) {
    return getData(servicesID)
        .then(
            (response) => {
                return normalize(JSON.parse(response).info, treeSchema);
            },
            (fail) => {
                console.log(fail)
            }
        )
}

export function getDiscount(coupon) {
    return checkCoupon(coupon)
        .then(
            (response) => {
                const dsc = JSON.parse(response).info.discount_amount;
                return dsc / 100
            },
            (fail) => {
                console.log(fail)
            }
        )
}