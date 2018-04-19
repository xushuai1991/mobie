let operatelocalstorage=function(key,value,type,maxtime){
    //maxtime为最大过期时间,单位为分钟
    // value为要保存的数据
    // key为要保存的key值
    //type(set:设置带生命周期的本地存储，get获取带生命周期的本地存储)
    if(type=='set'){
        let time=new Date();
        // let maxdate=data.maxtime;
        let date_dead=new Date(time.setMinutes(time.getMinutes()+maxtime,time.getSeconds(),0));
        // let date_current=new Date();
        let json={
            data:value,
            date_dead:date_dead
        };
        localStorage.setItem(key,JSON.stringify(json));
    }
    else{
        let data=localStorage.getItem(key);
        if(data==null){
            return null;
        }
        else{
            data=JSON.parse(data);
            let date_current=new Date();
            let date_dead=new Date(data.date_dead);
            // 存储时间过期
            if(date_current>date_dead){
                localStorage.removeItem(key);
                return null;
            }
            else{
                return data.data;
            }
        }
    }
}
export {operatelocalstorage};