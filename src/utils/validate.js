/**
 * Created by jiachenpan on 16/11/18.
 */
import Cookies from 'js-cookie'
import axios from 'axios'  
import store from '../store'
import request from '@/utils/request'
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export async function getConfig(obj){
  var time=Cookies.get("time");//new Date().getTime();
  console.log("Cookies",time)
  //debugger
  if(!time){
    let response=await axios.get('http://api.msgforex.com/api/v1/config'+"?t="+new Date().getTime());

    if(response.data.errorCode==0){
        time=response.data.data.timestamp;
        var inFifteenMinutes = new Date(new Date().getTime() + 10000);
        Cookies.set("time",time,{ expires: inFifteenMinutes})
    }
  }
  
  var text = 'did=12345dg&time='+time+'&version=1&_rand='+new Date().getTime()+'.'+Math.floor(Math.random()*10000);
    var key = '123454536f667445454d537973576562';

    key = CryptoJS.enc.Utf8.parse(key);

    var iv = "1234577290ABCDEF1264147890ACAE45";

    iv = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(text, key, {

        iv: iv,

        mode: CryptoJS.mode.CBC,

        padding: CryptoJS.pad.ZeroPadding

    }).toString()

    store.state.user.sign=encrypted;
    obj.sign=encrypted;
    return request(obj)
    console.log(store.state.user.sign)
}

export function getEncrypted () {
  var time= new Date().getTime();
  var text = 'did=12345dg&time='+time+'&version=1&_rand='+Math.random();
  var key = '123454536f667445454d537973576562';

  key = CryptoJS.enc.Utf8.parse(key);

  var iv = "1234577290ABCDEF1264147890ACAE45";

  iv = CryptoJS.enc.Utf8.parse(iv);

  var encrypted = CryptoJS.AES.encrypt(text, key, {

      iv: iv,

      mode: CryptoJS.mode.CBC,

      padding: CryptoJS.pad.ZeroPadding

  }).toString()

  return encrypted;
}
