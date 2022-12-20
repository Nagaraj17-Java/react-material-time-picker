function decode(time){
    if(time === -1 )return 0;
    if( time === 0 )return 0;
    let t = time.toString();
    return {
        hour : t.slice(0,2),
        minute : t.slice(2)
    }
}
function normalize( time ) {
    time = parseInt(time)
    if(time < 10) {
        return '0'+time;
    }else{
        return time;
    }
}
export {decode,normalize}