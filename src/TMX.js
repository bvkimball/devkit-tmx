import .TMXLayer as TMXLayer;
import .TMXCollisionLayer as TMXCollisionLayer;
import ui.View;

var MAX_ZINDEX = 1000000;

exports = Class(ui.View, function (supr) {
  var layers = [];
  var defaults = {};

  /**
   * Inititalizes the TMXView. There are currently no
   * configurable options other than the default ui.View options.
   * @method init
   */
  this.init = function(opts) {
    this._opts = opts = merge(opts, defaults);
    this._x = 0;
    this._y = 0;
    supr(this, 'init', arguments);

    //Begin Parsing Map Object
    var map = opts.map;
    map.layers.forEach(function(layer, l){
      switch(layer.type){
      case 'imagelayer':
        //do nothing
        break;
      case 'objectgroup':
          if(layer.name == 'Player Entity'){
            layer.objects.forEach(function(player, p){
              this.spawnX = player.x+10;
              this.spawnY = player.y;
            }.bind(this));
          } else{
            //do nothing
          }
          break;
      case 'tilelayer':
        //layer.distance = l;
        this.addLayer(layer);
        break;
      }
    }.bind(this));
  };

  /**
   * Draws a region of the map. TODO: Make this a rectangle
   * @method draw
   * @param {View} view
   * @param {start} X coordinate to start from
   * @param {View} X coordinate to add tiles to
   */
  this.draw = function(start, width) {
    for( var l in layers){
      var col_start = Math.floor(start /  64) || 0;
      var col_end = Math.ceil((start + width) / 64);
      console.log('Draw', col_start, col_end);
      layers[l].draw(col_start, col_end, l);
    }
  }

  /**
   * Adds the given view to the back of the ParallaxView.
   * You can add multiple background views, which will each be
   * resized to fit the ParallaxView. These views will not
   * scroll; this is typically used for a sky.
   * @method addBackgroundView
   * @param {View} view
   */
  this.addBackgroundView = function (view) {
    view.style.width = this.style.width;
    view.style.height = this.style.height;
    this.addSubview(view);
  }

  /**
   * Adds a new parallax layer to the view, with the given distance,
   * populated dynamically by the given `populate` function.
   * For advanced uses, you can subclass the ParallaxView.Layer class
   * and pass in an instance of that instead. This returns the created layer.
   * @method addLayer
   * @param {Object|ParallaxView.Layer} layer
   * @param {Number} layer.distance
   * @param {function(layer, x)} layer.populate
   * @return {ParallaxView.Layer} the layer
   */
  this.addLayer = function (layer) {
    if (layer._distance < 1) {
      throw new Exception("Layer distance must be >= 1.");
    }

    if (!(layer instanceof TMXLayer)) {
      if(layer.name == 'Collision'){
        layer = new TMXCollisionLayer(layer);
      }else if(layer.name == 'Foreground'){
        layer = new TMXLayer(layer);
        this.foreground = layer;
      }else{
        layer = new TMXLayer(layer);
      }
    }



    layer._tmxView = this;
    this.addSubview(layer);
    layers.push(layer);
    layer.style.height = this.style.height;
    layer.style.zIndex = MAX_ZINDEX - layer._distance;
    layer.scrollTo(this._x / layer._distance, this._y / layer._distance);
    return layer;
  }

  /**
   * Removes all subviews from all layers and repopulates them.
   * @method clear
   */
  this.clear = function () {
    for (var i = 0; i < layers.length; i++) {
      layers[i].clear();
    }
  }

  /**
   * Scrolls all layers proportionally by the given amount.
   * @method scrollBy
   * @param x
   * @param y
   */
  this.scrollBy = function (x, y, relativeToDistance) {
    if (x == null) { x = 0; }
    if (y == null) { y = 0; }
    relativeToDistance = relativeToDistance || 1;
    x *= relativeToDistance;
    y *= relativeToDistance;

    this.scrollTo(x != null ? this._x + x : null,
            y != null ? this._y + y : null);
  }

  /**
   * Scrolls all layers proportionally to the given position.
   * @method scrollTo
   * @param x
   * @param y
   */
  this.scrollTo = function (x, y, relativeToDistance) {
    if (x == null) { x = 0; }
    if (y == null) { y = 0; }
    relativeToDistance = relativeToDistance || 1;
    x *= relativeToDistance;
    y *= relativeToDistance;

    this._x = x;
    this._y = y;
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      layer._scrollTo(x / (layer._distance || 1), y / (layer._distance || 1));
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
