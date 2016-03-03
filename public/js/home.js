$(function(){
  $.ajax({
    url:'http://localhost:1337/api/articles',
    success: function(data){
      for(i=0;i<data.length;i++){
        var dtlhome = document.getElementById("dtlhome");

        var div1 = document.createElement("div");
        $(div1).addClass("col-md-4");
        var p1 = document.createElement("p");
        $(p1).addClass("text-center img");
        $(p1).html(data[i].title);

        var img = document.createElement("img");
        $(img).attr("src","../res/book1.jpg");
        img.attr("id",data[i].id);
        // $("img").src()

         div1.appendChild(img);
         dtlhome.appendChild(div1);
         div1.appendChild(p1);
         div1.insertBefore(p1,img);
         $(img).click(function(){


         })


      }
    }
  })
});