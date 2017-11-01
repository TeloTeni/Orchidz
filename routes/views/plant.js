var keystone = require('keystone');




exports = module.exports = function(req, res){
var view = new keystone.View(req, res);

var namesArr = [{short: "C.", full: "Cattleya "}, {short: "Phal.", full: "Phalaenopsis "}];
var plantsArr = [{title: "Phal. Tetrasambo x lindenii"},
{title: "Phalaenopsis Lioulin Moon '1533' FCC-AOS"},
{title: "C. Blue Velvet 'Surprise' SM/JOGA "},
{title: "C. forbesii x C. Robert Strait "}];

var short, full, product, productVar, index;
var regs = new RegExp(/\w+\.\s/, "i");


for(plant in plantsArr){
  product = plantsArr[plant].title;
  productVar = product.match(regs);
  index = product.search(regs);

  //console.log(productVar);
    if(index === 0){
        console.log(index);
      for(var name = 0; name < namesArr.length; name++){
            short = namesArr[name].short;
            full = namesArr[name].full;
            var pVar = productVar[0];
              console.log(short + " = " + pVar);
            //  console.log(pVar);
        if(!pVar.search(short)){
          //console.log("yes")
          console.log(product.replace(regs, full));
        };

      };

  };


};


view.render('plant');

};
