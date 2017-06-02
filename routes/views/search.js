var keystone = require('keystone');

exports = module.exports = function(req, res){

  var view = new keystone.View(req, res);

  locals = res.locals;
//Set locals
locals.filters = {
  keywords: req.query.keywords
};
locals.data = {
  products: [],
  keywords: "",
};

//Load the current products
view.on('init', function(next){
  console.log('search keywords = ' + locals.filters.keywords);
  locals.data.keywords = locals.filters.keywords;

  //search... trying without index
  keystone.list('Product').model.find(
    {title : {$regex : locals.filters.keywords, $options : 'i'} },
    {score : {$meta : "textScore"} }
  ).sort({score : {$meta : 'textScore'}}).
    limit(5).
    exec(function(error, results){
      if(error) console.log(error);
      // need any punctuation? ))
      locals.data.products = results
      next();
    });

});
//render view
view.render('search');
};
