getJQuery()

function getJQuery() {
    let script = document.createElement('script')
    script.src = "https://cdn.bootcss.com/jquery/3.5.0/jquery.js"
    script.onload = function () {
        console.log('ok')
        getSource(window.location.href)
    }
    document.body.appendChild(script)
}

let xmlHttp
// 用于创建XMLHttpRequest对象
function createXmlHttp() {
    // 根据window.XMLHttpRequest对象是否存在使用不同的创建方式
    if (window.XMLHttpRequest) {
        // FireFox、Opera等浏览器支持的创建方式
        xmlHttp = new XMLHttpRequest();
    } else {
        // IE浏览器支持的创建方式
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}
// 直接通过XMLHttpRequest对象获取远程网页源代码
function getSource(url) {
    //地址为空时提示用户输入
    if (url == "") {
        alert("请输入网页地址。");
        return;
    }
    // 创建XMLHttpRequest对象
    createXmlHttp();
    // 设置回调函数
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4) {
            // 将远程网页源代码写入页面文字区域
            dealHtmlString(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function dealHtmlString(html) {
    html = html.replace('<DummyStyle />', '')
    let headReg = /<head[^>]*>([\s\S]*)<\/head>/
    let bodyReg = /<body[^>]*>([\s\S]*)<\/body>/

    let head = headReg.exec(html)[0]
    let body = bodyReg.exec(html)[0]
    
    // wrap 里的内容 $Dom
    let wrap = $(body).children()[2]
    window.wrap = wrap

    let text = `<!DOCTYPE html><html lang="en">${head}<body style="
                    max-width: 649px;
                    background-color: #f1f1f1;
                    font-size: 14px;
                    margin: 0 auto 20px auto;
                    font-family: arial;
                    line-height: 20px;
                ">${wrap.outerHTML}</body></html>`

    exportFile("test.html", text)
}

function exportFile(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;

    save_link.innerHTML = '导出为文件'
    save_link.style.position = 'fixed'
    save_link.style.right = '10px'
    save_link.style.bottom = '10px'
    save_link.style.fontSize = '12px'
    save_link.style.color = '#de25bf'
    save_link.style.background = 'pink'
    save_link.style.padding = '8px 10px'
    save_link.style.borderRadius = '5px'
    save_link.style.boxShadow = '0 0 6px #9e7b9d'
    save_link.style.textDecoration = 'none'

    document.body.appendChild(save_link)
}
