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
var data4 = 1;
let c_ratio = 1;

function meterupdate() {
  var data1 = document.getElementById("data1").value;
  var data2 = document.getElementById("data2").value;
  var data4 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var data3 = document.getElementById("data6").value;
  var omega = 500;

  if (
    data1 <= 0 ||
    data2 <= 0 ||
    data4 <= 0 ||
    data5 <= 0 ||
    data3 <= 0 ||
    data5 == "s"
  ) {
    return;
  }

  var d1 = data1 * data4 - data2 * data3;
  var d2 = (data4 / c_ratio - data3) / (omega * 1e-9);
  var d3 = (data1 / c_ratio - data2) / (omega * 1e-9);
  d2 = Math.max(d2, d3);

  var rat = data5 / 220;

  var res = Math.sqrt(d1 * d1 + d2 * d2) / 9000000;
  res *= rat;
  res = res.toFixed(3);
  console.log(res);
  document.getElementById("digi").innerHTML = res;

  if (
    Math.abs(c_ratio - data4 / data3) < 0.1 &&
    Math.abs(c_ratio - data2 / data1) < 0.1
  ) {
    document.getElementById("digi").innerHTML = "0.00";
  } else if (Math.abs(c_ratio - data4 / data3) < 0.1) {
    var audio = new Audio("audio2_detector.mp3");
    audio.play();
    audio.volume = 0.2;

    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 5000);
      },
      false
    );
  } else if (Math.abs(c_ratio - data2 / data1) < 0.1) {
    var audio = new Audio("audio2_detector.mp3");
    audio.play();
    audio.volume = 0.2;
    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 5000);
      },
      false
    );
  } else {
    var audio = new Audio("audio1_detector.mp3");
    audio.play();
    audio.volume = 0.1;

    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 3000);
      },
      false
    );
  }

  /*if (Math.abs(c_ratio - ( data4/ data3))<0.1 && Math.abs(c_ratio - (data2 / data1))<0.1) {
      // document.getElementById("light1").innerHTML+=`<h4>Bridge is Balanced</h4>
      // <h5>Equivalent Resistance:</h5><b> `+ frac(1)(r1+r3)+ ` </b>`;
      document.getElementById("digi").innerHTML = 0;}

    else if (Math.abs(c_ratio -  (data4/ data3))<0.1) {
      var res=(( data2/ data1)-c_ratio)/100;
      res=res.toFixed(3);
      document.getElementById("digi").innerHTML = res;
      var audio = new Audio('audio2_detector.mp3');
      audio.play();
      audio.volume = 0.2;
      //swal("Unbalanced...Fix Ratio R2/R1");
      audio.addEventListener("canplaythrough", function () {
        setTimeout(function () {
          audio.pause();
        },
          5000);
      }, false);

    }


    else if(Math.abs(c_ratio - (data2 / data1))<0.1){
      var res=(( data4/ data3)-c_ratio )/100;
      res=res.toFixed(3);
      document.getElementById("digi").innerHTML = res;

      var audio = new Audio('audio2_detector.mp3');
      audio.play();
      audio.volume = 0.2;
     // swal("Unbalanced...Fix Ratio R4/R3");
      audio.addEventListener("canplaythrough", function () {
        setTimeout(function () {
          audio.pause();
        },
          5000);
      }, false);

    }


    else {
      var res = ((data4 / data3)-c_ratio) / 100;
    res = res.toFixed(3);
    document.getElementById("digi").innerHTML = res;

      var audio = new Audio('audio1_detector.mp3');
      audio.play();
      audio.volume = 0.1;
     // swal("Unbalanced");
      audio.addEventListener("canplaythrough", function () {
        setTimeout(function () {
          audio.pause();
        },
          3000);
      }, false);

    }*/
}

function yourJsFunction() {
  //mydiv.style.display="none";

  var data1 = document.getElementById("data1").value;
  var data2 = document.getElementById("data2").value;
  var data4 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var data3 = document.getElementById("data6").value;

  if (data1 == "" || data2 == "" || data4 == "" || data5 == "" || data3 == "") {
    swal("Fill empty values");

    return;
  }

  if (data1 <= 0 || data2 <= 0 || data4 <= 0 || data5 <= 0 || data3 <= 0) {
    swal("Invalid Values");

    return;
  }
  // Create a new table row for each input value

  var row = document.createElement("tr");
  var cur = c_ratio * 0.01;

  const arr = [data1, data2, data3, data4, data5];

  console.log(data3);

  if (
    Math.abs(c_ratio - data4 / data3) < 0.1 &&
    Math.abs(c_ratio - data2 / data1) < 0.1
  ) {
    // document.getElementById("light1").innerHTML+=`<h4>Bridge is Balanced</h4>
    // <h5>Equivalent Resistance:</h5><b> `+ frac(1)(r1+r3)+ ` </b>`;
    // document.getElementById("digi").innerHTML = 0;

    swal("Balanced Bridge");
    //console.log("x1111");
    for (var i = 1; i <= 5; i++) {
      // Get the value of the current input field
      var data = arr[i - 1];

      // Create a new table row element

      // Create a new table data element
      var cell = document.createElement("td");
      cell.innerHTML = data;

      // Add the table data to the table row
      row.appendChild(cell);

      // Add the table row to the table
      document.getElementById("myTable").appendChild(row);
    }

    cur = (data4 / data3) * 0.01;
    cur = cur.toFixed(4);
    var cell = document.createElement("td");
    cell.innerHTML = cur + "uF";
    row.appendChild(cell);
    document.getElementById("myTable").appendChild(row);
  } else if (Math.abs(c_ratio - data4 / data3) < 0.1) {
    /* var res=(( data2/ data1)-c_ratio);
      res/=100;
      res = res.toFixed(3);
      document.getElementById("digi").innerHTML = res;*/
    meterupdate();
    swal("Unbalanced...Fix Ratio R2/R1");
  } else if (Math.abs(c_ratio - data2 / data1) < 0.1) {
    meterupdate();
    //document.getElementById("digi").innerHTML = res;

    swal("Unbalanced...Fix Ratio R4/R3");
  } else {
    //var res = Math.max((c_ratio - (data2 / data1)) / 100, (c_ratio - (data4 / data3)) / 100);
    meterupdate();
    swal("Unbalanced");
  }
}

var count1 = 1,
  count2 = 1,
  count3 = 1,
  count4 = 1;
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
      paintStyle: { stroke: "blue", strokeWidth: 3 },
      hoverPaintStyle: { stroke: "blue", strokeWidth: 6 },
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
      } else if (s[8] == "c") {
        id = s[8] + count4.toString();
        count4++;
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

      if (id[0] == "v") {
        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          maxConnections: 2,
          anchor: ["Left"],
          isSource: true,
          paintStyle: { fill: "red" },
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          maxConnections: 2,
          anchor: ["Right"],
          isTarget: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "g") {
        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection",
        });
      } else {
        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          maxConnections: 2,
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: ["Dot", { radius: 6 }],
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection",
        });
      }
    },
  });
});

/*var slider = document.getElementById("myRange");
  
  
  
  slider.oninput = function() {
    data3 = this.value;
    output.innerHTML = this.value;
  }*/

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
  const arr_c = [];
  var c_r = 0,
    c_v = 0,
    c_c = 0,
    c_g = 0,
    s_v,
    j = 0,
    k = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] == "r") {
      c_r++;
      arr_r[j] = arr1[i];
      j++;
    } else if (arr1[i][0] == "v") {
      c_v++;
      s_v = arr1[i];
    } else if (arr1[i][0] == "c") {
      c_c++;
      arr_c[k] = arr1[i];
      k++;
    } else c_g++;
  }
  const set_2 = new Set(arr1);
  console.log(arr_r);
  if (
    Tid.length != 10 ||
    Sid.length != 10 ||
    !setsAreEqual(set_1, set_2) ||
    c_r != 4 ||
    c_v != 1 ||
    c_g != 1 ||
    c_c != 2
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
    var s = amp[arr[2]][0];
    s_element.add(s);
    const r_pos = [],
      c_pos = [];
    if (
      (s[0] != "r" && s[0] != "c") ||
      amp[s].length != 3 ||
      (amp[s][0] != arr[7] && amp[s][0][0] != "c" && amp[s][0][0] != "r")
    ) {
      swal("Wrong Connection");
    } else {
      if (amp[s][0] == arr[7] && s[0] == "r") {
        var r_top =
          document.querySelector("#" + s + "").getBoundingClientRect().bottom -
          p_top;
        var r_left =
          document.querySelector("#" + s + "").getBoundingClientRect().left -
          p_left +
          10;
        r_pos[2] = [r_top, r_left];

        if (amp[s][2] != arr[2]) s = amp[s][2];
        else s = amp[s][1];

        if (
          (s[0] != "r" || amp[s].length != 2 || amp[s][1][0] != "c") &&
          (s[0] != "c" || amp[s].length != 2 || amp[s][1][0] != "r")
        ) {
          swal("Wrong Connection");
        } else {
          r_top =
            document.querySelector("#" + s + "").getBoundingClientRect()
              .bottom - p_top;
          r_left =
            document.querySelector("#" + s + "").getBoundingClientRect().left -
            p_left +
            10;
          if (s[0] == "r") r_pos[0] = [r_top, r_left];
          else {
            c_pos[0] = [r_top, r_left];
          }

          s = amp[s][1];
          if (
            (s[0] != "c" || amp[s].length != 2 || amp[s][1] != arr[7]) &&
            (s[0] != "r" || amp[s].length != 2 || amp[s][1] != arr[7])
          ) {
            swal("Wrong Connection");
          } else {
            r_top =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .bottom - p_top;
            r_left =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .left -
              p_left +
              10;
            if (s[0] == "r") r_pos[0] = [r_top, r_left];
            else {
              c_pos[0] = [r_top, r_left];
            }

            s = amp[arr[2]][1];
            if (
              (s[0] != "r" || amp[s].length != 3 || amp[s][2][0] != "c") &&
              (s[0] != "c" || amp[s].length != 3 || amp[s][2][0] != "r")
            ) {
              swal("Wrong Connection");
            } else {
              r_top =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .bottom - p_top;
              r_left =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .left -
                p_left +
                10;
              if (s[0] == "r") r_pos[1] = [r_top, r_left];
              else {
                c_pos[1] = [r_top, r_left];
              }

              s = amp[s][2];
              if (
                (s[0] != "c" || amp[s].length != 2 || amp[s][1] != arr[7]) &&
                (s[0] != "r" || amp[s].length != 2 || amp[s][1] != arr[7])
              ) {
                swal("Wrong Connection");
              } else {
                r_top =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .bottom - p_top;
                r_left =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .left -
                  p_left +
                  10;
                if (s[0] == "r") r_pos[1] = [r_top, r_left];
                else {
                  c_pos[1] = [r_top, r_left];
                }

                if (amp[amp[s][0]][1] != arr[2]) s = amp[amp[s][0]][1];
                else s = amp[amp[s][0]][0];
                if (s[0] != "r" || amp[s].length != 2 || amp[s][0] != arr[7]) {
                  swal("Wrong Connection");
                } else {
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    10;
                  r_pos[3] = [r_top, r_left];

                  swal("Right Connections...Go Ahead!!");

                  c_ratio = Math.max(Math.floor(Math.random() * 5 + 1), 1);
                  console.log(c_ratio);
                  var f = document.getElementById("btn1");
                  f.removeAttribute("disabled");

                  var v_top =
                    document
                      .querySelector("#" + s_v + "")
                      .getBoundingClientRect().bottom - p_top;
                  var v_left =
                    document
                      .querySelector("#" + s_v + "")
                      .getBoundingClientRect().left -
                    p_left +
                    10;

                  $(
                    "<b><div id='abcd' style = 'position: absolute;top:" +
                      v_top +
                      "px ; left:" +
                      v_left +
                      "px ;'>+  V,f  -</div></b>"
                  ).appendTo("#diagram");

                  $(
                    "<div style = 'position: absolute;top:" +
                      (v_top - 29) +
                      "px ; left:" +
                      (v_left + 150) +
                      "px ;'><img src='ground_img.png'></div>"
                  ).appendTo("#diagram");

                  for (var i = 0; i < 4; i++) {
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
                    "<b><div id='c1_tag0' style = 'position: absolute;top:" +
                      c_pos[0][0] +
                      "px ; left:" +
                      c_pos[0][1] +
                      "px ;'>C" +
                      1 +
                      " (Unknown)</div></b>"
                  ).appendTo("#diagram");
                  $(
                    "<b><div id='c1_tag1' style = 'position: absolute;top:" +
                      c_pos[1][0] +
                      "px ; left:" +
                      c_pos[1][1] +
                      "px ;'>C" +
                      2 +
                      "= 0.01uF</div></b>"
                  ).appendTo("#diagram");

                  mydiv.style.display = "block";

                  var div1 = document.getElementById("diagram");
                  var div2 = document.getElementById("toolbox");

                  div1.classList.add("no-pointer-events");
                  div2.classList.add("no-pointer-events");
                }
              }
            }
          }
        }
      } else {
        console.log("Entered zone-1");

        r_top =
          document.querySelector("#" + s + "").getBoundingClientRect().bottom -
          p_top;
        r_left =
          document.querySelector("#" + s + "").getBoundingClientRect().left -
          p_left +
          10;

        if (s[0] == "r") r_pos[0] = [r_top, r_left];
        else {
          c_pos[0] = [r_top, r_left];
        }

        if (amp[s][2] != arr[2]) s = amp[s][2];
        else s = amp[s][1];

        if (s[0] != "r" || amp[s].length != 2 || amp[s][1] != arr[7]) {
          swal("Wrong Connection");
        } else {
          r_top =
            document.querySelector("#" + s + "").getBoundingClientRect()
              .bottom - p_top;
          r_left =
            document.querySelector("#" + s + "").getBoundingClientRect().left -
            p_left +
            10;
          r_pos[2] = [r_top, r_left];

          s = amp[arr[2]][1];
          if (s[0] != "r" || amp[s].length != 3 || amp[s][2] != arr[7]) {
            swal("Wrong Connection");
          } else {
            r_top =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .bottom - p_top;
            r_left =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .left -
              p_left +
              10;
            r_pos[3] = [r_top, r_left];

            if (amp[s][0] != arr[2]) s = amp[s][0];
            else s = amp[s][1];

            if (
              (s[0] != "r" || amp[s].length != 2 || amp[s][0][0] != "c") &&
              (s[0] != "c" || amp[s].length != 2 || amp[s][0][0] != "r")
            ) {
              swal("Wrong Connection");
            } else {
              r_top =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .bottom - p_top;
              r_left =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .left -
                p_left +
                10;
              if (s[0] == "r") r_pos[1] = [r_top, r_left];
              else {
                c_pos[1] = [r_top, r_left];
              }

              s = amp[s][0];
              if (
                (s[0] != "c" || amp[s].length != 2 || amp[s][0] != arr[7]) &&
                (s[0] != "r" || amp[s].length != 2 || amp[s][0] != arr[7])
              ) {
                swal("Wrong Connection");
              } else {
                r_top =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .bottom - p_top;
                r_left =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .left -
                  p_left +
                  10;
                if (s[0] == "r") r_pos[1] = [r_top, r_left];
                else {
                  c_pos[1] = [r_top, r_left];
                }

                s = amp[amp[arr[2]][0]][0];
                if (
                  (s[0] != "c" || amp[s].length != 2 || amp[s][0] != arr[7]) &&
                  (s[0] != "r" || amp[s].length != 2 || amp[s][0] != arr[7])
                ) {
                  swal("Wrong Connection");
                } else {
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    10;
                  if (s[0] == "r") r_pos[0] = [r_top, r_left];
                  else {
                    c_pos[0] = [r_top, r_left];
                  }

                  swal("Right Connections...Go Ahead!!");

                  var v_top =
                    document
                      .querySelector("#" + s_v + "")
                      .getBoundingClientRect().bottom - p_top;
                  var v_left =
                    document
                      .querySelector("#" + s_v + "")
                      .getBoundingClientRect().left -
                    p_left +
                    10;

                  $(
                    "<b><div id='abcd' style = 'position: absolute;top:" +
                      v_top +
                      "px ; left:" +
                      v_left +
                      "px ;'>+ V,f -</div></b>"
                  ).appendTo("#diagram");

                  $(
                    "<div style = 'position: absolute;top:" +
                      (v_top - 29) +
                      "px ; left:" +
                      (v_left + 150) +
                      "px ;'><img src='ground_img.png'></div>"
                  ).appendTo("#diagram");

                  for (var i = 0; i < 4; i++) {
                    $(
                      "<div id='r1_tag' style = 'position: absolute;top:" +
                        r_pos[i][0] +
                        "px ; left:" +
                        r_pos[i][1] +
                        "px ;'><b>R" +
                        (i + 1) +
                        "</b></div>"
                    ).appendTo("#diagram");
                  }

                  $(
                    "<div id='r1_tag' style = 'position: absolute;top:" +
                      c_pos[0][0] +
                      "px ; left:" +
                      c_pos[0][1] +
                      "px ;'><b>C" +
                      1 +
                      "(unknown)</b></div>"
                  ).appendTo("#diagram");
                  $(
                    "<div id='r1_tag' style = 'position: absolute;top:" +
                      c_pos[1][0] +
                      "px ; left:" +
                      c_pos[1][1] +
                      "px ;'><b>C" +
                      2 +
                      "</b></div>"
                  ).appendTo("#diagram");

                  mydiv.style.display = "block";

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

  return Array.from(a).every((element) => {
    return b.has(element);
  });
}
