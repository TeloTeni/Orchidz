// all staff wil be here
var fs = require ('fs');
// title of product in DB
var titleProduct;
// abrv. of title from JSON file
var shortTitle;
var reg;
// change file's name
var productData = JSON.parse(fs.readFileSync('./public/vendors/roellke/roellke7.json', 'utf8'));
// var titleData = [
//   {"short": "Lc.", "full": "Laeliocattleya"},
//   {"short": "Paph.", "full": "Paphiopedilum"}
// ];
// var productData = [
//   {
//   "title": "Paph. (Via Exacta x Via Alegro) Pure Green x hirsutissimum",
//   "price": "14.95",
//   "url": "http://www.shop.schwerter-orchideenzucht.de/product_info.php?cPath=38&products_id=5374&osCsid=ngjt1pjd9jlsg8frhr7pg9sl31",
//   "image": "http://www.shop.schwerter-orchideenzucht.de/images/thumbnails/125/100/eeeeee/pa/1%20kein%20foto.jpg"
// },
// {
//   "title": "Paph. adductum x glanduliferum",
//   "price": "12.95",
//   "url": "http://www.shop.schwerter-orchideenzucht.de/product_info.php?cPath=38&products_id=4083&osCsid=ngjt1pjd9jlsg8frhr7pg9sl31",
//   "image": "http://www.shop.schwerter-orchideenzucht.de/images/thumbnails/125/100/eeeeee/pa/1%20kein%20foto.jpg"
// },
// {
//   "title": "Paph. Angel Hair (St. Swithin x sanderianum)",
//   "price": "12.95",
//   "url": "http://www.shop.schwerter-orchideenzucht.de/product_info.php?cPath=38&products_id=4686&osCsid=ngjt1pjd9jlsg8frhr7pg9sl31",
//   "image": "http://www.shop.schwerter-orchideenzucht.de/images/thumbnails/125/100/eeeeee/pa/paphiopedilum%20angel%20hair.jpg"
// },];
var titleData = [
  {"short": "Lc.", "full": "Laeliocattleya"},
  ];

for (var i = 0; i < titleData.length; i++){
  shortTitle = titleData[i].short;
  reg = new RegExp(shortTitle, 'i');
  fullTitle = titleData[i].full;

  for(var z = 0; z < productData.length; z++){
    titleProduct = productData[z].title;
console.log(titleProduct);
var rez = titleProduct.search(shortTitle);
// console.log(fullTitle);
// console.log(shortTitle);
console.log(rez == 0);
    if(rez == 0){
      productData[z].title = titleProduct.replace(reg, fullTitle);

        //console.log(productData[z]);
    };

  };
//  var productNew = JSON.stringify(productData);
  fs.writeFile('./public/vendors/roellkeTEST.json', JSON.stringify(productData), 'utf8', function (err) {
if (err) {
    return console.log(err);
}
console.log("The file was saved!");
});
console.log("DONE");
};
