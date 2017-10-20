var keystone = require('keystone');
var fs = require('fs');
var Xray = require('x-ray');
var Horseman = require('node-horseman');


var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
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
var links = ['https://www.orchideengarten.de/shop/angraecum/', 'https://www.orchideengarten.de/shop/dendrobium/'];
var values = [];

view.on('init', function(next){
console.log('start');


links.forEach(function(link, i){
x(link,'.cc-m-width-maxed ',[{
url: 'a@href'
}])(function(err, obj){
var obj1 = obj;
console.log(obj1);

    obj1.forEach(function(values, item){
      (item.key) && values.push(item.value);
console.log(item.key)
    });

    return values;



});
console.log(values);


// x(link, '.cc-m-width-maxed ',[{
// title: x('a@ref', '.cc-shop-product-desc .fn'),
// url: 'a@href',
// price: x('a@ref', 'body')
// }])
// //.paginate('.panel-pagination strong + a@href')
// .write('./public/vendors/karge' + i + '.json')
// });


//concat JSON files



});

next();

});
console.log('finish');
view.render('vendors/karge');//??
};
