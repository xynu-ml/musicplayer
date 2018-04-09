import originJsonp from "jsonp"
 export default function jsonp(url,data,options){
 	url+=(url.indexOf("?")<0?"?":"&")+param(data);
 	return new Promise((resolve,reject)=>{
 		originJsonp(url,options,(err,data)=>{
 			if(!err){
 				resolve(data);
 			}else{
 				reject(err);
 			}
 		})
 		
 	})
 }
 function param(data){
 	let url="";
 	for(var k in data){
 		let value=!data[k]?data[k]:"";
 		url+=`&${k}=${encodeURIComponent(value)}`;
 	}
 	return url?url.substr(1):"";
 }
