YUI.add('dataschema-base', function(Y) {

/**
 * Provides the base DataSchema implementation, which can be extended to 
 * create DataSchemas for specific data formats, such XML, JSON, Text and 
 * Arrays
 *
 * @module dataschema
 * @submodule dataschema-base
 */

var LANG = Y.Lang,
/**
 * Base class for the YUI DataSchema utility.
 * @class DataSchema.Base
 * @static
 */
    SchemaBase = {
    /**
     * Overridable method returns data as-is.
     *
     * @method apply
     * @param schema {Object} Schema to apply.
     * @param data {Object} Data.
     * @return {Object} Schema-parsed data.
     * @static
     */
    apply: function(schema, data) {
        return data;
    },
    
    /**
     * Applies field parser, if defined
     *
     * @method parse
     * @param value {Object} Original value.
     * @param field {Object} Field.
     * @return {Object} Type-converted value.
     */
    parse: function(value, field) {
        if(field.parser) {
            var parser = (LANG.isFunction(field.parser)) ?
            field.parser : Y.Parsers[field.parser+''];
            if(parser) {
                value = parser.call(this, value);
            }
            else {
            }
        }
        return value;
    }
};

Y.namespace("DataSchema").Base = SchemaBase;
Y.namespace("Parsers");



}, '@VERSION@' ,{requires:['base']});
