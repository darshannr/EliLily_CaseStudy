$(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            $("#imgName").text(input.files[0].name.trim());

            $("#imgType").text(input.files[0].type.trim());
            let imageDimension;
            let imageMime = input.files[0].type;

            var reader = new FileReader();
            const file = input.files[0];
            var pattern = /image-*/;
            if (!file.type.match(pattern)) {
                alert('Invalid format');
                return;
            }
            reader.onload = function (e) {
                $('#uploadedImage').attr('src', e.target.result);
                $("#uiBox").show();
                var imgObj = document.getElementById('uploadedImage');
                var newImg = new Image();
                newImg.src = $(imgObj).attr('src');
                var dimheight = newImg.height;
                var dimwidth = newImg.width;
                imageDimension = dimwidth + " x " + dimheight;
                $("#imgDimensions").text(imageDimension.trim());
                //alert(height + "x" + width);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgUpload").change(function () {
        readURL(this);
    });

    $('#uploadedImage').click(function (e) {
        var offset = $(this).offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);

        var retVal = prompt("Description", "Enter your description here");
        if (retVal != null && retVal != "") {
            var desc = retVal;
            let tableValue = {
                xpos: relativeX,
                ypos: relativeY,
                description: desc
            }
            var table = document.getElementById("positionTable");
            var row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = tableValue.xpos;
            cell2.innerHTML = tableValue.ypos;
            cell3.innerHTML = tableValue.description;

            $('body').append('<span id = "' + tableValue.description + '" class="dot" title="' + tableValue.description + '"></span>');
            var x = Math.round(e.pageX) + "px";
            var y = Math.round(e.pageY) + "px";
            $('#' + tableValue.description).css({
                'top': y,
                'left': x
            });
        }

        //alert("X: " + relativeX + "  Y: " + relativeY);
    });
    //$(document).tooltip({ show: null });
    $(".dot").tooltip({ show: { effect: "none", duration: 1 } });
});