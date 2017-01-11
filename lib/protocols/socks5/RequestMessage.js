'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.RequestMessage=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _common=require('../common');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}// +----+-----+-------+------+----------+----------+
// |VER | CMD |  RSV  | ATYP | DST.ADDR | DST.PORT |
// +----+-----+-------+------+----------+----------+
// | 1  |  1  | X'00' |  1   | Variable |    2     |
// +----+-----+-------+------+----------+----------+
var RequestMessage=exports.RequestMessage=function(_Message){_inherits(RequestMessage,_Message);// network octet order
function RequestMessage(options){_classCallCheck(this,RequestMessage);var _this=_possibleConstructorReturn(this,(RequestMessage.__proto__||Object.getPrototypeOf(RequestMessage)).call(this));var fields=_extends({VER:_common.SOCKS_VERSION_V5,CMD:_common.REQUEST_COMMAND_CONNECT,RSV:_common.NOOP,ATYP:_common.ATYP_V4,DSTADDR:[_common.NOOP],DSTPORT:[_common.NOOP,_common.NOOP]},options);_this.VER=fields.VER;_this.CMD=fields.CMD;_this.RSV=fields.RSV;_this.ATYP=fields.ATYP;_this.DSTADDR=fields.DSTADDR;_this.DSTPORT=fields.DSTPORT;return _this}// Variable
_createClass(RequestMessage,null,[{key:'parse',value:function parse(buffer){if(buffer.length<9){return null}if(buffer[0]!==_common.SOCKS_VERSION_V5){return null}var reqTypes=[_common.REQUEST_COMMAND_CONNECT,_common.REQUEST_COMMAND_BIND,_common.REQUEST_COMMAND_UDP];if(!reqTypes.includes(buffer[1])){return null}if(buffer[2]!==_common.NOOP){return null}var addrTypes=[_common.ATYP_V4,_common.ATYP_DOMAIN,_common.ATYP_V6];if(!addrTypes.includes(buffer[3])){return null}var DSTADDR=null;switch(buffer[3]){case _common.ATYP_DOMAIN:DSTADDR=buffer.slice(5,5+buffer[4]);break;case _common.ATYP_V6:DSTADDR=buffer.slice(4,20);break;default:// ATYP_V4
DSTADDR=buffer.slice(4,8);break;}return new RequestMessage({VER:buffer[0],CMD:buffer[1],RSV:buffer[2],ATYP:buffer[3],DSTADDR:DSTADDR,DSTPORT:buffer.slice(-2)})}}]);return RequestMessage}(_common.Message);