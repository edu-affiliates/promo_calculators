'use strict'

import $ from 'jquery'
import generalOptions from '../config/generalOptions'

export const checkAccess = () => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v3/auth/check_access',
        type: 'GET',
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
};

export const fetchStatsOld = (stats, xsrf) => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/auth/log_ref_stats',
        type: 'POST',
        data: {
            'rid': stats.rid || stats.ref_id,
            'sid': stats.sid || stats.sub_id,
            'url': stats.referrer,
            '_xsrf': xsrf
        },
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    })
};

export const fetchStats = (stats, xsrf) => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/statistic/hit',
        type: 'POST',
        data: Object.assign({}, stats, {_xsrf: xsrf}),
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: () => {
            fetchStatsOld(stats, xsrf)
        }
    })
};

export const getData = (servicesIds = '') => {
    let apiRequestBody = {
        'is_disciplines': false,
        'is_paper_formats': false,
        'is_services': true,
        'website_id': generalOptions.website_id,
        'service_ids': servicesIds
    };
    if (!generalOptions.website_id) {
        apiRequestBody.rid = generalOptions.rid;
        apiRequestBody.website_id = 432;
    }
    const apiCall = ((generalOptions.website_id) ? '/api/v2/sites/order_form_data' : '/api/v2/public/calculator');

    return $.ajax({
        url: generalOptions.siteApiUrl + apiCall,
        type: 'GET',
        data: apiRequestBody,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    })
};

export const checkCoupon = (couponCode) => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/order/check_coupon',
        type: 'GET',
        data: {
            'coupon_code': couponCode
        },
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true,
    })
};

export const discountInfo = () => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/user/discounts_info',
        type: 'GET',
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true,
    })
};
export const discountValue = () => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/user/detect_discounts',
        type: 'GET',
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true,
    })
};
