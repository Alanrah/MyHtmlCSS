/*
  Gosper Curve
  
  Angle: 60бу
  Axiom: A
  Replacement rules:
   A -> A-B--B+A++AA+B-
   B -> +A-BB--B-A++A+B
*/
(function(gosper) {
    // Private members
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var stepFactor = 6;
    var lineWidth = 1;
    var x;
    var y;
    // Axiom
    var axiom = "A";
    // Production rules
    var rules = {
        A: "A-B--B+A++AA+B-",
        B: "+A-BB--B-A++A+B"
    };


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function replaceAll(str, mapObj) {
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

        return str.replace(re, function(matched) {
            return mapObj[matched];
        });
    }

    // Production
    function produce(iterations) {
        var result = axiom;
        for (var i = 0; i < iterations; ++i) {
            result = replaceAll(result, rules);
        }
        return result;
    }

    function incX(angle) {
        return Math.round(Math.cos(angle) * stepFactor);
    }

    function incY(angle) {
        return Math.round(Math.sin(angle) * stepFactor) * -1;
    }

    function drawStep(angle, colorAngle) {
        ctx.strokeStyle = "hsl(" + colorAngle + ", 100%, 50%)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        x += incX(angle);
        y += incY(angle);
        ctx.lineTo(x, y);
        ctx.stroke();
    }


    // Public members
    gosper.draw = function(iterations) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var angle = Math.PI / 2;
        var colorAngle;
        var currentStep = 0;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        x = lineWidth;
        y = canvas.height / 3;
        // These are good when start angle is 0
        //x = canvas.width/2;
        //y = lineWidth;
        var result = produce(iterations);

        var numberOfAB = (result.match(/A|B/g) || []).length;

        for (var stringIndex = 0; stringIndex < result.length; stringIndex++) {
            switch (result[stringIndex]) {
                case "A":
                case "B":
                    colorAngle = currentStep / numberOfAB * 360;
                    drawStep(angle, colorAngle);
                    currentStep++;
                    break;
                case "-":
                    angle -= Math.PI / 3;
                    break;
                case "+":
                    angle += Math.PI / 3;
                    break;
            }
        }

        return result;
    }

})(window.gosper = window.gosper || {});

var resultDiv = document.getElementById("result");
var result = gosper.draw(3);
resultDiv.innerHTML = result;


document.getElementById("iterationsSlider").addEventListener("change", function() {
    result = gosper.draw(parseInt(this.value));
    resultDiv.innerHTML = result;
});

function toggleResultDisplay(checkbox) {
    if (checkbox.checked) {
        resultDiv.style.display = "inline";
    } else {
        resultDiv.style.display = "none";
    }
}