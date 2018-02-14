//JavaScript Document

jQuery(document).ready(function($) {
    /*
    * Replace all SVG images with inline SVG to make it modifiable with CSS
    */
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
});

//Examples
//
//      3000.formatMoney() = 30.00 (assuming thats 3000 pennies)
//      3000.formatMoney(false) 3,000.00 (assuming thats 3000 dollars)
//      3000000.fomartMoney(true, "3", "n", "w") = 30w000n00 (as opposed to 30,000.00)
//      300000000.fomartMoney(false, "3", "n", "w") = 30,000n00 (as opposed to 30,000.00)
//
Number.prototype.formatMoney = function(pennies, c, d, t){
    var n = this,
        pennies = pennies == undefined ? true : pennies,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t;
    if(pennies) {
        n =Math.round(n * 1.0) / 100;
    }
    var s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function invertHex(hexnum){
    hexnum = hexnum.replace('#', "")
    if(hexnum.length != 6) {
        console.error("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for(i=0; i<6; i++){
        if(!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if(complexnum[splitnum[i]]){
            resultnum += complexnum[splitnum[i]];
        } else {
            console.error("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }
  return "#"+resultnum;
}

function getBrightnessIndex(red, green, blue) {
    return Math.sqrt( (.241*Math.pow(red, 2)) + (.691*Math.pow(green, 2)) + (.068*Math.pow(blue, 2)) );
}

function getVibranceIndex(red, green, blue) {
    var primaryVibrance, secondaryVibrance, tertiaryVibrance;
    if(red > green && red > blue) {
        primaryVibrance = red;
        if(green > blue) {
            secondaryVibrance = green;
            tertiaryVibrance = blue;
        } else {
            secondaryVibrance = blue;
            tertiaryVibrance = green;
        }
    } else if(green > red && green > blue) {
        primaryVibrance = green;
        if(red > blue) {
            secondaryVibrance = red;
            tertiaryVibrance = blue;
        } else {
            secondaryVibrance = blue;
            tertiaryVibrance = red;
        }
    } else {
        primaryVibrance = blue;
        if(red > green) {
            secondaryVibrance = red;
            tertiaryVibrance = green;
        } else {
            secondaryVibrance = green;
            tertiaryVibrance = red;
        }
    }

    return ((tertiaryVibrance - primaryVibrance)/255)*100;
}

function rgbToHex(rgb, hashBool){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function hexToRgb(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    rgbArray = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    if(alpha != undefined) {
        return "rgba("+rgbArray.r+", "+rgbArray.g+", "+rgbArray.b+", "+alpha+")";
    } else {
        return "rgb("+rgbArray.r+", "+rgbArray.g+", "+rgbArray.b+")";
    }
}

function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  lum = lum || 0;
  // Convert to decimal and change luminosity
  var rgb = "#",
    c;
  for (var i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

function increaseSaturation(color, saturation) {
    var hsl= rgbToHsl(color[0],color[1],color[2]);
    hsl[1] *= saturation;
    if(hsl[1] > 100) {
        hsl[1] = 100;
    }
    var rgb= hslToRgb(hsl[0], hsl[1], hsl[2]);
    rgb[0] = Math.round(rgb[0]);
    rgb[1] = Math.round(rgb[1]);
    rgb[2] = Math.round(rgb[2]);
    return (rgb); //new color
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  if(r < 0) {
      r = 0;
  }
  if(r > 1) {
      r = 1;
  }
  if(g < 0) {
      g = 0;
  }
  if(g > 1) {
      g = 1;
  }
  if(b < 0) {
      b = 0;
  }
  if(b > 1) {
      b = 1;
  }
  return [ r * 255, g * 255, b * 255 ];
}

function notify(param) {
    if(typeof param === 'string' || param instanceof String) {
        var tempStr = param;
        param = {};
        param.message = tempStr;
    }
    if(param == undefined) {
        param = {};
    }
    if(param.title == undefined) {
        param.title = "";
    }
    if(param.message == undefined) {
        param.message = "<i>Empty Message</i>";
    }
    if(param.type == undefined) { //Types include:
        param.type = "notify";        //Notify: Pops Up and takes over the whole screen
    }                                               //Banner: Temporarily pops up and slides away (no background) or buttons
    if(param.duration == undefined) {
        param.duration = 1500;         //Time in miliseconds
    }
    if(param.cssClass == undefined) {
        param.cssClass = "";          //Adds a custom class
    }
    if(param.buttonText == undefined) {
        param.buttonText = "Close";
    }
    if(param.queue == undefined) { // if false then banner notfications that wait to close out will be force closed and the banner forccing will show
        //Maybe plan to add the ability to keep the queue in future as opposed to forcing out all the queue items
        param.queue = false;
    }
    if(param.yesFunction == undefined) { //function that happens when user clicks the "yes" button
        param.yesFunction = function() {};
    }
    if(param.noFunction == undefined) { //function that happens when user clicks the "no" button
        param.noFunction = function() {};
    }
    if(param.waitFunction == undefined) { //function that happens when user clicks the "ok" button (not yes or no mode)
        param.waitFunction = function() {};
    }
    param.type = param.type.toLowerCase();
    $(".notifyCloseHolder").find(".button").unbind("click");
    $(".notifyCloseHolder").find(".button").on("click", function() {
        var thisButton = $(this);
        var posFunc = window[thisButton.attr("data-id")+"Yes"];
        var negFunc = window[thisButton.attr("data-id")+"No"];
        function runChoice(thisButton, pos, neg) {
            if(thisButton.hasClass('choice')) {
                if(thisButton.hasClass('yes')) {
                    pos;
                } else {
                    neg;
                }
            } else {
                param.waitFunction();
            }
        }

        $(".notifyContainer").find("#"+window["notifyID"]).remove();
        var notifyNum = $(".notifyContainer").find(".alert").length;
        if(notifyNum == 0) {
            window["notifyOpen"] = false;
            $(".notifyCloseHolder").find(".button").unbind("click");
            $(".notifyContainer").css({opacity:0, "pointer-events":"none"});
            $(".notifyHolder").css({transform:"translateY(-50px)"});
            setTimeout(function() {
                $(".notifyContainer").attr("class", "notifyContainer");
                $(".notifyHolder").css({transform:"translateY(50px)"});
                runChoice(thisButton, posFunc, negFunc);
            }, 250);
        } else {
            $(".notifyHolder").css({opacity:0});
            window["notifyOpen"] = false;
            setTimeout(function() {
                $(".notifyHolder").css({opacity:1});
                runChoice(thisButton, posFunc, negFunc);
                runNotifier();
            }, 200);
        }
    });

    var dataClass = "";
    if(param.type == "banner") {
        $(".notifyContainer").addClass("banner");
        dataClass += " banner";
    }
    if(param.cssClass != "") {
        $(".notifyContainer").addClass(param.cssClass);
        dataClass += " "+param.cssClass;
    }

    var id = randomString();
    if(!param.choice) {
        $(".notifyContainer").append('<div class="alert normal" id="'+id+'" data-duration="'+param.duration+'" data-class="'+dataClass+'" data-button-text = "'+param.buttonText+'"><div class="title">'+param.title+'</div><div class="message">'+param.message+'</div></div>');
    } else {
        $(".notifyContainer").append('<div class="alert choice" id="'+id+'" data-duration="'+param.duration+'" data-class="'+dataClass+'" data-id="'+id+'"><div class="title">'+param.title+'</div><div class="message">'+param.message+'</div></div>');
        window[id+"Yes"] = param.yesFunction;
        window[id+"No"] = param.noFunction;
    }

    if(window["notifyOpen"] == undefined) {
        window["notifyOpen"] = false;
    }

    if(param.queue == false) {
        clearTimeout(window["notifyCloseWaiter"]);
        if(window["notifyOpen"] == true) {
            $(".notifyCloseHolder").find(".button").trigger("click");
        } else {
            runNotifier();
        }
    } else {
        runNotifier();
    }

     function runNotifier() {
         if(!window["notifyOpen"]) {
             window["notifyOpen"] = true;
             var currentNotification = $(".notifyContainer").find(".alert").eq(0);
             window["notifyID"] = currentNotification.attr("id");
             $(".notifyContainer").attr("class", "notifyContainer"+currentNotification.attr("data-class"));
             console.log("notifyContainer"+currentNotification.attr("data-class"));
             var duration = parseInt(currentNotification.attr("data-duration"));
             if($(".notifyContainer").hasClass("banner")) {
                 window["notifyCloseWaiter"] = setTimeout(function() {
                     $(".notifyCloseHolder").find(".button").trigger("click");
                 }, duration);
             }

             if(currentNotification.hasClass("choice")) {
                 $(".notifyCloseHolder").find(".choice").attr("data-id", currentNotification.attr("data-id"));
                 $(".notifyCloseHolder").find(".choice").css({display:"inline-block"});
                 $(".notifyCloseHolder").find(".normal").css({display:"none"});
             } else {
                 $(".notifyCloseHolder").find(".choice").css({display:"none"});
                 $(".notifyCloseHolder").find(".normal").css({display:"inline-block"});
             }
             var title = currentNotification.find(".title").html();
             var message = currentNotification.find(".message").html();
             var buttonText = currentNotification.attr("data-button-text");

             $(".notifyMessage").html(message);
             if(title.length == 0) {
                 $(".notifyTitleHolder").css({display:"none"});
             } else {
                 $(".notifyTitleHolder").css({display:"block"});
                 $(".notifyTitleHolder").html(title);
             }
             $(".notifyContainer").css({opacity:1, "pointer-events":"all"});
             $(".notifyHolder").css({transform:"translateY(0px)"});
             $(".notifyHolder").find(".button.normal").html(buttonText);
         }
     }
}

function whenEverythingLoaded(func) {
    var everythingLoaded = setInterval(function() {
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        func();
      }
    }, 10);
}

//Here are a few variations of a loader
// <div class="loaderHolder">
//     <div class="loadingElements noSelect">
//         <div class="loaderBox">
//             <svg class="loaderContainer">
//                 <path class="loader"></path>
//             </svg>
//         </div>
//         <div class="progressBarHolder">
//             <div class="progressBar"></div>
//             <div class="loadingCancel">Cancel</div>
//         </div>
//     </div><div class="verticalAlign"></div>
// </div>
//
// OR
//
// <div class="loaderHolder">
//     <div class="loadingElements noSelect">
//         <div class="loaderBox">
//             <svg class="loaderContainer">
//                 <path class="loader"></path>
//             </svg>
//         </div>
//         Loading
//     </div><div class="verticalAlign"></div>
// </div>

jQuery.fn.extend({
    startLoader: function() {
        var elm = $(this);
        var timing = 1000;
        var timer = 0;
        var id = randomString();
        elm.attr("data-loaderID", id);
        window["loaderInterval"+id] = setInterval(function() {
            var strokeVal = 5*Math.cos((timer*(2*Math.PI)) / (timing*2)) +10;
            var padVal = 27.5*Math.cos((timer*(2*Math.PI)) / (timing*2)) + 27.5;
            elm.drawArc({percentage:100, strokeWidth:strokeVal, padding:padVal});
            timer += 16.666666666;
            if(timer > 2*timing) {
                timer = 0;
            }
        }, 16.6666666666);
    }
});

$(".loaderHolder").on("click", ".loadingCancel", function() {
    $(".loader").hideLoader();
});

jQuery.fn.extend({
    stopLoader: function() {
        var id = $(this).attr("data-loaderID");
        clearInterval(window['loaderInterval'+id]);
    }
});

jQuery.fn.extend({
    showLoader: function(progressBar) {
        if(progressBar) {
            $(".progressBarHolder").css({display:"block"})
        }
        $(this).closest('.loaderHolder').css("pointer-events", "all");
        $(this).closest('.loaderHolder').css("opacity", 1);
    }
});

jQuery.fn.extend({
    hideLoader: function() {
        $(this).closest('.loaderHolder').css("opacity", 0);
        $(this).closest('.loaderHolder').css("pointer-events", "none");
    }
});

jQuery.fn.extend({
    runAjax: function(success) {
        var form = $(this);
        var url = form.attr("action");
        if(url == "" || url == undefined) {
            console.log("runAjax has no url action!");
        }
        var formData = new FormData(form[0]);
        var id = randomString();
        $(".loadingCancel").on("click", function() {
            window["ajax"+id].abort();
            setTimeout(function() {
                $(".loadingCancel").unbind("click");
                $(".loadingCancel").on("click", function() {
                    $(this).closest(".loaderHolder").find(".loader").hideLoader();
                });
            }, 10);
        });
        if(success == undefined) {
            success = function() {}
        }
        return window["ajax"+id]=$.ajax({
                    xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    // Upload progress
                    xhr.upload.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            window["percentComplete"] = evt.loaded / evt.total;
                            // console.log(window["percentComplete"]);
                            //Do something with upload progress
                            $(".progressBar").css({width: (percentComplete*100)+"%"});
                        }
                   }, false);
                   // Download progress
                   xhr.addEventListener("progress", function(evt){
                       if (evt.lengthComputable) {
                           window["percentComplete"] = evt.loaded / evt.total;
                           // Do something with download progress
                           $(".progressBar").css({width: (percentComplete*100)+"%"});
                       }
                   }, false);
                   return xhr;
                },
               type: "POST",
               url: url,
               data: formData, // serializes the form's elements.
               async: true,
               cache:false,
               dataType:"json",
               enctype: 'multipart/form-data',
               processData: false,  // tell jQuery not to process the data
               contentType: false,  // tell jQuery not to set contentType
               success: function(data) {
                   $(".loadingCancel").unbind("click");
                   $(".loadingCancel").on("click", function() {
                       $(".loader").hideLoader();
                   });
                   $(".loader").hideLoader();
                  success(data);
               },
              fail: function() {
                  $(".loadingCancel").unbind("click");
                  $(".loadingCancel").on("click", function() {
                      $(".loader").hideLoader();
                  });
                  notify({message:"Apologies, our servers are under maintenance, please try again in a few moments"});
                  $(".loader").hideLoader();
              }
        });
        function randomString(length) {
            if(length == undefined) {
                length = 10;
            }
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < length; i++ ) {
                text = text + possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
    }
})


function runAjax(form, url, success) {
    var formData = new FormData(form[0]);
    var id = randomString();
    $(".loadingCancel").on("click", function() {
        window["ajax"+id].abort();
        setTimeout(function() {
            $(".loadingCancel").unbind("click");
            $(".loadingCancel").on("click", function() {
                $(this).closest(".loaderHolder").find(".loader").hideLoader();
            });
        }, 10);
    });
    return window["ajax"+id]=$.ajax({
                xhr: function() {
                var xhr = new window.XMLHttpRequest();
                // Upload progress
                xhr.upload.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        window["percentComplete"] = evt.loaded / evt.total;
                        // console.log(window["percentComplete"]);
                        //Do something with upload progress
                        $(".progressBar").css({width: (percentComplete*100)+"%"});
                    }
               }, false);
               // Download progress
               xhr.addEventListener("progress", function(evt){
                   if (evt.lengthComputable) {
                       window["percentComplete"] = evt.loaded / evt.total;
                       // Do something with download progress
                       $(".progressBar").css({width: (percentComplete*100)+"%"});
                   }
               }, false);
               return xhr;
            },
           type: "POST",
           url: url,
           data: formData, // serializes the form's elements.
           async: true,
           cache:false,
           dataType:"json",
           enctype: 'multipart/form-data',
           processData: false,  // tell jQuery not to process the data
           contentType: false,  // tell jQuery not to set contentType
           success: function(data) {
               $(".loadingCancel").unbind("click");
               $(".loadingCancel").on("click", function() {
                   $(".loader").hideLoader();
               });
               $(".loader").hideLoader();
              success(data);
           },
          fail: function() {
              $(".loadingCancel").unbind("click");
              $(".loadingCancel").on("click", function() {
                  $(".loader").hideLoader();
              });
              notify({message:"Apologies, our servers are under maintenance, please try again in a few moments"});
              $(".loader").hideLoader();
          }
    });
    function randomString(length) {
        if(length == undefined) {
            length = 10;
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ ) {
            text = text + possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

jQuery.fn.extend({
    drawArc: function(param) {
        if(param.percentage == undefined) {
            param.percentage = 100;
        }
        if(param.strokeWidth == undefined) {
            param.strokeWidth = 2;
        }
        if(param.strokeColor == undefined) {
            param.strokeColor = "";
        }
        if(param.fillColor == undefined) {
            param.fillColor = "transparent";
        }
        if(param.rotate == undefined) {
            param.rotate = 0;
        }
        if(param.padding == undefined) {
            param.padding = 0; //currently only in pixel measurements (and it equally pads to width and height), but plan to add percentage as well.
        }
        if(param.resize == undefined) {
            param.resize = false;
        }

        // console.log(param);

        var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') :  '.' + $(this).attr('class');
        if(param.percentage > 100) {
            param.percentage = 100;
        }

        var strokeCompensation = .5*param.strokeWidth + (param.padding/2);

        var center = (this.parent().width()/2) - strokeCompensation;

        $(this).attr({"percentage": param.percentage});
        $(this).attr({"rotate": param.rotate});
        $(this).attr({"transform": "translate("+strokeCompensation+", "+strokeCompensation+") rotate("+param.rotate+" "+center+" "+center+")"});
        $(this).css({
            "stroke-width": param.strokeWidth,
            "padding": param.padding,
            "stroke": param.strokeColor,
            "fill": param.fillColor
        });
        $(this).css({});
        $(this).css({"stroke": param.strokeColor});
        $(this).css({"fill": param.fillColor});

        var radius = (this.parent().width()/2) - strokeCompensation;

        var startX = radius;
        var startY = 0;

        var degrees = (360*((50-param.percentage)/100));
        var radians = (degrees/180)*Math.PI;

        var endY = (radius*Math.cos(radians) + radius);
        var endX = (radius*Math.sin(radians) + radius);
        endX = 2*radius - endX;
        var path = "";
        if(param.percentage <= 50) {
            path = "M "+startX+" "+startY+" A " + radius + " " + radius + ", 0 0 0, "+endX + " " + endY +"";
        } else if(param.percentage > 50 && param.percentage <= 100) {
            path = "M "+startX+" "+startY+" A " + radius + " " + radius + ", 0 0 0, "+radius + " " + 2*radius+"";
            path += " A " + radius + " " + radius + ", 0 0 0, "+endX + " " + endY +"";
        }
        $(this).attr("d", path);

        if(param.resize) {
            if(window[selector] == null) {
                window[selector] = 1;
            } else {
                window[selector]++;
            }
            var drawID = window[selector];
            $(window).on("resize", function() {
                drawArcID = drawID;
                if(window[selector] == drawArcID) {
                    var staticPercentage = parseInt($(selector).attr("percentage"));
                    var staticStrokeWidth = parseInt($(selector).css("stroke-width"));
                    var staticStrokeColor = $(selector).css("stroke");
                    var staticFillColor = $(selector).css("fill");
                    var staticRotate = parseInt($(selector).attr("rotate"));
                    var staticPadding = parseInt($(selector).css("padding"));

                    $(selector).drawArc({percentage:staticPercentage, strokeWidth:staticStrokeWidth, strokeColor:staticStrokeColor, fillColor:staticFillColor, resize:false, rotation:staticRotate, padding:staticPadding})
                }
            });
        }
    }
});

jQuery.fn.extend({ //REQUIRES THE drawArc JQUERY EXTENSION
    animateArc: function(percentage, strokeWidth, strokeColor, fillColor, duration, type) {
        var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') :  '.' + $(this).attr('class');
        if(percentage > 100) {
            percentage = 100;
        }

        if(type == null) {
            type = "sine";
        }
        if($(this).attr("percentage") == null) {
            var animDuration = Math.PI / ( duration / 15 );
            var animationPercentage = 0;
            var animationCount = 0;
            if(type === "cosine") {
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage - .1)) {
                        animationPercentage = percentage - (percentage * Math.cos(animationCount * animDuration) + percentage)/2;
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            } else if(type === "sine") {
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage - .1)) {
                        animationPercentage = percentage * Math.sin(animationCount * animDuration);
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            }
            else if(type === "linear") {
                animDuration = duration/15;
                incremPercentage = percentage/animDuration;
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage - .1)) {
                        animationPercentage = (animationCount * incremPercentage);
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            }

        } else if(parseInt($(this).attr("percentage")) > percentage) {
            var animDuration = Math.PI / ( duration / 15 );
            var tempPercentage = parseInt($(this).attr("percentage"));
            var animationPercentage = tempPercentage;
            var animationCount = (duration/15)/2;
            if(type === "cosine") {
                var arcInterval = setInterval(function() {
                    if(animationPercentage >= (percentage + .1)) {
                        animationPercentage = tempPercentage - ((tempPercentage - percentage) * Math.cos(animationCount * animDuration));
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount--;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            } else if(type === "sine") {
                animationCount = 0;
                var arcInterval = setInterval(function() {
                    if(animationPercentage >= (percentage + .1)) {
                        animationPercentage = tempPercentage - ((tempPercentage - percentage) * Math.sin(animationCount * animDuration));
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            } else if(type === "linear") {
                animDuration = duration/15;
                incremPercentage = percentage/animDuration;
                animationCount = 0;
                var arcInterval = setInterval(function() {
                    if(animationPercentage >= (percentage + .1)) {
                        animationPercentage = tempPercentage - (animationCount * incremPercentage);
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            }
        } else if(parseInt($(this).attr("percentage")) < percentage) {
            var animDuration = Math.PI / ( duration / 15 );
            var tempPercentage = parseInt($(this).attr("percentage"));
            var animationPercentage = tempPercentage;
            var animationCount = (duration/15)/2;
            if(type === "cosine") {
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage - .1)) {
                        animationPercentage = tempPercentage + ((percentage - tempPercentage) * Math.cos(animationCount * animDuration));
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount--;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            } else if(type === "sine") {
                animationCount = 0;
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage - .1)) {
                        animationPercentage = tempPercentage + ((percentage - tempPercentage) * Math.sin(animationCount * animDuration));
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            } else if(type === "linear") {
                animDuration = duration/15;
                incremPercentage = percentage/animDuration;
                animationCount = 0;
                var arcInterval = setInterval(function() {
                    if(animationPercentage <= (percentage + .1)) {
                        animationPercentage = tempPercentage + (animationCount * incremPercentage);
                        $(selector).drawArc(animationPercentage, strokeWidth, strokeColor, fillColor, true);
                        animationCount++;
                    } else {
                        clearInterval(arcInterval);
                        $(selector).drawArc(percentage, strokeWidth, strokeColor, fillColor, true);
                    }
                }, 15);
            }
        }


    }
});

jQuery.fn.extend({
    uniqueid: function() {
        return this.each(function() {
            if($(this).attr("id") !== undefined) {
                return "#"+$(this).attr("id");
            }
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ ) {
                text = text + possible.charAt(Math.floor(Math.random() * possible.length));
            }

            if ($("#" + text).length) {
               $(this).uniqueid();
          } else {
              $(this).attr("id", text);
          }
          return "#" + text;
        });
    }
});

function randomString(length) {
    if(length == undefined) {
        length = 10;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ ) {
        text = text + possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

jQuery.fn.extend({
    ensureLoad: function(handler) {
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            } else {
                $(this).load(handler);
            }
        });
    }
});

jQuery.fn.extend({
    //this requires the resize listener found here: https://github.com/sdecima/javascript-detect-element-resize
    //located at the bottom of functions.js (maybe)
    resizeImg: function(params) {
        params.elm = $(this);
        if(params.scale == undefined) {
            params.scale= 1;
        }
        if(params.container== undefined) {
            //Specifies the container that calculates the ratio by which to resize the image
            // This is different from the resizer because this element doesn't trigger the resize event listener
            // This is also different from the parent because it isn't used to calculate the position offset
            //This is PURELY used to calculate how the image will resize
            params.container = $(this).parent();
        }
        if(params.width == undefined) {
            //used to override cotainer width
        }
        if(params.height == undefined) {
            //used to override cotainer height
        }
        if(params.containerAlignX == undefined) {
            //used to when param.width is active
            //specifies where the param.width is for alignment
            params.containerAlignX = "left";
        }
        if(params.containerAlignY == undefined) {
            //NOT IMPLEMENTED
            //used to when param.height is active
            //specifies where the param.height is for alignment
        }
        if(params.resizer == undefined) {
            //Specifies what element is used for the resize event
            params.resizer = $(window);
        }
        if(params.parent == undefined) {
            //Used to specifiy the offset for a child to align propery inside the parent's bounding box
            // If this wasn't set then the image would always position in accordance with the window
            params.parent = params.container;
        }
        if(params.align == undefined) {
            //Specifies how the image will position itself
            //Currently supported:
                    //Center
            params.align = "center";
        }
        if(params.eventListener == undefined) {
            //Toggles the event listener (on by defualt)
            params.eventListener = true;
        }
        params.ratioHeight = params.elm.height()/params.elm.width();
        params.ratioWidth = params.elm.width()/params.elm.height();
        function resize(params) {
            var elm=params.elm, container=params.container, eventListener = params.eventListener
            var imgHeight;
            var imgWidth;
            var ratioHeight = params.ratioHeight;
            var ratioWidth = params.ratioWidth;
            var containerHeight;
            var containerWidth;
            if(params.height != undefined) {
                containerHeight = params.height;
            } else {
                containerHeight = container.height() + parseInt(container.css("padding-bottom")) + parseInt(container.css("padding-top"));
            }
            if(params.width != undefined) {
                containerWidth = params.width;
            } else {
                containerWidth = container.width() + parseInt(container.css("padding-left")) + parseInt(container.css("padding-right"));
            }
            var containerOffsetX = 0;
            var containerOffsetY = 0;
            var parentOffsetX = 0;
            var parentOffsetY = 0;
            var isWindow = jQuery.isWindow(params.parent[0]);
            if(!isWindow) {
                containerOffsetX = container.offset().left;
                containerOffsetY = container.offset().top;
                parentOffsetX = params.parent.offset().left;
                parentOffsetY = params.parent.offset().top;
            }

            var offsetYCompensation = containerOffsetY - parentOffsetY;
            var offsetXCompensation = containerOffsetX - parentOffsetX;

            var heightRatio = containerHeight/containerWidth;

            if(params.containerAlignX == "right") {
                offsetXCompensation += (Math.abs(params.container.width() - params.width));
            }

            if(heightRatio < ratioHeight) {
                 imgHeight = containerWidth * ratioHeight * params.scale;
                 imgWidth = containerWidth * params.scale;
                 elm.css("height", imgHeight + "px");
                 elm.css("width", imgWidth + "px");
                 if(params.align == "center") {
                     elm.css({transform: "translate3d("+offsetXCompensation+"px, "+(((containerHeight - imgHeight)/2) + offsetYCompensation) + "px, 0)"});
                 }
            } else {
                imgHeight = containerHeight*params.scale;
                imgWidth = containerHeight * ratioWidth * params.scale;
                elm.css("height", imgHeight + "px");
                elm.css("width", imgWidth + "px");
                if(params.align == "center") {
                    offsetXCompensation += ((containerWidth - imgWidth)/2);
                    elm.css({transform: "translate3d("+(offsetXCompensation)+ "px, 0px, 0)"});
                }
            }
            if(eventListener) {
                params.resizer.resize(function() {
                    params.eventListener = false;
                    resize(params);
                });
            }
        }
        resize(params);
    }
});

function scaleImg(id, containerId, eventListener) {
//     var imgHeight;
//     var imgWidth;
//     var elm = $(id);
//     var ratioHeight = elm.height()/elm.width();
//     var ratioWidth = elm.width()/elm.height();
//
//     var containerHeight = $(containerId).height();
//     var containerWidth = $(containerId).width();
//
//     var heightRatio = containerHeight/containerWidth;
//     if(heightRatio < )
//         imgHeight = containerHeight;
//         imgWidth = containerHeight*ratioWidth;
//         elm.css("height", imgHeight + "px");
//         elm.css("width", imgWidth + "px");
//     if(eventListener !== true) {
//         window.addEventListener("resize", function() {
//             scaleImg(id, containerId, true);
//         });
//     }
}

function changeSelectColor(sel) {
    sel.style.opacity = 1;
    $(sel).css("border-color", "rgba(255, 255, 255, 0.25)");
}

jQuery.fn.extend({
    moveScroll: function(param) {
        //TO ANIMATE $(WINDOW) USE $("body, html")
        if(param.direction == undefined) {
            //vertical goes up and down
            //horizontal goes left and right
            param.direction = "vertical";
        }
        if(param.distance == undefined) {
            //use negative values to go up and left
            param.distance = 0;
        }
		if(param.relative == undefined) {
			//if enabled it simply moves the scroll relative to its current position
			//if disabled the scroll position is set to the distance given
            param.relative = false;
        }
        if(param.duration == undefined) {
            //use negative values to go up and left
            param.duration = 1000;
        }
        if(param.easing == undefined) {
            //use negative values to go up and left
            param.easing = "easeInOutQuart";
        }
		if(param.disableScroll == undefined) {
            //use negative values to go up and left
            param.disableScroll = true;
        }
        param.direction = param.direction.toLowerCase();
		if(param.disableScroll) {
			disableScroll();
		}
        if(param.direction == "vertical") {
			if(param.relative) {
				$(this).animate({scrollTop: $(this).scrollTop() + param.distance}, param.duration, param.easing);
			} else {
				$(this).animate({scrollTop: param.distance}, param.duration, param.easing);
			}
        } else if(param.direction == "horizontal") {
			if(param.relative) {
				$(this).animate({scrollLeft: $(this).scrollLeft() + param.distance}, param.duration, param.easing);
			} else {
				$(this).animate({scrollLeft: param.distance}, param.duration, param.easing);
			}
        }
		if(param.disableScroll) {
			setTimeout(function() {
	            enableScroll();
	        }, param.duration);
		}

		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32:1, 33:1, 34:1, 35:1, 36:1};

		function preventDefault(e) {
		  e = e || window.event;
		  if (e.preventDefault)
		      e.preventDefault();
		  e.returnValue = false;
		}

		function preventDefaultForScrollKeys(e) {
		    if (keys[e.keyCode]) {
		        preventDefault(e);
		        return false;
		    }
		}

		function disableScroll(elm) {
		  if (window.addEventListener) // older FF
		      window.addEventListener('DOMMouseScroll', preventDefault, false);
			  window.onwheel = preventDefault; // modern standard
			  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
			  window.ontouchmove  = preventDefault; // mobile
			  document.onkeydown  = preventDefaultForScrollKeys;
		}

		function enableScroll(elm) {
			if(elm == undefined) {
				elm = $(window);
			}
		    if (window.removeEventListener)
		        window.removeEventListener('DOMMouseScroll', preventDefault, false);
			    window.onmousewheel = document.onmousewheel = null;
			    window.onwheel = null;
			    window.ontouchmove = null;
			    document.onkeydown = null;
		}
	}
});

function scrollToElm(elm , duration, closeMenu) {
    if(elm.offset().top != $(window).scrollTop()) {
        disableScroll();
        var time = 0;
        if(closeMenu) {
            if(window["windowOpen"]) {
                openMenu("close");
                time = 750;
            }
        }
        setTimeout(function() {
            var position = $(document).height() - elm.offset().top;
            var easing = "easeInOutQuart";
            if($(window).height() > position) {
                $('body, html').animate({scrollTop: $(document).height() - $(window).height()}, duration, easing);
            } else {
                $('body, html').animate({scrollTop: elm.offset().top}, duration, easing);
            }
            setTimeout(function() {
                enableScroll();
            }, duration);
        }, time);
    }
}

function testMac() {
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        return true //mac
    } else {
        return false; //Windows
    }
}

function testOpera() {
	if(navigator.userAgent.indexOf("Opera")) {
		return true;
	} else {
		return;
	}
}

function testMozilla() {
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		return true;
	} else {
		return false;
	}
}

function testSafari() {
    var edge = window.navigator.userAgent.indexOf("Edge") > -1;
	if(navigator.userAgent.indexOf("Safari") > -1 && !(edge)) {
		return true;
	} else {
		return false
	}
}

function testChrome() {
    var edge = window.navigator.userAgent.indexOf("Edge") > -1;
	if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && !(edge)) {
		return true;
	} else {
		return false
	}
}

function testIE(){
  if (navigator.appName == 'Microsoft Internet Explorer'){
    return true; // IE
  }
  else if(navigator.appName == "Netscape"){
     return navigator.appVersion.indexOf('Trident') > -1; // EDGE
  }

  return false;
}

function testEdge() {
    return (window.navigator.userAgent.indexOf("Edge") > -1);
}

//example
// $(".background").eq(i).changeOnScroll({
//     changeVal:-200,
//     changeMethod:"divide",
//     propMethod:"translateY",
//     easing:"easeLinear"
// });

jQuery.fn.extend({ //FOR INDIVIDUAL ELEMENTS ONLY
    changeOnScroll: function(param) {
		//the property you are modifying
        if(param.prop == undefined) {
            param["prop"] = "transform";
        }
        if(param.propInsurance == undefined) { //added prefix that allows you to save the property's current values (like with multiple transforms)
            //current list of supported methods:
            //translateY
            param["propInsurance"] = "";
        }
        if(param.propMethod == undefined) { //added prefix for value (like rotate or translate – add on as needed. Not all are supported)
            //current list of supported methods:
            //translateY
            //blur
            param["propMethod"] = "";
        }
        if(param.propUnit == undefined) {// the units you are using like px, em, %, etc
            param["propUnit"] = "px";
        }
        if(param.changeMethod == undefined) { //three types listed below
            //add: starts at 0 and works its way to the value
            //divide: starts at half the value and then works its way to the opposite sign
                //for example a value of 500 would start at 250 and go to -250
                //and a value of -500 would start at -250 and go to 250
            //subtract: starts at the value and works its way to the 0
            param["changeMethod"] = "add";
        }
        if(param.changePos == undefined) { //three types listed below
            //This determines where on the element the changes will occur
            //outsideTop: Changes will occur before the top when the rangeVal + topPos enters the range and stops when the top is out of range
            //insideTop: Changes will occur when the top enters the range and stop when the top is out of range
            //full: Changes occur when any part of the element is in range (top to bottom)
            //insideBottom: changes occur when the (bottom+range) is in range and stops when it's out.
            //outsideBottom: changes occur when the bottom is in range and stop when it's out.
            param["changePos"] = "full";
        }
        if(param.changeVal == undefined) {
            if(param.changeValDynamic != undefined) {
                param["changeVal"] = $(window).height()*param.changeValDynamic;
                param["changeWindowDynamic"] = true;
                //changeValDynamic is a decimal multiplied by the window viewport
            } else {
                param["changeVal"] = 100;
                //changeVal is a fixed range no matter the window size
            }
        }
        if(param.startVal == undefined) {
            param["startVal"] = 0;
        }
        if(param.easing == undefined) {
            //Current easing options - add as needed
            // easeLinear
            // easeInOutSine
            // easeOutCubic
            // easeInCubic
            param["easing"] = "easeInOutSine";
        }
        if(param.range == undefined) {
            //this determines the distance (in pixels) the change will happen

            param["windowRange"] = true;
            if(param.rangeDynamic != undefined) {
                param["range"] = $(window).height()*param.rangeDynamic;
                //rangeDynamic is a decimal multiplied by the window viewport
            } else {
                param["range"] = $(window).height();
                //range is a fixed range no matter the window size
            }
        }
        if(param.rangePos == undefined) {
            //top: positions the range at the top of the window
            //center: centers the rangePos between top and bottom of the range
            //bottom: positions the range at the bottom of the window
            param["rangePos"] = "center";
        }
        if(param.rangePadding == undefined) {
            param["rangePadding"] = 75;
        }
		if(param.elmContainer == undefined) {
			//defines the container the elment is inside of to limit movements so it doesn't move beyond the borders
		}
        if(param.testing == undefined) {
            //this outputs different types of info to the console
            //RECOMMENDED ONLY FOR ONE ELEMENT OTHERWISE IT SLOWS THE BROWSER DOWN
            param["testing"] = false;
        }
        if(param.forceTesting == undefined) {
            //this forces the outputs to log despite being in range or not
            //RECOMMENDED ONLY FOR ONE ELEMENT OTHERWISE IT SLOWS THE BROWSER DOWN
            param["forceTesting"] = false;
        }

        var elmHeight;
        var elmPosY;

        var aboveRange
        var inRange
        var belowRange

        var elmEnter;
        var elmLeave;

        elmPosY = $(this).offset().top;
        elmHeight = $(this).height() + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("padding-top"));

		if(param.elmContainer != undefined) {
			var parentHeight = param.elmContainer.height();
			param.changeVal = elmHeight - parentHeight;
			if(param.testing) {
				console.log("Parent Height: "+parentHeight);
			}
		}

        var difference = $(window).height() - param.range;
        switch(param.rangePos) {
            case "top": //range at the top
                switch(param.changePos) {
                    case "outsideTop": //changes before the top of the element
                        elmEnter = elmPosY - param.range;
                        elmLeave = elmPosY;
                        break;
                    case "insideTop": //changes at the top of the element
                        elmEnter = elmPosY;
                        elmLeave = elmPosY + param.range;
                        break;
                    case "full": //changes across the entire element
                        elmEnter = elmPosY - param.range;
                        elmLeave = elmPosY + elmHeight;
                        break;
                    case "insideBottom": //changes at the bottom of the element
                        elmEnter = elmPosY - param.range + elmHeight;
                        elmLeave = elmPosY + elmHeight;
                        break;
                    case "outsideBottom": //changes after the bottom of the element
                        elmEnter = elmPosY + elmHeight;
                        elmLeave = elmPosY + elmHeight + param.range;
                        break;
                    }
                break;
            case "center":
                switch(param.changePos) { //range in the center
                    case "outsideTop": //changes before the top of the element
                        elmEnter = elmPosY - $(window).height() + (difference/2) - param.range;
                        elmLeave = elmPosY - $(window).height() + (difference/2)
                        break;
                    case "insideTop": //changes at the top of the element
                        elmEnter = elmPosY - (difference/2) - param.range;
                        elmLeave = elmPosY - (difference/2);
                        break;
                    case "full": //changes across the entire element
                        elmEnter = elmPosY - param.range + (difference / 2);
                        elmLeave = elmPosY + elmHeight - (difference / 2);
                        break;
                    case "insideBottom": //changes at the bottom of the element
                        elmEnter = elmPosY - ($(window).height() - elmHeight) + (difference/2) - param.range;
                        elmLeave = elmPosY - ($(window).height() - elmHeight) + (difference/2);
                        break;
                    case "outsideBottom": //changes after the bottom of the element
                        elmEnter = elmPosY + elmHeight - param.range - (difference / 2);
                        elmLeave = elmPosY + elmHeight - (difference / 2);
                        break;
                    }
                break;
            case "bottom": //range on the bottom
                switch(param.changePos) {
                    case "outsideTop": //changes before the top of the element
                        elmEnter = elmPosY - $(window).height() - param.range;
                        elmLeave = elmPosY - $(window).height();
                        break;
                    case "insideTop": //changes at the top of the element
                        elmEnter = elmPosY - $(window).height();
                        elmLeave = elmPosY - $(window).height() + param.range;
                        break;
                    case "full": //changes across the entire element
                        elmEnter = elmPosY - $(window).height();
                        elmLeave = elmPosY + elmHeight - difference;
                        break;
                    case "insideBottom": //changes at the bottom of the element
                        elmEnter = elmPosY - ($(window).height() - elmHeight) - param.range;
                        elmLeave = elmPosY - ($(window).height() - elmHeight);
                        break;
                    case "outsideBottom": //changes after the bottom of the element
                        elmEnter = elmPosY - ($(window).height() - elmHeight);
                        elmLeave = elmPosY - ($(window).height() - elmHeight) + param.range;
                        break;
                    }
                break;
        }

        aboveRange = $(window).scrollTop() <= elmEnter;
        belowRange = $(window).scrollTop() >= elmLeave;
        inRange = !aboveRange && !belowRange;
        closeToRange = $(window).scrollTop() >= (elmEnter - param.rangePadding) && ($(window).scrollTop())  <= (elmLeave + param.rangePadding)

        var fullRange = elmLeave - elmEnter; //full range of the element in window

        //this is the current distance covered within
        //the available range
        var currentRange = $(window).scrollTop() - elmEnter;
        if(currentRange <= 0) {
            currentRange = 0;
        } else if(currentRange >= fullRange) {
            currentRange = fullRange;
        }

        var rangeDifference = fullRange - currentRange;

        if(aboveRange && closeToRange) {
            if(param.testing) {
                console.log("Above Range");
            }
            var value;
            switch(param.changeMethod) {
                case "add":
                    value = param.startVal;
                    break;
                case "divide":
                    if(param.changeVal < 0) {
                        value = param.startVal + (param.changeVal/2);
                    } else {
                        value = param.startVal + (param.changeVal/2);
                    }
                    break;
                case "subtract":
                    value = param.startVal + param.changeVal;
                    break;
            }
            switch(param.propMethod) {
                case "translateY":
                    $(this).css(param.prop, "translateY("+value+param.propUnit+")");
                    break;
                case "blur":
                    $(this).css(param.prop, "blur("+value+""+param.propUnit+")");
                    break;
                default:
                    $(this).css(param.prop, ""+value+param.propUnit);
                    break;
            }
        }
        if(inRange) {
            if(param.testing) {
                console.log("In Range");
            }
            var calcPos;
            var value;
            switch(param.easing) {
                case "easeLinear":
                    calcPos = param.changeVal * (rangeDifference/fullRange);
                    break;
                case "easeInOutSine":
                    var percentage = (rangeDifference/fullRange);
                    tempCalcPos = (param.changeVal/2)*Math.sin((percentage*Math.PI) + (Math.PI/2)) + (param.changeVal/2);
                    calcPos = param.changeVal - tempCalcPos;
                    break;
                case "easeOutCubic":
                    var percentage = (rangeDifference/fullRange);
                    tempCalcPos = param.changeVal*(Math.pow((Math.pow(percentage, (1/3))) - Math.pow(percentage, (1/3)), 3) + percentage);
                    calcPos = tempCalcPos;
                    break;
                case "easeInCubic":
                    var percentage = (rangeDifference/fullRange);
                    tempCalcPos = param.changeVal*Math.pow(percentage, 3);
                    calcPos = tempCalcPos;
                    break;
            }
            switch(param.changeMethod) {
                case "add":
                    if(param.changeVal < 0) {
                        value = param.startVal + (-1*(calcPos - param.changeVal)); //this is decelerates the object
                    } else {
                        value = param.startVal + (param.changeVal - calcPos); //this is accelerates the object
                    }
                    break;
                case "divide":
                    if(param.changeVal < 0) {
                        value = param.startVal - (-1*(calcPos - (param.changeVal/2))); //this is decelerates the object
                    } else {
                        value = param.startVal + (calcPos - (param.changeVal/2)); //this is accelerates the object
                    }
                    break;
                case "subtract":
                    if(param.changeVal < 0) {
                        value = (param.startVal+param.changeVal) -1*(param.changeVal-calcPos) //this is decelerates the object
                    } else {
                        value = param.startVal + (calcPos); //this is accelerates the object
                    }
                    break;
            }
            switch(param.propMethod) {
                case "translateY":
                    $(this).css(param.prop, param.propInsurance+" translateY("+value+param.propUnit+")");
                    break;
                case "blur":
                    $(this).css(param.prop, param.propInsurance+" blur("+value+""+param.propUnit+")");
                    break;
                default:
                    $(this).css(param.prop, param.propInsurance+" "+value+param.propUnit);
                    break;
            }
        }
        if(belowRange && closeToRange) {
            if(param.testing) {
                console.log("Below Range");
            }
            var value;
            switch(param.changeMethod) {
                case "add":
                    value = param.startVal + param.changeVal;
                    break;
                case "divide":
                    if(param.changeVal < 0) {
                        value = param.startVal - (param.changeVal/2);
                    } else {
                        value = param.startVal + -1*(param.changeVal/2);
                    }
                    break;
                case "subtract":
                    value = param.startVal;
                    break;
            }
            switch(param.propMethod) {
                case "translateY":
                    $(this).css(param.prop, "translateY("+value+""+param.propUnit+")");
                    break;
                case "blur":
                    $(this).css(param.prop, "blur("+value+""+param.propUnit+")");
                    break;
                default:
                    $(this).css(param.prop, ""+value+param.propUnit);
                    break;
            }
        }

        if((param.testing && closeToRange) || param.forceTesting) {
            console.log("Scroll Pos: "+$(window).scrollTop());
            console.log("Elm Enter: "+elmEnter);
            console.log("Elm Leave: "+elmLeave);
            console.log("Calc Range: "+(elmLeave - elmEnter));
            if(inRange) {
                console.log("Range Remaining: " + (elmLeave - $(window).scrollTop()));
            } else if(aboveRange) {
                console.log("Range Remaining: " + param.range);
            } else if(belowRange) {
                console.log("Range Remaining: " + 0);
            }

            console.log("Calculated Position: " + calcPos);
            console.log("Value Outputted: " + value + " " + param.easing);
            console.log("");
        }

        var elm = $(this);
        if(param.eventBool != false) {
            $(window).on("scroll resize", function() {
                //creates an event listner
                param["eventBool"] = false;
                if(param.windowRange) {
                    param.range = undefined;
                }
                if(param.changeWindowDynamic) {
                    param.changeVal = undefined;
                }
                elm.changeOnScroll(param);
            });
        }
    }
});

// I WOULD COPY ALL OF THE FOLLOWING SCROLLING METHODS
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32:1, 33:1, 34:1, 35:1, 36:1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


















//
