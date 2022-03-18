const Agent = {
  get: function(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", window.location.origin + url, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
  }
}