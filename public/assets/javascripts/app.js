(function(global, doc) {

  var volanty = global.volanty = global.volanty || {};

  var app_start = function() {
    load_car_brands(render_brands_selector);
  };

  var load_car_brands = function(callback) {
    var api = new Api();

    api.fetch('/carro_marcas.json');

    api.ok = function(data) {
      volanty.car_brands = data;

      if(callback)
        callback();
    }
  };

  var render_brands_selector = function() {
    var template       = document.querySelector('#car_brand_selector');
    var sectionToShow  = template.content.cloneNode(true);

    var brand_selector = sectionToShow.querySelector('#brand_selector');

    volanty.car_brands.map(function(brand){
      brand_selector.appendChild(create_option(brand));
    });

    doc.body.appendChild(sectionToShow);

    function create_option(brand) {
      var option = document.createElement('option');
      option.value = brand.id;
      option.innerText = brand.name;

      return option;
    }
  };

  doc.addEventListener("DOMContentLoaded", app_start);

}(window, document));