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

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const mydiv = document.getElementById("mydiv");
var data5 = 1,
  data4 = 1,
  data3 = 1,
  data2 = 1,
  data1 = 1;
let omega = 50;

function meterupdate() {
  var r1 = document.getElementById("data1").value;
  var r2 = document.getElementById("data2").value;
  var c1 = document.getElementById("data3").value;
  var c2 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var r3 = $("#r3_select option:selected").val();

  if (
    r1 == "" ||
    r2 == "" ||
    r3 == "" ||
    data5 == "" ||
    c1 == "" ||
    c2 == "" ||
    data5 == "s"
  ) {
    //swal("Fill empty values");

    return;
  }

  /* r1 = parseFloat(r1);
    r2 = parseFloat(r2);
    r3 = parseFloat(r3);*/
  //r4 = parseFloat(r4);
  v = parseFloat(data5);
  //c1 = parseFloat(c1);
  //c2 = parseFloat(c2);
  console.log(r3);
  console.log(c1);
  console.log(v);

  if (
    r1 <= 0 ||
    r2 <= 0 ||
    r3 <= 0 ||
    v <= 0 ||
    c1 <= 1e-9 ||
    c2 <= 1e-9 ||
    r1 > 1e6 ||
    r2 > 1e6 ||
    c1 > 1e-6 ||
    c2 > 1e-6
  ) {
    swal(
      "Invalid Values Select resistor values between 1Ω to 1MΩ and Capacitor values between 10nF to 1µF"
    );

    return;
  }
  const freq = (1 / (2 * 3.14159265359)) * (1 / Math.sqrt(r1 * r2 * c1 * c2));
  var res;
  var num1 = r2 / r1 + c1 / c2;
  //var num2=r3;
  console.log(r3);
  console.log(Math.abs(r3 - num1));
  if (Math.abs(r3 - num1) > 0.2) {
    //console.log("inside this");
    res = "--.--";
    document.getElementById("digi").innerHTML = res;
    var audio = new Audio("audio1_detector.mp3");
    audio.play();
    audio.volume = 0.1;
    //swal("Unbalanced");
    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 3000);
      },
      false
    );
  } else if (Math.abs(freq - omega) > omega / 20) {
    res = (freq - omega) / 100;
    if (res < -1) {
      res = -1;
      document.getElementById("digi").innerHTML = res;
    } else if (res > 1) {
      res = 1;
      document.getElementById("digi").innerHTML = res;
    } else {
      res = res.toFixed(3);
      document.getElementById("digi").innerHTML = res;
    }
    var audio = new Audio("audio1_detector.mp3");
    audio.play();
    audio.volume = 0.1;
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
  } else {
    //swal("f: " + freq);
    var remain = omega / 100;
    if (Math.abs(freq - omega) > remain) {
      res = (freq - omega) / 100;
      res = res.toFixed(3);
      if (res < -1) res = -1;
      if (res > 1) res = 1;
      document.getElementById("digi").innerHTML = res;
      var audio = new Audio("audio2_detector.mp3");
      audio.play();
      audio.volume = 0.2;
      //swal("Unbalanced");
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
      res = 0;
      document.getElementById("digi").innerHTML = res;
    }
  }
}

function yourJsFunction() {
  var r1 = document.getElementById("data1").value;
  var r2 = document.getElementById("data2").value;
  var c1 = document.getElementById("data3").value;
  var c2 = document.getElementById("data4").value;
  var data5 = document.getElementById("data5").value;
  var r3 = document.getElementById("r3_select").value;
  //var r4 = document.getElementById("data7").value;
  // console.log(data1);
  if (r1 == "" || r2 == "" || r3 == "" || data5 == "" || c1 == "" || c2 == "") {
    swal("Fill empty values");

    return;
  }

  r1 = parseFloat(r1);
  r2 = parseFloat(r2);
  r3 = parseFloat(r3);
  //r4 = parseFloat(r4);
  v = parseFloat(data5);
  c1 = parseFloat(c1);
  c2 = parseFloat(c2);

  if (r1 <= 0 || r2 <= 0 || r3 <= 0 || v <= 0 || c1 <= 0 || c2 <= 0) {
    swal("Invalid Values");

    return;
  }
  // Create a new table row for each input value

  var row = document.createElement("tr");

  const arr = [r1, r2, c1, c2, v];
  const freq = (1 / (2 * 3.14159265359)) * (1 / Math.sqrt(r1 * r2 * c1 * c2));
  var res;
  var num1 = r2 / r1 + c1 / c2;
  var num2 = r3;
  console.log(freq);
  console.log(freq - omega);
  if (Math.abs(num2 - num1) > 0.2) {
    var audio = new Audio("audio1_detector.mp3");
    audio.play();
    audio.volume = 0.1;
    swal("Unbalanced");
    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 3000);
      },
      false
    );
  } else if (Math.abs(freq - omega) > omega / 20) {
    res = (freq - omega) / 100;
    if (res < -1) {
      res = -1;
      document.getElementById("digi").innerHTML = res;
    } else if (res > 1) {
      res = 1;
      document.getElementById("digi").innerHTML = res;
    } else {
      res = res.toFixed(3);
      document.getElementById("digi").innerHTML = res;
    }
    var audio = new Audio("audio1_detector.mp3");
    audio.play();
    audio.volume = 0.1;
    swal("Unbalanced");
    audio.addEventListener(
      "canplaythrough",
      function () {
        setTimeout(function () {
          audio.pause();
        }, 3000);
      },
      false
    );
  } else {
    //swal("f: " + freq);
    var remain = omega / 100;
    console.log(omega);
    console.log(freq);
    console.log(freq - omega);

    if (Math.abs(freq - omega) > remain) {
      res = (freq - omega) / 100;
      res = res.toFixed(3);
      document.getElementById("digi").innerHTML = res;
      var audio = new Audio("audio2_detector.mp3");
      audio.play();
      audio.volume = 0.2;
      swal("Unbalanced");
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
      res = 0;
      document.getElementById("digi").innerHTML = res;
      swal("balanced Bridge");
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

      var cell = document.createElement("td");
      cell.innerHTML = freq.toFixed(4);
      row.appendChild(cell);
      document.getElementById("myTable").appendChild(row);
    }
  }
}

var count1 = 1,
  count2 = 1,
  count3 = 1,
  count4 = 1,
  count5 = 1;
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
      hoverPaintStyle: { stroke: "blue", strokeWidth: 5 },
      connector: "Flowchart",
    },
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

  $("body").on("click", ".delete-control", function (event) {
    instance.remove(window.selectedControl);
  });

  $("#toolbox .control").draggable({
    helper: "clone",
    containment: "#diagram",
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
      } else if (s[8] == "d") {
        id = s[8] + count3.toString();
        count3++;
      } else if (s[8] == "c") {
        id = s[8] + count4.toString();
        count4++;
      }
      clone.attr("id", id);
      clone.appendTo(this);
      instance.draggable(id, { containment: true });

      if (id[0] == "v") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 3,
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
      } else if (id[0] == "d") {
        instance.addEndpoint(id, {
          endpoint: "Dot",
          maxConnections: 2,
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

/*var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  
  
  
  slider.oninput = function() {
    data3 = this.value;
    output.innerHTML = this.value;
  }*/

document.getElementsByTagName("button")[0].onclick = contagem;

function contagem() {
  var allConnections = instance.getConnections({});
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
    c_d = 0,
    c_c = 0,
    j = 0,
    s_v;
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
    } else c_d++;
  }
  const set_2 = new Set(arr1);
  console.log(arr_r);
  if (
    Tid.length != 11 ||
    Sid.length != 11 ||
    !setsAreEqual(set_1, set_2) ||
    c_r != 4 ||
    c_v != 1 ||
    c_d != 1 ||
    c_c != 2
  ) {
    swal("Wrong Connection");
  } else {
    var p_top = document.querySelector("#diagram").getBoundingClientRect().top;
    var p_left = document
      .querySelector("#diagram")
      .getBoundingClientRect().left;
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
    if (s[0] != "r" || amp[s].length != 3 || amp[s][0] != arr[7]) {
      swal("Wrong Connection");
    } else {
      var r_top =
        document.querySelector("#" + s + "").getBoundingClientRect().bottom -
        p_top;
      var r_left =
        document.querySelector("#" + s + "").getBoundingClientRect().left -
        p_left +
        10;
      r_pos[3] = [r_top, r_left];
      s_element.add(s);
      if (amp[s][2] != arr[2]) s = amp[s][2];
      else s = amp[s][1];
      if (
        s_element.has(s) ||
        s[0] != "c" ||
        amp[s].length != 2 ||
        amp[s][0][0] != "r"
      )
        swal("Wrong Connection");
      else {
        r_top =
          document.querySelector("#" + s + "").getBoundingClientRect().bottom -
          p_top;
        r_left =
          document.querySelector("#" + s + "").getBoundingClientRect().left -
          p_left +
          10;
        c_pos[1] = [r_top, r_left];
        s_element.add(s);
        s = amp[s][1];
        if (
          s_element.has(s) ||
          s[0] != "r" ||
          amp[s].length != 2 ||
          amp[s][1] != arr[7]
        )
          swal("Wrong Connection");
        else {
          r_top =
            document.querySelector("#" + s + "").getBoundingClientRect()
              .bottom - p_top;
          r_left =
            document.querySelector("#" + s + "").getBoundingClientRect().left -
            p_left +
            10;
          r_pos[1] = [r_top, r_left];
          s_element.add(s);
          s = amp[arr[2]][1];
          if (s[0] != "r" && s[0] != "c") swal("Wrong Connections");
          else {
            if (s[0] == "r") {
              /*if (s_element.has(s) || amp[s].length != 2 || amp[s][1] != arr[7])
                  alert("Wrong Connection");
                else {
                  r_top = document.querySelector('#' + s + '').getBoundingClientRect().top + 30;
                  r_left = document.querySelector('#' + s + '').getBoundingClientRect().left - 210;
                  r_pos[0] = [r_top, r_left];
                  s_element.add(s);
                  s = amp[arr[2]][1];*/
              if (s_element.has(s) || amp[s].length != 3 || amp[s][2] != arr[7])
                swal("Wrong Connection");
              else {
                r_top =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .bottom - p_top;
                r_left =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .left -
                  p_left +
                  10;
                r_pos[0] = [r_top, r_left];
                s_element.add(s);
                if (amp[s][1] != arr[2]) {
                  s = amp[s][1];
                } else {
                  s = amp[s][0];
                }
                console.log(s);
                if (
                  s_element.has(s) ||
                  amp[s].length != 3 ||
                  amp[s][0] != arr[7]
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
                    10;
                  r_pos[2] = [r_top, r_left];
                  s_element.add(s);

                  if (s_element.has(amp[s][1])) s = amp[s][2];
                  else s = amp[s][1];
                  if (
                    amp[s].length != 2 ||
                    amp[s][1] != arr[7] ||
                    s[0] != "c"
                  ) {
                    swal("Wrong Connections");
                  } else {
                    r_top =
                      document
                        .querySelector("#" + s + "")
                        .getBoundingClientRect().bottom - p_top;
                    r_left =
                      document
                        .querySelector("#" + s + "")
                        .getBoundingClientRect().left -
                      p_left +
                      10;
                    c_pos[0] = [r_top, r_left];
                    swal("Right Connections...Go Ahead!!");
                    omega = randomIntFromInterval(50, 3000);

                    console.log(omega);

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
                      "<div id='abcd' style = 'position: absolute;top:" +
                        v_top +
                        "px ; left:" +
                        v_left +
                        "px ;'><b>+ V,f -</b></div>"
                    ).appendTo("#diagram");

                    for (var i = 0; i < 4; i++) {
                      $(
                        "<div id='r1_tag" +
                          i +
                          "' style = 'position: absolute;top:" +
                          r_pos[i][0] +
                          "px ; left:" +
                          r_pos[i][1] +
                          "px ;'><b>R" +
                          (i + 1) +
                          "</b></div>"
                      ).appendTo("#diagram");
                    }

                    $(
                      "<div id='c1_tag0' style = 'position: absolute;top:" +
                        c_pos[0][0] +
                        "px ; left:" +
                        c_pos[0][1] +
                        "px ;'><b>C" +
                        1 +
                        "</b></div>"
                    ).appendTo("#diagram");
                    $(
                      "<div id='c1_tag1' style = 'position: absolute;top:" +
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
            } else {
              if (s_element.has(s) || amp[s].length != 3 || amp[s][2] != arr[7])
                swal("Wrong Connections");
              else {
                r_top =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .bottom - p_top;
                r_left =
                  document.querySelector("#" + s + "").getBoundingClientRect()
                    .left -
                  p_left +
                  10;
                c_pos[0] = [r_top, r_left];
                s_element.add(s);
                if (amp[s][1] != arr[2]) s = amp[s][1];
                else s = amp[s][0];
                if (
                  s_element.has(s) ||
                  amp[s].length != 3 ||
                  amp[s][0] != arr[7]
                )
                  swal("Wrong Connections");
                else {
                  r_top =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .bottom - p_top;
                  r_left =
                    document.querySelector("#" + s + "").getBoundingClientRect()
                      .left -
                    p_left +
                    10;
                  r_pos[2] = [r_top, r_left];
                  s_element.add(s);
                  if (s_element.has(amp[s][1])) s = amp[s][2];
                  else s = amp[s][1];
                  if (
                    s_element.has(s) ||
                    amp[s].length != 2 ||
                    amp[s][1] != arr[7] ||
                    s[0] != "r"
                  )
                    swal("Wrong Connection");
                  else {
                    r_top =
                      document
                        .querySelector("#" + s + "")
                        .getBoundingClientRect().bottom - p_top;
                    r_left =
                      document
                        .querySelector("#" + s + "")
                        .getBoundingClientRect().left -
                      p_left +
                      10;
                    r_pos[0] = [r_top, r_left];
                    s_element.add(s);
                    swal("Right Connections...Go Ahead!!");
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
                      "<div id='abcd' style = 'position: absolute;top:" +
                        v_top +
                        "px ; left:" +
                        v_left +
                        "px ;'><b>+ V,f -</b></div>"
                    ).appendTo("#diagram");

                    for (var i = 0; i < 4; i++) {
                      $(
                        "<div id='r1_tag" +
                          i +
                          "' style = 'position: absolute;top:" +
                          r_pos[i][0] +
                          "px ; left:" +
                          r_pos[i][1] +
                          "px ;'><b>R" +
                          (i + 1) +
                          "</b></div>"
                      ).appendTo("#diagram");
                    }

                    $(
                      "<div id='c1_tag0' style = 'position: absolute;top:" +
                        c_pos[0][0] +
                        "px ; left:" +
                        c_pos[0][1] +
                        "px ;'><b>C" +
                        1 +
                        "</b></div>"
                    ).appendTo("#diagram");
                    $(
                      "<div id='c1_tag1' style = 'position: absolute;top:" +
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
  }
}
function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every((element) => {
    return b.has(element);
  });
}
