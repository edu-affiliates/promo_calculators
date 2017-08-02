import $ from "jquery";
import {helper} from './helper'
import  generalOptions from '../config/generalOptions';

export class Api {
    constructor() {
        this.params = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
                let pair = e.split('=');
                let key = decodeURIComponent(pair[0]);
                let value = decodeURIComponent(pair[1]);
                p[key] = (pair.length > 1) ? value : '';
                return p;
            }, {}
        );

        this.myDefault = Object.assign({}, this.params,
            {
                _xsrf: 'none',
                referrer_url: document.referrer,
                origin_url: window.location.protocol + "//" +
                window.location.host +
                window.location.pathname +
                window.location.search +
                window.location.hash
            },
        );

        //set to cookie discount from generalOptions
        if (!generalOptions.dev_mode && !helper.getCookie('dsc') && !!generalOptions.dsc) {
            helper.setCookie('dsc', generalOptions.dsc, 90);
            generalOptions.dsc = '';
        }

        //set to cookie discount from URL params
        if (this.params['dsc']) {
            helper.setCookie('dsc', this.params['dsc'], 90);
        }

        //set to myDefault segment_id from generalOptions
        if (!!generalOptions.segment_id) {
            this.myDefault.segment_id = generalOptions.segment_id;
        }

        if (generalOptions.apiMode === 'M') {
            if (!helper.getCookie("_xsrf")) {
                this.getXsrf().done(response => {
                    helper.setCookie('_xsrf', JSON.parse(response).info.token, 13);
                    this.myDefault._xsrf = JSON.parse(response).info.token;
                    this.sendStats();
                });
            } else {
                this.myDefault._xsrf = helper.getCookie("_xsrf");
                this.sendStats();

            }

        }

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

    sendStatsOld() {
        $.ajax({
            url: generalOptions.siteApiUrl + '/api/v2/auth/log_ref_stats',
            type: 'POST',
            data: {
                'rid': this.myDefault.rid || this.myDefault.ref_id,
                'sid': this.myDefault.sid || this.myDefault.sub_id,
                'url': document.referrer,
                '_xsrf': this.myDefault._xsrf
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

    sendStats() {
        $.ajax({
            url: generalOptions.siteApiUrl + '/api/v2/statistic/hit',
            type: 'POST',
            data: this.myDefault,
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: () => {
                this.sendStatsOld();
            }
        });
    }
}