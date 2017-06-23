//draft
var keystone = require('keystone');
var fs = require('fs');

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);

var locals = res.locals;
// locals.section is for nav menu
locals.section = 'addproducts';

var jsonNewProducts = JSON.parse(fs.readFileSync('./test_doc/products.json', 'utf8'));
var addProduct ;// ??
var i = 0;
//console.log(jsonNewProducts);
var Product = keystone.list('Product');
console.log('loop');

 for (var item in jsonNewProducts){
 addProducts = new Product.model(jsonNewProducts[item]); //was new Product.model(item)
 qtyNewProducts =+1;
 addProducts.save().catch(function(err){
    console.log(err.message);
  });
  };

console.log(" Add " + i + " new products");

view.render('addproducts');
};
//? add body.parser?
// copy file methods or upload


//var jsonArray = JSON.parse(fs.readFileSync('addproducts.json','utf8' ));
//for (var jsonItem in jsonArray){
//  new Product(jsonArray[jsonItem]) /or new Product.model()
//      .save
//      .catch(function(err){
//      })
//}
