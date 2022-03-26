import { toInt } from "./val";

type INumString=number | string;

export function getNamaBulan(val:number|string,long?:boolean){
    let index=val;
    if(typeof index!=="number"){
        index=parseInt(index);
        if(isNaN(index)) index=0;
    }
    const bulan=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    const bulanSort=["","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return (long?bulan[index]:bulanSort[index])||null;
}

function whileChar(str:string|number="",charVal:string="0",length:number=2){
    let s=typeof str==="string" || typeof str==="number"?str.toString().trim():"";
    if(length>0){
        while(s.length<length){
            s=charVal+s;
        }
    }
    return s;
}

export function tanggalJsToFormatInput(jsDate:Date|null|undefined, useHtml:boolean=false){
    if(!jsDate || !(jsDate instanceof Date)){
        jsDate=new Date();
    }    
    let d:string|number=jsDate.getDate();
    let m:string|number=jsDate.getMonth()+1;
    let y:string|number=jsDate.getFullYear();
    d=whileChar(d,"0",2);
    m=whileChar(m,"0",2);
    y=whileChar(y,"0",4);    
    const ps=[];
    ps.push(d);
    ps.push(m);
    ps.push(y);

    if(useHtml)
    {
        return ps.map((r:string)=>{
            return '<b style="color:orangered">'+r+'</b>';
        }).join('<b class="text-primary">.</b>');
    }
    return ps.join(".");
}

export function tanggalJsToFormatIndo(jsDate:Date|null|undefined=new Date(),separator:string="/",usingHtml:boolean=false){
    if(!jsDate || !(jsDate instanceof Date)){
        jsDate=new Date();
    }
    let d:string|number=jsDate.getDate();
    let m:string|number|any=jsDate.getMonth();
    let y:string|number=jsDate.getFullYear();

    d=whileChar(d);
    m=getNamaBulan(m+1);

    if(usingHtml){
        d='<b>'+d+'</b>';
        m='<b>'+m+'</b>';
        y='<b>'+y+'</b>';
    }
    const s=[d,m,y];
    return s.join(separator);
}

export function tanggalMySqlToFormatInput(mysqlTanggal:string){
    //contoh 2020-01-01
    let tanggal:string|any=mysqlTanggal && typeof mysqlTanggal==="string"?mysqlTanggal.toString().trim():"";
    
    if(tanggal.length<1) return "";

    let test=tanggal.split(" "); //split spasi
    if(test.length>0){
        tanggal=test[0];
    }
    tanggal=tanggal.split("-");
    let y=tanggal[0];
    let m=tanggal[1]?tanggal[1]:"";
    let d=tanggal[2]?tanggal[2]:"";
    return d+"."+m+"."+y;
}

export function tanggalMySqlToJsDate(mysqlTanggal:string){
    //contoh 2020-01-01
    let tanggal:string|any=mysqlTanggal && typeof mysqlTanggal==="string"?mysqlTanggal.toString().trim():"";
    let test=tanggal.split(" "); //split spasi
    if(test.length>0){
        tanggal=test[0];
    }
    tanggal=tanggal.split("-");
    let y=tanggal[0];
    let m=tanggal[1]?tanggal[1]:"";
    let d=tanggal[2]?tanggal[2]:"";
    d=whileChar(d);
    m=whileChar(m);    
    const tag=new Date(y+"-"+m+"-"+d);
    return new Date(tag.getTime()+tag.getTimezoneOffset()*60000);
}

export function tanggalMySQLdiffNow(mysqlTanggal:string){
    const dt1=tanggalMySqlToJsDate(mysqlTanggal);
    const dt2=new Date();
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

export function mysqlTanggalToIndo(mysqlTanggal:string|null|undefined,separator="/",long:boolean=false,show_time:boolean=true,time_separator:string=':'){

    let tanggal:string|any=mysqlTanggal && typeof mysqlTanggal==="string"?mysqlTanggal.toString().trim():"";    
    let test=tanggal.split(" "); //split spasi
    let jams:any;
    if(test.length>0){
        tanggal=test[0];
        if(test.length>1){
            jams=test[1]; // ambil index 1
        }
    }

    tanggal=tanggal.split("-");
    let y=tanggal[0];
    let m=tanggal[1]?tanggal[1]:"";
    let d=tanggal[2]?tanggal[2]:"";

    const s=[];
    const hms=[];
    
    if(!isNaN(parseInt(d))){
        d=parseInt(d);
        d=d<10?"0"+d:d;
        s.push(d);
    }

    if(!isNaN(parseInt(m))){
        m=parseInt(m);
        if(m>=1 && m<=12){
            const bulans=["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            const bulansShort=["","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
            if(bulans[m]){
                s.push(!long?bulansShort[m]:bulans[m]);
            }
        }
    }

    if(!isNaN(parseInt(y))){
        s.push(parseInt(y));
    }
    
    if(s.length>0 && show_time && jams)
    {
        jams=jams.split(':');
        if(jams.length>1)
        {

            let hour=toInt(jams[0]);
            let min=toInt(jams[1]);
            let sec=0;      
            if(jams[2]){
                sec=toInt(jams[2]);
            }
            if(hour!==0 || min!==0 || sec!==0)
            {
                hms.push(hour<10?'0'+hour:hour);
                hms.push(min<10?'0'+min:min);
                hms.push(sec?(sec<10?'0'+sec:sec):'00');
            }
        }
    }

    let str=null;
    if(s.length>0){
        str=s.join(separator);
        if(show_time && hms.length>0){
            str+=' '+hms.join(time_separator||':');
        }
    }
    
    return str;
}


export function tanggalTertinggiBulanTahun(month:string|number,year:string|number)
{
    month=toInt(month);
    year=toInt(year);
    return month=== 2 ? (year % 4 ? 28 : (year % 100 ? 29 : (year %400 ? 28 : 29))) : ((month - 1) % 7 % 2 ? 30 : 31);
}

export function tanggalBuildRentangBulanTahun(bulan_dari:INumString, tahun_dari:INumString, bulan_sampai:INumString, tahun_sampai:INumString)
{
    bulan_dari=toInt(bulan_dari);
    bulan_sampai=toInt(bulan_sampai);
    tahun_dari=toInt(tahun_dari);
    tahun_sampai=toInt(tahun_sampai);
    
    const valdaStr=(val:any,def:any)=>{
        let v=(val||'').toString().trim();
        if(v.length>0) {
            v=parseInt(v);
            if(isNaN(v)) return def;
            return v;
        }
        return def;
    };
    const validBulan=(val:number)=>{
        return val>0 && val<13;
    };

    const makeBulan=(bulan:number)=>{
        return bulan<10?"0"+bulan:bulan;
    };

    let const_bulan=(new Date().getMonth());
    let const_tahun=(new Date().getFullYear());
    let b_dari=valdaStr(bulan_dari,1);
    let b_sampai=valdaStr(bulan_sampai,const_bulan);
    let t_dari=valdaStr(tahun_dari,const_tahun);
    let t_sampai=valdaStr(tahun_sampai,const_tahun);

    b_dari=validBulan(b_dari)?b_dari:1;
    b_sampai=validBulan(b_sampai)?b_sampai:const_bulan;

    let tgl={
        from:{
            d:1,
            m:b_dari,
            y:t_dari,
            str:""
        },
        to:{
            d:tanggalTertinggiBulanTahun(b_sampai,t_sampai),
            m:b_sampai,
            y:t_sampai,
            str:""
        }
    };
    if(t_sampai<t_dari){
        tgl.from={
            d:1,
            m:b_dari,
            y:t_sampai,
            str:""
        };
        tgl.to={
            d:tanggalTertinggiBulanTahun(b_sampai,t_dari),
            m:b_sampai,
            y:t_dari,
            str:""
        }
    }

    tgl.from.str=makeBulan(tgl.from.d)+" "+getNamaBulan(tgl.from.m,true)+" "+tgl.from.y;
    tgl.to.str=makeBulan(tgl.to.d)+" "+getNamaBulan(tgl.to.m,true)+" "+tgl.to.y;
    return tgl;
}


export function toTimeStampSesi(waktuSesi:string|number|Date|null|undefined)
{
    let ws:any=typeof waktuSesi==="string"?parseInt(waktuSesi)
                :waktuSesi instanceof Date?waktuSesi.getTime()/1000
                :waktuSesi;

    if(typeof waktuSesi==="string" && isNaN(ws))  return null;

    let timeNow=Math.floor((new Date().getTime())/1000);
    
    let selisih_waktu = Math.round(timeNow - ws);
    let detik = selisih_waktu ;
    let menit = Math.round(selisih_waktu / 60 );
    let jam = Math.round(selisih_waktu / 3600 );
    let hari = Math.round(selisih_waktu / 86400 );
    let minggu = Math.round(selisih_waktu / 604800 );
    let bulan = Math.round(selisih_waktu / 2419200 );
    let tahun = Math.round(selisih_waktu / 29030400 );

    let hasil=null;
    if(detik<=0) hasil="beberapa detik";
    else
    if(detik <= 60) hasil=detik+" detik";
    else
    if(menit <= 60){
        if(menit===1) hasil="satu menit";
        else hasil=menit+" menit";
    }
    else
    if(jam <= 24){
        if(jam===1) hasil="satu jam";
        else hasil=jam+" jam";
    }
    else
    if(hari <= 7){
        if(hari===1) hasil="satu hari";
        else hasil=hari+" hari";
    }
    else
    if(minggu <= 4){
        if(minggu===1) hasil="satu minggu";
        else  hasil=minggu+" minggu";
    }
    else if(bulan <= 12){
        if(bulan===1) hasil="satu bulan";
        else  hasil=bulan+" bulan";
    }
    else{
        if(tahun===1) hasil="satu tahun";
        else hasil=tahun+" tahun";
    }
    hasil=hasil.toString().trim();
    if(hasil.length>0){
        hasil+=" lalu";
    }
    return hasil;
}