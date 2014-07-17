/**
 * Created by xuyannan on 7/17/2014
 * 用来演示如何查询订单信息
 * 查询参数使用RSA签名
 */
var https = require('https');
var crypto = require('crypto'); 
var C = require('./config').config();

var mixpayOrderId = '140713000685555335';
var signString = 'app_key=' + C.merchant.app_key + '&' + 'order_id=' + mixpayOrderId;

var signer = crypto.createSign("RSA-SHA1");
signer.update(signString, 'utf-8');
var sign = signer.sign(C.merchant.private_key, "Base64"); 

var url = 'https://api.mixpay.cn/v1/order/query/' + mixpayOrderId + '?app_key=' + C.merchant.app_key + '&sign=' + encodeURIComponent(sign);

https.get(url, function(response){
    console.log(response.statusCode);
	if (response.statusCode != 200) {
		return ;
	}
	response.on('data', function(data){
		var text = data.toString('utf-8');
		var json = JSON.parse(text);
		console.log('订单信息:');
		console.log(json.data);
	});
}).on('eror', function(e){
	console.log(e);
}).end();
