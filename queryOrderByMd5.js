/**
 * Created by xuyannan on 7/17/2014
 * 用来演示如何查询订单信息
 * 查询参数使用MD5签名
 */
var https = require('https');
var crypto = require('crypto'); 
var C = require('./config').config();

var mixpayOrderId = '140713000685555335';
var signString = 'app_key=' + C.merchant.app_key + '&' + 'order_id=' + mixpayOrderId + C.merchant.secret_key;

var md5sum = crypto.createHash('md5');
md5sum.update(signString, 'utf-8');
var md5Sign = md5sum.digest('hex');

console.log('待签名串:' + signString);
console.log('MD5签名:' + md5Sign);

var url = 'https://api.mixpay.cn/v1/order/query/' + mixpayOrderId + '?app_key=' + C.merchant.app_key + '&sign=' + md5Sign;

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
