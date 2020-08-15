//var csvfile = 'stock_fundamentals.csv';

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//alert(getParam("qcode"))
qcode=getParam("qcode")
$(document).ready(function(){
    $("p").append(qcode)  //そのまま書いたらapendされなかったので、document.readyの後に入れる
  });

var csvfile = S3Bucket + qcode + 'h.csv';　//S3のオブジェクト名を格納すること

function readCsv(data) {
    var target = '#csv-body';
    var csv = $.csv.toArrays(data);
    console.log(csv)
    var insert = '';
    $(csv).each(function(i) {
        if (this.length > 1){ //改行コードのみ入っている場合を除外
            insert =[]
            if(i==0){
                insert +="<thead class='thead'>"
            }
            insert += '<tr>';
         //   arr =this
            console.log('this',this.length,this)


        //for (i=0;i<10;i++){
         //       if(i =3){
        //            console.log(arr[i])
        //            insert +='<td class ="ma25">'+ arr[i]+'</td>';
        //        }
        //        else{
         //           insert +='<td>'+ arr[i]+'</td>';
         //       }
        $(this).each(function(i) {
            if(i==0){
                insert += '<td class="rowhead">' + this + '</td>';
            }else
            if(i==11){
                if(this =="diviation_rate_25d"){　//表頭が数値化しないように
                    insert += '<td>' + this + '</td>';
                }else
                if(Math.abs(parseFloat(this))<= 0.03){
                    insert += '<td class="diviation_rate_25d important">' + Math.round(this*100*100)/100 + '%</td>'; 
                }else{
                    insert += '<td class="diviation_rate_25d">' + Math.round(this*100*100)/100 + '%</td>';
                }
            }else
            if(i==12){
                if(this =="diviation_rate_75d"){　//表頭が数値化しないように
                    insert += '<td>' + this + '%</td>';
                }else
                if(Math.abs(parseFloat(this))<= 0.03){
                    insert += '<td class="diviation_rate_75d important">' + Math.round(this*100*100)/100 + '%</td>';  
                }else{
                    insert += '<td class ="diviation_rate_75d">' + Math.round(this*100*100)/100 + '%</td>'; 
                }
                    
            }else
            if(i==7){
                if(this =="Change_ratio%"){　//表頭が数値化しないように
                    insert += '<td>' + this + '</td>';
                }else
                //正負判定
                if(Math.sign(parseFloat(this)) == 1){
                    insert += '<td class="positive">' + this + '%</td>';
                }else{
                    insert += '<td class="negative">' + this + '%</td>';

                }
            }else{
                insert += '<td>' + this + '</td>';
            }  
        });            
        insert += '</tr>';
        if(i==0){
            insert +="</thead><tbody class='tbody'>"
        }
        $(target).append(insert);    
    }
    $(target).append("</tbody>");
});
   
}

$(function(){
    //コールバック関数のきれいな使い方だ・・
    $.get(csvfile, readCsv, 'text');
});