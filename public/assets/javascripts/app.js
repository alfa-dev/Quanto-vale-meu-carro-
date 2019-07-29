(function(global, doc) {

  var volanty = global.volanty = global.volanty || {};

  var app_start = function() {
    load_data('/carro_marcas.json', function(data){
      volanty.brands = data;

      render_brands_selector();
    });
  };

  var render_price = function() {
    var template = doc.querySelector('#price_template');
    var sectionToShow  = template.content.cloneNode(true);

    var price = sectionToShow.querySelector('#price');

    price.innerHTML = JSON.stringify(volanty.price);

    doc.body.appendChild(sectionToShow);
  }

  var render_years_selector = function() {
    var template       = doc.querySelector('#year_template');
    var sectionToShow  = template.content.cloneNode(true);

    var year_selector = sectionToShow.querySelector('#year_selector');
    var year_form     = sectionToShow.querySelector('#year_form');

    volanty.years.map(function(year){
      year_selector.appendChild(create_option(year));
    });

    year_form.addEventListener('submit', function(e) {
      e.preventDefault();

      volanty.selected_year = volanty.years.filter( function(year){
        return (year.id == model_selector.value);
      })[0];

      load_data('/21_4828_2013-1.json', function(data) {
        volanty.price = data;

        render_price();
      });

      return false;
    });

    doc.body.appendChild(sectionToShow);
  }

  var render_models_selector = function() {
    var template       = doc.querySelector('#model_template');
    var sectionToShow  = template.content.cloneNode(true);

    var model_selector = sectionToShow.querySelector('#model_selector');
    var model_form     = sectionToShow.querySelector('#model_form');

    volanty.models.map(function(model){
      model_selector.appendChild(create_option(model));
    });

    model_form.addEventListener('submit', function(e) {
      e.preventDefault();

      volanty.selected_model = volanty.models.filter( function(model){
        return (model.id == model_selector.value);
      })[0];

      load_data('/veiculos_ano_4828.json', function(data) {
        volanty.years = data;

        render_years_selector();
      });

      return false;
    });

    doc.body.appendChild(sectionToShow);
  }

  var render_brands_selector = function() {
    var template       = doc.querySelector('#brand_template');
    var sectionToShow  = template.content.cloneNode(true);

    var brand_selector = sectionToShow.querySelector('#brand_selector');
    var brand_form     = sectionToShow.querySelector('#brand_form');

    volanty.brands.map(function(brand){
      brand_selector.appendChild(create_option(brand));
    });

    brand_form.addEventListener('submit', function(e) {
      e.preventDefault();

      volanty.selected_brand = volanty.brands.filter( function(brand){
        return (brand.id == brand_selector.value);
      })[0];

      load_data('/veiculos_21.json', function(data) {
        volanty.models = data;

        render_models_selector();
      });

      return false;
    });

    doc.body.appendChild(sectionToShow);
  };

  var load_data = function(url, callback) {
    var api = new Api();

    api.get(url);

    if(callback)
      api.ok = callback;
  };

  function create_option(brand) {
    var option = doc.createElement('option');
    option.value = brand.id;
    option.innerText = brand.name;

    return option;
  }

  doc.addEventListener("DOMContentLoaded", app_start);

}(window, document));