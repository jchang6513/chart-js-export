function useImageType(selectId) {
  var type = 'png';

  var imageType = function() {
    return type;
  }

  var setImageType = function() {
    type = document.getElementById(selectId).value;
  }

  return [imageType, setImageType]
}

function base64Generator(id, type) {
  switch(type) {
    case 'png':
      return document.getElementById(id).toDataURL('image/png');
    case 'jpeg':
      return document.getElementById(id).toDataURL('image/jpeg');
    case 'svg':
      return 'data:image/svg+xml,'+encodeURIComponent(document.getElementById("svg_element_id").outerHTML);
  }
}

function fileName(type) {
  return 'line_chart_' + Date.parse(Date()) + '.' + type
}

var imageTypeHook = useImageType('image-type');
var imageType = imageTypeHook[0];
var setImageType = imageTypeHook[1];

document.getElementById("download").addEventListener('click', function(){
  var canvas64 = base64Generator("lineChart", imageType());
  var a =  document.getElementById("download");
  a.download = fileName(imageType());
  a.href = canvas64;
});
