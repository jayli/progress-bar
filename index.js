
"use strict";

(function(){
	var fns = [], listener
		, doc = document
		, hack = doc.documentElement.doScroll
		, domContentLoaded = 'DOMContentLoaded'
		, loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)

	  if (!loaded)
		doc.addEventListener(domContentLoaded, listener = function () {
			doc.removeEventListener(domContentLoaded, listener)
			loaded = 1
			while (listener = fns.shift()) listener()
		})

	return function (fn) {
		loaded ? setTimeout(fn, 0) : fns.push(fn)
	}
})()(function(){
	var codes = document.querySelectorAll('code');
	[].forEach.call(codes,function(code,index){
		var m = code.innerHTML.match(/^(\d{1,3})%$/);
		if(!m || Number(m[1]) > 100){
			return;
		}
		var spanC = document.createElement('span'),// 整个包裹器
			spanW = document.createElement('span'),// 背景
			spanI = document.createElement('span'),// 进度条
			spanT = document.createElement('span');// 文字
		code.parentNode.replaceChild(spanC,code);
		spanC.appendChild(spanW);
		spanC.appendChild(spanT);
		spanW.appendChild(spanI);

		spanW.style.display = 'inline-block';
		spanW.style.width = '79px';
		spanW.style.height = '9px';
		spanW.style.border = '1px solid #eee';
		spanW.style.backgroundColor = '#eee';

		spanI.style.position = 'relative';
		spanI.style.top = '0';
		spanI.style.left = '0';
		spanI.style.display = 'block';
		spanI.style.height = '9px';
		spanI.style.width = m[1] + '%';
		spanI.style.backgroundColor = '#BAE0BA';

		spanT.style.fontSize = '9px';
		spanT.style.marginLeft = '4px';
		spanT.innerHTML = m[1] + '%';
	});
});

