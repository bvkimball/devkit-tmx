import .TMXLayer as TMXLayer;
import .TMXCollisionLayer as TMXCollisionLayer;

exports = Class(function() {
  var layers = [];

  this.init = function(map) {
    var self = this;
    map.layers.forEach(function(layer, l){
      switch(layer.type){
      case 'imagelayer':
        //do nothing
        break;
      case 'objectgroup':
          if(layer.name == 'Player Entity'){
            layer.objects.forEach(function(player, p){
              self.spawnX = player.x+10;
              self.spawnY = player.y;
            });
          } else{
            //do nothing
          }
          break;
      case 'tilelayer':
        if(layer.name == 'Foreground')
          layers.push(new TMXLayer(layer));
        else if(layer.name == 'Collision')
          layers.push(new TMXCollisionLayer(layer));
          break;
      }
    });
  };

  this.draw = function(view, start, width) {
    for( var l in layers){
      var col_start = Math.floor(start /  64) || 0;
      var col_end = Math.ceil((start + width) / 64);
      console.log('Draw', col_start, col_end);
      layers[l].draw(view, col_start, col_end);
    }
  }
});
/*
  "layers" : [Array]
 "orientation":"orthogonal",
 "properties":{
     "label":"an easy start",
     "levelid":"1"
    },
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/..\/Downloads\/Alex4-WE-master\/data\/level\/a4_tileset.png",
         "imageheight":480,
         "imagewidth":640,
         "margin":1,
         "name":"a4_tileset",
         "properties":
            {

            },
         "spacing":1,
         "tileheight":64,
         "tilewidth":64
        },
        {
         "firstgid":64,
         "image":"..\/..\/Downloads\/Alex4-WE-master\/data\/level\/metatiles64x64.png",
         "imageheight":64,
         "imagewidth":384,
         "margin":0,
         "name":"metatiles64x64",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":64,
         "tileproperties":
            {
             "0":
                {
                 "type":"solid"
                }
            },
         "tilewidth":64
        }],
 "tilewidth":64,
 "version":1,
 "width":73
 */
