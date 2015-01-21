import .TMXTile as TMXTile;
import ui.ImageView;
import ui.View;
import ui.ViewPool;
import animate;

/*
{
   "data":[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 14, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 6, 0, 28, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 14, 0, 23, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 28, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 23, 0, 5, 0, 23, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 40, 0, 46, 47, 0, 0, 51, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 28, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 5, 0, 14, 0, 5, 0, 14, 0, 0, 0, 0, 37, 38, 0, 39, 40, 0, 0, 0, 48, 49, 0, 55, 0, 0, 51, 60, 61, 62, 53, 0, 0, 0, 0, 0, 19, 21, 0, 19, 29, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 53, 0, 0, 0, 3, 4, 0, 0, 0, 0, 3, 4, 52, 52, 53, 0, 0, 23, 0, 14, 0, 23, 0, 14, 0, 23, 0, 0, 0, 0, 46, 47, 0, 48, 49, 0, 0, 0, 0, 58, 0, 55, 0, 51, 60, 61, 61, 61, 62, 53, 0, 0, 0, 19, 29, 30, 52, 28, 29, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 62, 51, 52, 53, 12, 13, 53, 0, 0, 51, 12, 13, 61, 61, 62, 0, 0, 0, 0, 23, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 55, 0, 0, 0, 58, 0, 0, 0, 0, 58, 0, 55, 0, 60, 61, 61, 61, 61, 61, 62, 0, 51, 19, 29, 29, 30, 61, 28, 29, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 21, 0, 19, 11, 21, 0, 19, 11, 21, 0, 19, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 29, 29, 29, 30, 61, 28, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   "height":8,
   "name":"Foreground",
   "opacity":1,
   "type":"tilelayer",
   "visible":true,
   "width":73,
   "x":0,
   "y":0
  },
*/

exports = Class(ui.View, function(supr) {
    var defaults = {
        distance: 1
    };

    /**
     * Initialized the view with the given distance.
     * @param {Number} opts.distance
     */
    this.init = function(opts) {
        this._columns = opts.width;
        this._rows = opts.height;

        this._tiles = new Array(this._rows);
        for (var r = 0; r < this._rows; r++) {
            this._tiles[r] = new Array(this._columns);
        }
        for (var t in opts.data) {
            var column = t % opts.width;
            var row = Math.floor(t / opts.width);
            var type = opts.data[t];
            console.log('Creating tile ', type, ' at ', column, row);
            this._tiles[row][column] = type;
        };

        delete opts.width;
        delete opts.height;
        this._opts = opts = merge(opts, defaults);
        supr(this, 'init', arguments);
        this._distance = opts.distance || 1;
        this._pools = {};
        this._populatedX = -this.style.x;
        this.setHandleEvents(false, false);

    }

    this.draw = function(start, width) {
        for (var r = 0; r < this._rows; r++) {
            for (var c = start; c < width; c++) {
                if (this._tiles[r] && this._tiles[r][c]) {
                    var type = this._tiles[r][c];
                    new TMXTile({
                        superview: this,
                        index: type - 1,
                        x: c * 64,
                        y: r * 64
                    });
                }
            }
        }

        return 256;
    }


    //****************************************************************
    // Public API

    /**
     * Scrolls the view to the given offset, scrolling the other
     * layers proportionally.
     * @method scrollTo
     * @param {Number} x
     * @param {Number} y
     */
    this.scrollTo = function(x, y) {
        this._tmxView.scrollTo(x, y, this._distance);
    }

    /**
     * Scrolls the view by the given offset, scrolling the other
     * layers proportionally.
     * @method scrollBy
     * @param {Number} x
     * @param {Number} y
     */
    this.scrollBy = function(dx, dy) {
        this._tmxView.scrollBy(dx, dy, this._distance);
    }

    /**
     * Sets the distance for this layer. Note: This may not properly
     * update after the view has been initialized already.
     * @method setDistance
     */
    this.setDistance = function(n) {
        this._distance = n;
    }

    /**
     * Removes all subviews and repopulates the view anew, from the
     * current scroll position. Useful when restarting a game.
     * @method clear
     */
    this.clear = function() {
        var subviews = this.getSubviews();
        while (subviews.length) {
            subviews.pop().removeFromSuperview();
        }
        this._populatedX = -this.style.x;
        this._populate();
    }

    /**
     * Obtains a view from a ViewPool which will automatically
     * be released to the pool when it scrolls off the screen.
     * You can specify a `group` to use a different pool for different
     * types of objects. See the ParallaxView docs for more info.
     * @method obtainView
     * @param ctor the view's class
     * @param viewOpts params to be passed to the view's constructor
     * @param opts.poolSize the size of the viewPool
     * @param opts.group Each distinct group will be pulled from a separate pool.
     * @return {ctor} an instance of ctor(viewOpts)
     */
    this.obtainView = function(ctor, viewOpts, opts) {
        opts = opts || {};
        var poolKey = ctor.name + (opts.group || "");

        var pool;
        if (!(pool = this._pools[poolKey])) {
            pool = this._pools[poolKey] = new ui.ViewPool({
                ctor: ctor,
                initOpts: viewOpts,
                initCount: opts.poolSize || 15
            });
        }

        var v = pool.obtainView();
        v.updateOpts(viewOpts);
        v.style.visible = true;

        // hack for imageview:
        if ((v instanceof ui.ImageView) && 'image' in viewOpts) {
            v.setImage(viewOpts.image, viewOpts);
        }
        if (!v._pool) {
            v._pool = pool;
            v.on("ViewRemoved", function() {
                if (v._pool) {
                    v._pool.releaseView(v);
                }
            }.bind(this));
        }

        return v;
    }

    /**
     * Override this function (or pass `populate` in opts) to populate the view
     * when necessary. The Layer class will automatically call this function
     * for you when it needs to populate the view; you should place objects
     * at the given `x` coordinate, and populate about a screenful width.
     *
     * IMPORTANT: You must return the total WIDTH that you populated. For instance,
     * if you place a platform at `x` and want 100px between platforms,
     * return `x + platform.style.width + 100`.
     *
     * @method populate
     * @param {Number} x the first coordinate to populate
     * @return {Number} the width of the area you populated.
     */
    this.populate = function(x) {
        if (this._opts.populate) {
            return this._opts.populate.call(this, this, x);
        } else {
          return this.draw(x, 256);
        }
        // override this and place objects in the view.
        // if you return a value less than width, we'll keep
        // calling populate for you.
    }

    //****************************************************************
    // Private API

    this._scrollTo = function(x, y) {
        this.style.x = -x | 0;
        this.style.y = -y | 0;

        this._populate();
    }

    this._populate = function() {
        var start = this._populatedX;
        var end = -this.style.x + this.getSuperview().style.width;
        while (start < end) {
            var width = this.populate(start);
            if (!width || isNaN(width)) {
                break;
            }
            start += width;
        }
        this._populatedX = Math.max(start, end);
        /*
    for (var i = 0, children = this.getSubviews(),
         len = children.length; i < len; i++) {
      var v = children[i];
      if (v.style.x + v.style.width < -this.style.x) {
        v.removeFromSuperview();
      }
    }*/
    }

});
