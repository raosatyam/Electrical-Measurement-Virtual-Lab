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

function execute_ckt() {
  var data1 = document.getElementById("r1").value;
  var data2 = document.getElementById("r2").value;
  var data3 = document.getElementById("r3").value;
  var data4 = document.getElementById("r4").value;
  var data5 = document.getElementById("r5").value;
  var data6 = document.getElementById("l1").value;
  var data7 = document.getElementById("c1").value;
  var data8 = document.getElementById("v1").value;
  var data9 = document.getElementById("f1").value;
  // var data10 = document.getElementById("f1").value;

  data1 = parseFloat(data1);
  data2 = parseFloat(data2);
  data3 = parseFloat(data3);
  data4 = parseFloat(data4);
  data5 = parseFloat(data5);
  data6 = parseFloat(data6);
  data6 = data6;
  data7 = parseFloat(data7);
  data7 = data7;
  data8 = parseFloat(data8);
  data9 = parseFloat(data9);
  // console.log("data1", data1);
  // console.log("data2", data2);
  // console.log("data3", data3);
  // console.log("data4", data4);
  // console.log("data5", data5);
  // console.log("data6", data6);
  // console.log("data7", data7);

  // console.log("sum", data2 * data4 + data5 * (data2 + data4));

  var ans = (data3 * data7 * (data2 * data4 + data5 * (data2 + data4))) / data4;

  // console.log(ans,)

  // console.log("ans", ans);
  ans = ans.toFixed(1);
  var ans1 = xy - ans;
  difference_bt = ans - xy;
  difference_bt = difference_bt / xy;
  difference_bt = difference_bt*10;
  difference_bt = difference_bt.toFixed(2);
  // console.log("ans1", ans1);

  if (data8 == "" || data9 == "") {
    difference_bt = "__.__";
  }

  document.getElementById("demo10").innerHTML = difference_bt;

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
  var data1 = document.getElementById("r1").value;
  var data2 = document.getElementById("r2").value;
  var data3 = document.getElementById("r3").value;
  var data4 = document.getElementById("r4").value;
  var data5 = document.getElementById("r5").value;
  var data6 = document.getElementById("l1").value;
  var data7 = document.getElementById("c1").value;
  var data8 = document.getElementById("v1").value;
  var data9 = document.getElementById("f1").value;

  // console.log("val11", xy, "val112", difference_bt);
  if (
    data1 == "" ||
    data2 == "" ||
    data3 == "" ||
    data4 == "" ||
    data5 == "" ||
    data7 == "" ||
    data8 == "" ||
    data9 == ""
  ) {
    swal("Fill empty values");
    return;
  }
  if (data6 == "") {
    swal("Enter inductor value");
    return;
  }
  // console.log("xxx",data6,val3);
  val2 = xy.toFixed(1);
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
function myCreateFunction() {
  f1 = parseFloat(document.getElementById("f1").value);

  var data1 = document.getElementById("r1").value;
  var data2 = document.getElementById("r2").value;
  var data3 = document.getElementById("r3").value;
  var data4 = document.getElementById("r4").value;
  var data5 = document.getElementById("r5").value;
  var data6 = document.getElementById("l1").value;
  var data7 = document.getElementById("c1").value;
  var data8 = document.getElementById("v1").value;
  var data9 = document.getElementById("f1").value;

  if (
    data1 == "" ||
    data2 == "" ||
    data3 == "" ||
    data4 == "" ||
    data5 == "" ||
    data6 == "" ||
    data7 == "" ||
    data8 == ""
  ) {
    swal("Fill empty values");
    return;
  }

  data1 = parseFloat(data1);
  data2 = parseFloat(data2);
  data3 = parseFloat(data3);
  data4 = parseFloat(data4);
  data5 = parseFloat(data5);
  data6 = parseFloat(data6);
  data7 = parseFloat(data7);
  data8 = parseFloat(data8);
  data9 = parseFloat(data9);
  // console.log("data66", data6);
  flag1 = 1;
  var tm1 = data6;
  tm1 = tm1.toFixed(1);

  // ans=ans.toFixed(1);

  var tm2 = xy.toFixed(1);

  if (tm1 != tm2) {
    flag1 = 0;
  }

  if (
    data1 <= 0 ||
    data2 <= 0 ||
    data3 <= 0 ||
    data4 <= 0 ||
    data5 <= 0 ||
    data6 <= 0 ||
    data7 <= 0
  ) {
    swal("Invalid Values");
    return;
  }

  // Create a new table row for each input value
  var row = document.createElement("tr");
  var cur;

  for (var i = 1; i <= 10; i++) {
    if (i < 7) {
      var data = eval("data" + i);
    } else if (i == 7) {
      var data = ((data2 * data3) / data4 - data1).toFixed(1);
    } else if (i == 8) {
      var data = eval("data" + (i - 1));
    } else if (i == 9) {
      var data = data8 + "Volt, " + data9 + "Hz ";
    } else if (i == 10) {
      var data = "YES";
      if (flag1 == 0) data = "NO";
    }

    // Create a new table row element
    // Create a new table data element

    var cell = document.createElement("td");
    cell.innerHTML = data;

    // Add the table data to the table row
    row.appendChild(cell);

    // Add the table row to the table
    document.getElementById("myTable").appendChild(row);

    swal("Added to Table");
  }

  // var cell = document.createElement("td");
  // cell.innerHTML = cur;
  // row.appendChild(cell);
  // document.getElementById("myTable").appendChild(row);
}
function regenerate() {
  xy = Math.floor(Math.random() * 1000 + 1);
  xy = xy / 100;
  if (xy < 1) xy += 1;
if (xy > 9) xy -= 1;
  console.log("xy", xy);
  swal("New Inductance Added");
}

function generate() {
  var x = Math.floor(Math.random() * 100);
  x = x.toString();
  document.getElementById("r1").value = x;

  var x = Math.floor(Math.random() * 1000);
  x = x / 1000;
  x = x.toString();
  document.getElementById("l1").value = x;
}
function myDeleteFunction() {
  document.getElementById("myTable").deleteRow(1);
}

function show_input() {
  var mydiv = document.getElementById("myDiv");
  if (myDiv.style.display == "block") myDiv.style.display = "none";
  else myDiv.style.display = "block";
}
function show_table() {
  var mydiv = document.getElementById("myTable");
  if (mydiv.style.display == "block") mydiv.style.display = "none";
  else mydiv.style.display = "block";
}

var count1 = 1,
  count2 = 1,
  count3 = 1,
  count4 = 1,
  count5 = 1; // https://stackoverflow.com/a/2117523
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
  ///////////////////// For making them dragable and dropable ///////////////////////
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
        id = "i" + s[8] + count1.toString();
        count1++;
      } else if (s[8] == "v") {
        id = "i" + s[8] + count2.toString();
        count2++;
      } else if (s[8] == "g") {
        id = "i" + s[8] + count3.toString();
        count3++;
      } else if (s[8] == "m") {
        id = "i" + s[8] + count4.toString();
        count4++;
      } else if (s[8] == "c") {
        id = "i" + s[8] + count5.toString();
        count5++;
      }
      clone.attr("id", id);
      clone.appendTo(this);
      instance.draggable(id, { containment: true });
      //////////////////////////making double click input ////////////////////

      //////////////making endpoints of element//////////////////////////////////
      if (id[0] + id[1] == "iv") {
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
          maxConnections: 3,
          anchor: ["Right"],
          isTarget: true,
          connectionType: "black-connection",
        });
      } else if (id[0] + id[1] == "im") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          isSource: true,
          paintStyle: { fill: "red" },
          connectionType: "red-connection",
        });
      } else {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Right"],
          isSource: true,
          paintStyle: { fill: "red" },
          connectionType: "red-connection",
        });

        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
          anchor: ["Left"],
          isTarget: true,
          connectionType: "blue-connection",
        });
      }
    },
  });
});
////////////////////////// check button ////////////////////////////////
document.getElementById("check").onclick = check_circuit;

function check_circuit() {
  var p_top = document.querySelector("#diagram").getBoundingClientRect().top;
  var p_left = document.querySelector("#diagram").getBoundingClientRect().left;

  var allConnections = instance.getConnections({
    //scope: "someScope"
  });
  const Tid = [];
  const Sid = [];
  //alert(allConnections.length);
  for (var i = 0; i < allConnections.length; i++) {
    var target = allConnections[i].targetId;
    var source = allConnections[i].sourceId;
    Tid[i] = target;
    Sid[i] = source;
  }
  // console.log(Tid);
  // console.log(Sid);
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
  const arr_r = [],
    arr_c = [],
    arr_m = [];
  var c_r = 0,
    c_v = 0,
    c_g = 0,
    c_c = 0,
    c_m = 0,
    s_v,
    j = 0,
    k = 0,
    l = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i][1] == "r") {
      c_r++;
      arr_r[j] = arr1[i];
      j++;
    } else if (arr1[i][1] == "v") {
      c_v++;
      s_v = arr1[i];
    } else if (arr1[i][1] == "c") {
      c_c++;
      arr_c[k] = arr1[i];
      k++;
    } else if (arr1[i][1] == "m") {
      c_m++;
      arr_m[l] = arr1[i];
      l++;
    } else c_g++;
  }
  const set_2 = new Set(arr1);
  // console.log(set_1);
  // console.log(set_2);
  // console.log(c_r);
  // console.log(c_v);
  // console.log(c_m);
  // console.log(c_c);
  // console.log(c_g);

  if (
    Tid.length != 12 ||
    Sid.length != 12 ||
    !setsAreEqual(set_1, set_2) ||
    c_r != 5 ||
    c_v != 1 ||
    c_g != 1 ||
    c_m != 1 ||
    c_c != 1
  ) {
    swal("Wrong Connections");
  } else {
    var amp = {}; // map in js
    for (var i = 0; i < Sid.length; i++) {
      amp[Sid[i]] = amp[Sid[i]] || [];
      amp[Sid[i]].push(Tid[i]);
    }
    for (var i = 0; i < Tid.length; i++) {
      amp[Tid[i]] = amp[Tid[i]] || [];
      amp[Tid[i]].push(Sid[i]);
    }
    // console.log(amp);
    const s_element = new Set();
    var s = amp[arr[1]][0];
    // console.log("ss1",s);
    s_element.add(s);
    const r_pos = [];
    // console.log(s); //c
    // console.log("amp", amp);

    if (s[1] != "c" || amp[s].length != 3) {
      // ammeter connected to c , c condition
      console.log("s[1]", s[1], "len", amp[s].length);
      swal("Wrong Connection1");
    } else {
    // console.log("ss2",s);
    // console.log("ss3",amp[s][2]);
    // console.log("ss4",arr[1]);
    // console.log("ss6",amp[s][1]);

      var s1 = arr[1];
      r_top =
          document.querySelector("#" + s1 + "").getBoundingClientRect().bottom -
          p_top;
        r_left =
          document.querySelector("#" + s1 + "").getBoundingClientRect().left -
          p_left +
          45;
        r_pos[9] = [r_top, r_left];

      if (amp[s][2] != arr[1])
        // c ka back== r5 connection
        s = amp[s][2];
      else s = amp[s][1];
    //   console.log(s); // ir5
    var s15=s;
    // console.log("ss6",s);


      if (s_element.has(s) || s[1] != "r" || amp[s].length != 2)
        // r5 condition
        swal("Wrong Connection2");
      else {
    //     console.log(s); // r5 R5
    // console.log("ss7",s);

        r_top =
          document.querySelector("#" + s + "").getBoundingClientRect().bottom -
          p_top;
        r_left =
          document.querySelector("#" + s + "").getBoundingClientRect().left -
          p_left +
          45;
        r_pos[5] = [r_top, r_left];

        s_element.add(s);
        // checking of R2 and R4

        if (amp[s][0] == arr[0]) s = amp[s][1];
        else s = amp[s][0];

        // console.log(s); // r3

        if (s_element.has(s) || s[1] != "r" || amp[s].length != 3)
          swal("Wrong Connections3");
        else {
          // R2

          // console.log(s, "ssssss");
          r_top =
            document.querySelector("#" + s + "").getBoundingClientRect()
              .bottom - p_top;
          r_left =
            document.querySelector("#" + s + "").getBoundingClientRect().left -
            p_left +
            45;
          r_pos[2] = [r_top, r_left];
          s_element.add(s);

          // console.log("abc1",s);
          // console.log("abc2",amp[s]);
          // console.log("abc3",arr[7]);
          // console.log("abc4",amp[s][0]);
          // console.log("abc5",amp[s][1]);

          if (s15 == amp[s][0]) s = amp[s][1];
          else s = amp[s][0];


          // console.log("abc6",s);
          // console.log("abc7",amp[s]);

          if (s[1] != "r" || amp[s].length != 2) swal("Wrong Connections4");
          else {
            //R4

            r_top =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .bottom - p_top;
            r_left =
              document.querySelector("#" + s + "").getBoundingClientRect()
                .left -
              p_left +
              45;
            r_pos[4] = [r_top, r_left];
            s_element.add(s);

            s = amp[arr[1]][1]; // ir1
            // console.log(s); // ir1
            if (
              s[1] != "r" ||
              s_element.has(s) ||
              amp[s].length != 3 ||
              amp[s][2] != arr[2]
            )
              swal("Wrong Connection5");
            else {
              s_element.add(s);
              r_top =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .bottom - p_top;
              r_left =
                document.querySelector("#" + s + "").getBoundingClientRect()
                  .left -
                p_left +
                45;
              r_pos[1] = [r_top, r_left];

              if (amp[s][0] != arr[1])
                // front of ir1  , s=r3
                s = amp[s][0];
              else s = amp[s][1];
              // console.log(s); // ir3  R3
              if ((s[1] = !"r" || s_element.has(s) || amp[s].length != 2))
                swal("Wrong Connection6");
              else {
                // console.log(s, "x1");
                r_top =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .bottom - p_top;
                r_left =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .left -
                  p_left +
                  45;
                r_pos[3] = [r_top, r_left];
                s = amp[s][0]; // ic1
                // console.log(s, "x2");

                if (s[1] != "v" || amp[s].length != 2) {
                  swal("Wrong Connections7");
                }

                s = arr[2];
                if (s[1] != "m" || amp[s].length != 2)
                  swal("Wrong Connections l ");
                else {
                  // s=
                  // r_top = document.querySelector('#' + s + '').getBoundingClientRect().bottom-p_top;
                  // r_left = document.querySelector('#' + s + '').getBoundingClientRect().left-p_left+45;
                  // r_pos[4] = [r_top, r_left];
                  // s_element.add(s);

                  swal("Right Connections...Go to Next step!!");
                  var q = document.getElementById("meter_check");
                  q.removeAttribute("disabled")
                  var e = document.getElementById("range1");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("r3");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("range2");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("r5");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("c1");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("range3");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("v1");
                  e.removeAttribute("disabled")
                  var e = document.getElementById("l1");
                  e.removeAttribute("disabled")
                  var f = document.getElementById("btn1");
                  f.removeAttribute("disabled")
                  var i = document.getElementById("btn2");
                  i.removeAttribute("disabled")
                  var j = document.getElementById("btn3");
                  j.removeAttribute("disabled")

                  var i = 1;

                  {
                    // giving names to resistances
                    //document.getElementsByClassName("r1_tag").style.display="none";

                    for (; i <= 5; i++) {
                      $(
                        "<div class='r1_tag' style = 'position: absolute;top:" +
                          r_pos[i][0] +
                          "px ; left:" +
                          r_pos[i][1] +
                          "px ;'><b>R" +
                          i +
                          "</b></div>"
                      ).appendTo("#diagram");
                    }
                  }

                  

                  s = "iv1";
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    45;
                  r_pos[6] = [r_top, r_left];
                  $(
                    "<div class='r1_tag' style = 'position: absolute;top:" +
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

                  i++;

                  s = "ic1";
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    45;
                  r_pos[7] = [r_top, r_left];
                  $(
                    "<div class='r1_tag' style = 'position: absolute;top:" +
                      r_pos[i][0] +
                      "px ; left:" +
                      r_pos[i][1] +
                      "px ;'><b>C" +
                      "</b></div>"
                  ).appendTo("#diagram");
                  i++;
                  s = "im1";
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    45;
                  r_pos[8] = [r_top, r_left];
                  $(
                    "<div class='r1_tag' style = 'position: absolute;top:" +
                      r_pos[i][0] +
                      "px ; left:" +
                      r_pos[i][1] +
                      "px ;'><b>L(unknown)" +
                      "</b></div>"
                  ).appendTo("#diagram");


                    i++;
                    s=s1;
                  r_top = document.querySelector('#' + s + '').getBoundingClientRect().bottom-p_top ;
                    r_left = document.querySelector('#' + s + '').getBoundingClientRect().left-p_left+45;
                    r_pos[9] = [r_top, r_left];
                    $("<div class='r1_tag' style = 'position: absolute;top:" + r_pos[i][0] + "px ; left:" + r_pos[i][1] + "px ;'><b> Detector" + "</b></div>")
                    .appendTo("#diagram");

                  // var mydiv = document.getElementById("myDiv");
                  // mydiv.style.display = "block"; // to visible form

                  // var div1 = document.getElementById("diagram").ariaDisabled = true;
                  // var div2 = document.getElementById("toolbox").ariaDisabled = true;

                  // div1.classList.add("no-pointer-events"); // to disable
                  // div2.classList.add("no-pointer-events");

                  mydiv.style.display = "block";

        var div1 = document.getElementById("diagram");
        var div2 = document.getElementById("toolbox");
        var div3 = document.getElementById("check");
        

        div1.classList.add("no-pointer-events");
        div2.classList.add("no-pointer-events");

                }
              }
            }
          }
        }
      }
      // console.log(s_element);
    }
  }
}

var w,
  check = 0;

function add(x, y) {
  var z = [];
  z[0] = x[0] + y[0];
  z[1] = x[1] + y[1];
  return z;
}
function mult(x, y) {
  var z = [];
  z[0] = x[0] * y[0] - x[1] * y[1];
  z[1] = x[0] * y[1] + x[1] * y[0];
  return z;
}
function div(x, y) {
  var z = [];
  var t = [];
  t[0] = y[0] / (y[0] * y[0] + y[1] * y[1]);
  t[1] = (-1 * y[1]) / (y[0] * y[0] + y[1] * y[1]);
  z = mult(x, t);
  return z;
}

function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every((element) => {
    return b.has(element);
  });
}
