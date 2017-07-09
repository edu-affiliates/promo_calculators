import $ from "jquery";
import generalOptions from './generalOptions'

export const getData = (services_ids = '') => {
    let apiRequestBody = {
        'is_disciplines': false,
        'is_paper_formats': false,
        'is_services': true,
        'website_id': generalOptions.website_id,
        'service_ids': services_ids // "1648, 1650..."
    };
    if (generalOptions.apiMode !== 'M') {
        apiRequestBody.rid = generalOptions.rid;
        apiRequestBody.website_id = 432;
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: generalOptions.siteApiUrl + ((generalOptions.apiMode === 'M') ? '/api/v2/sites/order_form_data' : '/api/v2/public/calculator'),
            type: 'GET',
            data: apiRequestBody,
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        }).done(response => {
            resolve(response);
        }).fail(error => reject(error))
    })
};

export const checkCoupon = (coupon_code) => {
    return new Promise((resolve, reject) => {
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
        }).done(response => {
            generalOptions.discount_amount = JSON.parse(response).info.discount_amount;
            resolve(generalOptions.discount_amount)
        }).fail(error => {

            reject(error);
        })
    })
};
