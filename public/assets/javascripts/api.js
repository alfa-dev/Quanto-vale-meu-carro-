function Api(options) {

  var options = options || {};
  var init = {};

  init['headers']     = options.headers     || { 'Accept': 'application/json', 'Content-Type': 'application/json' };
  init['credentials'] = options.credentials || "same-origin";

  this.init = init;

  this.fields = options.fields || null;
}

Api.prototype.get = function(url) {
  this.url = url;
  this.fetch();
}

Api.prototype.fetch = function() {
  var self = this;

  if( self.fields )
    self.init.body = JSON.stringify( self.fields );

  fetch(this.url, self.init)
    .then(function(data){
      if (data.statusText == "Unauthorized") self.unauthorized();
      if (data.statusText == "Not Found")    self.notFound();
      if (data.statusText == "OK") {
        return data.json();
      }
    }).then(function(res){
      self.ok(res);
    }).catch(function(e){
      throw e;
    });
}