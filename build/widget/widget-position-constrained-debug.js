YUI.add('widget-position-constrained', function(Y) {

/**
 * Provides constrained XY positioning support for Widgets, through an extension.
 *
 * It builds on top of the widget-position module, to provide constrained positioning support.
 *
 * @module widget-position-constrained
 */
var CONSTRAIN = "constrain",
    CONSTRAIN_XYCHANGE = "constrain|xyChange",

    CONSTRAIN_CHANGE = "constrainChange",

    BINDUI = "bindUI",
    SYNCUI = "syncUI",

    XY = "xy",
    X_COORD = "x",
    Y_COORD = "y",

    Node = Y.Node,

    VIEWPORT_REGION = "viewportRegion",
    REGION = "region",

    PREVENT_OVERLAP;

/**
 * Widget extension, which can be used to add extended XY positioning support to the base Widget class,
 * through the <a href="Base.html#method_build">Base.build</a> method. This extension requires that 
 * the WidgetPosition extension be added to the Widget (before WidgetPositionConstrained, if part of the same 
 * extension list passed to Base.build).
 *
 * @class WidgetPositionConstrained
 * @param {Object} User configuration object
 */
function PositionConstrained(config) {
    if (!this._posNode) {
        Y.error("WidgetPosition needs to be added to the Widget, before WidgetPositionConstrained is added"); 
    }
    Y.after(this._syncUIPosConstrained, this, SYNCUI);
    Y.after(this._bindUIPosConstrained, this, BINDUI);
}

/**
 * Static property used to define the default attribute 
 * configuration introduced by WidgetPositionConstrained.
 *
 * @property WidgetPositionConstrained.ATTRS
 * @type Object
 * @static
 */
PositionConstrained.ATTRS = {
    constrain : {
        value: null,
        setter: "_setConstrain"
    },

    preventOverlap : {
        value:false
    }
};

PREVENT_OVERLAP = PositionConstrained.PREVENT_OVERLAP = {
    x: {
        "tltr": 1,
        "blbr": 1,
        "brbl": 1,
        "trtl": 1
    },
    y : {
        "trbr": 1,
        "tlbl": 1,
        "bltl": 1,
        "brtr": 1
    }
};

PositionConstrained.prototype = {

    /**
     * @method getConstrainedXY
     * @param {Array} xy
     * @param {Node | boolean} node
     * @return {Array} The constrained XY values
     */
    getConstrainedXY : function(xy, node) {
        node = node || this.get(CONSTRAIN);

        var constrainingRegion = this._getRegion((node === true) ? null : node),
            nodeRegion = this._posNode.get(REGION);

        return [
            this._constrain(xy[0], X_COORD, nodeRegion, constrainingRegion),
            this._constrain(xy[1], Y_COORD, nodeRegion, constrainingRegion)
        ];
    },

    /**
     * @method constrain
     * @param {Object} xy
     * @param {Object} node
     */
    constrain : function(xy, node) {
        var currentXY, 
            constrainedXY,
            constraint = node || this.get(CONSTRAIN);

        if (constraint) {
            currentXY = xy || this.get(XY);
            constrainedXY = this.getConstrainedXY(currentXY, constraint);

            if (constrainedXY[0] !== currentXY[0] || constrainedXY[1] !== currentXY[1]) {
                this.set(XY, constrainedXY, { constrained:true });
            }
        }
    },

    /**
     * @method _setConstrain
     * @param {Object} val
     */
    _setConstrain : function(val) {
        return (val === true) ? val : Node.one(val);
    },

    /**
     * @method _constrain
     * @param {Number} val
     * @param {String} axis
     * @param {Region} nodeRegion
     * @param {Region} constrainingRegion
     */
    _constrain: function(val, axis, nodeRegion, constrainingRegion) {
        if (constrainingRegion) {

            if (this.get("preventOverlap")) {
                val = this._preventOverlap(val, axis, nodeRegion, constrainingRegion);
            }

            var x = (axis == X_COORD),

                regionSize    = (x) ? constrainingRegion.width : constrainingRegion.height,
                nodeSize      = (x) ? nodeRegion.width : nodeRegion.height,
                minConstraint = (x) ? constrainingRegion.left : constrainingRegion.top,
                maxConstraint = (x) ? constrainingRegion.right - nodeSize : constrainingRegion.bottom - nodeSize;

            if (val < minConstraint || val > maxConstraint) {
                if (nodeSize < regionSize) {
                    if (val < minConstraint) {
                        val = minConstraint;
                    } else if (val > maxConstraint) {
                        val = maxConstraint;
                    }
                } else {
                    val = minConstraint;
                }
            }
        }

        return val;
    },

    /**
     * @method _preventOverlap
     * @param {Number} val
     * @param {String} axis
     * @param {Region} nodeRegion
     * @param {Region} constrainingRegion
     */
    _preventOverlap : function(val, axis, nodeRegion, constrainingRegion) {

        var align = this.get("align"),
            x = (axis === X_COORD),
            nodeSize,
            alignRegion,
            nearEdge,
            farEdge,
            spaceOnNearSide, 
            spaceOnFarSide;

        if (align && align.points && PREVENT_OVERLAP[align.points.join()]) {

            alignRegion = this._getRegion(align.node);

            if (alignRegion) {
                nodeSize        = (x) ? nodeRegion.width : nodeRegion.height;
                nearEdge        = (x) ? alignRegion.left : alignRegion.top;
                farEdge         = (x) ? alignRegion.right : alignRegion.bottom;
                spaceOnNearSide = (x) ? alignRegion.left - constrainingRegion.left : alignRegion.top - constrainingRegion.top;
                spaceOnFarSide  = (x) ? constrainingRegion.right - alignRegion.right : constrainingRegion.bottom - alignRegion.bottom;
            }
 
            if (val > nearEdge) {
                if (spaceOnFarSide < nodeSize && spaceOnNearSide > nodeSize) {
                    val = nearEdge;
                }
            } else {
                if (spaceOnNearSide < nodeSize && spaceOnFarSide > nodeSize) {
                    val = farEdge;
                }
            }
        }

        return val;
    },

    /**
     * Binds event listeners responsible for updating the UI state in response to 
     * Widget extended positioning related state changes.
     * <p>
     * This method is invoked after bindUI is invoked for the Widget class
     * using YUI's aop infrastructure.
     * </p>
     * @method _bindUIPosConstrained
     * @protected
     */
    _bindUIPosConstrained : function() {
        this.after(CONSTRAIN_CHANGE, this._afterConstrainChange);
    },

    /**
     * Syncs the initial UI state to reflect the value of constrained
     * <p>
     * This method is invoked after syncUI is invoked for the Widget class
     * using YUI's aop infrastructure.
     * </p>
     * @method _syncUIPosConstrained
     * @protected
     */
    _syncUIPosConstrained : function() {
        this._enableConstraints(this.get(CONSTRAIN));
    },

    /**
     * @method _afterConstrainChange
     * @param {EventFacade} e
     */
    _afterConstrainChange : function(e) {
        this._enableConstraints(e.newVal);
    },

    /**
     * @method enable or disable constraints listeners
     * @param {Object} enable
     */
    _enableConstraints : function(enable) {
        if (enable) {
            this.constrain();
            this.on(CONSTRAIN_XYCHANGE, this._constrainOnXYChange);
        } else {
            this.detach(CONSTRAIN_XYCHANGE);    
        }
    },

    /**
     * Default attribute change listener for the align attribute, responsible
     * for updating the UI, in response to attribute changes.
     *
     * @method _afterAlignChange
     * @protected
     * @param {EventFacade} e The event facade for the attribute change
     */
    _constrainOnXYChange : function(e) {
        if (!e.constrained) {
            e.newVal = this.getConstrainedXY(e.newVal);
        }
    },

    /**
     * @method _getRegion
     * @param {Node} (Optional) node
     */
    _getRegion : function(node) {
        var region;
        if (!node) {
            region = this._posNode.get(VIEWPORT_REGION);
        } else {
            node = Node.one(node);
            if (node) {
                region = node.get(REGION);
            }
        }
        return region;
    }
};

Y.WidgetPositionConstrained = PositionConstrained;


}, '@VERSION@' ,{requires:['widget', 'widget-position']});