import $ from "jquery";
import  generalOptions from '../config/generalOptions';

export const fetchXsrf = () => {
    return $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/auth/check_access',
        type: 'GET',
        data: {},
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
};

export const fetchStatsOld = (stats, xsrf) => {
    $.ajax({
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
    });
};

export const fetchStats = (stats, xsrf) => {
    $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/statistic/hit',
        type: 'POST',
        data: Object.assign({}, stats, {_xsrf: xsrf}),
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: () => {
            fetchStatsOld(stats, xsrf);
        }
    });
};

export const fetchData = (services_ids = '') => {
    let apiRequestBody = {
        'is_disciplines': false,
        'is_paper_formats': false,
        'is_services': true,
        'website_id': generalOptions.website_id,
        'service_ids': services_ids
    };
    if (generalOptions.apiMode !== 'M') {
        apiRequestBody.rid = generalOptions.rid;
        apiRequestBody.website_id = 432;
    }

    return $.ajax({
        url: generalOptions.siteApiUrl + ((generalOptions.apiMode === 'M') ? '/api/v2/sites/order_form_data' : '/api/v2/public/calculator'),
        type: 'GET',
        data: apiRequestBody,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    })
};

export const fetchCoupon = (coupon_code) => {
    $.ajax({
        url: generalOptions.siteApiUrl + '/api/v2/order/check_coupon',
        type: 'GET',
        data: {
            'coupon_code': coupon_code
        },
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        async: true,
        crossDomain: true,
    })
};
