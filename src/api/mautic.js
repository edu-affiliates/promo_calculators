"use strict";

import {normalize, schema} from 'normalizr'
import generalOptions from '../config/generalOptions'
import helper from './helper';


export function  appendLead(data_lead, url_redirect) {
    const {email, serviceName, deadlineName, levelName, dsc, countPages} = data_lead;
    let subdomain = (generalOptions.dev_mode) ? 'dev_' : '';
    let website_id = generalOptions.website_id;

    
    if (helper.getCookie(subdomain + 'auth_' + website_id)) {
        location.href = url_redirect;
        return
    }
    
    let mauticUrl = 'https://dev-mautic.bookwormlab.com';
    let src = mauticUrl + '/mtracking.gif?page_url=' 
                + encodeURIComponent(window.location.href) 
                + '&page_title=' + encodeURIComponent(document.title) 
                + '&email='+ encodeURIComponent(email) 
                + '&firstname=' + encodeURIComponent(location.hostname)
                + '&last_service_name=' + encodeURIComponent(serviceName)
                + '&last_level_name=' + encodeURIComponent(levelName)
                + '&last_deadline_name=' + encodeURIComponent(deadlineName)
                + '&last_pages=' + countPages
                + '&last_dsc=' + dsc;

    let img = document.createElement('img');
    img.style.width  = '1px';
    img.style.height  = '1px';
    img.style.display = 'none';
    img.src = src;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(img);

    // When script send data to mautic then do some in body of function onload 
    // for exemple: in our function do redirect to my.domain.com 
    // if we doesn't need redirect, we shouldn't use onload function
    img.onload = () => { 
        location.href = url_redirect;
    }
}

