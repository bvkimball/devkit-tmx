import ui.resource.Image as Image;
import ui.ImageView as ImageView;

exports = Class(ImageView, function(supr) {
  this.init = function(opts) {
    opts.width = opts.tileSize;
    opts.height = opts.tileSize;
    opts.image = new Image({url: opts.image});
    supr(this, "init", [opts]);
    var map = this.getImage().getMap();
    this._offsetX = map.x;
    this._offsetY = map.y;
    this._sizeX = opts.tileSize | 0;
    this._sizeY = opts.tileSize | 0;
    this._tileSize = opts.tileSize;
    this._gap = opts.gap | 0;
    this._columns = opts.columns;
    this._rows = opts.rows;

    this.setIndex(opts.index | 0)
  };

  this.setIndex = function(index) {
      this._index = index;
      var map = this.getImage().getMap();
      map.width = this._sizeX;
      map.height = this._sizeY;
      var column = this._index % this._columns;
      var row = Math.floor(this._index / this._columns);
      map.x = this._offsetX + (column * this._sizeX) + (this._gap * (column+1));
      map.y = this._offsetY + (row * this._sizeY) + (this._gap * (row+1));
  };
});
