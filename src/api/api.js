'use strict'

import $ from 'jquery'
import generalOptions from '../config/generalOptions'


const api = {
    service_tree: {
        url: '/api/v2/sites/order_form_data',
        type: 'GET',
        // its possible to pass set of ids in format '1674, 1675, 1673, 1690'
        parameters: ['is_disciplines', 'is_paper_formats', 'is_services', 'website_id', 'service_ids']
    },
    check_access: {
        url: '/api/v3/auth/check_access',
        type: 'GET'
    },
    stat_old: {
        url: '/api/v2/auth/log_ref_stats',
        type: 'POST'
    },
    stat: {
        url: '/api/v2/statistic/hit',
        type: 'POST'
    },
    check_coupon: {
        url: '/api/v2/order/check_coupon',
        type: 'GET'
    },
    discounts_info: {
        url: '/api/v2/user/discounts_info',
        type: 'GET'
    },
    detect_discounts: {
        url: '/api/v2/user/detect_discounts',
        type: 'GET'
    }
};

const new_api = {
    service_tree: {
        url: '/api/v2/sites/order_form_data',
        type: 'GET',
        // its possible to pass set of ids in format '1674, 1675, 1673, 1690'
        parameters: ['is_disciplines', 'is_paper_formats', 'is_services', 'website_id', 'service_ids']
    },
    check_access: {
        url: '/api/v4/auth/check_access',
        type: 'GET'
    },
    stat_old: {
        url: '/api/v2/auth/log_ref_stats',
        type: 'POST'
    },
    stat: {
        url: '/api/v2/statistic/hit',
        type: 'POST'
    },
    check_coupon: {
        url: '/api/v4/order/check_coupon',
        type: 'GET'
    },
    discounts_info: {
        url: '/api/v4/user/discounts_info',
        type: 'GET'
    },
    detect_discounts: {
        url: '/api/v2/user/detect_discounts',
        type: 'GET'
    }
};

const publicApi = {
    service_tree: {
        url: '/api/v2/public/calculator',
        type: 'GET'
    }
}

api.check_access.url = (generalOptions.new_api === true ? '/api/v4/auth/check_access' : '/api/v3/auth/check_access');

api.check_coupon.url = (generalOptions.new_api === true ? '/api/v4/order/check_coupon' : '/api/v2/order/check_coupon');

api.discounts_info.url = (generalOptions.new_api === true ? '/api/v4/user/discounts_info' : '/api/v2/user/discounts_info');

export const checkAccess = () => {
    return $.ajax({
        url: generalOptions.siteApiUrl + new_api.check_access.url,
        type: new_api.check_access.type,
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
};

export const fetchStatsOld = (stats, xsrf) => {
    if (!generalOptions.new_api)
        return $.ajax({
            url: generalOptions.siteApiUrl + new_api.stat_old.url,
            type: api.stat_old.type,
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
        url: generalOptions.siteApiUrl + new_api.stat.url,
        type: new_api.stat.type,
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
        'service_ids': servicesIds,
    };
    if (generalOptions.apiMode !== 'M') {
        apiRequestBody.rid = generalOptions.rid;
        apiRequestBody.website_id = 432;
    } 
    if (generalOptions.apiMode === 'C') {
        apiRequestBody.rid = generalOptions.rid;
        apiRequestBody.website_id = generalOptions.website_id;
    }
    const apiCall = ((generalOptions.apiMode === 'M') ? new_api.service_tree.url : publicApi.service_tree.url);

    return $.ajax({
        url: generalOptions.siteApiUrl + apiCall,
        type: new_api.service_tree.type,
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
        url: generalOptions.siteApiUrl + new_api.check_coupon.url,
        type: new_api.check_coupon.type,
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
        url: generalOptions.siteApiUrl + new_api.discounts_info.url,
        type: new_api.discounts_info.type,
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
        url: generalOptions.siteApiUrl + new_api.detect_discounts.url,
        type: new_api.detect_discounts.type,
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true,
    })
};
