function ReactValue(element) {
  this.element = element || ""; //TODO delegate element
}

ReactValue.prototype.set = function(value){
  if(this.value !== value) {
    this.value = value;

    if(this.element.constructor === Array) {
      this.element.forEach( function(element) {
        fillElement(element, value);
      });
    } else {
      fillElement(this.element, value);
    }

    function fillElement(element, value) {
      if(value.constructor === String) {
        if(/<[a-z][\s\S]*>/i.test(value))
          element.innerHTML = value;
        else
          element.innerText = value;
      } else {
        element.appendChild(value);
      }
    }
  }
};

ReactValue.prototype.get = function(){
  return this.value;
};

ReactValue.prototype.element = function(){
  return this.element;
};