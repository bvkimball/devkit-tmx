import device;
import animate;

import ui.View;
import ui.SpriteView;
import src.platformer.Physics as Physics;
import .TMXTileset as TMXTileset;

exports = Class([ui.View, Physics], function(supr) {
  this.init = function(opts) {
    opts = merge(opts||{}, {
        group: "ground",
        width: 64,
        height: 64
    });
    supr(this, 'init', [opts]);
    //Physics.prototype.init.apply(this, [opts]);
    var sprite = this.sprite = new TMXTileset({
      superview: this,
      image: 'resources/a4_tileset.png',
        tileSize: 64,
        columns: 9,
        rows: 7,
        gap: 1,
        index: opts.index,
        x: 0,
        y: 0,
    });

  };
});
