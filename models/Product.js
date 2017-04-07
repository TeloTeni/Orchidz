var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product',{
  map: {name: 'title'},
  singular: 'Product',
  plural: 'Products',
  autokey:{path: 'slug', from: 'title', unique: true}

});

Product.add({
  title: {type: String, require: true},
  image: {type: Types.CloudinaryImage},
//  synonyms: {type: String},
//  comName: {type: String},
//  temperature: {type: Number },
// light: {type: Types.Select, options: 'full shade, partial shade, bright light, full sun', default: 'partial shade'},
// flowerSize: {type: Number},
//  fragrance: {type: Types.Select, options: 'yes, no', default: 'no'},
//  content: {type: Types.Html, wysiwyg: true, hight: 300},
  vendor: {type: String}, // ! have to change it to select option list late
  price: {type: Number},
  });

Product.register();
