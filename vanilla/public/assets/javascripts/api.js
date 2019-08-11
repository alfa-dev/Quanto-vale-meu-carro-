function Api(url) {
  this.url = url || null;
}

Api.prototype.get = function(url) {
  this.url = url;
  this.XMLHttpRequest();
}

Api.prototype.XMLHttpRequest = function() {
  var self = this;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.url, true);

  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState == 2) {
      if (this.statusText == "Unauthorized") self.unauthorized();
      if (this.statusText == "Not Found") self.notFound();
    }
  };

  xhr.onload  = function() {
    try {
      self.ok(JSON.parse(this.response));
    } catch(e) {
      throw e;
    }
  }
  xhr.onerror = function(data) { self.error(data); }
}