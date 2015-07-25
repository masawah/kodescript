var minggutxt=["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
var weekdaystxt=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var bulantxt=["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
var monthstxt=["January","February","March","April","May","June","July","August","September","October","November","December"]

function showLocalTime(container, servermode, offsetMinutes, displayversion){
if (!document.getElementById || !document.getElementById(container)) return
this.container=document.getElementById(container)
this.displayversion=displayversion
var servertimestring=(servermode=="server-php")? '<? print date("F d, Y H:i:s", time())?>' : (servermode=="server-ssi")? '<!--#config timefmt="%B %d, %Y %H:%M:%S"--><!--#echo var="DATE_LOCAL" -->' : '7/26/2015 6:16:37 AM'
this.localtime=this.serverdate=new Date(servertimestring)
this.localtime.setTime(this.serverdate.getTime()+offsetMinutes*60*1000)
this.updateTime()
this.updateContainer()
}

showLocalTime.prototype.updateTime=function(){
var thisobj=this
this.localtime.setSeconds(this.localtime.getSeconds()+1)
setTimeout(function(){thisobj.updateTime()}, 1000)
}

showLocalTime.prototype.updateContainer=function(){
var thisobj=this
if (this.displayversion=="long")
this.container.innerHTML=this.localtime.toLocaleString()
else{
var hour=this.localtime.getHours()
var minutes=this.localtime.getMinutes()
var seconds=this.localtime.getSeconds()

var tanggal=this.localtime.getDate()
var tanggalUTC=this.localtime.getUTCDate()

var mingguWIB=minggutxt[this.localtime.getDay()]
var bulanWIB=bulantxt[this.localtime.getMonth()]

var weekUTC=weekdaystxt[this.localtime.getUTCDay()]
var monthUTC=monthstxt[this.localtime.getUTCMonth()]

var hourWITA=hour+1
if(hourWITA>=24)
    {
    hourWITA = hourWITA-24;
    }
	
var hourWIT=hour+2	
if(hourWIT>=24)
    {
    hourWIT = hourWIT-24;
    }
	
var hourUTC=hour-7
if(hourUTC<0)
    {
    hourUTC = hourUTC+24;	
    }

var ampm=(hourUTC>=12)? "PM" : "AM"

this.container.innerHTML=
"<div class='FontHari'>"+mingguWIB+", "+tanggal+" "+bulanWIB+" 2015 </div><a href='JamServerFD.html'><div class='FontDigit'>"+formatField(hour)+":"+formatField(minutes)+":"+formatField(seconds)+" WIB</div></a>"+
"<hr color='#333333'>"+
"<div class='FontDigitU'>"+
formatField(hourWITA)+":"+formatField(minutes)+":"+formatField(seconds)+" WITA"+
"&nbsp;&nbsp;&nbsp;"+
formatField(hourWIT)+":"+formatField(minutes)+":"+formatField(seconds)+" WIT</div>"+
"<hr color='#333333'>"+
"<div class='FontHariU'>"+weekUTC+", "+monthUTC+" "+tanggalUTC+", 2015 </div><div class='FontDigitU'>"+formatField(hourUTC)+":"+formatField(minutes)+":"+formatField(seconds)+" UTC</div>"
}
setTimeout(function(){thisobj.updateContainer()}, 1000)
}

function formatField(num, isHour){
if (typeof isHour!="undefined"){
var hour=(num>12)? num-12 : num
return (hour==0)? 12 : hour
}
return (num<=9)? "0"+num : num
}
