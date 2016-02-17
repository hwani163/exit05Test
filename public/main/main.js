//임시 아이피
var ip='localhost';

getMemo();

function getMemo() {
	
	$.ajax('http://'+ip+':3000/memo/getListMemo.do', {
		method: 'post',
		dataType: 'json',
		 
		success: function(data) {


			var howManyMemos = data.length;
			for(var i=0; i<howManyMemos; i++){
				$( "#memoCon" ).append(
					'<div class=\"4u 12u$(mobile)\">'
					+'<textarea id=\"memoContents'+i+'\" class=\"image fit box\" rows=\"6\" cols=\"10\"></textarea>'
					+'<span>'+data[i].time+'</span>'
					+'</div>');
				$('#memoContents'+(i)).val(data[i].contents);
			}
			console.log(data);


		},
		error: function(xhr, textStatus, errorThrown) {
			//alert('db 를 불러올 수 없다');

		}
	});
}

$('#submitButton').click(function (e) {

	var allData = { "contents": $('#newMemo').val()};
	console.log(allData);
	if(allData.contents!='') {
		alert('메모를 저장 중 입니다.');
		$.ajax({
			url: "http://" + ip + ":3000/memo/insertMemo.do",
			type: 'POST',
			data: allData,
			error: function (jqXHR, textStatus, errorThrown) {
				//alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
				//self.close();
			}
		});
		getMemo();
	}

});


