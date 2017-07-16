let hostname = '99papers.com';

let generalOptions = {
  'hostname': hostname,
  'rangeColorChecked': "#ffed7b",
  'rangeColor': "#23e1ca",
  'website_id': 432,
  'service_ids': '1674, 1675, 1673, 1690',
  'apiMode': 'S',
  'discount_amount': '0',
  'dev_mode': true
};
let eduOptions = {
  // 'hostname': 'buzzessay.com', // домен сайта, на котором будет размещена сборка
  'rangeColorChecked': "#0078a7",
  'rangeColor': "#a2d5ff",
  //'website_id': 430, // id сайта (можно зарегистрировать/взять в acp)
  //'service_ids': '1228, 1229, 1227, 1244', // Перечень сервисов, для которых происходит получение деревьев данных при инициализации сборки (очень важно внести сюда все сервисы, которые должны будут загружаться сразу)
  'apiMode': 'M', // Если у сайта своя майка (domain.com -> my.domain.com)
  'dsc': '15Buzz', // (Купон на скидку 1 заказа - опционально)
};

if (eduOptions) {
  Object.assign(generalOptions, eduOptions)
}

if (generalOptions.dev_mode) {
  generalOptions.siteApiUrl = `https://devapi.${generalOptions.hostname}`;
  generalOptions.siteMyUrl = `https://devmy.${generalOptions.hostname}`;
} else {
  generalOptions.siteApiUrl = `https://api.${generalOptions.hostname}`;
  generalOptions.siteMyUrl = `https://my.${generalOptions.hostname}`;
}


export default generalOptions;
