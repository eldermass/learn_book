function cacheHistory() {
    class HistorySearch {
        storeName = "historySearch"
        store = ""
        setKey(key) {
            if (!key) return
            this.store = localStorage.getItem(this.storeName)
            this.store = this.store ? this.store + `;${key}` : key
            localStorage.setItem(this.storeName, this.store)
        }
        deleteKey(key) {
            if (!key) return
            if (!this.store) this.store = localStorage.getItem(this.storeName)
            this.store = this.store.replace(new RegExp(key + ";?"), "")
            localStorage.setItem(this.storeName, this.store)
        }
        getList() {
            if (!this.store) this.store = localStorage.getItem(this.storeName)
            return this.store ? [...new Set(this.store.split(";"))] : []
        }
    }
    if (isHomePage()) {
        console.log("快速搜索，正在初始化")
        window.historySearchStore = new HistorySearch()
        render(historySearchStore.getList())
    }

    function isHomePage() {
        return (
            (location.pathname === "/" && location.search === "") ||
            (location.pathname === "/index.php" && location.search === "?m=vod-search")
        )
    }

    function drawSearchBtns(box, list, ul) {
        if (!box || !list) return
        const searchBtn = document.getElementById("wd")
        const searchSubmit = document.querySelector(".search-btn")
        if (!searchBtn || !searchSubmit) return

        ul = ul ? ul : document.createElement("ul")
        ul.style.listStyle = "none"
        ul.style.padding = "10px 0"
        ul.style.width = "400px"

        list.forEach((key) => {
            if (!key) return

            let li = document.createElement("li")
            let aTag = document.createElement("a")
            li.style.display = "inline-block"
            li.style.margin = "5px"

            aTag.innerText = key
            aTag.style.textDecoration = "none"
            aTag.style.color = "#333"
            aTag.style.padding = "3px 6px"
            aTag.style.border = "1px solid #b3d8ff"
            aTag.style.borderRadius = "2px"
            aTag.style.fontSize = "16px"
            aTag.style.cursor = "pointer"
            aTag.style.userSelect = "none"

            let timer = null
            aTag.onclick = () => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    searchBtn.value = key
                    searchSubmit.click()
                }, 200)
            }
            aTag.ondblclick = () => {
                clearTimeout(timer)
                historySearchStore.deleteKey(key)
                li.remove()
            }

            li.appendChild(aTag)
            ul.appendChild(li)
        })
        box.appendChild(ul)

        // 添加按钮
        const addDiv = document.createElement("div")
        const addInput = document.createElement("input")
        const addBtn = document.createElement("button")

        addDiv.style = `
            position: absolute;
            bottom: 5px;
            right: 15px;
        `

        addBtn.innerText = "添加历史"
        addBtn.onclick = () => {
            let key = addInput.value
            if (!key) return
            historySearchStore.setKey(key)
            addInput.value = ""
            drawSearchBtns(box, [key], ul)
        }

        addDiv.appendChild(addInput)
        addDiv.appendChild(addBtn)
        box.appendChild(addDiv)
    }

    function render(list) {
        const box = drawBox({ height: "30vh", padding: "8px 16px 36px 8px" })
        drawSearchBtns(box, list)
    }
}

function quickPlayList() {
    class PlayedStore {
        PlayedMoiveStoreName = "PlayedList"
        store = ""
        set(url) {
            if (!url) return
            this.store = localStorage.getItem(this.PlayedMoiveStoreName)

            localStorage.setItem(this.PlayedMoiveStoreName, this.store ? this.store + `,${url}` : url)
        }
        contains(key) {
            if (!this.store) this.store = localStorage.getItem(this.PlayedMoiveStoreName)
            return this.store ? this.store.indexOf(key) > -1 : false
        }
    }

    function makeQuickPlayList() {
        let play2ListEls = document.getElementById("play_2")?.querySelectorAll("[name='copy_sel']")
        if (!play2ListEls) return

        try {
            if (/\.m3u8$/.test(play2ListEls[0].parentNode.innerText)) {
                play2ListEls = document.getElementById("play_1").querySelectorAll("[name='copy_sel']")
            }
        } catch (e) {
            console.log(e)
        }

        window.playedStore = new PlayedStore()

        let playUrls = getPlayUrls(play2ListEls)
        render(playUrls)
    }

    function getPlayUrls(Els) {
        if (!Els) return []

        let Urls = []

        Els.forEach((El) => {
            if (El.value) {
                let name = El.parentNode.innerText.replace(/\$.+/, "")
                El.value && Urls.push([name, El.value])
            }
        })

        return Urls
    }

    function drawUrlBtns(Box, Urls) {
        if (!Box || !Urls) return

        let ul = document.createElement("ul")
        ul.style.listStyle = "none"
        ul.style.padding = "10px 0"
        ul.style.width = "400px"
        ul.style.display = "grid"
        ul.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
        ul.style.gridRowGap = "16px"

        Urls.forEach((url) => {
            let li = document.createElement("li")
            let aTag = document.createElement("a")
            li.style.display = "inline-block"

            aTag.innerText = url[0]
            aTag.href = url[1]
            aTag.target = "_blank"
            aTag.style.textDecoration = "none"
            aTag.style.color = "#333"
            aTag.style.padding = "3px 6px"
            aTag.style.border = "1px solid #b3d8ff"
            aTag.style.borderRadius = "2px"
            aTag.style.fontSize = "16px"

            if (playedStore.contains(url[1])) {
                aTag.style.backgroundColor = "#e1e1e1"
            } else {
                aTag.style.backgroundColor = "#ecf5ff"
            }

            aTag.onclick = (e) => {
                let url = e.target.href
                if (url) {
                    playedStore.set(url)
                    aTag.style.backgroundColor = "#e1e1e1"
                }
            }

            li.appendChild(aTag)
            ul.appendChild(li)
        })
        Box.appendChild(ul)
    }

    function render(UrlList) {
        let Box = drawBox()

        drawUrlBtns(Box, UrlList)
    }

    makeQuickPlayList()
}

function drawBox({ height, padding } = {}) {
    let Box = document.createElement("div")
    Box.style.position = "fixed"
    Box.style.height = height ? height : "70vh"
    Box.style.overflowY = "scroll"
    Box.style.top = "10px"
    Box.style.right = "10px"
    Box.style.borderRadius = "4px"
    Box.style.boxShadow = "0 2px 12px 0 rgba(0,0,0,.1)"
    Box.style.boxSizing = "border-box"
    Box.style.padding = padding ? padding : "8px 16px"
    Box.style.backgroundColor = "#fff"

    document.body.appendChild(Box)

    return Box
}

function setCssStyle() {
    let css = document.createElement("style")
    css.innerHTML = `
        div::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        div::-webkit-scrollbar-track {
            background: rgb(239, 239, 239);
            border-radius: 2px;
        }
        div::-webkit-scrollbar-thumb {
            background: #bfbfbf;
            border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
            background: #409eff;
        }
        div::-webkit-scrollbar-corner {
            background: #179a16;
        } 
    `
    document.body.appendChild(css)
}

setCssStyle()
cacheHistory()
quickPlayList()
