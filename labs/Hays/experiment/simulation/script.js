// https://stackoverflow.com/a/2117523

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
// console.log("xy", xy);
var data1 = document.getElementById("data1").value;
var data2 = document.getElementById("data2").value;
var data3 = document.getElementById("data3").value;
var data4 = document.getElementById("data4").value;
var data5 = document.getElementById("data5").value;
var data6 = document.getElementById("data6").value;

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
  induct = data1 * data2 * data3;
  val1 = induct.toFixed(1);
  induct = induct.toFixed(3);
  var a = data4,
    b = data5,
    c = data1;
  difference_bt = induct - xy;
  difference_bt = difference_bt / xy;
  difference_bt = difference_bt * 10;
  difference_bt = difference_bt.toFixed(2);
  val2 = xy.toFixed(1);
  // console.log("data4,data5", a, b, c);
  if (data4 == 0 || data5 == "") {
    difference_bt = "__.__";
  }
  document.getElementById("demo9").innerHTML = difference_bt;

  if (difference_bt == "__.__") {
  } else if (difference_bt < 0) {
    var audio = new Audio("../images/audio1_detector.mp3");
    audio.play();
    var temp1 = -0.1 * difference_bt;
    temp1 = Math.min(0.5, temp1);

    audio.volume = temp1;

    // swal("Unbalanced");
    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 3000);
      },
      false
    );
  } else if (difference_bt > 0) {
    var audio = new Audio("../images/audio2_detector.mp3");
    audio.play();
    // audio.volume=0.1;
    var temp1 = 0.1 * difference_bt;
    temp1 = Math.min(0.5, temp1);

    audio.volume = temp1;

    // swal("Unbalanced");
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
  var cell = document.createElement("td");
  cell.innerHTML = 1;
  row.appendChild(cell);
  document.getElementById("myTable").appendChild(row);
  for (var i = 1; i <= 3; i++) {
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
  cell.innerHTML = induct; //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
  swal("Added to table");
}
// function regenerate() {
//   xy = Math.floor(Math.random() * 1000 + 1);
//   xy = xy / 100;
//   console.log("xy", xy);
//   swal("New Inductance Added");
// }

// function toggleTab1() {
//   var tab = document.getElementById("instruction");
//   if (tab.style.display === "none") {
//     tab.style.display = "block";
//   } else {
//     tab.style.display = "none";
//   }
// }
// function toggleTab2() {
//   var tab = document.getElementById("observation_table");
//   if (tab.style.display === "none") {
//     tab.style.display = "block";
//   } else {
//     tab.style.display = "none";
//   }
// }
// function toggleTab3() {
//   var tab = document.getElementById("formula");
//   if (tab.style.display === "none") {
//     tab.style.display = "block";
//   } else {
//     tab.style.display = "none";
//   }
// }
// function toggleTab4() {
//   var tab = document.getElementById("input_data");
//   if (tab.style.display === "none") {
//     tab.style.display = "block";
//   } else {
//     tab.style.display = "none";
//   }
// }
// function disableDiv() {
//   var div1 = document.getElementById("diagram");
//   var div2 = document.getElementById("toolbox");

//   div1.classList.add("no-pointer-events");
//   div2.classList.add("no-pointer-events");
// }
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
instance = jsPlumb.getInstance({});
instance.setContainer("diagram");

var count_g = 1,
  count_r = 1,
  count_c = 1,
  count_s = 1,
  count_i = 1;

instance.bind("ready", function () {
  instance.registerConnectionTypes({
    "red-connection": {
      paintStyle: { stroke: "blue", strokeWidth: 5 },
      hoverPaintStyle: { stroke: "blue", strokeWidth: 8 },
      connector: "Flowchart",
    },
  });

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
  // $( "#diagram" ).draggable({ disabled: true });
  // $( "#diagram" ).draggable("instance");

  $("#diagram").droppable({
    drop: function (event, ui) {
      var id;

      var clone = $(ui.helper).clone(true);

      var elem = clone.attr("class");
      if (elem[8] == "r") {
        id = elem[8] + count_r.toString();
        count_r++;
      } else if (elem[8] == "c") {
        id = elem[8] + count_c.toString();
        count_c++;
      } else if (elem[8] == "i") {
        id = elem[8] + count_i.toString();
        count_i++;
      } else if (elem[8] == "s") {
        id = elem[8] + count_s.toString();
        count_s++;
      } else if (elem[8] == "g") {
        id = elem[8] + count_g.toString();
        count_g++;
      }
      clone.attr("id", id);
      clone.appendTo(this);

      instance.draggable(id, { containment: true });

      if (id[0] == "r") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          // isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          // isTarget: true,
          isSource: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "g") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 1,
          anchor: ["Top"],
          isTarget: true,
          // isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          anchor: ["Bottom"],
          maxConnections: 1,
          paintStyle: { fill: "red" },
          // isTarget: true,
          isSource: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "c") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          // isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          // isTarget: true,
          isSource: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "i") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          // isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          paintStyle: { fill: "red" },
          // isTarget: true,
          isSource: true,
          connectionType: "red-connection",
        });
      } else if (id[0] == "s") {
        instance.addEndpoint(id, {
          maxConnections: 2,
          endpoint: "Dot",
          anchor: ["Left"],
          paintStyle: { fill: "red" },
          // isTarget: true,
          isSource: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          maxConnections: 2,
          endpoint: "Dot",
          anchor: ["Right"],
          isTarget: true,
          // isSource: true,
          connectionType: "red-connection",
        });
      }
    },
  });
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
// var output9 = document.getElementById("demo9");
// output9.innerHTML = induct.value;

// document.getElementById("check").onclick = contagem();

document.getElementsByTagName("button")[0].onclick = contagem;
function contagem() {
  var p_top = document.querySelector("#diagram").getBoundingClientRect().top;
  var p_left = document.querySelector("#diagram").getBoundingClientRect().left;
  var allConnections = instance.getConnections({});

  const iid = [];
  // const Sid = [];
  // console.log();
  // console.log(allConnections[0].targetId)
  const sett = new Set();

  for (var i = 0; i < allConnections.length; i++) {
    var target = allConnections[i].targetId;
    var source = allConnections[i].sourceId;

    iid.push([target, source]);
    // Sid[i] = source;
    sett.add(target);
    sett.add(source);
  }
  const ele = [...sett].sort(); // element array in circuit c1,g1,i1,r1,r2,r3,s1
  // console.log(ele);

  // console.log(Sid);
  // console.log(Tid);

  const set1 = new Set();
  const set2 = new Set();

  iid.forEach((pair) => {
    set1.add(pair[0]); // Add first element to set 1
    set2.add(pair[1]); // Add second element to set 2
  });

  const arr = [...set1].sort();
  const arr1 = [...set2].sort();
  const set_1 = new Set(arr);
  const set_2 = new Set(arr1);

  // console.log(iid);

  // console.log(arr1)
  iid.sort();
  // console.log(iid);

  const arr_r = [];
  var c_r = 0,
    c_v = 0,
    c_g = 0,
    c_i = 0,
    c_c = 0,
    s_v,
    j = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] == "r") {
      c_r++;
      arr_r[j] = arr1[i];
      j++;
    } else if (arr1[i][0] == "s") {
      c_v++;
      // s_v = arr1[i];
    } else if (arr1[i][0] == "i") {
      c_i++;
      // s_v = arr1[i];
    } else if (arr1[i][0] == "c") {
      c_c++;
      // s_v = arr1[i];
    } else c_g++;
  }
  //  console.log(set1)

  //alert(allConnections.length);
  //  swal("Connections are: Invalid");
  //////////////
  ////////////
  ///////////////
  //////////////////a

  if (
    iid.length != 9 ||
    sett.size != 7 ||
    c_i != 1 ||
    c_c != 1 ||
    c_r != 3 ||
    c_g != 1
  ) {
    swal("Wrong connections");
  } else {
    const xx = [];

    var am1 = {};
    var am = {};
    var amp = {};
    var amp1 = {};
    var amp2 = {};

    for (var i = 0; i < 9; i++) {
      // Check if the property exists  in the object
      if (!am.hasOwnProperty(iid[i][1])) {
        // Create a new Set if the property doesn't exist
        am[iid[i][1]] = new Array();
        // xx.push([i, iid[i][0], iid[i][1]]);
      }
      // Add the value to the Set
      // amp[iid[1][i]] = amp[iid[1][i]] || [];
      am[iid[i][1]].push(iid[i][0]);
    }
    for (var it in am) {
      const arra1 = [...am[it]].sort();
      // console.log(arra)
      amp1[it] = arra1;
      // twoDarray.push(arra);
    }
    for (var i = 0; i < 9; i++) {
      if (!am1.hasOwnProperty(iid[i][0])) {
        // Create a new Set if the property doesn't exist
        am1[iid[i][0]] = new Array();
      }
      am[iid[i][0]].push(iid[i][1]);
      am1[iid[i][0]].push(iid[i][1]);
    }
    for (var it in am1) {
      const arra2 = [...am1[it]].sort();
      // console.log(arra)
      amp2[it] = arra2;
      // twoDarray.push(arra);
    }
    // console.log("am",am)
    // const twoDarray=[];
    // var chaary=['c1','g1','i1','s1'];
    // console.log('chaary',chaary)
    for (var it in am) {
      const arra = [...am[it]].sort();
      // console.log(arra)
      amp[it] = arra;
      // twoDarray.push(arra);
    }

    // console.log("twoDarrya",twoDarray)
    // console.log("amp", amp);
    // console.log("amp1", amp1);
    // console.log("amp2", amp2);

    const s_elem = new Set();
    var s = amp[arr[0]][0];
    s_elem.add(s);
    const r_pos = [];
    var flag = 1;

    for (var i = 0; i < 7; i++) {
      if (i < 3 || i > 5) {
        var r_top =
          document.querySelector("#" + ele[i] + "").getBoundingClientRect()
            .top -
          p_top +
          70;
        var r_left =
          document.querySelector("#" + ele[i] + "").getBoundingClientRect()
            .left -
          p_left +
          40;

        r_pos[i] = [r_top, r_left];
      }
    }

    if (amp[ele[1]][0] == ele[2] || amp[ele[1]][1] == ele[2]) {
      if (
        amp[ele[1]][0] == ele[2] &&
        amp[ele[2]][1][0] == "r" &&
        amp[ele[2]][2] == ele[6]
      ) {
        // console.log("FIRST CASE");
        if (amp[ele[1]][1][0] == "r") {
          var r_top =
            document
              .querySelector("#" + amp[ele[1]][1] + "")
              .getBoundingClientRect().top -
            p_top +
            70;
          var r_left =
            document
              .querySelector("#" + amp[ele[1]][1] + "")
              .getBoundingClientRect().left -
            p_left +
            40;
          r_pos[3] = [r_top, r_left];

          var r_top =
            document
              .querySelector("#" + amp[amp[ele[1]][1]][2] + "")
              .getBoundingClientRect().top -
            p_top +
            70;
          var r_left =
            document
              .querySelector("#" + amp[amp[ele[1]][1]][2] + "")
              .getBoundingClientRect().left -
            p_left +
            40;
          r_pos[4] = [r_top, r_left];

          var r_top =
            document
              .querySelector("#" + amp[ele[2]][1] + "")
              .getBoundingClientRect().top -
            p_top +
            70;
          var r_left =
            document
              .querySelector("#" + amp[ele[2]][1] + "")
              .getBoundingClientRect().left -
            p_left +
            40;
          r_pos[5] = [r_top, r_left];

          if (amp[ele[0]][0][0] == "r" && amp[ele[0]][1] == ele[6]) {
            if (
              amp[ele[1]].length +
                amp[ele[6]].length +
                amp[ele[2]].length +
                amp[ele[0]].length !=
              11
            ) {
              flag = 0;
              swal("Wrong Connections");
            }
            if (
              amp[ele[2]][0] == ele[1] &&
              amp[ele[2]][1][0] == "r" &&
              amp[ele[2]][2] == ele[6]
            ) {
            } else {
              flag = 0;
              swal("Wrong Connections");
            }
          } else {
            flag = 0;
            swal("Wrong Connections");
          }
        } else {
          flag = 0;
          swal("Wrong Connections");
        }
      } else if (amp[ele[1]][0] == ele[0]) {
        // console.log("SECOND CASE");
        if (amp[ele[1]][1] == ele[2]) {
          if (amp[ele[2]][1][0] == "r") {
            var r_top =
              document
                .querySelector("#" + amp[ele[2]][1] + "")
                .getBoundingClientRect().top -
              p_top +
              70;
            var r_left =
              document
                .querySelector("#" + amp[ele[2]][1] + "")
                .getBoundingClientRect().left -
              p_left +
              40;
            r_pos[5] = [r_top, r_left];
            if (amp[amp[ele[2]][1]][1] != ele[6]) {
              flag = 0;
              swal("Wrong Connections");
            }
            // console.log(amp1[ele[0]].size);
            // console.log("length", amp1[ele[0]].length);

            if (amp1[ele[0]].length == 1) {
              // console.log("x");
              if (amp1[ele[0]][0][0] == "r") {
                var r_top =
                  document
                    .querySelector("#" + amp1[ele[0]][0] + "")
                    .getBoundingClientRect().top -
                  p_top +
                  70;
                var r_left =
                  document
                    .querySelector("#" + amp1[ele[0]][0] + "")
                    .getBoundingClientRect().left -
                  p_left +
                  40;
                r_pos[3] = [r_top, r_left];
              }
              if (amp[amp1[ele[0]][0]][1] != ele[6]) {
                flag = 0;
                swal("Wrong Connections");
              }
              if (amp2[ele[0]][1][0] == "r") {
                var r_top =
                  document
                    .querySelector("#" + amp2[ele[0]][1] + "")
                    .getBoundingClientRect().top -
                  p_top +
                  70;
                var r_left =
                  document
                    .querySelector("#" + amp2[ele[0]][1] + "")
                    .getBoundingClientRect().left -
                  p_left +
                  40;
                r_pos[4] = [r_top, r_left];
              }
              if (amp[amp2[ele[0]][1]][1] != ele[6]) {
                flag = 0;
                swal("Wrong Connections");
              }
            } else {
              // console.log("y");

              if (
                !(
                  amp1[ele[0]].length == 2 &&
                  amp1[ele[1]].length == 1 &&
                  amp1[ele[2]].length == 1 &&
                  amp1[amp1[ele[0]][1]].length == 1 &&
                  amp1[ele[6]].length == 2
                )
              ) {
                flag = 0;
                swal("Wrong Connections");
              }

              if (amp1[ele[0]][1][0] == "r") {
                var r_top =
                  document
                    .querySelector("#" + amp1[ele[0]][1] + "")
                    .getBoundingClientRect().top -
                  p_top +
                  70;
                var r_left =
                  document
                    .querySelector("#" + amp1[ele[0]][1] + "")
                    .getBoundingClientRect().left -
                  p_left +
                  40;
                r_pos[4] = [r_top, r_left];
                if (amp2[ele[0]][0][0] == "r") {
                  var r_top =
                    document
                      .querySelector("#" + amp2[ele[0]][0] + "")
                      .getBoundingClientRect().top -
                    p_top +
                    70;
                  var r_left =
                    document
                      .querySelector("#" + amp2[ele[0]][0] + "")
                      .getBoundingClientRect().left -
                    p_left +
                    40;
                  r_pos[3] = [r_top, r_left];
                } else {
                  flag = 0;
                  swal("Wrong Connections");
                }
              } else {
                flag = 0;
                swal("Wrong Connections");
              }
            }
          } else {
            flag = 0;
            swal("Wrong Connections");
          }
        } else {
          flag = 0;
          swal("Wrong Connections");
        }
      }
    } else if (amp[ele[1]][0][0] == "r") {
      // console.log("THIRD CASE");

      if (amp[ele[1]][1][0] == "r") {
        var rar1 = amp[ele[1]][0];
        var rar2 = amp[ele[1]][1];
        if (amp[rar1][1] != ele[2]) {
          var rar_temp = rar1;
          rar1 = rar2;
          rar2 = rar_temp;
        }
        if (amp[rar1][1] == ele[2]) {
          var r_top =
            document.querySelector("#" + rar1 + "").getBoundingClientRect()
              .top -
            p_top +
            70;
          var r_left =
            document.querySelector("#" + rar1 + "").getBoundingClientRect()
              .left -
            p_left +
            40;
          r_pos[5] = [r_top, r_left];
          var r_top =
            document.querySelector("#" + rar2 + "").getBoundingClientRect()
              .top -
            p_top +
            70;
          var r_left =
            document.querySelector("#" + rar2 + "").getBoundingClientRect()
              .left -
            p_left +
            40;
          r_pos[4] = [r_top, r_left];
          if (amp[rar2][0] == ele[0]) {
            var rar11 = amp[ele[0]][1];
            var rar12 = amp[ele[0]][2];
            if (rar11 == rar2) {
              var temp_r = rar11;
              rar11 = rar12;
              rar12 = temp;
            }
            var r_top =
              document.querySelector("#" + rar11 + "").getBoundingClientRect()
                .top -
              p_top +
              70;
            var r_left =
              document.querySelector("#" + rar11 + "").getBoundingClientRect()
                .left -
              p_left +
              40;
            r_pos[3] = [r_top, r_left];
          } else if (amp[rar2][1][0] == "r") {
            var r_top =
              document
                .querySelector("#" + amp[rar2][1] + "")
                .getBoundingClientRect().top -
              p_top +
              70;
            var r_left =
              document
                .querySelector("#" + amp[rar2][1] + "")
                .getBoundingClientRect().left -
              p_left +
              40;
            r_pos[3] = [r_top, r_left];
            if (amp[amp[rar2][1]][0] != ele[0]) {
              flag = 0;
              swal("Wrong Connections");
            }
            if (amp[ele[0]][1] != ele[6]) {
              flag = 0;
              swal("Wrong Connections");
            }
          } else {
            flag = 0;
            swal("Wrong Connections");
          }
        } else {
          flag = 0;
          swal("Wrong Connections");
        }
      } else {
        flag = 0;
        swal("Wrong Connections");
      }
    }
    if (flag == 1) {
      swal("Congratulations!!! Right connections. Go Ahead");
      var q1 = document.getElementById("meter_check");
      q1.removeAttribute("disabled");
     
      var q2 = document.getElementById("data1");
      q2.removeAttribute("disabled");
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
      var q11 = document.getElementById("myrange3");
      q11.removeAttribute("disabled");

    }

    if (flag == 1) {
      for (var i = 0; i < 7; i++) {
        if (i >= 3 && i <= 5) {
          $(
            "<div id='r1_tag' style = 'position: absolute;top:" +
              r_pos[i][0] +
              "px ; left:" +
              r_pos[i][1] +
              "px ;'><b>R" +
              (i - 2) +
              "</b></div>"
          ).appendTo("#diagram");
        } else if (i == 2) {
          $(
            "<div id='r1_tag' style = 'position: absolute;top:" +
              r_pos[i][0] +
              "px ; left:" +
              r_pos[i][1] +
              "px ;'><b>L(unknown)" +
              "</b></div>"
          ).appendTo("#diagram");
        } else if (i == 1) {
          $(
            "<div id='r1_tag' style = 'position: absolute;top:" +
              r_pos[i][0] +
              "px ; left:" +
              r_pos[i][1] +
              "px ;'><b>Detector" +
              "</b></div>"
          ).appendTo("#diagram");
        } else if (i == 6) {
          $(
            "<div id='r1_tag' style = 'position: absolute;top:" +
              r_pos[i][0] +
              "px ; left:" +
              r_pos[i][1] +
              "px ;'><b>AC Source" +
              "</b></div>"
          ).appendTo("#diagram");

          $(
            "<div style = 'position: absolute;top:" +
              (r_pos[i][0] - 35) +
              "px ; left:" +
              (r_pos[i][1] + 150) +
              "px ;'><img src='../images/ground_img.png'></div>"
          ).appendTo("#diagram");
        } else {
          $(
            "<div id='r1_tag' style = 'position: absolute;top:" +
              r_pos[i][0] +
              "px ; left:" +
              r_pos[i][1] +
              "px ;'><b>  C" +
              "</b></div>"
          ).appendTo("#diagram");
        }


        // toggleTab4();

        mydiv.style.display = "block";

        var div1 = document.getElementById("diagram");
        var div2 = document.getElementById("toolbox");
        var div3 = document.getElementById("check");
        

        div1.classList.add("no-pointer-events");
        div2.classList.add("no-pointer-events");


        // div3.classList.remove("no-pointer-events");
      }
    }
  }
}
