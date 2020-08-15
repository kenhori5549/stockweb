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
            arr =this
            console.log('this',this.length,this)


        //for (i=0;i<10;i++){
         //       if(i =3){
        //            console.log(arr[i])
        //            insert +='<td class ="ma25">'+ arr[i]+'</td>';
        //        }
        //        else{
         //           insert +='<td>'+ arr[i]+'</td>';
         //       }
        $(this).each(function(j) {
            if(j==0){
                insert += '<td class="rowhead">' + this + '</td>';
            }else
            if(j==3){
                var qcode =csv[i][0]
                var quote_name =csv[i][1]
                var kobetu_ja_url ='stock_kobetu_ja.html?qcode='+qcode+ '&quote_name='+encodeURIComponent(quote_name)
                console.log(kobetu_ja_url)

                if(Math.abs(parseFloat(this))<= 4){
                    insert += '<td class="ma_25s important"><a href=' + kobetu_ja_url+ '>' + this + '</a></td>';
                    //console.log("25ma important",parseFloat(this)); 
                }else{
                    insert += '<td class="ma_25s"><a href=' + kobetu_ja_url+ '>' + this + '</a></td>';
                    //console.log("25ma important",parseFloat(this));
                }

            }else
            if(j==5){
                if(parseFloat(this)>=80){
                    insert += '<td class="pers bg-danger">' + this + '</td>';
                }else{
                    if(parseFloat(this)>=40){
                        insert += '<td class="pers bg-warning">' + this + '</td>';
                    }else{
                        if(parseFloat(this)>=20){
                            insert += '<td class="pers bg-success">' + this + '</td>';
                        }else{
                            if(parseFloat(this)>=10){
                                insert += '<td class="pers bg-info">' + this + '</td>';
                            }else{
                                insert += '<td class="pers">' + this + '</td>';
                            }
                        }
                    }
                }
            }


        else
            if(j==7){
                //正負判定
                if(Math.sign(parseFloat(this)) == 1){
                    if(20 <= parseFloat(this)){
                        insert += '<td class="op_averages important">' + this + '%</td>';
                       // console.log("op_averages important",parseFloat(this)); //最後の一文字をとって数値型に変換
                    }else
                    if(10 <= parseFloat(this)){
                        insert += '<td class="op_averages good">' + this + '%</td>';
                       // console.log("op_averages good",parseFloat(this)); //最後の一文字をとって数値型に変換
                    }else{
                        insert += '<td class="op_averages">' + this + '%</td>';
                        //console.log("op_averages",parseFloat(this)); //最初の一文字をとって数値型に変換
                    }
                }else{
                    insert += '<td class="op_averages">' + this + '%</td>';
                    //console.log("op_averages",parseFloat(this)); //最初の一文字をとって数値型に変換
                    //console.log("aaa")
                }
                    
            }else
            if(j==8){
                //正負判定
                if(Math.sign(parseFloat(this)) == 1){
                    if(20 <= parseFloat(this)){
                        insert += '<td class="eps important">' + this + '%</td>';
                        console.log("eps important",parseFloat(this)); //最後の一文字をとって数値型に変換
                    }else
                    if(10 <= parseFloat(this)){
                        insert += '<td class="eps good">' + this + '%</td>';
                       // console.log("op_averages good",parseFloat(this)); //最後の一文字をとって数値型に変換
                    }else{
                        insert += '<td class="eps">' + this + '%</td>';
                        //console.log("op_averages",parseFloat(this)); //最初の一文字をとって数値型に変換
                    }
                }else{
                    insert += '<td class="eps">' + this + '%</td>';
                    //console.log("op_averages",parseFloat(this)); //最初の一文字をとって数値型に変換
                    //console.log("aaa")
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
   
//stock_kobetu_ja.htmlへのリンク作成
//$(".ma_25s").each(function(i, d){
//    $(".ma_25s").append("<a></a>")
//
//    //コンソールにインデックス番号とテキストを出力する
//    console.log('インデックス番号:' + i + '、テキスト:' + $(d).text());
//  });


//
}

$(function(){
    //コールバック関数のきれいな使い方だ・・
    $.get(csvfile, readCsv, 'text');
});