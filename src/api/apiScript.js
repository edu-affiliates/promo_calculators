import $ from "jquery";
import { helper } from './helper'
import  generalOptions from '../config/generalOptions';

export class Api{
	constructor(){
		this.params = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    let a = e.split('=');
                    let key = decodeURIComponent(a[0]);
                    let value = decodeURIComponent(a[1]);
                    p[key] = (a.length > 1) ? value : '';
                    return p;
                }, {}
            );

		this.myDefault = {
            urlApi: generalOptions.siteApiUrl,
            rid: this.params['rid'],
            ref_id: this.params['ref_id'],
            sid: this.params['sid'],
            sub_id: this.params['sub_id'],
            dsc: this.params['dsc'],
            user_rid: this.params['user_rid'] ,
            user_id: this.params['user_id'],
            utm_source: this.params['utm_source'],
            utm_medium: this.params['utm_medium'],
            utm_campaign: this.params['utm_campaign'],
            utm_term: this.params['utm_term'],
            utm_content: this.params['utm_content'],
            url: window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + window.location.hash,
            _xsrf: 'none'
        };
        this.WM_MAP = {
            'bestwritingservice': {
                'ref_id' : '1395',
                'sub_id' : 'bestwritingservice'
            },
            'essay-help': {
                'ref_id' : '1085',
                'sub_id' : 'essay-help'
            },
            'studenthelp': {
                'ref_id' : '1602',
                'sub_id' : 'studenthelp'
            },
            'essay-writers': {
                'ref_id' : '791',
                'sub_id' : 'essay-writers'
            },
            'edserbin': {
                'ref_id' : '1228',
                'sub_id' : 'edserbin'
            }
        };
        if (!generalOptions.dev_mode) {
            if (!helper.getCookie('dsc')) {
                helper.setCookie('dsc', generalOptions.dsc, 90);
                generalOptions.dsc = '';
            }
        }
        if (this.params['dsc']) helper.setCookie('dsc', this.params['dsc'], 90);

		if (!!generalOptions.segment_id) this.myDefault.segment_id = generalOptions.segment_id;

        if (generalOptions.apiMode === 'M') {
            if (!helper.getCookie("_xsrf")) {
                this.getXsrf().done(response => {
                    response = JSON.parse(response);
                    this.myDefault._xsrf = response.info.token;
                    helper.setCookie('_xsrf', this.myDefault._xsrf, 13);
                    this.setWMparams();
                    this.sendStats();
                });
            } else {
                this.myDefault._xsrf = helper.getCookie("_xsrf");
                this.setWMparams();
                this.sendStats();

            }

        }

	}

    setWMparams(){
        let slug = Object.keys(this.params)[0];
        if (this.WM_MAP.hasOwnProperty(slug)){
            for(let key of Object.keys(this.WM_MAP[slug])){
                this.myDefault[key] = this.WM_MAP[slug][key];
            }
        }
    }

    getXsrf() {
        return $.ajax({
            url: this.myDefault.urlApi + '/api/v2/auth/check_access',
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
            url: this.myDefault.urlApi + '/api/v2/auth/log_ref_stats',
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
            url: this.myDefault.urlApi + '/api/v2/statistic/hit',
            type: 'POST',
            data: {
                'rid': this.myDefault.rid,
                'ref_id': this.myDefault.ref_id,
                'sid': this.myDefault.sid,
                'sub_id': this.myDefault.sub_id,
                'dsc': this.myDefault.dsc,
                'user_rid': this.myDefault.user_rid,
                'user_id': this.myDefault.user_id,
                'referrer_url': document.referrer,
                'origin_url': this.myDefault.url,
                'segment_id': this.myDefault.segment_id,
                'utm_source': this.myDefault['utm_source'],
                'utm_medium': this.myDefault['utm_medium'],
                'utm_campaign': this.myDefault['utm_campaign'],
                'utm_term': this.myDefault['utm_term'],
                'utm_content': this.myDefault['utm_content'],
                '_xsrf': this.myDefault._xsrf
            },
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: response => {
                this.sendStatsOld();
            }
        });
    }
}

