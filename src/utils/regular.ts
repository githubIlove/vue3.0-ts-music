// // // localStorage

// 
/**
 * 函数类型接口
 * setStroage()另一种写法
 * 
 * interface info {
 *      (value: string, id: number): string;
 * }
 * 
 * let getInfo: info = function (value: string, id: number): string { 
 *      return value + id
 * }
 * 
 * 
 */
interface setLocalFun{
    (name: string, value: string): string;
}


function setStroage<setLocalFun>(name: string,value:string): void {
    localStorage.setItem(name,value)
}

function getStroage(name: string): any {
    return localStorage.getItem(name)
}

// 时间格式化
function timeFilter(timestamp:string, type:number = 1) {
    /* type
        1.年月日时分秒
        2.年月日
        3.年月日时分
        4.时分
        5.年月
    */
    var date = new Date(timestamp); //10位*1000
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (type == 1) return Y + '-' + M + '-' + addZero(D) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    if (type == 2) return Y + '-' + M + '-' + addZero(D);
    if (type == 3) return Y + '-' + M + '-' + addZero(D) + ' ' + addZero(h) + ':' + addZero(m);
    if (type == 4) return addZero(h) + ':' + addZero(m);
    if (type == 5) return Y + '-' + M;
}

function addZero(num:number|string) {
    return num < 10 ? '0' + num : num
}


// 音乐时间转换

function musicTime(num:number):string {
    // var days = parseInt(mss / (1000 * 60 * 60 * 24));
    // var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    var minutes = addZero(parseInt((num % (1000 * 60 * 60)) / (1000 * 60)+''));
    var seconds = addZero(parseInt(((num % (1000 * 60)) / 1000).toFixed()));

  
    return minutes + ":" + seconds;
  
}






export {setStroage,getStroage,timeFilter,musicTime}
