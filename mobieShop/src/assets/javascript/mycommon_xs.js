// 数组是否含有某项
Array.prototype.has=function(e){
    let key=0;
    let currentitem=JSON.stringify(e);
    let has=false;
    for(let index in this){
        if(currentitem===JSON.stringify(this[index])){
            key=Number(index);
            has=true;
            break;
        }
    }
    return {result:has,index:key};
}