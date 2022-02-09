 
    $(document).ready(function(){
    	var wishCount = '';
        changeToCart(wishCount);
    });

    function addList(currPage){
    	var params = {
				"currPage": currPage
		}
		var url ="/lifePlus/addList.json";
		$.ajax({
			type : 'POST'
			, url : url
			, dataType : 'json'
			, data : params
			, success : function(resData) {
				
				var result  = resData.result;
				var imgFilePath = resData.imgFilePath;
				var str="";
				$(".total-showing").text(resData.currentCount);
				if(resData.currPage != 'end'){
					$('.label').attr('onclick', 'addList(\'' + resData.currPage + '\')');
				} else{
					$('.view-more').hide();
				}
				$.each(resData.list, function(){
    						
			    	str+="<li>";
					str+="<a href=\"/lifePlus/detail?lifepKey="+this.lifepKey +"\">";
					str+="	<div class=\"img lazyload\">";
					str+="		<img src=\""+imgFilePath+this.thumbnail+"\" class=\"lazyload\" alt=\"\">";
					str+="	</div>";
					str+="	<div class=\"title\">";
					str+=this.title;
					str+="	</div>";
					str+="</a> ";
					str+="</li>"; 
    	
				});
				$(".life-list-2").append(str);
				
			}
		});
		
	}
    