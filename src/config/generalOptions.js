let hostname = '99papers.com'

let generalOptions = {
    'hostname': hostname,
    'website_id': 432,
    'service_ids': '1674, 1675, 1673, 1690',
};

if (window.eduOptions) {
    Object.assign(generalOptions, window.eduOptions)
}

if (generalOptions.new_api) {
    if (generalOptions.dev_mode) {
        generalOptions.siteApiUrl = `https://devnewapi.${generalOptions.hostname}`
        generalOptions.siteMyUrl = `https://devnewmy.${generalOptions.hostname}`
    } else {
        generalOptions.siteApiUrl = `https://api.${generalOptions.hostname}`
        generalOptions.siteMyUrl = `https://my.${generalOptions.hostname}`
    }
} else {
    if (generalOptions.dev_mode) {
        generalOptions.siteApiUrl = `https://devapi.${generalOptions.hostname}`
        generalOptions.siteMyUrl = `https://devmy.${generalOptions.hostname}`
    } else {
        generalOptions.siteApiUrl = `https://api.${generalOptions.hostname}`
        generalOptions.siteMyUrl = `https://my.${generalOptions.hostname}`
    }
}

export default generalOptions
