var render_section = function(section) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(section);
  afterRender();
};

function afterRender() {
  var submits         = document.querySelectorAll('form button[type="submit"]');
  var input_for_lists = document.querySelectorAll('form input[list]');

  submits.forEach( function(submit) {
    submit.form.addEventListener('submit', function(){
      submit.textContent = 'Aguarde...';
      submit.setAttribute('disabled', true);
    });
  });

  input_for_lists.forEach( function(input) {
    input.addEventListener('blur', function(){
      var list     = input.getAttribute('list');
      var options  = document.querySelectorAll('#' + list + ' option');
      var is_valid = false;

      options.forEach(function(option){
        if(option.textContent === input.value){
          is_valid = true;
        }
      });

      if(is_valid)
        input.setCustomValidity('');
      else
        input.setCustomValidity('Insira um nome válido');
    });

    input.addEventListener("keypress", function() {
      input.setCustomValidity('');
    });
  });
};

var get_template = function(action) {
  var template = document.querySelector('#' + action + '_template');

  return template.content.cloneNode(true);
};

var load_data = function(url, callback) {
  var api = new Api();

  api.get("http://fipeapi.appspot.com/api/1/carros/" + url + '.json');

  if(callback)
    api.ok = callback;
};

function create_option(brand) {
  var option = document.createElement('option');
  option.innerText = brand.name;

  return option;
};

function create_option_with_id(brand) {
  var option = document.createElement('option');
  option.value = brand.id;
  option.innerText = brand.name;

  return option;
};