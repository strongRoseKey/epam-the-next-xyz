$(function(){

  var pathname = window.location.pathname;

 var id=pathname.substring(pathname.length-1);
  $.ajax({
    url:'http://localhost:1337/api/articles/'+id,
    console.log("url:PPPPPP  "url);
    success: function(data){
//       for(i=0;i<data.length;i++){
//         var dtlhome = document.getElementById("dtlhome");

//         var div1 = document.createElement("div");
//         $(div1).addClass("col-lg-2 col-md-4 col-sm-6 ");
//         var p1 = document.createElement("p");
//         $(p1).addClass("text-center");
//         $(p1).html(data[i].title);
//         $(p1).attr("id","pheight");

//         var div11 = document.createElement("div");
//         $(div11).addClass("overlay");
//         var h2 = document.createElement("h2");
//         $(h2).attr("text","hahah");


//         var img = document.createElement("img");
//         $(img).attr("src",data[i].image);
//         $(img).attr("id",data[i].id);
//         $(img).attr("width","300px");
//         $(img).attr("height","180px");
//         $(img).attr("class","hovereffect img-responsive");





//         // $("img").src()

//          div1.appendChild(img);
//          div1.appendChild(div11);
//          dtlhome.appendChild(div1);
//          div1.appendChild(p1);
//          div1.insertBefore(p1,img);
//          div11.appendChild(h2);

//          // Variables
//           // @link-color:       @brand-primary;
//           // @link-hover-color: darken(@link-color, 15%);

//           // // Usage
//           // a {
//           //   color: @link-color;
//           //   text-decoration: none;

//           //   &:hover {
//           //     color: @link-hover-color;
//           //     text-decoration: underline;
//           //   }
//           // }

// // Note that the @link-hover-color uses a function,
// // another awesome tool from Less,
// // to automagically create the right hover color.
// // You can use darken, lighten, saturate, and desaturate.
//          $(img).click(function(){



//          })


//       }

  console.log("xixixixixi");
    }
  });
});