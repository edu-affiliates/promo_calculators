# How to use it? 

## Sass way
1. Add script  
```bash 
<script src='https://s3.amazonaws.com/genericapps/resources/calculators/bundle36.js'></script>
```

2. Setup global variable eduOptions - 
```bash 
        <script>
          window.eduOptions = {
          'hostname': 'hostname.com',
          'website_id': 442,
          'service_ids': '2185, 2186, 2184, 2183',
          'apiMode': 'M',
          'dsc': 'ESSAYFIRST15',
          'dev_mode': false
          }
         </script>
 ```
      
hostname: string - to set site api url for api calls;
website_id: number - id generated in [ACP](https://acpanel.edu-affiliates.com/client-sites/);
service_ids: string - to load custom services take the ids from [ACP](https://acpanel.edu- affiliates.com/client-sites/)
apiMode: string - to determine availability own my.hostname.com
dsc: string - one-time discount coupon
dev_mode: boolean - to choose devapi or api
    
3. Choose and add needed folders with [SASS styles](https://github.com/edu-affiliates/promo_calculators/tree/master/src/styles)
    
4. Add container and options for choosen component 
    
        <div class="table-price"></div>
        <div class="calc-sm" data-title="" data-title-discount=""></div>
        <div class="calc-sm" data-type="horizontal" data-title="" data-title-discount=""></div>
        <div class="calc-lg" data-title="" data-title-discount=""></div>
        
        <div class="user-name"></div>
        <div class="calc-fast"></div>
        
        <div class="inquiry" data-name="" data-class=""></div>
        <div class="order" data-name="" data-class=""></div>

    
5. Posible options: 
        - data-type="" accept value 'horizontal' to transform small calc to horizontal presentation;
        - data-title="" accept any string that will show if there is no discount
        - data-title-discount="" accept any string with sign '%' to show available discount
        - data-name="" set button name
        - data-class="" set button class
        
6. Override default variables to customize presentaion(do not forget to remove !default).
        
    
        
