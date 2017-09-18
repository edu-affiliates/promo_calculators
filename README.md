# How to use it? 

## Sass way

    1. Add script  <script src='https://s3.amazonaws.com/genericapps/resources/calculators/main.js'></script>
    
    2. Add folders with SASS styles https://github.com/edu-affiliates/promo_calculators/tree/master/src/styles
    
    3. Add container and options for choosen calculators 
    
        <div class="table-price"></div>
        <div class="calc-sm" data-title="" data-title-discount=""></div>
        <div class="calc-sm" data-type="horizontal" data-title="" data-title-discount=""></div>
        <div class="calc-lg" data-title="" data-title-discount=""></div>
    
    3. Posible options: 
        - data-type="" accept value 'horizontal' to transform small calc to horizontal presentation;
        - data-title="" accept any string that will show if there is no discount
        - data-title-discount="" accept any string with sign '%' to show available discount
        
    4. Override default variables to customize presentaion.
        
    
        
