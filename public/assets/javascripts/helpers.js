var render_section = function(section) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(section);
  afterRender();
};

function afterRender() {
  var submits = document.querySelectorAll('form button[type="submit"]');

  submits.forEach( function(submit) {
    submit.form.addEventListener('submit', function(){
      submit.textContent = 'Aguarde...';
      submit.setAttribute('disabled', true);
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
  option.value = brand.id;
  option.innerText = brand.name;

  return option;
};