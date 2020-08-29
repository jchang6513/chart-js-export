function saveAsPDF(canvas) {
  var img = canvas.toDataURL(); //image data of canvas
  var doc = new jspdf.jsPDF({
    orientation: "landscape",
  });
  var pageWidth = doc.internal.pageSize.getWidth() - 20;
  var pageHeight = doc.internal.pageSize.getHeight() - 20;
  if (canvas.width/pageWidth > canvas.height/pageHeight) {
    var width = pageWidth
    var height = pageWidth * canvas.height / canvas.width
  } else {
    var width = pageHeight * canvas.width / canvas.height
    var height = pageHeight
  }
  doc.addImage(img, 'PNG', 10, 10, width, height);
  doc.save(fileName('pdf'));
}

function fileName(type) {
  return 'line_chart_' + Date.parse(Date()) + '.' + type
}

function chartExport(chartId, type) {
  switch(type) {
    case 'png':
    case 'jpeg':
    case 'webp':
      var canvas64 = document.getElementById(chartId).toDataURL('image/'+type);
      var aTag = document.createElement("a");
      document.body.appendChild(aTag);
      aTag.download = fileName(type);
      aTag.href = canvas64;
      aTag.click();
      document.body.removeChild(aTag);
      break;
    case 'svg':
      return 'data:image/svg+xml,'+encodeURIComponent(document.getElementById("svg_element_id").outerHTML);
    case 'pdf':
      saveAsPDF(document.getElementById(chartId))
      break;
  }
}

document.getElementById("download").addEventListener('click', function(){
  var imageType = document.getElementById('image-type').value;
  chartExport("lineChart", imageType)
});
