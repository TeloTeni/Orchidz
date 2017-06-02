var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product',{
  map: {name: 'title'},
  singular: 'Product',
  plural: 'Products',
//  autokey:{path: 'slug', from: 'title', unique: true}

});

Product.add({
  title: {type: String, require: true},
  // need change on local files
  //image: {type: Types.CloudinaryImage},
  size: {type: String},
  vendor: {type: String}, // ! have to change it to select option list late
  price: {type: Number},//?
  //discription: {type: String},
  url: {type: Types.Url},
//  update:{type: Date, }
  });

Product.register();
