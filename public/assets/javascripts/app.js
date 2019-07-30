(function(global, doc) {

  var volanty   = global.volanty = global.volanty || {};

  volanty.container = document.querySelector("#container")

  var app_start = function() {
    load_data('marcas', function(data){
      volanty.brands = data;

      render_brands_selector();
    });
  };

  var render_chosen_car = function() {
    var sectionToShow = get_template('chosen_car');

    var name      = sectionToShow.querySelector("#car_name");
    var fuel      = sectionToShow.querySelector("#car_fuel");
    var year      = sectionToShow.querySelector("#car_year");
    var price     = sectionToShow.querySelector("#car_price");
    var reference = sectionToShow.querySelector("#car_reference");

    name.textContent      = volanty.chosen_car.name;
    fuel.textContent      = volanty.chosen_car.combustivel;
    year.textContent      = volanty.chosen_car.ano_modelo;
    price.textContent     = volanty.chosen_car.preco;
    reference.textContent = volanty.chosen_car.referencia;

    render_section(sectionToShow);
  };

  var render_years_selector = function() {
    var sectionToShow = get_template('year');

    var year_selector = sectionToShow.querySelector('#year_selector');
    var year_form     = sectionToShow.querySelector('#year_form');

    volanty.years.map(function(year){
      year_selector.appendChild(create_option(year));
    });

    year_form.addEventListener('submit', function(e) {
      e.preventDefault();

      volanty.selected_year = volanty.years.filter( function(year){
        return (year.id == year_selector.value);
      })[0];

      load_data('veiculo/' + volanty.selected_brand.id + '/' + volanty.selected_model.id + '/' + volanty.selected_year.id, function(data) {
        volanty.chosen_car = data;

        render_chosen_car();
      });

      return false;
    });

    render_section(sectionToShow);
  };

  var render_models_selector = function() {
    var sectionToShow = get_template('model');

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

      load_data('veiculo/' + volanty.selected_brand.id + '/' + volanty.selected_model.id, function(data) {
        volanty.years = data;

        render_years_selector();
      });

      return false;
    });

    render_section(sectionToShow);
  };

  var render_brands_selector = function() {
    var sectionToShow = get_template('brand');

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

      load_data('veiculos/' + volanty.selected_brand.id, function(data) {
        volanty.models = data;

        render_models_selector();
      });

      return false;
    });

    render_section(sectionToShow);
  };

  /* START APP WHEN DOM IS READY */
  doc.addEventListener("DOMContentLoaded", app_start);

}(window, document));