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

const mydiv = document.getElementById("mydiv");
var data4 = 1,
  data3 = 1;

function meterupdate() {
  var data1 = document.getElementById("data1").value;
  var data5 = document.getElementById("data5").value;
  data3 = document.getElementById("data6").value;

  if (data1 == "" || data5 == "" || data3 == " ") {
    return;
  }

  r1 = parseFloat(data1);
  var data2 = 2;
  data1 = data2 * r1;
  data5 = parseFloat(data5);

  if (data1 <= 0 || data5 <= 0 || data3 <= 0) {
    return;
  }
  // Create a new table row for each input value

  var cur;

  var Vth =
    (data5 * (data2 * data3 - data1 * data4)) / (data1 + data2 + data3 + data4);
  var Rth =
    (data1 * data3) / (data1 + data3) + (data2 * data4) / (data2 + data4);
  cur = Vth / (Rth + 100);
  cur = cur.toFixed(5);
  var current = cur;
  cur += "Amp";

  if (Math.abs(r1 - data3 / data4) <= 0.1) {
    swal("I_g= 0.00 A ");
    return;
  }
  swal("I_g= " + cur);
}

function yourJsFunction() {
  //mydiv.style.display="none";

  var data1 = document.getElementById("data1").value;
  var data5 = document.getElementById("data5").value;
  data3 = document.getElementById("data6").value;

  if (data1 == "" || data5 == "" || data3 == " ") {
    swal("Fill empty values");

    return;
  }

  r1 = parseFloat(data1);
  var data2 = 2;
  data1 = data2 * r1;
  data5 = parseFloat(data5);

  if (data1 <= 0 || data5 <= 0 || data3 <= 0) {
    swal("Invalid Values");

    return;
  }
  // Create a new table row for each input value

  var row = document.createElement("tr");
  var cur;

  var Vth =
    (data5 * (data2 * data3 - data1 * data4)) / (data1 + data2 + data3 + data4);
  var Rth =
    (data1 * data3) / (data1 + data3) + (data2 * data4) / (data2 + data4);
  cur = Vth / (Rth + 100);
  cur = cur.toFixed(5);
  var current = cur;
  cur += "Amp";
  // cur=curr;

  const arr = [data1, data2, data3, data4, data5];

  console.log(data3 / data4);
  console.log(r1);

  if (Math.abs(r1 - data3 / data4) <= 0.1) {
    // document.getElementById("light1").innerHTML+=`<h4>Bridge is Balanced</h4>
    // <h5>Equivalent Resistance:</h5><b> `+ frac(1)(r1+r3)+ ` </b>`;
    swal("Balanced Bridge");
    for (var i = 1; i <= 5; i++) {
      // Get the value of the current input field
      var data;
      if (i == 4) data = data3 / r1;
      else data = arr[i - 1];
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
    cell.innerHTML = 0.0 + " Amp";
    row.appendChild(cell);
    document.getElementById("myTable").appendChild(row);
  } else {
    swal("Unbalanced Bridge I_g= " + cur);
  }
}

var count1 = 1,
  count2 = 1,
  count3 = 1;
// https://stackoverflow.com/a/2117523
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
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
    console.log(window.selectedControl);
    $(
      "<div class='custom-menu'><button class='delete-control'>Delete control</button></div>"
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });

  /*$("body").on("click","#diagram .control",function(event){
           var id_div=$(this).attr("id");
           document.querySelector("#"+id_div+"").style.transform
                            = 'rotate(45deg)';
           instance = jsPlumb.getInstance({});
         
         })*/

  $("body").on("click", ".delete-control", function (event) {
    instance.remove(window.selectedControl);
  });

  $("#toolbox .control").draggable({
    helper: "clone",
    containment: ".body",
    appendTo: "#diagram",
  });

  $("#diagram").droppable({
    drop: function (event, ui) {
      var id;
      var clone = $(ui.helper).clone(true);
      var s = clone.attr("class");
      if (s[8] == "r") {
        id = s[8] + count1.toString();
        count1++;
      } else if (s[8] == "v") {
        id = s[8] + count2.toString();
        count2++;
      } else if (s[8] == "g") {
        id = s[8] + count3.toString();
        count3++;
      }
      clone.attr("id", id);
      clone.appendTo(this);

      /*
            var id1=id+'d';
            console.log(id1);
            var id2=id+'div';
            var left_p=clone.position().left;
            var top_p=clone.position().top;
            $("<div id="+id2+" style = 'position: relative;top:"+top_p +"px ; left:"+ left_p+"px ;'><form><input type='number' placeholder='Value' id="+ id1 +" style='width: 100px;'></form></div>")
            .appendTo("#diagram");
          var button = document.getElementById(id);
          var myDiv = document.getElementById(id2);
    
          function show() {
              myDiv.style.visibility = "visible";
          }
    
          function hide() {
              myDiv.style.visibility = "hidden";
          }
    
          function toggle() {
              if (myDiv.style.visibility === "hidden") {
                  show();
              } else {
                  hide();
              }
          }
    
          hide();
    
          button.addEventListener("click", toggle, false);
    
    */

      instance.draggable(id, { containment: true });
      //instance.setContainer("#"+id+"");

      if (id[0] == "v") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isSource: true,
          paintStyle: { fill: "red" },
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          isTarget: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "g") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection",
        });
      } else {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection",
        });
      }
    },
  });
});

var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;

document.getElementsByTagName("button")[0].onclick = contagem;

function contagem() {
  var allConnections = instance.getConnections({
    //scope: "someScope"
  });

  var p_top = document.querySelector("#diagram").getBoundingClientRect().top;
  var p_left = document.querySelector("#diagram").getBoundingClientRect().left;

  const Tid = [];
  const Sid = [];
  //alert(allConnections.length);
  for (var i = 0; i < allConnections.length; i++) {
    var target = allConnections[i].targetId;
    var source = allConnections[i].sourceId;
    Tid[i] = target;
    Sid[i] = source;
  }
  const set1 = new Set();
  for (var i = 0; i < Tid.length; i++) {
    set1.add(Tid[i]);
  }
  const arr = [...set1].sort();
  const set_1 = new Set(arr);
  const set2 = new Set();
  for (var i = 0; i < Sid.length; i++) {
    set2.add(Sid[i]);
  }
  const arr1 = [...set2].sort();
  const arr_r = [];
  var c_r = 0,
    c_v = 0,
    c_g = 0,
    s_v,
    j = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] == "r") {
      c_r++;
      arr_r[j] = arr1[i];
      j++;
    } else if (arr1[i][0] == "v") {
      c_v++;
      s_v = arr1[i];
    } else c_g++;
  }
  const set_2 = new Set(arr1);
  console.log(arr_r);
  if (
    Tid.length != 8 ||
    Sid.length != 8 ||
    !setsAreEqual(set_1, set_2) ||
    c_r != 4 ||
    c_v != 1 ||
    c_g != 1
  ) {
    swal("Wrong Connections");
  } else {
    var amp = {};
    for (var i = 0; i < Sid.length; i++) {
      amp[Sid[i]] = amp[Sid[i]] || [];
      amp[Sid[i]].push(Tid[i]);
    }
    for (var i = 0; i < Tid.length; i++) {
      amp[Tid[i]] = amp[Tid[i]] || [];
      amp[Tid[i]].push(Sid[i]);
    }
    console.log(amp);
    const s_element = new Set();
    var s = amp[arr[0]][0];
    s_element.add(s);
    const r_pos = [];
    if (s[0] != "r" || amp[s].length != 3 || amp[s][0] != arr[5]) {
      swal("Wrong Connection");
    } else {
      var r_top =
        document.querySelector("#" + s + "").getBoundingClientRect().bottom -
        p_top;
      var r_left =
        document.querySelector("#" + s + "").getBoundingClientRect().left -
        p_left +
        40;
      r_pos[3] = [r_top, r_left];

      r_top =
        document
          .querySelector("#" + amp[arr[0]][1] + "")
          .getBoundingClientRect().bottom - p_top;
      r_left =
        document
          .querySelector("#" + amp[arr[0]][1] + "")
          .getBoundingClientRect().left -
        p_left +
        40;
      r_pos[0] = [r_top, r_left];

      if (amp[s][2] != arr[0]) s = amp[s][2];
      else s = amp[s][1];

      if (
        s_element.has(s) ||
        s[0] != "r" ||
        amp[s].length != 2 ||
        amp[s][1] != arr[5]
      )
        swal("Wrong Connection");
      else {
        r_top =
          document.querySelector("#" + s + "").getBoundingClientRect().bottom -
          p_top;
        r_left =
          document.querySelector("#" + s + "").getBoundingClientRect().left -
          p_left +
          40;
        r_pos[1] = [r_top, r_left];

        s_element.add(s);
        s = amp[arr[0]][1];
        if (
          s[0] != "r" ||
          s_element.has(s) ||
          amp[s].length != 3 ||
          amp[s][2] != arr[5]
        )
          swal("Wrong Connection");
        else {
          s_element.add(s);
          if (amp[s][0] != arr[0]) s = amp[s][0];
          else s = amp[s][1];
          if (
            s[0] != "r" ||
            s_element.has(s) ||
            amp[s].length != 2 ||
            amp[s][0] != arr[5]
          )
            swal("Wrong Connection");
          else {
            r_top =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .bottom - p_top;
            r_left =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .left -
              p_left +
              40;
            r_pos[2] = [r_top, r_left];

            swal("Right Connections...Go Ahead!!");
            var q = document.getElementById("data1");
            q.removeAttribute("disabled");
            var e = document.getElementById("data5");
            e.removeAttribute("disabled");
            var f = document.getElementById("btn1");
            f.removeAttribute("disabled");
            data4 = Math.max(Math.floor(Math.random() * 10 + 1), 1);
            console.log(data4);

            var v_top =
              document.querySelector("#" + s_v + "").getBoundingClientRect()
                .bottom - p_top;
            var v_left =
              document.querySelector("#" + s_v + "").getBoundingClientRect()
                .left -
              p_left +
              40;

            $(
              "<b><div id='abcd' style = 'position: absolute;top:" +
                v_top +
                "px ; left:" +
                v_left +
                "px ;'>+  V -</div></b>"
            ).appendTo("#diagram");

            $(
              "<div style = 'position: absolute;top:" +
                (v_top - 35) +
                "px ; left:" +
                (v_left + 150) +
                "px ;'><img src='../images/ground_img.png'></div>"
            ).appendTo("#diagram");

            for (var i = 0; i < 3; i++) {
              $(
                "<b><div id='r1_tag" +
                  i +
                  "' style = 'position: absolute;top:" +
                  r_pos[i][0] +
                  "px ; left:" +
                  r_pos[i][1] +
                  "px ;'>R" +
                  (i + 1) +
                  "</div></b>"
              ).appendTo("#diagram");
            }

            $(
              "<b><div id='r1_tag" +
                3 +
                "' style = 'position: absolute;top:" +
                r_pos[3][0] +
                "px ; left:" +
                r_pos[3][1] +
                "px ;'>R" +
                4 +
                " (unknown)</div></b>"
            ).appendTo("#diagram");

            /*r_pos.sort(function(a, b) {
                    return a[0] - b[0];
                  });
                  console.log(r_pos);
                  if(r_pos[0][1]<r_pos[1][1]){
                  $("<div id='r1_tag' style = 'position: absolute;top:"+r_pos[0][0] +"px ; left:"+ r_pos[0][1]+"px ;'><b>R1</b></div>")
                  .appendTo("#diagram");
    
                  $("<div id='r3_tag' style = 'position: absolute;top:"+r_pos[1][0] +"px ; left:"+ r_pos[1][1]+"px ;'><b>R3</b></div>")
                  .appendTo("#diagram");
                  }
                  else{
                    $("<div id='r1_tag' style = 'position: absolute;top:"+r_pos[1][0] +"px ; left:"+ r_pos[1][1]+"px ;'><b>R1</b></div>")
                    .appendTo("#diagram");
    
                    $("<div id='r3_tag' style = 'position: absolute;top:"+r_pos[0][0] +"px ; left:"+ r_pos[0][1]+"px ;'><b>R3</b></div>")
                  .appendTo("#diagram");
                  }
    
                  if(r_pos[2][1]<r_pos[3][1]){
                    $("<div id='r2_tag' style = 'position: absolute;top:"+r_pos[2][0] +"px ; left:"+ r_pos[2][1]+"px ;'><b>R2</b></div>")
                    .appendTo("#diagram");
      
                    $("<div id='r4_tag' style = 'position: absolute;top:"+r_pos[3][0] +"px ; left:"+ r_pos[3][1]+"px ;'><b>R4</b></div>")
                    .appendTo("#diagram");
                    }
                    else{
                      $("<div id='r2_tag' style = 'position: absolute;top:"+r_pos[3][0] +"px ; left:"+ r_pos[3][1]+"px ;'><b>R2</b></div>")
                      .appendTo("#diagram");
      
                      $("<div id='r4_tag' style = 'position: absolute;top:"+r_pos[2][0] +"px ; left:"+ r_pos[2][1]+"px ;'><b>R4</b></div>")
                    .appendTo("#diagram");
                    }*/

            mydiv.style.display = "block";

            var div1 = document.getElementById("diagram");
            var div2 = document.getElementById("toolbox");

            div1.classList.add("no-pointer-events");
            div2.classList.add("no-pointer-events");
          }
        }
      }
      console.log(s_element);
    }
  }

  //jsPlumb.removeAllEndpoints("item_input");
}
function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every((element) => {
    return b.has(element);
  });
}
