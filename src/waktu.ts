export function getWaktuKata():string
{
    let kata='malam';
    let h=new Date().getHours();
    if(h<18) kata='sore';
    if(h<15) kata='siang';
    if(h<10) kata='pagi';
    return kata;
}