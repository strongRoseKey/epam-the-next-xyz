$(function(){
  $.ajax({
    url:'http://localhost:1337/api/articles',
    success: function(data){
      for(i=0;i<data.length;i++){
        var dtlhome = document.getElementById("dtlhome");

        var div1 = document.createElement("div");
        $(div1).addClass("col-lg-3 col-md-4 col-sm-6 ");
        var p1 = document.createElement("p");
        $(p1).addClass("text-center");
        $(p1).html(data[i].title);
        $(p1).attr("id","pheight");

        var div11 = document.createElement("div");
        $(div11).addClass("overlay");
        var h2 = document.createElement("h2");
        $(h2).attr("text","hahah");


        var img = document.createElement("img");
        $(img).attr("src",data[i].image);
        $(img).attr("id",data[i]._id);
        $(img).attr("width","300px");
        $(img).attr("height","180px");
        $(img).attr("class","hovereffect img-responsive");
        var link = "/api/articles/" + data[i]._id;

        var a = document.createElement("a");
        $(a).attr("href", link);

         div1.appendChild(a);
         a.appendChild(img);
         div1.appendChild(div11);
         dtlhome.appendChild(div1);
         div1.appendChild(p1);
         div11.appendChild(h2);
      }
    }
  });
});