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
            //銘柄名押下で銘柄詳細に飛ぶ
            if(j==1){
                var qcode =csv[i][0]
                var detail_parameter= {
                    sa :'find',
                    ta :'n',
                    wd: qcode,
                    x:'0',
                    y:'0'
                  };

                var  parameter = $.param(detail_parameter );
                var detail_url = detail_url_origin+ parameter
                insert += '<td class="quote_name"><a href=' + detail_url+ '>' + this + '</a></td>';
                
            }else
            if(j==3){
                var qcode =csv[i][0]
                var quote_name =csv[i][1]
                var kobetu_ja_url ='stock_kobetu_ja.html?qcode='+qcode+ '&quote_name='+encodeURIComponent(quote_name)
                console.log(kobetu_ja_url)

                if(parseFloat(this)<= 5 &&parseFloat(this)>= 0){
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
};   
//stock_kobetu_ja.htmlへのリンク作成
//$(".ma_25s").each(function(i, d){
//    $(".ma_25s").append("<a></a>")
//
//    //コンソールにインデックス番号とテキストを出力する
//    console.log('インデックス番号:' + i + '、テキスト:' + $(d).text());
//  });
//
function change_quote(type){
    //alert(url);
    if(type=="add"){
        var quote_add =$('#quote_add_val').val();
        if(quote_add==""){
            alert('追加銘柄を入力してください')
            return;
        }
        var parameter = {
          quote :quote_add,
          type :'add',
          market:'ja'
        };
    }else
    if(type=="delete"){
        var quote_delete =$('#quote_delete_val').val();
        if(quote_delete==""){
            alert('削除銘柄を入力してください')
            return;
        }

        var parameter = {
          quote :quote_delete,
          type :'delete',
          market:'ja'
        };
    }
    
    parameter = $.param( parameter );
    url =url+ parameter;
    alert(url);
    $.get(url,function(data){
      location.reload(true)
      alert(data);
    });
};


//csvファイルを読み込むときキャッシュ除け設定
$.ajaxSetup({
    cache: false
});

//csvファイル読み込み
$(function(){
    $.ajax({
    url: csvfile,
    type: 'GET',
    beforeSend: function( xhr, settings ) { xhr.setRequestHeader('Authorization','Basic '+ authorization_token
     ); },
    dataType: 'text'
  }).done(function(data) {
    readCsv(data);
  })
    .fail(function(XMLHttpRequest, textStatus, errorThrown){
    console.log(XMLHttpRequest.status);
    console.log(textStatus);
    console.log(errorThrown);
});

//quote登録と削除API呼び出し
    $('#quote_add').on('click',function(){
    //alert("クリックされました");
    change_quote('add')
    
    });
    $('#quote_delete').on('click',function(){
       //alert("クリックされました");
        change_quote('delete')
    });
});