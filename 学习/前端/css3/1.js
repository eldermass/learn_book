t()(["AI","大数据","............."]);

function t(n) {
    var i ={
        exports: {},
        id: n,
        loaded: !1
    };
    return o11.call(i.exports, i, i.exports, t),
    i.loaded = !0,
    i.exports
}
function o11(e, t) {
    "use strict";
    e.exports = function(e) {
        var t = !1
          , o = e.length
          , n = []
          , i = []
          , a = [].concat(e)
          , r = function(e) {
            var t = this;
            t.options = e || {},
            t.container = e.container,
            t.containerSize = {
                width: t.container.offsetWidth,
                height: t.container.offsetHeight
            },
            t.MAX_SIZE = 450,
            t.OBJ_SCALE = .9,
            t.radius = e.radius || 120,
            t.vertexLabels = e.vertexLabels || [],
            t.mouseDown = !1,
            t.rotateStartPoint = new THREE.Vector3(0,0,1),
            t.rotateEndPoint = new THREE.Vector3(0,0,1),
            t.curQuaternion,
            t.idleRotationSpeed = .5 * Math.pow(t.containerSize.width / t.MAX_SIZE, 2),
            t.interactiveRotationSpeed = 1.5,
            t.lastMoveTimestamp = (new Date).getTime(),
            t.moveReleaseTimeDelta = 50,
            t.mouseStartPoint = {
                x: 0,
                y: 0
            },
            t.delta = {
                x: 80 * Math.pow(t.containerSize.width / t.MAX_SIZE, 4),
                y: 80 * Math.pow(t.containerSize.width / t.MAX_SIZE, 4)
            },
            t.scene = new THREE.Scene,
            t.camera = new THREE.PerspectiveCamera(75,t.containerSize.width / t.containerSize.height,.1,2e3),
            t.camera.position.z = 200,
            t.renderer = new THREE.WebGLRenderer({
                antialias: !0,
                alpha: !0
            }),
            t.renderer.setPixelRatio(window.devicePixelRatio),
            t.renderer.setSize(t.containerSize.width, t.containerSize.height),
            t.renderer.setClearColor(16777215, 0),
            t.container.appendChild(t.renderer.domElement),
            t.setupLighting(),
            t.setupObject(),
            t.render = t.render.bind(t),
            t.onDragStart = t.onDragStart.bind(t),
            t.onDragMove = t.onDragMove.bind(t),
            t.onDragEnd = t.onDragEnd.bind(t),
            "ontouchend"in document ? document.addEventListener("touchstart", t.onDragStart, !1) : document.addEventListener("mousedown", t.onDragStart, !1),
            window.addEventListener("resize", function() {
                t.containerSize = {
                    width: t.container.offsetWidth,
                    height: t.container.offsetHeight
                },
                t.renderer.setSize(t.containerSize.width, t.containerSize.height)
            })
        };
        r.prototype = {
            setupLighting: function() {
                var e = this
                  , t = new THREE.AmbientLight(16777215,.2);
                e.scene.add(t);
                var o = new THREE.PointLight(16777215,.1);
                o.position.z = 350,
                o.position.y = 200,
                o.position.x = -200,
                e.scene.add(o)
            },
            setupObject: function() {
                var e = this;
                e.group = new THREE.Group,
                e.scene.add(e.group),
                e.geometry = new THREE.IcosahedronGeometry(e.radius,0),
                e.lowResMesh = THREE.SceneUtils.createMultiMaterialObject(e.geometry, [new THREE.MeshPhongMaterial({
                    color: new THREE.Color(0),
                    emissive: new THREE.Color(15658734),
                    emissiveIntensity: .1,
                    specular: new THREE.Color("rgb(255,255,255)"),
                    shininess: 10
                }), new THREE.MeshBasicMaterial({
                    color: new THREE.Color(49630),
                    wireframe: !0,
                    wireframeLinewidth: 3
                })]),
                e.group.add(e.lowResMesh),
                e.vertices = [];
                for (var t = 0; t < e.geometry.vertices.length; t++) {
                    var o = document.createElement("div");
                    o.classList.add("vertex-marker"),
                    o.classList.add("initially-hidden");
                    var n = document.createElement("div");
                    n.classList.add("label-container");
                    var i = document.createElement("div");
                    i.classList.add("label"),
                    i.innerHTML = e.vertexLabels[t],
                    n.appendChild(i),
                    o.appendChild(n),
                    e.container.appendChild(o),
                    e.vertices.push({
                        marker: o,
                        labelContainer: n,
                        label: i,
                        z: -1
                    })
                }
            },
            onDragStart: function(e) {
                var t = this;
                e.target == t.renderer.domElement && (e.preventDefault(),
                "ontouchend"in document ? (document.addEventListener("touchmove", t.onDragMove, !1),
                document.addEventListener("touchend", t.onDragEnd, !1)) : (document.addEventListener("mousemove", t.onDragMove, !1),
                document.addEventListener("mouseup", t.onDragEnd, !1)),
                t.mouseDown = !0,
                e.touches && (e = e.touches[0]),
                t.mouseStartPoint = {
                    x: e.clientX,
                    y: e.clientY
                },
                t.rotateStartPoint = t.rotateEndPoint = t.projectOnTrackball(0, 0))
            },
            onDragMove: function(e) {
                var t = this;
                e.touches && (e = e.touches[0]),
                t.delta.x = e.clientX - t.mouseStartPoint.x,
                t.delta.y = e.clientY - t.mouseStartPoint.y,
                t.rotateObject(),
                t.mouseStartPoint.x = e.clientX,
                t.mouseStartPoint.y = e.clientY,
                t.lastMoveTimestamp = new Date
            },
            onDragEnd: function(e) {
                var t = this;
                (new Date).getTime() - t.lastMoveTimestamp.getTime() > t.moveReleaseTimeDelta && (t.delta.x = e.clientX - t.mouseStartPoint.x,
                t.delta.y = e.clientY - t.mouseStartPoint.y),
                t.mouseDown = !1,
                "ontouchend"in document ? (document.removeEventListener("touchmove", t.onDragMove, !1),
                document.removeEventListener("touchend", t.onDragEnd, !1)) : (document.removeEventListener("mousemove", t.onDragMove, !1),
                document.removeEventListener("mouseup", t.onDragEnd, !1))
            },
            vertexScreenCoordinates: function(e) {
                var t = this
                  , o = t.geometry.vertices[e].clone();
                t.lowResMesh.updateMatrixWorld(),
                o.applyMatrix4(t.lowResMesh.matrixWorld);
                var n = o.project(t.camera);
                return n.x = (n.x + 1) / 2 * t.containerSize.width,
                n.y = -(n.y - 1) / 2 * t.containerSize.height,
                n
            },
            projectOnTrackball: function(e, t) {
                var o = this
                  , n = new THREE.Vector3
                  , i = window.innerWidth / 2
                  , a = window.innerHeight / 2;
                n.set(o.clamp(e / i, -1, 1), o.clamp(-t / a, -1, 1), 0);
                var r = n.length();
                return r > 1 ? n.normalize() : n.z = Math.sqrt(1 - r * r),
                n
            },
            rotateMatrix: function(e, t, o) {
                var n = new THREE.Vector3
                  , i = new THREE.Quaternion
                  , a = Math.acos(e.dot(t) / e.length() / t.length());
                return a && (n.crossVectors(e, t).normalize(),
                a *= o,
                i.setFromAxisAngle(n, a)),
                i
            },
            rotateObject: function() {
                var e = this;
                e.rotateEndPoint = e.projectOnTrackball(e.delta.x, e.delta.y);
                var t = e.rotateMatrix(e.rotateStartPoint, e.rotateEndPoint, e.interactiveRotationSpeed);
                e.curQuaternion = e.lowResMesh.quaternion,
                e.curQuaternion.multiplyQuaternions(t, e.curQuaternion),
                e.curQuaternion.normalize(),
                e.lowResMesh.setRotationFromQuaternion(e.curQuaternion),
                e.highResMesh && e.highResMesh.setRotationFromQuaternion(e.curQuaternion),
                e.rotateEndPoint = e.rotateStartPoint
            },
            updateLabels: function() {
                for (var t = this, r = t.geometry.vertices.map(function(e) {
                    return t.lowResMesh.localToWorld(e.clone()).z
                }).sort(function(e, t) {
                    return e - t
                }), s = -t.radius, l = t.radius, d = .75, c = 1, u = l - s, f = c - d, h = 0; h < t.geometry.vertices.length; h++) {
                    var p = t.vertexScreenCoordinates(h);
                    t.vertices[h].marker.style.transform = "translate(" + p.x + "px," + p.y + "px)";
                    var m = t.lowResMesh.localToWorld(t.geometry.vertices[h].clone());
                    if (t.vertices[h].worldZ = m.z,
                    m.z < 5) {
                        if (0 == e.length && 1 == t.vertices[h].marker.classList.contains("visible")) {
                            var v = t.vertices[h].marker.innerText.replace(/\n/g, "");
                            "undefined" != v && (i.push(v),
                            n.splice(n.indexOf(v, 1), 1),
                            t.vertices[h].marker.classList.remove("visible"))
                        }
                    } else {
                        if (n.length < o && e.length > 0) {
                            var v = e.pop();
                            n.unshift(v),
                            t.vertices[h].marker.querySelector(".label").innerText = v,
                            t.vertices[h].marker.querySelector(".label").setAttribute("data-spm-click", "gostr=/aliyun;locaid=labelTab" + a.indexOf(v)),
                            t.vertices[h].marker.querySelector(".label").setAttribute("index", a.indexOf(v)),
                            t.vertices[h].marker.classList.add("visible")
                        }
                        if (n.length < o && i.length > 0 && 1 != t.vertices[h].marker.classList.contains("visible")) {
                            var v = i.pop();
                            n.unshift(v),
                            t.vertices[h].marker.querySelector(".label").innerText = v,
                            t.vertices[h].marker.querySelector(".label").setAttribute("data-spm-click", "gostr=/aliyun;locaid=labelTab" + a.indexOf(v)),
                            t.vertices[h].marker.querySelector(".label").setAttribute("index", a.indexOf(v)),
                            t.vertices[h].marker.classList.add("visible")
                        }
                    }
                    var b = r.indexOf(m.z);
                    b > -1 && t.vertices[h].z != b && (t.vertices[h].z = b,
                    t.vertices[h].marker.style.zIndex = b + 1e3);
                    var w = (m.z - s) * f / u + d;
                    t.vertices[h].label.style.transform = "scale(" + w + ")"
                }
            },
            render: function() {
                var e = this;
                if (t)
                    return requestAnimationFrame(e.render),
                    e.renderer.render(e.scene, e.camera),
                    e.updateLabels(),
                    void 0;
                if (requestAnimationFrame(e.render),
                !e.mouseDown) {
                    var o = .92
                      , n = e.idleRotationSpeed;
                    e.delta.x < -n || e.delta.x > n ? e.delta.x *= o : e.delta.x = n * (e.delta.x < 0 ? -1 : 1),
                    e.delta.y < -n || e.delta.y > n ? e.delta.y *= o : e.delta.y = n * (e.delta.y < 0 ? -1 : 1),
                    e.rotateObject()
                }
                e.renderer.render(e.scene, e.camera),
                e.updateLabels()
            },
            show: function(e) {
                var t = this;
                setTimeout(function() {
                    t.container.classList.add("visible"),
                    t.render(),
                    setTimeout(function() {
                        t.vertices.forEach(function(e, t) {
                            e.marker.style.display = "flex",
                            setTimeout(function() {
                                e.marker.classList.remove("initially-hidden")
                            }, 30 * t + 100)
                        })
                    }, 1e3)
                }, e)
            },
            showConnection: function() {
                var e = this
                  , t = 30;
                e.updateLabels();
                for (var o = e.vertices.filter(function(e) {
                    return e.worldZ > t
                }), n = [], i = 0; i < 2; i++)
                    n.push(o[Math.floor(Math.random() * o.length)]);
                for (var a = function(e) {
                    setTimeout(function() {
                        n[e].label.classList.add("highlighted"),
                        setTimeout(function() {
                            n[e].label.classList.remove("highlighted")
                        }, 100 * e + 500)
                    }, 250 * e)
                }, i = 0; i < 2; i++)
                    a(i)
            },
            clamp: function(e, t, o) {
                return Math.min(Math.max(e, t), o)
            },
            setInterval: function(e, t) {
                var o = function o(i) {
                    i - n >= t && (n = i,
                    e()),
                    requestAnimationFrame(o)
                }
                  , n = performance.now();
                requestAnimationFrame(o)
            }
        };
        var s = new r({
            container: document.querySelector(".icosahedron"),
            radius: 120,
            vertexLabels: e
        });
        s.show(1),
        $(function() {
            $("body").on("mouseenter", ".icosahedron-cell", function() {
                t = !0
            }).on("mouseleave", ".icosahedron-cell", function() {
                t = !1
            })
        }),
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
            var o;
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var n = Object(this)
              , i = n.length >>> 0;
            if (0 === i)
                return -1;
            var a = 0 | t;
            if (a >= i)
                return -1;
            for (o = Math.max(a >= 0 ? a : i - Math.abs(a), 0); o < i; ) {
                if (o in n && n[o] === e)
                    return o;
                o++
            }
            return -1
        }
        )
    }
}