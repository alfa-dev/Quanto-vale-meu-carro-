(function(global, doc) {

  var volanty = global.volanty = global.volanty || {};
  var app_start = function() {
    load_car_brands();
  }

  var load_car_brands = function() {
    var api = new Api();

    api.fetch('/carro_marcas.json');
    api.ok = function(data){
      volanty.car_brands = data;
    }
  }

  doc.addEventListener("DOMContentLoaded", app_start);

}(window, document));