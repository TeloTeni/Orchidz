var keystone = require('keystone');
var fs = require('fs');
var Xray = require('x-ray');
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.replace("€", "").trim() : value
    },
    reverse: function (value) {
      return typeof value === 'string' ? value.split('').reverse().join('') : value
    },
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
});

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var link = ['http://www.orchideen-wichmann.de/pflanzen.html'];

view.on('init', function(next){
console.log('start');

for (var i = 134; 1 < i; i--){
link = 'http://www.orchideen-wichmann.de/pflanzen.html?p=' + i
x(link, '.item',[{
title: '.product-name',
url: 'h2 > a@href | trim',
price: '.price-box | trim',
image: 'img@src'
}])
//.paginate('body > div.wrapper > div > div.page > div.main-container.col3-layout > div > div.col-main > div.category-products > div.toolbar > div > div.pages > ol > li a@href')
.write('./public/vendors/wichmann/wichmann' + i + '.json')
};
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/wichmann');//??
};
