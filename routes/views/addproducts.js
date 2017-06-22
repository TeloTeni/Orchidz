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
var qtyNewProducts = 0;
//console.log(jsonNewProducts);
var Product = keystone.list('Product');
console.log(jsonNewProducts[0]);
//Product.insertMany(jsonNewProducts).then()
 for (var item in jsonNewProducts){
  addProducts = new Product.model(item);
  addProducts.create().catch(function(err){
     console.log(err.message);
   });
   qtyNewProducts =+1;
 };
console.log(" Add " + qtyNewProducts + " new products");

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
