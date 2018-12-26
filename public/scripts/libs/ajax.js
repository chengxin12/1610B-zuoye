function AjaxGet(method, url, fn) {
  var xml = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  
  xml.onload = function(res) {
    if (res.target.status == 200) {
      var data = JSON.parse(res.target.response)
      fn(data)
    }
  }
  xml.open(method, url);
  xml.send()
}

