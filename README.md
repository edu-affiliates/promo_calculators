## How to use it? (easy way)

1. Download package as .zip (File name should be _promo_calculators-master.zip_) file or clone repository.  
2. Copy file bundle.js (_promo_calculators-master.zip/docs/bundle.js_) to your website directory.
3. Copy file main.css (_promo_calculators-master.zip/docs/styles/main.css_) to your website directory.
4. Add spacial tags to your html markup:
   * Main calculator: __```<div class="calc-lg" data-title="" data-title-discount=""></div>```__
   * Small calculator: __```<div class="calc-sm" data-title="" data-title-discount=""></div>```__
   * Horizontal small calculator: __```<div class="calc-sm" data-type="horizontal" data-title="" data-title-discount=""></div>```__
   * Order form with list of services: __```<div class="calc-fast"></div>```__
   * Table with prices for special services: __```<div class="table-price"></div>```__
   * Button inquiry: __```<div class="inquiry" data-name="inquiry" data-class=""></div>```__
   * Button order: __```<div class="order" data-name="order" data-class=""></div>```__
   * Button dashboard: __```<div class="dashboard" data-name="dashboard" data-class=""></div>```__
        
5. Set script tag with calculators options and Plugin this bundle script above the ```</body>```:

### if your site (YOURSITE.COM) **doesn't** have own WHITE LABEL APPLICATION on the MY.YOURSITE.COM subdomain.

```
        <script type="type/script">
            var eduOptions =  {
                'rid': YOUR_REFFERAL_ID, // without this parameter, you won't get data from api for calculator
            }
        </script>
        <script type="type/script" src="path/to/bundle.js"></script>
```


### if your site (YOURSITE.COM)  **HAVE** own WHITE LABEL APPLICATION on the MY.YOURSITE.COM subdomain


```
    <script>
        var eduOptions =  {
            'hostname': 'yoursite.com',
            'website_id': YOUR_SITE_ID,
            'service_ids': '1234, 1235, 1236, 1237', //IDs of the four default parameters (you could find it at the control-admin panel)
            'apiMode': 'M', 
        }
    </script>
    <script type="type/script" src="path/to/bundle.js"></script>
```


### Where can I find values of parameters?

You may find all parameters in your personal account on our affiliate program. In order to start work, a personal account shall be needed. If you have any questions, not covered in this manual you may always ask our support team, they are always here to help you [support@edu-affiliates.com](mailto:support@edu-affiliates.com)

### Parameter explanation

- **rid** - is your main identifier in the partnership program. You may find it in your profile or in any affiliate link.