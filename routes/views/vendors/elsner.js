var keystone = require('keystone');
var fs = require('fs');
var Xray = require('x-ray');
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
    },
    replace: function (value) {
        return typeof value === 'string' ? value.replace("EUR","").trim() : value
      },
    symbol: function (value, start , end) {
      return typeof value === 'string' ? value = value + " €" : value
  },
  }
});

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.elsner-orchideen.de/shop/index.php?cat=c9_Phalaenopsis-Hybrids-phalaenopsis-hybrids.html',
 'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c27_Phalaenopsis-species-Phalaenopsis-Species.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c12_Brassavola-Brassavola.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c13_Broughtonia-Broughtonia.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c11_Cattleya-hybrids-Cattleya-Hybriden.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c15_Cattleya-Species-Cattleya-species.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c22_Laelia-Laelia.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c29_Sophronitis-Sophronitis.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c25_Paphiopedilum-hybrids-Paphiopedilum-Hybriden.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c26_Paphiopedilum-Species-Paphiopedilum-species.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c28_Phragmipedium-Phragmipedium.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c17_Dendrobium-Dendrobium.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c3_Aerangis-Aerangis.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c4_Aeranthes-Aeranthes-english.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c5_Aerides-Aerides.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c6_Angraecum-Angraecum.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c20_Jumella-Jumella.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c1_other-species-other-species.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c14_Bulbophyllum-Bulbophyllum.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c30_Catasetum-Catasetum.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c16_Coelogyne-Coelogyne.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c31_Encyclia-Encyclia.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c35_Lycastinae-Lycaste.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c23_Masdevallia-Masdevallia.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c32_Maxillaria-Maxillaria.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c19_Oncidium-Oncidium.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c33_Stanhopea-Stanhopea.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c7_Vanda-Vanda.html',
'http://www.elsner-orchideen.de/shop/index.php?language=en&cat=c37_flasks-flasks-orchids.html'
];
var qfiles;
var vendor;

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.article-list-item',[{
title: 'h2 > a',
image: 'img@src',
url: 'h2 a@href| trim',
price: '.gm_price | replace | symbol',
//discription: '.article-list-item-main p'
description: '.article-list-item-main p | trim'
}])
.paginate('.panel-pagination strong + a@href')
.write('./public/vendors/elsner/elsner' + i + '.json')
});
console.log("psrsind is DONE");
next();
});

// view.on('post', function(next){
//   function getDir(path,callback){
//   fs.readdir(path, function(err, content){
//     callback(null, content)
//     });
//   };
// vendor = req.body.vendor;
// var vendorLow = vendor.toLowerCase();
//   getDir('./public/vendors/elsner', function(err, content){
//     qfiles = content;
//     console.log('in getDir ' + qfiles.length);
//     var dataAll = [];
//     var data;
//     for (item in qfiles){
//     var dir = './public/vendors/elsner/' + qfiles[item];
//     console.log(dir);
//       data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//       dataAll = dataAll.concat(data);
//     };



    // //TODO take vendor from list
    // for(var i=0; i < dataAll.length; i++){
    //   //Vendor name bigleter
    //   dataAll[i].vendor = vendor;
    // };
    // console.log( i + " products changed");
    //     fs.writeFile('./public/vendors/elsnerAll.json', JSON.stringify(dataAll));
    //   });
    //   console.log('so...' + qfiles);
    //   next();
    // });

console.log('finish');
view.render('vendors/elsner');//??
};
