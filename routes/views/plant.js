var keystone = require('keystone');
var fs = require('fs');
var bodyParser = require('body-parser');



exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var vendor, vendorLow, country;

view.on('post', function(next){
  vendor = req.body.vendor;
  country = req.body.country;
  console.log(vendor);
  vendorLow = vendor.toLowerCase();

var short, full, product, productVar, index, url;
var changed = 0;
var del = 0;
var enter = 1;
var regs = new RegExp(/\w+\.\s/, "i"); // !! \s dont change no-space cases !!
var namesArr = JSON.parse(fs.readFileSync('./public/genus.json', 'utf8'));
var plantsArr = JSON.parse(fs.readFileSync('./public/vendorsFull/' + vendorLow + 'All.json', 'utf8'));
console.log('Parsed: ' + plantsArr.length)
// // temp section
// var namesArr = JSON.parse(fs.readFileSync('./public/vendors/codebeautify.json', 'utf8'));
// for(item in namesArr){
//   short = namesArr[item].short;
//   full = namesArr[item].full;
//   short = short + ". ";
//   full = full + " ";
//   namesArr[item].short = short;
//   namesArr[item].full = full;
//   };
// fs.writeFile('./public/genus.json', JSON.stringify(namesArr, null, 2));
// next();
// });
// //end temp section

for(var plant = 0; plant < plantsArr.length; plant++){
  product = plantsArr[plant].title;
  url = plantsArr[plant].url;
  plantsArr[plant].vendor = vendor;
  plantsArr[plant].country = country;
  //console.log(regs);

  // if(typeof url != 'undefined'){
  //   if (typeof product != 'undefined'){
    if(plantsArr[plant].url){
      if (plantsArr[plant].title){
        productVar = product.match(regs);
        index = product.search(regs);
          if(index === 0){
              for(var name = 0; name < namesArr.length; name++){
                short = namesArr[name].short;
                full = namesArr[name].full;
                var pVar = productVar[0];
                //  console.log(pVar);
                    if(!pVar.search(short)){
                        console.log(product.replace(regs, full));
                        plantsArr[plant].title = product.replace(regs, full);
                        changed = changed + 1;
                      };
                  };
              };
         };
       }else{
    plantsArr.splice(plant, 1);
    del = del + 1;
  };
};
console.log("all items: " + plant);
console.log("items deleted: " + del);
console.log("items changed: " + changed);
fs.writeFile('./public/vendorsFull/' + vendorLow + 'AllFull.json', JSON.stringify(plantsArr, null, 2));
next();
});

view.render('plant');

};
