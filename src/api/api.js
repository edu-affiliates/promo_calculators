import $ from "jquery";
import  generalOptions from '../config/generalOptions';

export default class Api {
    constructor() {
        this.params = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
                let pair = e.split('=');
                let key = decodeURIComponent(pair[0]);
                let value = decodeURIComponent(pair[1]);
                p[key] = (pair.length > 1) ? value : '';
                return p;
            }, {}
        );

        this.stats = Object.assign({}, this.params,
            {
                referrer_url: document.referrer,
                origin_url: window.location.protocol + "//" +
                window.location.host +
                window.location.pathname +
                window.location.search +
                window.location.hash
            },
        );
    }


    getXsrf() {
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
    }

    sendStatsOld(xsrf) {
        $.ajax({
            url: generalOptions.siteApiUrl + '/api/v2/auth/log_ref_stats',
            type: 'POST',
            data: {
                'rid': this.stats.rid || this.stats.ref_id,
                'sid': this.stats.sid || this.stats.sub_id,
                'url': this.stats.referrer,
                '_xsrf': xsrf
            },
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (response) {
            }
        });
    }

    sendStats(xsrf) {
        $.ajax({
            url: generalOptions.siteApiUrl + '/api/v2/statistic/hit',
            type: 'POST',
            data: Object.assign({}, this.stats, {_xsrf: xsrf}),
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: () => {
                this.sendStatsOld(xsrf);
            }
        });
    }

    checkCoupon(coupon_code) {
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

    }

    getData(services_ids = '') {
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
}