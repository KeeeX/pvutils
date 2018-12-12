"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getUTCDate=getUTCDate;exports.getParametersValue=getParametersValue;exports.bufferToHexCodes=bufferToHexCodes;exports.checkBufferParams=checkBufferParams;exports.utilFromBase=utilFromBase;exports.utilToBase=utilToBase;exports.utilConcatBuf=utilConcatBuf;exports.utilConcatView=utilConcatView;exports.utilDecodeTC=utilDecodeTC;exports.utilEncodeTC=utilEncodeTC;exports.isEqualBuffer=isEqualBuffer;exports.padNumber=padNumber;exports.toBase64=toBase64;exports.fromBase64=fromBase64;exports.arrayBufferToString=arrayBufferToString;exports.stringToArrayBuffer=stringToArrayBuffer;exports.nearestPowerOf2=nearestPowerOf2;exports.clearProps=clearProps;require("core-js/modules/es6.regexp.to-string");require("core-js/modules/es7.symbol.async-iterator");require("core-js/modules/es6.symbol");require("core-js/modules/es6.typed.uint8-array");require("core-js/modules/web.dom.iterable");require("core-js/modules/es6.function.name");//**************************************************************************************
/**
 * Making UTC date from local date
 * @param {Date} date Date to convert from
 * @returns {Date}
 */function getUTCDate(date){// noinspection NestedFunctionCallJS, MagicNumberJS
return new Date(date.getTime()+date.getTimezoneOffset()*60000);}//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Get value for input parameters, or set a default value
 * @param {Object} parameters
 * @param {string} name
 * @param defaultValue
 */function getParametersValue(parameters,name,defaultValue){// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
if(parameters instanceof Object===false)return defaultValue;// noinspection NonBlockStatementBodyJS
if(name in parameters)return parameters[name];return defaultValue;}//**************************************************************************************
/**
 * Converts "ArrayBuffer" into a hexdecimal string
 * @param {ArrayBuffer} inputBuffer
 * @param {number} [inputOffset=0]
 * @param {number} [inputLength=inputBuffer.byteLength]
 * @param {boolean} [insertSpace=false]
 * @returns {string}
 */function bufferToHexCodes(inputBuffer){var inputOffset=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var inputLength=arguments.length>2&&arguments[2]!==undefined?arguments[2]:inputBuffer.byteLength-inputOffset;var insertSpace=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var result="";var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=new Uint8Array(inputBuffer,inputOffset,inputLength)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;// noinspection ChainedFunctionCallJS
var str=item.toString(16).toUpperCase();// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
if(str.length===1)result+="0";result+=str;// noinspection NonBlockStatementBodyJS
if(insertSpace)result+=" ";}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}return result.trim();}//**************************************************************************************
// noinspection JSValidateJSDoc, FunctionWithMultipleReturnPointsJS
/**
 * Check input "ArrayBuffer" for common functions
 * @param {LocalBaseBlock} baseBlock
 * @param {ArrayBuffer} inputBuffer
 * @param {number} inputOffset
 * @param {number} inputLength
 * @returns {boolean}
 */function checkBufferParams(baseBlock,inputBuffer,inputOffset,inputLength){// noinspection ConstantOnRightSideOfComparisonJS
if(inputBuffer instanceof ArrayBuffer===false){// noinspection JSUndefinedPropertyAssignment
baseBlock.error="Wrong parameter: inputBuffer must be \"ArrayBuffer\"";return false;}// noinspection ConstantOnRightSideOfComparisonJS
if(inputBuffer.byteLength===0){// noinspection JSUndefinedPropertyAssignment
baseBlock.error="Wrong parameter: inputBuffer has zero length";return false;}// noinspection ConstantOnRightSideOfComparisonJS
if(inputOffset<0){// noinspection JSUndefinedPropertyAssignment
baseBlock.error="Wrong parameter: inputOffset less than zero";return false;}// noinspection ConstantOnRightSideOfComparisonJS
if(inputLength<0){// noinspection JSUndefinedPropertyAssignment
baseBlock.error="Wrong parameter: inputLength less than zero";return false;}// noinspection ConstantOnRightSideOfComparisonJS
if(inputBuffer.byteLength-inputOffset-inputLength<0){// noinspection JSUndefinedPropertyAssignment
baseBlock.error="End of input reached before message was fully decoded (inconsistent offset and length values)";return false;}return true;}//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Convert number from 2^base to 2^10
 * @param {Uint8Array} inputBuffer
 * @param {number} inputBase
 * @returns {number}
 */function utilFromBase(inputBuffer,inputBase){var result=0;// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
if(inputBuffer.length===1)return inputBuffer[0];// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
for(var i=inputBuffer.length-1;i>=0;i--){result+=inputBuffer[inputBuffer.length-1-i]*Math.pow(2,inputBase*i);}return result;}//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
 * Convert number from 2^10 to 2^base
 * @param {!number} value The number to convert
 * @param {!number} base The base for 2^base
 * @param {number} [reserved=0] Pre-defined number of bytes in output array (-1 = limited by function itself)
 * @returns {ArrayBuffer}
 */function utilToBase(value,base){var reserved=arguments.length>2&&arguments[2]!==undefined?arguments[2]:-1;var internalReserved=reserved;var internalValue=value;var result=0;var biggest=Math.pow(2,base);// noinspection ConstantOnRightSideOfComparisonJS
for(var i=1;i<8;i++){if(value<biggest){var retBuf=void 0;// noinspection ConstantOnRightSideOfComparisonJS
if(internalReserved<0){retBuf=new ArrayBuffer(i);result=i;}else{// noinspection NonBlockStatementBodyJS
if(internalReserved<i)return new ArrayBuffer(0);retBuf=new ArrayBuffer(internalReserved);result=internalReserved;}var retView=new Uint8Array(retBuf);// noinspection ConstantOnRightSideOfComparisonJS
for(var j=i-1;j>=0;j--){var basis=Math.pow(2,j*base);retView[result-j-1]=Math.floor(internalValue/basis);internalValue-=retView[result-j-1]*basis;}return retBuf;}biggest*=Math.pow(2,base);}return new ArrayBuffer(0);}//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Concatenate two ArrayBuffers
 * @param {...ArrayBuffer} buffers Set of ArrayBuffer
 */function utilConcatBuf(){//region Initial variables
var outputLength=0;var prevLength=0;//endregion
//region Calculate output length
// noinspection NonBlockStatementBodyJS
for(var _len=arguments.length,buffers=new Array(_len),_key=0;_key<_len;_key++){buffers[_key]=arguments[_key];}for(var _i=0;_i<buffers.length;_i++){var buffer=buffers[_i];outputLength+=buffer.byteLength;}//endregion
var retBuf=new ArrayBuffer(outputLength);var retView=new Uint8Array(retBuf);for(var _i2=0;_i2<buffers.length;_i2++){var _buffer=buffers[_i2];// noinspection NestedFunctionCallJS
retView.set(new Uint8Array(_buffer),prevLength);prevLength+=_buffer.byteLength;}return retBuf;}//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Concatenate two Uint8Array
 * @param {...Uint8Array} views Set of Uint8Array
 */function utilConcatView(){//region Initial variables
var outputLength=0;var prevLength=0;//endregion
//region Calculate output length
// noinspection NonBlockStatementBodyJS
for(var _len2=arguments.length,views=new Array(_len2),_key2=0;_key2<_len2;_key2++){views[_key2]=arguments[_key2];}for(var _i3=0;_i3<views.length;_i3++){var view=views[_i3];outputLength+=view.length;}//endregion
var retBuf=new ArrayBuffer(outputLength);var retView=new Uint8Array(retBuf);for(var _i4=0;_i4<views.length;_i4++){var _view=views[_i4];retView.set(_view,prevLength);prevLength+=_view.length;}return retView;}//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Decoding of "two complement" values
 * The function must be called in scope of instance of "hexBlock" class ("valueHex" and "warnings" properties must be present)
 * @returns {number}
 */function utilDecodeTC(){var buf=new Uint8Array(this.valueHex);// noinspection ConstantOnRightSideOfComparisonJS
if(this.valueHex.byteLength>=2){//noinspection JSBitwiseOperatorUsage, ConstantOnRightSideOfComparisonJS, LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var condition1=buf[0]===0xFF&&buf[1]&0x80;// noinspection ConstantOnRightSideOfComparisonJS, LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var condition2=buf[0]===0x00&&(buf[1]&0x80)===0x00;// noinspection NonBlockStatementBodyJS
if(condition1||condition2)this.warnings.push("Needlessly long format");}//region Create big part of the integer
var bigIntBuffer=new ArrayBuffer(this.valueHex.byteLength);var bigIntView=new Uint8Array(bigIntBuffer);// noinspection NonBlockStatementBodyJS
for(var i=0;i<this.valueHex.byteLength;i++){bigIntView[i]=0;}// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
bigIntView[0]=buf[0]&0x80;// mask only the biggest bit
var bigInt=utilFromBase(bigIntView,8);//endregion
//region Create small part of the integer
var smallIntBuffer=new ArrayBuffer(this.valueHex.byteLength);var smallIntView=new Uint8Array(smallIntBuffer);// noinspection NonBlockStatementBodyJS
for(var j=0;j<this.valueHex.byteLength;j++){smallIntView[j]=buf[j];}// noinspection MagicNumberJS
smallIntView[0]&=0x7F;// mask biggest bit
var smallInt=utilFromBase(smallIntView,8);//endregion
return smallInt-bigInt;}//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
 * Encode integer value to "two complement" format
 * @param {number} value Value to encode
 * @returns {ArrayBuffer}
 */function utilEncodeTC(value){// noinspection ConstantOnRightSideOfComparisonJS, ConditionalExpressionJS
var modValue=value<0?value*-1:value;var bigInt=128;// noinspection ConstantOnRightSideOfComparisonJS
for(var i=1;i<8;i++){if(modValue<=bigInt){// noinspection ConstantOnRightSideOfComparisonJS
if(value<0){var smallInt=bigInt-modValue;var _retBuf=utilToBase(smallInt,8,i);var _retView=new Uint8Array(_retBuf);// noinspection MagicNumberJS
_retView[0]|=0x80;return _retBuf;}var retBuf=utilToBase(modValue,8,i);var retView=new Uint8Array(retBuf);//noinspection JSBitwiseOperatorUsage, MagicNumberJS, NonShortCircuitBooleanExpressionJS
if(retView[0]&0x80){//noinspection JSCheckFunctionSignatures
var tempBuf=retBuf.slice(0);var tempView=new Uint8Array(tempBuf);retBuf=new ArrayBuffer(retBuf.byteLength+1);// noinspection ReuseOfLocalVariableJS
retView=new Uint8Array(retBuf);// noinspection NonBlockStatementBodyJS
for(var k=0;k<tempBuf.byteLength;k++){retView[k+1]=tempView[k];}// noinspection MagicNumberJS
retView[0]=0x00;}return retBuf;}bigInt*=Math.pow(2,8);}return new ArrayBuffer(0);}//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS, ParameterNamingConventionJS
/**
 * Compare two array buffers
 * @param {!ArrayBuffer} inputBuffer1
 * @param {!ArrayBuffer} inputBuffer2
 * @returns {boolean}
 */function isEqualBuffer(inputBuffer1,inputBuffer2){// noinspection NonBlockStatementBodyJS
if(inputBuffer1.byteLength!==inputBuffer2.byteLength)return false;// noinspection LocalVariableNamingConventionJS
var view1=new Uint8Array(inputBuffer1);// noinspection LocalVariableNamingConventionJS
var view2=new Uint8Array(inputBuffer2);for(var i=0;i<view1.length;i++){// noinspection NonBlockStatementBodyJS
if(view1[i]!==view2[i])return false;}return true;}//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Pad input number with leade "0" if needed
 * @returns {string}
 * @param {number} inputNumber
 * @param {number} fullLength
 */function padNumber(inputNumber,fullLength){var str=inputNumber.toString(10);// noinspection NonBlockStatementBodyJS
if(fullLength<str.length)return"";var dif=fullLength-str.length;var padding=new Array(dif);// noinspection NonBlockStatementBodyJS
for(var i=0;i<dif;i++){padding[i]="0";}var paddingString=padding.join("");return paddingString.concat(str);}//**************************************************************************************
var base64Template="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var base64UrlTemplate="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionTooLongJS, FunctionNamingConventionJS
/**
 * Encode string into BASE64 (or "base64url")
 * @param {string} input
 * @param {boolean} useUrlTemplate If "true" then output would be encoded using "base64url"
 * @param {boolean} skipPadding Skip BASE-64 padding or not
 * @param {boolean} skipLeadingZeros Skip leading zeros in input data or not
 * @returns {string}
 */function toBase64(input){var useUrlTemplate=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var skipPadding=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var skipLeadingZeros=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var i=0;// noinspection LocalVariableNamingConventionJS
var flag1=0;// noinspection LocalVariableNamingConventionJS
var flag2=0;var output="";// noinspection ConditionalExpressionJS
var template=useUrlTemplate?base64UrlTemplate:base64Template;if(skipLeadingZeros){var nonZeroPosition=0;for(var _i5=0;_i5<input.length;_i5++){// noinspection ConstantOnRightSideOfComparisonJS
if(input.charCodeAt(_i5)!==0){nonZeroPosition=_i5;// noinspection BreakStatementJS
break;}}// noinspection AssignmentToFunctionParameterJS
input=input.slice(nonZeroPosition);}while(i<input.length){// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
var chr1=input.charCodeAt(i++);// noinspection NonBlockStatementBodyJS
if(i>=input.length)flag1=1;// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
var chr2=input.charCodeAt(i++);// noinspection NonBlockStatementBodyJS
if(i>=input.length)flag2=1;// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
var chr3=input.charCodeAt(i++);// noinspection LocalVariableNamingConventionJS
var enc1=chr1>>2;// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var enc2=(chr1&0x03)<<4|chr2>>4;// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var enc3=(chr2&0x0F)<<2|chr3>>6;// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var enc4=chr3&0x3F;// noinspection ConstantOnRightSideOfComparisonJS
if(flag1===1){// noinspection NestedAssignmentJS, AssignmentResultUsedJS, MagicNumberJS
enc3=enc4=64;}else{// noinspection ConstantOnRightSideOfComparisonJS
if(flag2===1){// noinspection MagicNumberJS
enc4=64;}}// noinspection NonBlockStatementBodyJS
if(skipPadding){// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
if(enc3===64)output+="".concat(template.charAt(enc1)).concat(template.charAt(enc2));else{// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
if(enc4===64)output+="".concat(template.charAt(enc1)).concat(template.charAt(enc2)).concat(template.charAt(enc3));else output+="".concat(template.charAt(enc1)).concat(template.charAt(enc2)).concat(template.charAt(enc3)).concat(template.charAt(enc4));}}else output+="".concat(template.charAt(enc1)).concat(template.charAt(enc2)).concat(template.charAt(enc3)).concat(template.charAt(enc4));}return output;}//**************************************************************************************
// noinspection FunctionWithMoreThanThreeNegationsJS, FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionNamingConventionJS
/**
 * Decode string from BASE64 (or "base64url")
 * @param {string} input
 * @param {boolean} [useUrlTemplate=false] If "true" then output would be encoded using "base64url"
 * @param {boolean} [cutTailZeros=false] If "true" then cut tailing zeroz from function result
 * @returns {string}
 */function fromBase64(input){var useUrlTemplate=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var cutTailZeros=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;// noinspection ConditionalExpressionJS
var template=useUrlTemplate?base64UrlTemplate:base64Template;//region Aux functions
// noinspection FunctionWithMultipleReturnPointsJS, NestedFunctionJS
function indexof(toSearch){// noinspection ConstantOnRightSideOfComparisonJS, MagicNumberJS
for(var _i6=0;_i6<64;_i6++){// noinspection NonBlockStatementBodyJS
if(template.charAt(_i6)===toSearch)return _i6;}// noinspection MagicNumberJS
return 64;}// noinspection NestedFunctionJS
function test(incoming){// noinspection ConstantOnRightSideOfComparisonJS, ConditionalExpressionJS, MagicNumberJS
return incoming===64?0x00:incoming;}//endregion
var i=0;var output="";while(i<input.length){// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
var enc1=indexof(input.charAt(i++));// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
var enc2=i>=input.length?0x00:indexof(input.charAt(i++));// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
var enc3=i>=input.length?0x00:indexof(input.charAt(i++));// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
var enc4=i>=input.length?0x00:indexof(input.charAt(i++));// noinspection LocalVariableNamingConventionJS, NonShortCircuitBooleanExpressionJS
var chr1=test(enc1)<<2|test(enc2)>>4;// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var chr2=(test(enc2)&0x0F)<<4|test(enc3)>>2;// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
var chr3=(test(enc3)&0x03)<<6|test(enc4);output+=String.fromCharCode(chr1);// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
if(enc3!==64)output+=String.fromCharCode(chr2);// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
if(enc4!==64)output+=String.fromCharCode(chr3);}if(cutTailZeros){var outputLength=output.length;var nonZeroStart=-1;// noinspection ConstantOnRightSideOfComparisonJS
for(var _i7=outputLength-1;_i7>=0;_i7--){// noinspection ConstantOnRightSideOfComparisonJS
if(output.charCodeAt(_i7)!==0){nonZeroStart=_i7;// noinspection BreakStatementJS
break;}}// noinspection NonBlockStatementBodyJS, NegatedIfStatementJS
if(nonZeroStart!==-1)output=output.slice(0,nonZeroStart+1);else output="";}return output;}//**************************************************************************************
function arrayBufferToString(buffer){var resultString="";var view=new Uint8Array(buffer);// noinspection NonBlockStatementBodyJS
var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=view[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var element=_step2.value;resultString+=String.fromCharCode(element);}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return!=null){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}return resultString;}//**************************************************************************************
function stringToArrayBuffer(str){var stringLength=str.length;var resultBuffer=new ArrayBuffer(stringLength);var resultView=new Uint8Array(resultBuffer);// noinspection NonBlockStatementBodyJS
for(var i=0;i<stringLength;i++){resultView[i]=str.charCodeAt(i);}return resultBuffer;}//**************************************************************************************
var log2=Math.log(2);//**************************************************************************************
// noinspection FunctionNamingConventionJS
/**
 * Get nearest to input length power of 2
 * @param {number} length Current length of existing array
 * @returns {number}
 */function nearestPowerOf2(length){var base=Math.log(length)/log2;var floor=Math.floor(base);var round=Math.round(base);// noinspection ConditionalExpressionJS
return floor===round?floor:round;}//**************************************************************************************
/**
 * Delete properties by name from specified object
 * @param {Object} object Object to delete properties from
 * @param {Array.<string>} propsArray Array of properties names
 */function clearProps(object,propsArray){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=propsArray[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var prop=_step3.value;delete object[prop];}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return!=null){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}}//**************************************************************************************
//# sourceMappingURL=utils.js.map