// ==UserScript==
// @name         paiza Chinese
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       misaka10843
// @match        https://paiza.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=paiza.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //替换字体
var link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css?family=Noto+Sans+SC&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

var style = document.createElement('style');
style.innerHTML = 'body { font-family: "Noto Sans SC", sans-serif !important; }';
document.head.appendChild(style);


    // 读取JSON文件
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1/2.json?v=0.00011", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    // 替换匹配的字符串
    var currentUrl = window.location.pathname;
    for (var key in data) {
      if (key === "all" || currentUrl.indexOf(key) !== -1) {
        var elements = document.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
              var text = node.nodeValue;
              for (var type in data[key]) {
                for (var replaceKey in data[key][type]) {
                  if (replaceKey === "all" || text.indexOf(replaceKey) !== -1) {
                    var regex = new RegExp(replaceKey.replace(/[.+?^${}()|[]\]/g, '\$&'), "g"); // 转义字符串
                    var newText = text.replace(regex, data[key][type][replaceKey]);
                    if (type === "sentence") {
                      element.innerHTML = element.innerHTML.replace(text, newText);
                    } else {
                      element.innerHTML = element.innerHTML.replace(text, newText);
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
};
xhr.send();
})();
