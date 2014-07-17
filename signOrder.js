/**
 * Created by xuyannan on 7/17/2014
 * 用来演示如何对订单信息进行RSA及MD5签名
 */

// load config
var C = require('./config').config();
var crypto = require('crypto'); 

// 金额，不能为空
var amount = 2;
// 订单ID，不能为空
var appOrderId = 'order001';
// 订单标题，不能为空
var orderTitle = '飞行扫帚两个';
// 订单描述，不能为空
var orderDesc = '2014-6-5下单，一红一黑';
// 后端通知地址，可以为空，为空时默认为您在商户后台为这个app所设置的通知地址
var notifyUrl = '';
// 商品描述，可以为空
var productDesc = '光速2000最新型号，速度超快';
// 商品ID，可以为空
var productId = 'Product001';
// 商品名称，可以为空
var productName = '飞行扫帚';
// 其他信息，您可以在这里放一些您所需要的信息
var extData = '';
// 商户app的用户id
var appUserId = 'U0001';

//'amount=2&app_key=6018561003558745&ext_data=&merchant_order_id=order001&merchant_user_id=U0001&notify_url=&order_desc=2014-6-5下单，一红一黑&order_title=飞行扫帚两个&product_desc=光速2000最新型号，速度超快&product_id=Product001&product_name=飞行扫帚'

var orderString = 'amount=' + amount + '&'
				 +'app_key=' + C.merchant.app_key + '&'
				 +'ext_data=' + extData + '&'
				 +'merchant_order_id=' + appOrderId + '&'
				 +'merchant_user_id=' + appUserId + '&'
				 +'notify_url=' + notifyUrl + '&'
				 +'order_desc=' + orderDesc + '&'
				 +'order_title=' + orderTitle + '&'
				 +'product_desc=' + productDesc + '&'
				 +'product_id=' + productId + '&'
				 +'product_name=' + productName;

var signer = crypto.createSign("RSA-SHA1");
signer.update(orderString, 'utf-8');
var sign = signer.sign(C.merchant.private_key, "Base64"); 
console.log('待签名串:' + orderString);
console.log('RSA签名:' + sign);
console.log('encode过后的RSA签名:' + encodeURIComponent(sign));

orderString += C.merchant.secret_key;
var md5sum = crypto.createHash('md5');
md5sum.update(orderString, 'utf-8');
var md5Sign = md5sum.digest('hex');
console.log('待签名串:' + orderString);
console.log('MD5签名:' + md5Sign);
