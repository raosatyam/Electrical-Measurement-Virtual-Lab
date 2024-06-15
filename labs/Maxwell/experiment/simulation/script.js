function touchHandler(event) {
  var touch = event.changedTouches[0];

  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(
    {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup",
    }[event.type],
    true,
    true,
    window,
    1,
    touch.screenX,
    touch.screenY,
    touch.clientX,
    touch.clientY,
    false,
    false,
    false,
    false,
    0,
    null
  );

  touch.target.dispatchEvent(simulatedEvent);
}

function init() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
}

init();


var xy;
xy = Math.floor(Math.random() * 1000 + 1);
xy = xy / 100;
if (xy < 1) xy += 1;
if (xy > 9) xy -= 1;
console.log("xy", xy);
var data1 = document.getElementById("data1").value;
var data2 = document.getElementById("data2").value;
var data3 = document.getElementById("data3").value;
var data4 = document.getElementById("data4").value;
var data5 = document.getElementById("data5").value;
var data6 = document.getElementById("data6").value;
// console.log("dat1", data1);

var data11 = 1;
var data12 = "BALANCED";
var induct;
var difference_bt;
var val1, val2, val3;

function calculate_ind() {
  var data1 = document.getElementById("data1").value;
  var data2 = document.getElementById("data2").value;
  var data3 = document.getElementById("data3").value;
  var data4 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var data6 = document.getElementById("data6").value;
  
  induct = (10 * data2) / data3;
  val1 = induct.toFixed(1);
  induct = induct.toFixed(2);
  
  var a = data4,
  b = data5,
  c = data1;
  
    difference_bt = induct - xy;
  difference_bt = difference_bt / xy;
  difference_bt = difference_bt * 10;
  difference_bt = difference_bt.toFixed(2);
  val2 = xy.toFixed(1);
  // console.log("data4,data5", a, b, c);
  if (data4 == "0" || data5 == "") {
    difference_bt = "__.__";
  }
  document.getElementById("demo9").innerHTML = difference_bt;
  if (difference_bt == "__.__") {

  }
  else if (difference_bt < 0) {
    var audio = new Audio('../images/audio1_detector.mp3');
    audio.play();
    var temp1 = (-0.1) * difference_bt;
    temp1 = Math.min(0.5, temp1);

    audio.volume = temp1;

    // swal("Unbalanced");
    audio.addEventListener("canplaythrough", function () {
      setTimeout(function () {
        audio.pause();
      },
        3000);
    }, false);
  }
  else if (difference_bt > 0) {
    var audio = new Audio('../images/audio2_detector.mp3');
    audio.play();
    // audio.volume=0.1;
    var temp1 = (0.1) * difference_bt;
    temp1 = Math.min(0.5, temp1);

    audio.volume = temp1;

    // swal("Unbalanced");
    audio.addEventListener("canplaythrough", function () {
      setTimeout(function () {
        audio.pause();
      },
        3000);
    }, false);

  }
}
var flag1 = 0;
function check_value() {
  var data1 = document.getElementById("data1").value;
  var data2 = document.getElementById("data2").value;
  var data3 = document.getElementById("data3").value;
  var data4 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var data6 = document.getElementById("data6").value;

  // console.log("val11", xy, "val112", difference_bt);
  if (data1 == "" || data2 == "" || data3 == "" || data4 == "" || data5 == "") {
    swal("Fill empty values");
    return;
  }
  if (data6 == "") {
    swal("Enter inductor value");
    return;
  }
  // console.log("xxx",data6,val3);
  val3 = Number(data6).toFixed(1);
  // console.log("val1", val1, "val2", val2);
  // console.log("xyz", val1, val2, val3);
  if (val2 == val3) {
    swal("Balanced Bridge");
    flag1 = 1;
  } else {
    swal("Enter Correct value of inductance");
  }
}

function addRows() {
  // Get user inputs
  if (flag1 == 0) {
    swal("Enter Correct value of inductance");
    return;
  }
  flag1 = 0;
  var data1 = document.getElementById("data1").value;
  var data2 = document.getElementById("data2").value;
  var data3 = document.getElementById("data3").value;
  var data4 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var induc = document.getElementById("data6").value;

  var data11 = 1;
  var data12 = "BALANCED";
  if (data1 == "" || data2 == "" || data3 == "" || data4 == "" || data5 == "") {
    swal("Fill empty values");

    return;
  }

  // for (var i = 1; i <= 300; i++) {
  //   let x = Math.floor((Math.random() * 1000) + 1);
  //   x=x/100;
  //   console.log("x",x);
  // }
  // Create a new table row for each input value
  var row = document.createElement("tr");
  var cur;
  if (data1 * data2 == data3 * data4) cur = "Balanced";
  else {
    var vid = data5 * (data3 / (data1 + data3) - data4 / (data2 + data4));
    cur = vid / 10;
    cur = cur.toFixed(2);
    // cur=curr;
  }
  var tem1 = (50 * data2) / data3;
  tem1 = tem1.toFixed(1);
  var cell = document.createElement("td");
  cell.innerHTML = tem1;
  row.appendChild(cell);
  var cell = document.createElement("td");
  cell.innerHTML = 50;
  row.appendChild(cell);
  document.getElementById("myTable").appendChild(row);
  for (var i = 2; i <= 3; i++) {
    // Get the value of the current input field
    var data = eval("data" + i);

    // Create a new table row element

    // Create a new table data element
    var cell = document.createElement("td");
    cell.innerHTML = data;

    // Add the table data to the table row
    row.appendChild(cell);

    // Add the table row to the table
    document.getElementById("myTable").appendChild(row);
  }
  var cell = document.createElement("td");
  cell.innerHTML = 10;
  row.appendChild(cell);
  var cell = document.createElement("td");
  cell.innerHTML = induc; //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  row.appendChild(cell);
  document.getElementById("myTable").appendChild(row);

  for (var i = 1; i <= 3; i++) {
    document.getElementById("data" + i).value = 0;
  }
  var cell = document.createElement("td");
  cell.innerHTML = data4 + "Volt, " + data5 + "Hz ";
  row.appendChild(cell);
  var cell = document.createElement("td");
  cell.innerHTML = "Yes";
  row.appendChild(cell);
  document.getElementById("myTable").appendChild(row);

  xy = Math.floor(Math.random() * 1000 + 1);
  xy = xy / 100;
  if (xy < 1) xy += 1;

if (xy > 9) xy -= 1;
  console.log("xy", xy);
  calculate_ind();
}


function toggleTab1() {
  var tab = document.getElementById("instruction");
  if (tab.style.display === "none") {
    tab.style.display = "block";
  } else {
    tab.style.display = "none";
  }
}
function toggleTab2() {
  var tab = document.getElementById("observation_table");
  if (tab.style.display === "none") {
    tab.style.display = "block";
  } else {
    tab.style.display = "none";
  }
}
function toggleTab3() {
  var tab = document.getElementById("formula");
  if (tab.style.display === "none") {
    tab.style.display = "block";
  } else {
    tab.style.display = "none";
  }
}
function toggleTab4() {
  var tab = document.getElementById("input_data");
  if (tab.style.display === "none") {
    tab.style.display = "block";
  } else {
    tab.style.display = "none";
  }
}
function disableDiv() {
  var div1 = document.getElementById("diagram");
  var div2 = document.getElementById("toolbox");

  div1.classList.add("no-pointer-events");
  div2.classList.add("no-pointer-events");
}
// const mydiv=document.getElementById('mydiv');
// var data4=1;let l_ratio=1;


// function yourJsFunction(){
// //mydiv.style.display="none";

// var data1 = document.getElementById("data1").value;
// var data2 = document.getElementById("data2").value;
// var data4 = document.getElementById("data4").value;
// var data5 = document.getElementById("data5").value;
// var data3 = document.getElementById("data6").value;


// if(data1=="" || data2=="" || data4=="" || data5=="" )
// 			{
// 				swal("Fill empty values");

// 				return;}


//       if(data1<=0 || data2<=0 || data4<=0 || data5<=0 )
// 			{
// 				swal("Invalid Values");

// 				return;}
// 			// Create a new table row for each input value

//             var row = document.createElement("tr");
//             var cur=l_ratio*0.01;







//       const arr=[data1,data2,data3,data4,data5];

//       console.log(data3);

//       if(l_ratio==data4/data3 && l_ratio==data2/data1){
//        // document.getElementById("light1").innerHTML+=`<h4>Bridge is Balanced</h4>
//        // <h5>Equivalent Resistance:</h5><b> `+ frac(1)(r1+r3)+ ` </b>`;
//        swal("Balanced Bridge");
//        for (var i = 1; i <= 5; i++) {
// 				// Get the value of the current input field
// 				var data = arr[i-1];

// 				// Create a new table row element

// 				// Create a new table data element
// 				var cell = document.createElement("td");
// 				cell.innerHTML = data;

// 				// Add the table data to the table row
// 				row.appendChild(cell);

// 				// Add the table row to the table
// 				document.getElementById("myTable").appendChild(row);
// 			}


//     var cell = document.createElement("td");
//     cell.innerHTML = cur+"mH";
//     row.appendChild(cell);
//     document.getElementById("myTable").appendChild(row);


//       }


//       else if(l_ratio==data4/data3 || l_ratio==data2/data1){
//         var audio = new Audio('audio2_detector.mp3');
//         audio.play();
//         audio.volume=0.2;
//         swal("Unbalanced");
//         audio.addEventListener("canplaythrough", function () {
//           setTimeout(function(){
//               audio.pause();
//           },
//           5000);
//   }, false); 

//       }

//       else{
//         var audio = new Audio('audio1_detector.mp3');
//         audio.play();
//         audio.volume=0.1;
//         swal("Unbalanced");
//         audio.addEventListener("canplaythrough", function () {
//           setTimeout(function(){
//               audio.pause();
//           },
//           3000);
//   }, false); 

//       }
// }




var count1 = 1, count2 = 1, count3 = 1, count4 = 1;
// https://stackoverflow.com/a/2117523
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
instance = jsPlumb.getInstance({});
instance.setContainer("diagram");
instance.bind("ready", function () {
  instance.registerConnectionTypes({
    "red-connection": {
      paintStyle: { stroke: "blue", strokeWidth: 5 },
      hoverPaintStyle: { stroke: "blue", strokeWidth: 8 },
      connector: "Flowchart",
    },
  });
  /*instance.draggable("control1", {"containment": true});
  instance.draggable("control2", {"containment": true})
  instance.addEndpoint("control1", {
    endpoint: "Dot",  // rectangle, blank, image
    anchor: ["RightMiddle"],
    isSource: true,
    connectionType: "red-connection"
  });
  instance.addEndpoint("control2", {
    endpoint: "Dot",
    anchor: ["LeftMiddle"],
    isTarget: true,
    connectionType: "red-connection"
  });*/

  // https://stackoverflow.com/a/4502207
  instance.bind("contextmenu", function (component, event) {
    if (component.hasClass("jtk-connector")) {
      event.preventDefault();
      window.selectedConnection = component;
      $(
        "<div class='custom-menu'><button class='delete-connection'>Delete connection</button></div>"
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + "px" });
    }
  });

  $("body").on("click", ".delete-connection", function (event) {
    instance.deleteConnection(window.selectedConnection);
  });

  $(document).bind("click", function (event) {
    $("div.custom-menu").remove();
  });

  $("body").on("contextmenu", "#diagram .control", function (event) {
    event.preventDefault();
    window.selectedControl = $(this).attr("id");
    // console.log(window.selectedControl);
    $("<div class='custom-menu'><button class='delete-control'>Delete control</button></div>")
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });



  $("body").on("click", ".delete-control", function (event) {
    instance.remove(window.selectedControl);

  });

  $("#toolbox .control").draggable({
    helper: "clone",
    containment: ".body",
    appendTo: "#diagram"
  });


  $("#diagram").droppable({
    drop: function (event, ui) {
      var id;
      var clone = $(ui.helper).clone(true);
      var s = clone.attr("class");
      if (s[8] == 'r') {
        id = s[8] + count1.toString();
        count1++;
      }
      else if (s[8] == 'v') {
        id = s[8] + count2.toString();
        count2++;
      }
      else if (s[8] == 'n') {
        id = s[8] + count3.toString();
        count3++;
      }
      else if (s[8] == 'l') {
        id = s[8] + count4.toString();
        count4++;
      }


      clone.attr("id", id);
      clone.appendTo(this);

      instance.draggable(id, { containment: true });


      if (id[0] == 'v') {

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isSource: true, 
          paintStyle: { fill: "red" },
          connectionType: "red-connection"
        });

        instance.addEndpoint(id, {
          endpoint: "Dot", 
          maxConnections: 2,
          anchor: ["Right"],
          
          isTarget: true,
          connectionType: "red-connection"
        });

      }
      else if (id[0] == 'n') {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection"
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          anchor: ["Right"], 
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection"
        });

      }
      else {
        instance.addEndpoint(id, {
          endpoint: "Dot", 
          maxConnections: 2,
          anchor: ["Right"], 
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection"
        });

        instance.addEndpoint(id, {
          endpoint: "Dot", 
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection"
        });
      }
    }
  })

});


// var slider1 = document.getElementById("data1");
// var output1 = document.getElementById("demo1");
// output1.innerHTML = slider1.value;
// var slider2 = document.getElementById("data2");
// var output2 = document.getElementById("demo2");
// output2.innerHTML2 = slider2.value;
// var slider3 = document.getElementById("data3");
// var output3 = document.getElementById("demo3");
// output3.innerHTML3 = slider3.value;
// slider1.oninput = function () {
//   data1 = this.value;
//   output1.innerHTML = this.value;
// };
// slider2.oninput = function () {
//   data2 = this.value;
//   output2.innerHTML = this.value;
// };
// slider3.oninput = function () {
//   data3 = this.value;
//   output3.innerHTML = this.value;
// };



document.getElementsByTagName("button")[0].onclick = contagem;

function contagem() {
  var p_top=document.querySelector('#diagram').getBoundingClientRect().top;
  var p_left=document.querySelector('#diagram').getBoundingClientRect().left;

    var allConnections = instance.getConnections({
        //scope: "someScope"
    });
    const Tid=[];const Sid=[];
    //alert(allConnections.length);
    for (var i = 0; i < allConnections.length; i++) {
        var target = allConnections[i].targetId;
        var source = allConnections[i].sourceId;
        Tid[i]=target;
        Sid[i]=source;
    }
    const set1=new Set();
    for(var i=0;i<Tid.length;i++){
         set1.add(Tid[i]);
    }
    const arr=[...set1].sort();
    const set_1=new Set(arr);
    const set2=new Set();
    for(var i=0;i<Sid.length;i++){
         set2.add(Sid[i]);
    }
    const arr1=[...set2].sort();const arr_r=[];const arr_l=[];
    var c_r=0,c_v=0,c_l=0,c_n=0,s_v,j=0,k=0;
    for(var i=0;i<arr1.length;i++){
       if(arr1[i][0]=='r')
       {c_r++;arr_r[j]=arr1[i];j++;}
       else if(arr1[i][0]=='v')
       {c_v++;s_v=arr1[i];}
       else if(arr1[i][0]=='l')
       {c_l++; arr_l[k]=arr1[i];k++;}
       else
       c_n++;
    }
    const set_2=new Set(arr1);
    // console.log(arr_r);
    if(Tid.length!=10 || Sid.length!=10 || !setsAreEqual(set_1,set_2) || c_r!=4 || c_v!=1 || c_n!=1 || c_l!=2){
      swal("Wrong Connections");
    }
    else{
      var amp={};
      for(var i=0;i<Sid.length;i++){
        amp[Sid[i]]=amp[Sid[i]] || [];
        amp[Sid[i]].push(Tid[i]);
      }
      for(var i=0;i<Tid.length;i++){
        amp[Tid[i]]=amp[Tid[i]] || [];
        amp[Tid[i]].push(Sid[i]);
      }
      // console.log(amp);
      const s_element=new Set();
      var s=amp[arr[2]][0];
      s_element.add(s);
      const r_pos=[],l_pos=[];
      if(s[0]!='r' ||amp[s].length!=3 || (amp[s][0]!=arr[7] && amp[s][0][0]!='l') ){
        swal("Wrong Connection");
      }
      else{
        if(amp[s][0]==arr[7]){

        var r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom-p_top;
        var r_left=document.querySelector('#'+s + '').getBoundingClientRect().left -p_left;
        r_pos[2]=[r_top,r_left];

          if(amp[s][2]!=arr[2])
          s=amp[s][2];
          else
           s=amp[s][1];
          
        if(s[0]!='r' ||amp[s].length!=2 || amp[s][1][0]!='l'){
          swal("Wrong Connection");
        }
        else{

        r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom -p_top;
        r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
        r_pos[0]=[r_top,r_left];




          s=amp[s][1];
          if(s[0]!='l' ||amp[s].length!=2 || amp[s][1]!=arr[7]){
            swal("Wrong Connection");
          }
          else{

            r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom -p_top;
            r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
            l_pos[0]=[r_top,r_left];


            s=amp[arr[2]][1];
            if(s[0]!='r' ||amp[s].length!=3 || amp[s][2][0]!='l'){
              swal("Wrong Connection");
            }
            else{

              r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom -p_top;
              r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
              r_pos[1]=[r_top,r_left];


              s=amp[s][2];
          if(s[0]!='l' ||amp[s].length!=2 || amp[s][1]!=arr[7]){
            swal("Wrong Connection");
          }

          else{

            r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom -p_top;
            r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
            l_pos[1]=[r_top,r_left];





            if(amp[amp[s][0]][1]!=arr[2])
          s=amp[amp[s][0]][1];
          else
           s=amp[amp[s][0]][0];
           if(s[0]!='r' ||amp[s].length!=2 || amp[s][0]!=arr[7]){
            swal("Wrong Connection");
          }

          else{

            r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom -p_top;
            r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
            r_pos[3]=[r_top,r_left];


            swal("Right Connections...Go Ahead!!");

              l_ratio=Math.max(Math.floor((Math.random()*5) + 1),1); 
              // console.log(l_ratio);


      var q1 = document.getElementById("meter_check");
      q1.removeAttribute("disabled");
      // var q2 = document.getElementById("data5");
      // q2.removeAttribute("disabled");
      var q3 = document.getElementById("data2");
      q3.removeAttribute("disabled");
      var q4 = document.getElementById("data3");
      q4.removeAttribute("disabled");
      var q5 = document.getElementById("data4");
      q5.removeAttribute("disabled");
      var q6 = document.getElementById("data6");
      q6.removeAttribute("disabled");
      var q7 = document.getElementById("btn1");
      q7.removeAttribute("disabled");
      var q8 = document.getElementById("btn2");
      q8.removeAttribute("disabled");
      var q9 = document.getElementById("myrange1");
      q9.removeAttribute("disabled");
      var q10 = document.getElementById("myrange2");
      q10.removeAttribute("disabled");
      




              var v_top=document.querySelector('#'+s_v + '').getBoundingClientRect().bottom - p_top;
              var v_left=document.querySelector('#'+s_v + '').getBoundingClientRect().left - p_left;

              $("<div id='abcd' style = 'position: absolute;top:"+v_top +"px ; left:"+ v_left+"px ;'><b>+  V,f  -</b></div>")
              .appendTo("#diagram");
              $(
                "<div style = 'position: absolute;top:" +
                  (v_top - 35) +
                  "px ; left:" +
                  (v_left + 150) +
                  "px ;'><img src='../images/ground_img.png'></div>"
              ).appendTo("#diagram");
    


              for(var i=0;i<4;i++){
                $("<div id='r1_tag' style = 'position: absolute;top:"+r_pos[i][0] +"px ; left:"+ r_pos[i][1]+"px ;'><b>R"+(i+1)+"</b></div>")
              .appendTo("#diagram");
              }


              $("<div id='r1_tag' style = 'position: absolute;top:"+l_pos[0][0] +"px ; left:"+ l_pos[0][1]+"px ;'><b>L"+1+"(unknown)</b></div>")
              .appendTo("#diagram");
              $("<div id='r1_tag' style = 'position: absolute;top:"+l_pos[1][0] +"px ; left:"+ l_pos[1][1]+"px ;'><b>L"+2+"</b></div>")
              .appendTo("#diagram");




              mydiv.style.display="block";

                var div1 = document.getElementById("diagram");
                var div2 = document.getElementById("toolbox");
                
                div1.classList.add("no-pointer-events");
                div2.classList.add("no-pointer-events");


          }



            
          }
            }
          }

        }


        }

        else{

          r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
          r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
          r_pos[0]=[r_top,r_left];


          if(amp[s][2]!=arr[2])
          s=amp[s][2];
          else
           s=amp[s][1];
          
        if(s[0]!='r' ||amp[s].length!=2 || amp[s][1]!=arr[7]){
          swal("Wrong Connection");
        }
        else{

          r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
          r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
          r_pos[2]=[r_top,r_left];



            s=amp[arr[2]][1];
            if(s[0]!='r' ||amp[s].length!=3 || amp[s][2]!=arr[7]){
              swal("Wrong Connection");
            }
            else{

              r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
              r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
              r_pos[3]=[r_top,r_left];

              if(amp[s][0]!=arr[2])
              s=amp[s][0];
              else
               s=amp[s][1];

               if(s[0]!='r' ||amp[s].length!=2 || amp[s][0][0]!='l'){
                swal("Wrong Connection");
              }
              else{

                r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
                r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
                r_pos[1]=[r_top,r_left];




                s=amp[s][0];
                if(s[0]!='l' ||amp[s].length!=2 || amp[s][0]!=arr[7]){
                  swal("Wrong Connection");
                }

                else{

                  r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
                  r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
                  l_pos[1]=[r_top,r_left];




                  s=amp[amp[arr[2]][0]][0];
                  if(s[0]!='l' ||amp[s].length!=2 || amp[s][0]!=arr[7]){
                    swal("Wrong Connection");
                  }
                  else{

                    r_top=document.querySelector('#'+s + '').getBoundingClientRect().bottom +p_top;
                    r_left=document.querySelector('#'+s+ '').getBoundingClientRect().left -p_left;
                    l_pos[0]=[r_top,r_left];




                    swal("Right Connections...Go Ahead!!");

                    var v_top=document.querySelector('#'+s_v + '').getBoundingClientRect().bottom + p_top;
                    var v_left=document.querySelector('#'+s_v + '').getBoundingClientRect().left - p_left;

                    $("<div id='abcd' style = 'position: absolute;top:"+v_top +"px ; left:"+ v_left+"px ;'><b>+ V,f -</b></div>")
                    .appendTo("#diagram");
                      $(
            "<div style = 'position: absolute;top:" +
              (v_top - 35) +
              "px ; left:" +
              (v_left + 150) +
              "px ;'><img src='../images/ground_img.png'></div>"
          ).appendTo("#diagram");



                    for(var i=0;i<4;i++){
                      $("<div id='r1_tag' style = 'position: absolute;top:"+r_pos[i][0] +"px ; left:"+ r_pos[i][1]+"px ;'><b>R"+(i+1)+"</b></div>")
                    .appendTo("#diagram");
                    }
      
      
                    $("<div id='r1_tag' style = 'position: absolute;top:"+l_pos[0][0] +"px ; left:"+ l_pos[0][1]+"px ;'><b>L"+1+"(unknown)</b></div>")
                    .appendTo("#diagram");
                    $("<div id='r1_tag' style = 'position: absolute;top:"+l_pos[1][0] +"px ; left:"+ l_pos[1][1]+"px ;'><b>L"+2+"</b></div>")
                    .appendTo("#diagram");



                    mydiv.style.display="block";

                    var div1 = document.getElementById("diagram");
                    var div2 = document.getElementById("toolbox");
                    
                    div1.classList.add("no-pointer-events");
                    div2.classList.add("no-pointer-events");




                  }
                }


              }



        }





        }

      }

      }


    }

    
    //jsPlumb.removeAllEndpoints("item_input");
}
function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every(element => {
    return b.has(element);
  });
}
