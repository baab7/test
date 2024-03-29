const site_domains = {
        prod: domain_site,
        dev: development_hosts[0],
        test: development_hosts[1]
    },
    channels = 2,
    links_lt = [{
        name: "twitch",
        link: "https://www.twitch.tv/bratishkinoff"
    }, {
        name: "youtube",
        link: "https://www.youtube.com/channel/UC_-kIftWIXsTrVXZy0lJdXQ"
    }, {
        name: "telegram",
        link: "https://t.me/zalupaonline"
    }, {
        name: "discord",
        link: "https://discord.com/invite/89squad"
    }, {
        name: "tiktok",
        link: "https://www.tiktok.com/@nebratishkin"
    }],
    launcher_platforms = {
        mac: "dmg",
        linux: "deb",
        windows: "msi"
    },
    gitOwner = "Zalupa-Online",
    gitLauncherRepo = "launcher-releases",
    lock_of = !0,
    coins_sell_mode = !0;
var selector_card_skin_displayed = "",
    donate_services_array = [],
    notify_hidden = !0,
    glob_players = [],
    glob_events_status = !1,
    allow_display_login_hint = !0,
    timer_notify, swiper_comments, payment_url_global, checked_coupon = "",
    failed_coupon = "",
    crypto_token = "",
    tooltip_instance, events_page_state = "news",
    donate_displayed = !1,
    modal_displayed = !1,
    freeze_crypto = !1,
    freeze_monitoring = !1,
    lock_sticker_switch = !1,
    gameServerUpdater_setter, work_domain_v = "zalupa.online",
    products_by_serverid = [],
    glob_auth_player_data = [],
    current_c_item =
    0,
    current_c_item_name = "",
    telegram_cookie_token = "telegram_auth",
    first_init_head_adapt = 0,
    first_init_head_adapt_vova = 0,
    current_item_type = 0,
    client_ip = "",
    avatar_loaded = !1,
    telegram_glob_session = {
        auth_data: null,
        response: null
    };
const telegram_social_bot = "https://t.me/ZalupaScBot",
    debug_lock_init = !1,
    telegram_auth_enabled = !0,
    feedback_module_enabled = !1,
    feedback_tg_auth_skip = !0,
    tokens_system_enabled = !0,
    initHost = () => {
        const a = Object.keys(site_domains);
        for (let b = 0; b < a.length; b++) site_domains[a[b]] === window.location.hostname && (work_domain_v = site_domains[a[b]])
    },
    linkHash = () => window.location.hash.substring(1),
    prepare_img_link = a => a.replace("https://", "//").replaceAll(/\//g, "\\/"),
    time_correction = a => {
        const b = 6E4 * -a.getTimezoneOffset();
        return new Date(a.getTime() - b)
    },
    time_in_moscow_get = (a = null) => {
        a ||= new Date;
        return new Date(a.toLocaleString("en-US", {
            timeZone: "Europe/Moscow"
        }))
    },
    getOffset = (a, b) => {
        try {
            60 * -(new Date(a)).toLocaleString([], {
                timeZone: b,
                timeZoneName: "shortOffset"
            }).match(/(?:GMT|UTC).+/)[0]
        } catch (c) {
            return 0
        }
    },
    formatDate = (a, b = null) => {
        var c = new Date - a;
        b && (c = b - a);
        if (1E3 > c) return "прямо сейчас";
        b = Math.floor(c / 1E3);
        if (60 > b) return b + ` ${getNoun(b,"секунду",
"секунды","секунд")} назад`;
        b = Math.floor(c / 6E4);
        if (60 > b) return b + ` ${getNoun(b,"минуту","минуты","минут")} назад`;
        c = Math.floor(c / 36E5);
        if (24 > c) return c + ` ${getNoun(c,"час","часа","часов")} назад`;
        a = ["0" + a.getDate(), "0" +
            (a.getMonth() + 1), "" + a.getFullYear(), "0" + a.getHours(), "0" + a.getMinutes()
        ].map(d => d.slice(-2));
        return a.slice(0, 3).join(".") + " " + a.slice(3).join(":")
    },
    utf8_to_b64 = a => window.btoa(unescape(encodeURIComponent(a))),
    b64_to_utf8 = a => decodeURIComponent(escape(window.atob(a))),
    randDiaps = (a = 10) => Math.floor(Math.random() * a) + 1,
    getPlatform = () => 0 === navigator.platform.indexOf("Mac") || "iPhone" === navigator.platform ? "mac" : 0 === navigator.platform.indexOf("Linux") ? "linux" : "windows",
    isChrome = () => /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor),
    downloadLauncher = () => {
        getGitLauncherReleases(function (a) {
            a = a[getPlatform()];
            window.location = a;
            isChrome() || notify(`Сейчас тебе скачаем файл <span class="text-gradient-primary">${a.split("/").slice(-1)[0]}</span>`)
        })
    },
    generateRandomHex = a => [...Array(a)].map(() => Math.floor(16 * Math.random()).toString(16)).join(""),
    getAvatarColorIDforTG = a => {
        for (var b = 0, c = 1; 0 < a;) b +=
            a % 7 * c, c *= 10, a = Math.floor(a / 7);
        return parseInt(b.toString().slice(-1))
    },
    getHash = a => {
        a = window.location.hash.substr(1);
        return Object.keys(a.split("&").reduce((b, c) => {
            c = c.split("=");
            b[c[0]] = c[1];
            return b
        }, {}))[0]
    },
    re_check = a => {
        try {
            grecaptcha.ready(() => {
                grecaptcha.execute(re_token, {
                    action: "submit"
                }).then(b => {
                    a(b)
                })
            })
        } catch (b) {}
    },
    shuffle = a => {
        let b = a.length,
            c;
        for (; 0 !== b;) c = Math.floor(Math.random() * b), b--, [a[b], a[c]] = [a[c], a[b]];
        return a
    },
    alternateSort = a => {
        let b;
        for (let d = 0; d < a.length; d++) {
            b = d;
            var c = a[d];
            for (let g = d + 1; g < a.length; g++) a[g] < c && (c = a[g], b = g);
            c < a[d] && (c = a[d], a[d] = a[b], a[b] = c)
        }
    },
    getImageLightness = (a, b, c = !0) => {
        const d = document.createElement("img");
        d.src = a;
        d.crossOrigin = "Anonymous";
        d.style.display = "none";
        document.body.appendChild(d);
        let g = 0;
        c && (d.onload = () => {
            var e = document.createElement("canvas");
            e.width = this.width;
            e.height = this.height;
            var f = e.getContext("2d");
            try {
                f.drawImage(this, 0, 0), f.getImageData(0, 0, e.width, e.height)
            } catch (l) {
                b(null);
                return
            }
            e = imageData.data;
            let h, k;
            for (let l = 0, m = e.length; l <
                m; l += 4) f = e[l], h = e[l + 1], k = e[l + 2], f = Math.floor((f + h + k) / 3), g += f;
            b(Math.floor(g / (this.width * this.height)));
            d.remove()
        })
    },
    is_apple_platform = () => {
        if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) return !0
    },
    validateEmail = a => String(a).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    url_builder_ = (a, b) => {
        a = new URL(a);
        for (let c = 0; c < b.length; c++) a.searchParams.set(b[c].name, b[c].value);
        return a.href
    },
    countProperties = a => Object.keys(a).length,
    getNoun = (a, b = "игрок", c = "игрока", d = "игроков") => {
        a = Math.abs(a);
        a %= 100;
        if (5 <= a && 20 >= a) return d;
        a %= 10;
        return 1 === a ? b : 2 <= a && 4 >= a ? c : d
    },
    getCrypto = a => {
        re_check(b => {
            requestCall(c => {
                c.success ? a(c.token) : a(crypto_token)
            }, `${backend_host}/crypto`, "POST", !0, {
                token: b
            })
        })
    },
    get_events_ = a => {
        re_check(b => {
            requestCall(c => {
                a(c.events)
            }, `${backend_host}/events`, "POST", !0, {
                token: b
            })
        })
    },
    appendPostsNews = a => {
        a = document.getElementById("news-c-container");
        a.innerHTML = '<div class="shadow-vertical-overlay vertical-top-shadow" style="width:100vw!important"></div><div class="shadow-vertical-overlay vertical-bottom-shadow" style="width:100vw!important"></div><iframe style="min-height:500px;width:100vw;height:65vh" id="tg-iframe-view" src="https://telegram-worker.zalupa.online/zalupaonline" onload="try{document.getElementById(\'telegram_block_load\').remove();tg_frame_theme_update()} catch (_) {}"></iframe>' +
            a.innerHTML;
        (() => {
            setTimeout(() => {
                const b = document.getElementById("telegram_block_load"),
                    c = document.getElementById("news_zlp_buttons");
                try {
                    b.parentNode.removeChild(b), c.style.display = ""
                } catch (d) {}
            }, 150)
        })();
        document.getElementById("theme-mode").addEventListener("change", function () {
            tg_frame_theme_update()
        })
    },
    closeButtonDonateAdaptive = () => {
        is_apple_platform() || (document.getElementById("exit-button-container-donate").style.minHeight = "100%")
    },
    donateSwitchContainer = a => {
        const b = document.querySelector(".donate-global-container"),
            c = document.getElementById("super-klassniy-sticker-0").style,
            d = document.querySelector("main").style;
        c.opacity = 0;
        const g = e => {
            setTimeout(() => {
                b.style.zIndex = e
            }, 850)
        };
        if (!donate_displayed || a) {
            const e = document.getElementById("donateButtonLandingTop");
            e.setAttribute("disabled", "");
            notify("Переходим к донату...");
            closeButtonDonateAdaptive();
            checkTelegramAuthData(function (f) {
                e.removeAttribute("disabled");
                f ? (document.body.style.overflowY =
                    "hidden", window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    }), b.style.minHeight = "", g(""), donate_displayed = !0, location.hash = "#donate", d.paddingTop = "50px") : openTelegramAuthModal(!0)
            })
        } else b.style.minHeight = "0", b.style.zIndex = "-1", document.body.style.overflowY = "", donate_displayed = !1, location.hash = "#", d.paddingTop = "0"
    },
    get_game_server_data = a => {
        crypto_token ? requestCall(b => {
                setTimeout(() => {
                    freeze_monitoring = !1
                }, 800);
                b.success ? a(b.body) : (freeze_crypto = !1, initCrypto())
            }, `${backend_host}/server`, "POST", !0, {
                crypto_token
            }) :
            freeze_monitoring = !1
    },
    monitoring_game_server_update = () => {
        freeze_monitoring || (freeze_monitoring = !0, get_game_server_data(a => {
            if (a.online) {
                "undefined" !== typeof gameServerUpdater_setter && clearInterval(gameServerUpdater_setter);
                const b = document.getElementById("server_online_status");
                b.classList.remove("loading-dots");
                b.innerHTML = `Сейчас играет <span class="text-primary fw-semibold">${a.online}</span> ${getNoun(a.online)}`
            }
        }))
    },
    gameServerUpdater =
    () => {
        monitoring_game_server_update();
        gameServerUpdater_setter = setInterval(monitoring_game_server_update, 800);
        setInterval(monitoring_game_server_update, 8E3)
    },
    initEventsList = () => {
        const a = document.getElementById("events-row-container");
        document.getElementById("events_block_load");
        const b = document.getElementById("events-c-button"),
            c = ["row-cols-md-2", "row-cols-lg-2", "row-cols-xl-3"];
        get_events_(d => {
            b.removeAttribute("disabled");
            if (d && d.length) {
                glob_events_status = !0;
                events_block_load.remove();
                d.sort((e,
                    f) => {
                    e = new Date(e.date_start);
                    f = new Date(f.date_start);
                    return e < f ? -1 : e > f ? 1 : 0
                });
                for (let e = 0; e < d.length; e++) {
                    3 > e > 0 && a.classList.add(c[e]);
                    var g = time_correction(new Date(d[e].date_start));
                    const f = time_correction(new Date(d[e].date_end)),
                        h = time_in_moscow_get();
                    let k = "";
                    g > h ? k = "Скоро" : h > f && (k = "Завершено");
                    g = `<div class="col"><div class="object-block-col"><h1>${d[e].title}</h1><h4 class="text-primary" style="margin-top: -1.2rem">${k}</h4><h6 style="margin-top: -1rem">С <span class="text-primary">${g.toLocaleDateString("ru-RU")} ${("0"+
g.getHours()).slice(-2)}:${("0"+g.getMinutes()).slice(-2)}</span> по <span class="text-primary">${f.toLocaleDateString("ru-RU")} ${("0"+f.getHours()).slice(-2)}:${("0"+f.getMinutes()).slice(-2)}</span></h6><p>${d[e].text}</p></div></div>`;
                    a.innerHTML += g
                }
            }
        })
    },
    get_donate_services = a => {
        re_check(b => {
            requestCall(c => {
                a(c.services)
            }, `${backend_host}/donate/services`, "POST", !0, {
                token: b
            })
        })
    },
    create_payment = (a, b, c, d, g = "", e = "") => {
        re_check(f => {
            requestCall(h => {
                    a(h.payment)
                }, `${backend_host}/donate/payment/create`,
                "POST", !0, {
                    customer: b,
                    products: c,
                    email: g,
                    coupon: e,
                    token: f,
                    server_id: d,
                    success_url: `https://${work_domain_v}`,
                    tg_auth_data: getTelegramAuth(!0)
                })
        })
    },
    check_coupon = (a, b) => {
        re_check(c => {
            requestCall(d => {
                d.coupon && d.success ? a(d.coupon) : a(null)
            }, `${backend_host}/donate/coupon`, "POST", !0, {
                code: b,
                token: c
            })
        })
    },
    testImage = a => {
        const b = new Image;
        b.addEventListener("error", reInitTelegramAuth);
        b.src = a
    },
    loadPlayerAvatar = (a, b = "telegram-auth-avatar", c = !1, d = !1) => {
        a: {
            let g = null;
            if (!c) {
                try {
                    g = document.getElementById(b),
                        g.style
                } catch {}
                document.getElementById("tg-user-avatar-text").innerText = ""
            }
            for (let e = 0; 10 > e; e++)
                if (!crypto_token && d) initCrypto();
                else {
                    a = d ? `${backend_host}/profile/avatar/?texture_hash=${a}&crypto_token=${encodeURIComponent(crypto_token)}&tg_auth=${encodeURIComponent(getTelegramAuth(!0))}` : `//communication.zalupa.online/tiles/faces/32x32/${a}.png`;
                    d = prepare_img_link(a);
                    testImage(a);
                    if (c) break a;
                    else g.setAttribute("style", `background-image: url("${d}");border-radius:.${b.includes("card-avatar")?35:
15}rem;`);
                    break a
                }
        }
    },
    reInitTelegramAuth = () => {
        checkTelegramAuthData(function (a) {})
    },
    checkTelegramAuthData = (a, b = !1, c = !1, d = !1) => {
        const g = getTelegramAuth(!0);
        g ? telegram_glob_session.auth_data !== g || d ? b ? a(!0) : re_check(e => {
            requestCall(f => {
                if (f)
                    if (f.success) {
                        const h = document.getElementById("telegram-auth-avatar");
                        if (glob_auth_player_data = f.player_data) {
                            const k = f.player_data,
                                l = k.NICKNAME,
                                m = () => {
                                    if (!h.style.backgroundImage || 1 > h.style.backgroundImage.length) loadPlayerAvatar(l), loadPlayerAvatar(l, "card-avatar-object"),
                                        avatar_loaded = !0
                                };
                            m();
                            h.setAttribute("data-bs-toggle", "tooltip");
                            h.setAttribute("data-bs-placement", "bottom");
                            h.setAttribute("title", k.NICKNAME);
                            setInterval(function () {
                                m()
                            }, 500);
                            allow_display_login_hint = !1
                        }
                        telegram_glob_session = {
                            auth_data: g,
                            response: f
                        };
                        a(c ? f : f.success)
                    } else openLoginHint(), a(!1);
                else a(!1)
            }, `${backend_host}/telegram/auth/check`, "POST", !0, {
                token: e,
                tg_auth_data: g
            })
        }) : a(telegram_glob_session.response.success) : a(!1)
    },
    cloudflareTraceJSON = a => {
        a = a.split("\n");
        let b = {};
        for (const c of a) p =
            c.split("="), b[p[0]] = p[1];
        return b
    },
    cloudflareTrace = a => {
        requestCall(b => {
            b ? a(cloudflareTraceJSON(b)) : a(null)
        }, "https://cloudflare.com/cdn-cgi/trace", "GET", !1)
    },
    getGitLauncherReleases = a => {
        requestCall(b => {
                if (b && b.id && "main" === b.target_commitish && "hevav" === b.author.login && !b.draft && b.assets.length) {
                    let c = {};
                    for (let d of Object.keys(launcher_platforms))
                        for (let g of b.assets) g.name.split(".").slice(-1)[0] === launcher_platforms[d] && (c[d] = g.browser_download_url);
                    a(c)
                } else a([])
            }, `https://api.github.com/repos/${gitOwner}/${gitLauncherRepo}/releases/latest`,
            "GET", !0)
    },
    setLauncherLinks = () => {
        const a = document.getElementById("zalupa-launcher-links");
        getGitLauncherReleases(function (b) {
            const c = Object.keys(b);
            for (let d of c) a.innerHTML += `<a href="${b[d]}" style="text-transform:capitalize" class="btn btn-primary shadow-primary mt-3 m-1" download="">${d.toLowerCase()}</a>`
        })
    },
    checkPayment = (a, b) => {
        re_check(c => {
            requestCall(d => {
                a(d.payment)
            }, `${backend_host}/donate/payment_get`, "POST", !0, {
                payment_id: parseInt(b),
                token: c,
                tokens_send: coins_sell_mode
            })
        })
    },
    getPaymentHistory =
    a => {
        re_check(b => {
            requestCall(c => {
                try {
                    a(c.payment)
                } catch (d) {
                    a(null)
                }
            }, `${backend_host}/donate/payment_history`, "POST", !0, {
                token: b
            })
        })
    },
    appendServices = () => {
        get_donate_services(a => {
            donate_services_array = a;
            const b = ["row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4"],
                c = document.getElementById("donate_items_list"),
                d = (e, f) => {
                    e = e.toLowerCase();
                    f = f.toLowerCase();
                    if (e.includes("токен") && "currency" === f) return 1;
                    if (e.includes("слот") && "currency" === f) return 3;
                    if (e.includes("проходка") &&
                        "other" === f) return 2
                };
            if (a && a.length) {
                for (let e = 0; e < a.length; e++) {
                    const f = {
                        name: a[e].name,
                        price: a[e].price,
                        count: a[e].number,
                        description: a[e].description,
                        type: a[e].type,
                        service_id: a[e].id,
                        server_id: a[e].server_id
                    };
                    products_by_serverid.push(a[e]);
                    let h = "",
                        k = "p-3";
                    var g = `<p class="mb-0">${a[e].price} ${getNoun(a[e].price,"рубль","рубля","рублей")} = ${a[e].number} ${getNoun(a[e].number,"единица",
"единицы","единиц")}</p><p class="fs-sm mb-0">${a[e].description}</p>`;
                    let l = "";
                    e && b.length >= e && c.classList.add(b[e - 1]);
                    let m = `onClick="donate_element_click(${JSON.stringify(f)})"`;
                    coins_sell_mode ? (g = "Товар без описания.", a[e].description && (g = a[e].description), a[e].name.toLowerCase().includes("токен") ? (h = `${a[e].price} ${getNoun(a[e].price,
"рубль","рубля","рублей")} = <span class="text-primary">${a[e].number} ${getNoun(a[e].number,"токен","токена","токенов")}</span>`, k = "p-0", g = '<p class="mb-0 token-description-dnt">Игровая валюта, которую можно получить как в игре, так и за поддержку проекта.</p>') :
                        (a[e].name.toLowerCase().includes("слот") ? h = `${a[e].price} ${getNoun(a[e].price,"рубль","рубля","рублей")} = <span class="text-primary">${a[e].number} ${getNoun(a[e].number,"слот","слота","слотов")}</span>` : (a[e].type = "other", h = `<span class="text-primary">${a[e].name}</span>, ${a[e].price} ${getNoun(a[e].price,"рубль",
"рубля","рублей")}`), k = "p-0", g = `<p class="mb-0 token-description-dnt">${g}</p>`), m = "", l = `<button class="btn btn-primary shadow-primary btn-shadow-hide btn-lg min-w-zl donate-item-butt-bottom" onclick="donateModalCall(${d(f.name,f.type)}, ${f.service_id})">${"Приобрести"}</button>`) : h = a[e].name;
                    a[e].image = prepare_img_link(a[e].image);
                    c.innerHTML += `<div class="col" id="donate_item_${a[e].id}"><div class="card border-0 bg-transparent" ${m}><div class="position-relative container-item-donate-n"><div class="parent-image-shadow donate_item_hover" id="donate_item_hover_${a[e].id}"><div class="imageContainer item-levitaion-dec"><div class="foregroundImg" style="background-image: url(${a[e].image})"></div><div class="backgroundImg" style="background-image: url(${a[e].image})"></div></div></div><div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3" style="margin: auto"></div></div><div class="card-body text-center ${k}"><h3 class="fs-lg fw-semibold pt-1 mb-2">${h}</h3>${g}${l}</div></div></div>`
                }
                checkPrivateServerBuy();
                setTimeout(() => {
                    var e = document.getElementById("donate_block_load");
                    const f = ["donate_items_list", "donate-header-container", "donate-test-mode-enb", "donate-cart-container"];
                    try {
                        e.parentNode.removeChild(e)
                    } catch (h) {}
                    for (e = 0; e < f.length; e++) try {
                        document.getElementById(f[e]).style.display = ""
                    } catch (h) {}
                }, 100)
            } else c.innerHTML = '<span class="text-center">Не удалось получить список товаров.</span>'
        })
    },
    switchEventsPages = a => {
        const b = document.getElementById("news-c-container"),
            c = document.getElementById("events-c-container"),
            d = document.getElementById("news-c-button"),
            g = document.getElementById("events-c-button");
        a !== events_page_state && ("events" === a ? glob_events_status ? (b.style.display = "none", c.style.display = "block", d.removeAttribute("disabled"), g.setAttribute("disabled", ""), c.style.top = "0", b.style.top = "-2rem", events_page_state = "events") : notify("Сейчас ивентов нет...") :
            "news" === a && (b.style.display = "block", c.style.display = "none", d.setAttribute("disabled", ""), g.removeAttribute("disabled"), c.style.top = "-2rem", b.style.top = "0", events_page_state = "news"))
    },
    redirect_ = a => window.location.replace(a),
    ytVideoSetter = (a, b, c = !0) => {
        for (let e of Array.from(document.getElementsByClassName("ytVideoSetter"))) {
            const f = e.getAttribute("video_id");
            if (f && f.length && 20 > f.length) {
                a = e.getAttribute("autoplay");
                b = e.getAttribute("muted");
                var d = e.getAttribute("loop"),
                    g = e.getAttribute("controls");
                e.innerHTML = c ? `<video class="video-container" preload="none" id="ytframe_${f}" poster="/assets/images/videos/${f}.webp" ${null!=a?'autoplay=""':""} ${null!=b?'muted=""':""} ${null!=d?'loop=""':""} ${null!=g?'controls=""':""} style="object-fit: contain"><source src="${`//files.zalupa.online/videos/${f}.mp4`}" type="video/mp4"></video>` : `<iframe src="https://www.youtube.com/embed/${f}" title="YouTube video player" frameborder="0" class="video-container-yt" id="ytframe_${f}" allow="accelerometer; ${null!=
a?"autoplay":""}; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" loading="lazy"></iframe>`;
                e.getAttribute("bottomzero") && (document.getElementById(`ytframe_${f}`).style.marginBottom = "0")
            }
        }
    },
    check_modal_ = () => {
        setInterval(() => {
            modal_displayed || modal_close_()
        }, 350)
    },
    modal_close_ = () => {
        if (modal_displayed) {
            document.body.classList.remove("modal-open");
            document.getElementById("scroll_butt_container").style.display = "";
            document.getElementsByTagName("html")[0].style.overflowY =
                "";
            const a = document.querySelector(".modal-content");
            a.classList.remove("emoji-pay-back");
            a.style.marginTop = "2em";
            const b = document.getElementById("donate_item_modal");
            b.style.opacity = 0;
            setTimeout(() => {
                b.style.display = "none"
            }, 350);
            modal_displayed = !1
        }
    },
    modal_open_ = (a = !1) => {
        modal_displayed = !0;
        document.body.classList.add("modal-open");
        document.getElementById("scroll_butt_container").style.display = "none";
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        try {
            document.getElementById("private_gift_button_modal").remove()
        } catch (c) {}
        const b =
            document.getElementById("donate_item_modal");
        b.style.display = "block";
        setTimeout(() => {
            b.style.opacity = 1;
            document.querySelector(".modal-content").style.marginTop = 0
        }, 50);
        a || (window.onclick = c => {
            c.target === b && modal_close_()
        })
    },
    switch_modal_containers = (a = "service", b = {}) => {
        const c = document.getElementsByClassName("close_b")[0];
        var d = document.getElementById("modal-info-container-c"),
            g = document.getElementById("modal-donate-container-c"),
            e = document.getElementById("modal-donate-finish-container-b");
        const f = document.getElementById("modal-donate-success-container"),
            h = document.getElementById("modal-donate-finish-container-c"),
            k = document.querySelector(".modal-title");
        d = [{
            name: "service",
            selector: g,
            title: "Товар"
        }, {
            name: "service_coins",
            selector: e,
            title: "Оплата пожертвования"
        }, {
            name: "info",
            selector: d,
            title: "Сообщение"
        }, {
            name: "success",
            selector: f,
            title: "Чек"
        }, {
            name: "donate_finish",
            selector: h,
            title: "Корзина"
        }];
        for (g = 0; g < d.length; g++) e = "none", a === d[g].name && (e = "block", k.innerText = d[g].title), d[g].selector.style.display = e;
        "info" === a && (k.innerText = b.title, b.content.length && (document.getElementById("info-content-modal").innerHTML = b.content));
        c.onclick = () => {
            modal_close_()
        }
    },
    discount_calculate = (a, b) => (b / 100 * a).toFixed(),
    displayTokens = (a = !0) => {
        const b = glob_auth_player_data.BALANCE;
        if (tokens_system_enabled && (document.querySelector(".zalupa-card-container").style.display =
                "", Number.isInteger(b)))
            if (a) {
                a = document.getElementById("numberZalupaCard");
                document.querySelector(".ZalupaCardInput") || (a.innerHTML += `<input class="ZalupaCardInput" style="display:none" value="${glob_auth_player_data.UUID}">`);
                a = document.querySelector(".number-card-zalupa");
                var c = document.querySelector(".card-holder-zalupa");
                const d = document.querySelector(".balance-value-card"),
                    g = `<span class="text-primary">${b}</span> ${getNoun(b,"токен","токена",
"токенов")}`;
                a.setAttribute("onclick", 'clipboardFunc(\n                    "input.ZalupaCardInput", \n                    "Номер твоей <span class=\\"text-primary\\" style=\\"font-weight:800\\">ZalupaCard</span> скопирован в буфер обмена."\n                )');
                document.querySelector("input.ZalupaCardInput").value =
                    glob_auth_player_data.UUID;
                a.innerText = glob_auth_player_data.UUID;
                c.innerText = glob_auth_player_data.NICKNAME;
                d.innerHTML = g;
                document.getElementById("card-zalupa").style.backgroundImage = `url("${select_card_skin(b)}")`
            } else a = document.querySelector(".balance-container"), c = document.querySelector(".balance-value"), a.style.display = "", c.innerText = b
    },
    select_card_skin = a => {
        const b = {
            0: "clay",
            50: "red_mashroom",
            100: "tube_coral",
            150: "gray_glazed_terracotta",
            200: "bee_nest",
            350: "bamboo",
            500: "gilded_blackstone",
            750: "raw_gold",
            1E3: "nether_wart",
            1500: "sculk_crystal",
            2E3: "rainforced_deepslate",
            3E3: "tinted_glass",
            4E3: "chiseled_quartz",
            5E3: "tnt",
            6500: "warped_stem",
            8E3: "respawn_anchor",
            1E4: "dark_prismarine",
            12E3: "nether",
            15E3: "netherite"
        };
        let c = Object.keys(b);
        c = c.reverse();
        for (let d = 0; d < c.length; d++) {
            const g = b[c[d]];
            if (a >= parseInt(c[d])) return selector_card_skin_displayed !== g && (selector_card_skin_displayed = g), prepare_img_link(`${"./assets/images/card_skins"}/${g}.png`)
        }
        return prepare_img_link("./assets/images/card_skins/clay.png")
    },
    comment_show_action = (a, b = !1) => {
        const c = document.getElementById(`comment_text_${a}`),
            d = document.getElementById(`comment_show_${a}`);
        swiper_comments.on("slideChange", () => {
            comment_show_action(a, !0)
        });
        b || "1" === c.getAttribute("fullShowComment") ? (c.style.height = "100px", c.setAttribute("fullShowComment", "0"), d.innerText = "Раскрыть") : (c.style.height = "100%", c.setAttribute("fullShowComment", "1"), d.innerText = "Скрыть")
    },
    checkPrivateServerBuy =
    () => {
        const a = () => {
            for (let b of donate_services_array)
                if ("Проходка" === b.name && glob_auth_player_data.PRIVATE_SERVER) {
                    const c = document.querySelector(`#donate_item_${b.id}>div>div.card-body>button`);
                    c.innerText = "Куплено";
                    c.setAttribute("disabled", "");
                    c.removeAttribute("onclick")
                }
        };
        a();
        setInterval(a, 600)
    },
    initComments = () => {
        const a = document.getElementById("comment_swipe_array");
        requestCall(b => {
            shuffle(b);
            for (let c = 0; c < b.length; c++) {
                a.innerHTML +=
                    `<div class="swiper-slide h-auto px-2"><figure class="card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0"><span class="btn btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5 zlp-comment-icon"><i class="bx bxs-quote-left"></i>Залупный комментарий</span><blockquote id="comment_block_${c}" class="card-body mt-2 mb-2" style="transition: .8s height"><p id="comment_text_${c}" class="fs-md mb-0">«${b[c].text}»</p><span id="comment_show_${c}" onclick="comment_show_action(${c})" class="pt-1 comment-show-button">Раскрыть</span></blockquote><figcaption class="card-footer d-flex align-items-center border-0 pt-0 mt-n2 mt-lg-0"><div><b class="fw-semibold lh-base mb-0">${b[c].name}</b></div></figcaption></figure></div>`;
                const d = document.getElementById(`comment_text_${c}`),
                    g = document.getElementById(`comment_show_${c}`);
                g.style.fontWeight = "400";
                d.style.transition = "height .8s cubic-bezier(1, -.3, 0, 1.21) 0s";
                d.setAttribute("fullShowComment", "0");
                112 < d.clientHeight ? (d.style.height = "100px", d.style.overflow = "hidden") : g.style.display = "none"
            }
            swiper_comments = new Swiper("#comment_swipe_container", {
                spaceBetween: 12,
                loop: !0,
                observer: !0,
                observeParents: !0,
                preventClicks: !1,
                preventClicksPropagation: !1,
                autoplay: {
                    delay: 3E3
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0
                },
                navigation: {
                    prevEl: "#prev_comment",
                    nextEl: "#next_comment"
                }
            })
        }, "assets/data/comments.json", "GET", !0)
    },
    buildDonateHistorySwiper = () => {
        const a = document.getElementById("payments-history-swiper-array"),
            b = () => {
                const c = document.querySelectorAll("#item-donate-history-desc>time");
                for (let d = 0; d < c.length; d++) {
                    const g = c[d],
                        e = g.getAttribute("datetime");
                    g.innerHTML = formatDate(new Date(e), time_in_moscow_get())
                }
            };
        getPaymentHistory(function (c) {
            if (c && c.length) {
                for (let d = 0; d < c.length; d++) {
                    const g = new Date(c[d].updated_at);
                    c[d].product.image = prepare_img_link(c[d].product.image);
                    a.innerHTML += `<div class="swiper-slide text-center"><span class="d-block py-3"><div class="player_head_container"><div class="player-head d-block mx-auto" style="background-image: url(${c[d].product.image});height:65px!important"></div></div><div class="card-body p-3"><h5 class="h5 fs-6 fw-semibold pt-1 mb-2">${c[d].product.name}</h5><p class="fs-sm mb-0" id="item-donate-history-desc"><span class="text-gradient-primary fw-bold">${c[d].customer}</span><br/><time datetime="${g.toString()}"></time></p></div></span></div>`
                }
                document.getElementById("last_donate_block_load").remove();
                new Swiper("#payments_history_container", {
                    slidesPerView: 1,
                    spaceBetween: 24,
                    autoplay: {
                        delay: 1500
                    },
                    loop: !0,
                    observer: !0,
                    observeParents: !0,
                    preventClicks: !1,
                    pagination: {
                        el: ".payments-history-pagination",
                        clickable: !0
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 2
                        },
                        600: {
                            slidesPerView: 3
                        },
                        920: {
                            slidesPerView: 4
                        },
                        1200: {
                            slidesPerView: 5
                        },
                        1600: {
                            slidesPerView: 6
                        },
                        1900: {
                            slidesPerView: 7
                        },
                        2100: {
                            slidesPerView: 8
                        },
                        2500: {
                            slidesPerView: 9
                        }
                    }
                });
                setInterval(b, 1E3)
            }
        })
    },
    donate_bg_preload = () => {
        const a = ["emoji-background-donate-light", "emoji-background-donate"];
        for (let b = 0; b <= a; b++) getImageLightness(`assets/images/${b}.png`, void 0, !1)
    },
    setSticker = (a = 0, b = 0, c = null) => {
        a = `assets/images/stickers/sticker${randDiaps(a)}.webp`;
        if (c) a = c;
        else if (lock_sticker_switch) return;
        c = prepare_img_link(a);
        document.getElementById(`super-klassniy-sticker-${b}`).style.backgroundImage = `url(${c})`
    },
    setRandomStickerLand = () => {
        const a = document.getElementById("super-klassniy-sticker-0");
        for (var b = 0; 32 >= b; b++) getImageLightness(`assets/images/stickers/sticker${b}.webp`, void 0, !1);
        setInterval(function () {
            1600 <
                window.pageYOffset || donate_displayed ? a.style.opacity = 0 : !donate_displayed && 1600 >= window.pageYOffset ? setTimeout(function () {
                    a.style.opacity = .4
                }, 800) : a.style.opacity = .4
        }, 100);
        b = () => {
            992 <= window.innerWidth ? (a.style.top = `${randDiaps(85)}%`, a.style.left = `${randDiaps(85)}%`) : (a.style.top = `${randDiaps(100)}%`, a.style.left = `${randDiaps(75)}%`)
        };
        setSticker(32);
        setInterval(setSticker, 6E3, 32);
        b();
        setInterval(b, 3E3)
    },
    donate_get_service_by_id = a => {
        for (let b = 0; b < donate_services_array.length; b++)
            if (donate_services_array[b].id ===
                parseInt(a)) return donate_services_array[b];
        return null
    },
    donateResetPaymentState = (a = 1, b = !1, c = !1) => {
        var d = document.getElementById("donate-coins-payment");
        const g = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"];
        var e = "_c";
        let f = document.getElementById("donate_sum").value.trim();
        coins_sell_mode || (e = "", f = 0);
        e = document.getElementById("payment-button-donate" + e);
        if (c) {
            d.innerHTML = "";
            for (d = 0; d < g.length; d++) {
                const h = document.getElementById(g[d]);
                if (!g[d].includes("coupon") || c) g[d].includes("method") ?
                    h.value = 1 : h.value = ""
            }
            failed_coupon = checked_coupon = ""
        }
        e.setAttribute("onClick", `generatePaymentLink(${a}, ${2===a?1:f})`);
        e.removeAttribute("disabled");
        e.innerText = b ? "Повторить" : "Дальше"
    },
    setAvatar = a => {
        document.getElementById("telegram-auth-avatar").style.background = `linear-gradient(343deg, var(--telegram-bgcolor${getAvatarColorIDforTG(a.id)}-top) 0%, var(--telegram-bgcolor${getAvatarColorIDforTG(a.id)}-bottom) 100%)`;
        const b =
            document.getElementById("tg-user-avatar-text");
        try {
            b.innerText = `${a.first_name.slice(0,1)}${a.last_name?a.last_name.slice(0,1):""}`.toUpperCase()
        } catch (c) {
            b.innerHTML = "N/A"
        }
    },
    checkAuthAndDisplayDonate = () => {
        checkTelegramAuthData(function (a) {
            a.player_data.NICKNAME && donateSwitchContainer()
        }, !1, !0)
    },
    onTelegramAuth = a => {
        Cookies.set(telegram_cookie_token, utf8_to_b64(JSON.stringify(a)));
        modal_close_();
        notify(`Вы успешно авторизовались как <span class="text-gradient-primary">${a.first_name} ${a.last_name?
a.last_name:""}</span>`);
        autoAuthTelegramObserver()
    },
    debugWriteTelegramAuth = a => {
        Cookies.set(telegram_cookie_token, a)
    },
    getTelegramAuth = (a = !1) => {
        const b = Cookies.get(telegram_cookie_token);
        if (b) {
            if (a) return b;
            if (b) return JSON.parse(b64_to_utf8(b))
        }
    },
    couponCheck = a => {
        a = "";
        coins_sell_mode && (a = "-c");
        const b = document.getElementById("coupon-input" + a),
            c = document.getElementById("coupon-button" + a);
        let d = "";
        try {
            d = b.value.trim().toUpperCase()
        } catch (h) {}
        const g = () => {
                notify(`Купон <span class="text-primary fw-semibold">${failed_coupon}</span> не найден`)
            },
            e = (h, k) => {
                if (h)
                    for (k = 0; k < h.length; k++)
                        if (h[k].id === current_c_item) return !0;
                return !1
            };
        if (d.length)
            if (20 < d.length) notify("Купон слишком длинный");
            else if (/^[A-z\d_]+$/.test(d))
            if (checked_coupon === d) notify("Этот купон уже используется");
            else if (failed_coupon === d) g();
        else {
            var f = (h = !1) => {
                h ?
                    (b.setAttribute("disabled", ""), c.setAttribute("disabled", ""), c.innerText = "Проверяем") : (b.removeAttribute("disabled"), c.removeAttribute("disabled"), c.innerText = "Проверить")
            };
            f(!0);
            check_coupon(h => {
                if (h) {
                    const k = () => {
                        checked_coupon = d;
                        notify(`Купон <span class="text-primary fw-semibold">${d}</span> действительный`)
                    };
                    coins_sell_mode ?
                        e(h.products, current_c_item) ? (k(), document.getElementById("donate-coins-payment").innerHTML = `<li class="list-group-item d-flex justify-content-between bg-light"><div class="text-primary"><h6 class="my-0 text-start">Купон</h6><small class="text-start" style="float: left">${d}</small></div><span class="text-muted text-end" style="width: 30%">${h.discount}%</span></li>`) : notify("Этот купон недействительный") :
                        k()
                } else failed_coupon = d, g();
                f()
            }, d)
        } else notify("Купон указан неверно");
        else notify("Вы не указали купон")
    },
    donate_enable_coupon = (a = !0) => {
        const b = document.getElementById("coupon-input"),
            c = document.getElementById("coupon-button");
        a ? (b.setAttribute("placeholder", "BRFF"), c.setAttribute("onClick", "couponCheck()"), b.removeAttribute("disabled"),
            c.removeAttribute("disabled")) : (b.setAttribute("disabled", ""), b.setAttribute("placeholder", "Сейчас недоступно"), c.setAttribute("disabled", ""))
    },
    get_data_service = a => {
        for (let b = 0; b < products_by_serverid.length; b++)
            if (parseInt(products_by_serverid[b].id) === parseInt(a)) return products_by_serverid[b]
    },
    generatePaymentLink = (a = 1, b = 0) => {
        var c = "";
        coins_sell_mode && (c = "_c");
        const d = document.getElementById("payment-button-donate" + c);
        let g = document.getElementById("donate_customer" + c).value.trim();
        c = document.getElementById("donate_email" + c).value.trim();
        let e = "";
        g = glob_auth_player_data.NICKNAME;
        try {
            e = checked_coupon.trim()
        } catch (f) {}
        if (1 === a)
            if (Number.isInteger(b) && Number.isInteger(b)) {
                if (1 > Math.sign(b)) {
                    notify("Сумма не может равняться нулю или меньше");
                    return
                }
                if (3E4 <
                    b) {
                    notify('Максимальная сумма - <span style="color: #a4a6ff">30000</span>');
                    return
                }
            } else {
                notify("Ошибка проверки суммы");
                return
            } g.length ? 40 < g.length ? notify("Ваш никнейм слишком длинный") : 3 > g.length ? notify("Ваш никнейм слишком короткий") :
            /^[A-z\d_]+$/.test(g) ? c.length ? validateEmail(c) ? (e ||= "", coins_sell_mode && (products = JSON.parse(`{"${current_c_item}": ${b}}`)), d.setAttribute("disabled", ""), d.innerText = "Проверяем данные...", b = get_data_service(current_c_item), create_payment(f => {
                f ? (d.removeAttribute("disabled"), d.innerText = "Оплатить", payment_url_global = f.url, d.setAttribute("onClick", "payment_action_bt()")) : (notify("Ошибка, не удалось сформировать чек для оплаты"),
                    donateResetPaymentState(a, repeat = !0))
            }, g, products, b.server_id, c, e)) : notify("Ошибка, адрес почты недействительный") : notify("Введите пожалуйста ваш email") : notify("Никнейм не соотвествует формату") :
            notify("Введите пожалуйста ваш никнейм")
    },
    zalupa_pay_finish_modal = () => {
        document.getElementById("only-ok-payment").innerHTML = '<div style="background: rgb(28 28 28 / 15%);padding: 1.15em;border-radius: 0.72em;backdrop-filter: blur(1.35em);-webkit-backdrop-filter: blur(1.35em)"><p style="font-weight:800;margin-bottom:0">Спасибо что воспользовались ZalupaPay!</p></div>';
        enable_modal_result_sc();
        checkTelegramAuthData(function (a) {}, !1, !1, !0);
        document.querySelector(".modal-title").innerText = "";
        document.querySelector(".modal-content").classList.add("emoji-pay-back")
    },
    enable_modal_result_sc = () => {
        switch_modal_containers("success");
        modal_open_();
        donateResetPaymentState()
    },
    payment_action_bt = () => {
        window.open(payment_url_global, "_blank");
        const a = document.getElementById("donate-cart-list-success"),
            b = document.getElementById("success-pay-text-js"),
            c = document.getElementById("only-ok-payment"),
            d = document.querySelector(".modal-title");
        enable_modal_result_sc();
        const g = ["donate_sum", "donate_customer_c", "donate_email_c", "coupon-input-c"];
        for (let e = 0; e < g.length; e++) document.getElementById(g[e]).value = "";
        a.innerHTML = "";
        d.innerText = "";
        b.innerText = "Давай, плати. Шеф ждёт...";
        c.style.display = "";
        document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-gay.webp")
    },
    initDonate = () => {
        donate_enable_coupon(!0)
    },
    donateCoinsPay = (a = 1) => {
        const b = document.getElementById("payment-button-donate_c");
        let c = document.getElementById("donate_sum");
        c = c.value || /^[\d]+$/.test(c.value) ? c.value : 0;
        b.setAttribute("onClick", `generatePaymentLink(${a}, ${2===a?1:c})`)
    },
    donateModalCall = (a, b, c = !0) => {
        current_item_type = a;
        var d = document.getElementById("donate_sum");
        const g = document.getElementById("donate_customer_c"),
            e = document.getElementById("sum-tokens-container"),
            f = document.getElementById("customer-email-tokens-container").classList,
            h = document.getElementById("donate-text-span");
        let k;
        const l = [document.getElementById("donate_sum"), document.getElementById("donate_customer_c"), document.getElementById("donate_email_c"), document.getElementById("coupon-input-c")],
            m = document.querySelector(".modal-title");
        let q;
        current_c_item = b;
        current_c_item_name = get_data_service(b).name;
        1 === a || 3 === a ? (e.style.display = "", f.remove("col-sm-6"), f.add("col-12"), b = document.getElementById("donate-sum-title"), 1 === a ? (k = "Воспользовавшись этой формой, вы можете поддержать проект финансово. За поддержку вы получите вознаграждение – за каждый рубль по одному игровому токену.",
            q = "Токены", b.innerText = "Сумма", d.addEventListener("input", n => {
                donateCoinsPay()
            })) : 3 === a && (k = "Добавляет +1 слот в клан. Система автоматически определяет ваш клан по никнейму, поэтому будьте внимательны перед оплатой. Проверьте в каком клане вы состоите.",
            q = "Слоты", b.innerText = "Количество", g.addEventListener("input", n => {
                donateCoinsPay(a)
            }))) : 2 === a && (e.style.display = "none", f.remove("col-12"), f.add("col-sm-6"), (desc_get = get_data_service(current_c_item).description) || (desc_get = ""), k = `Форма оплаты пожертвования для игрового проекта Zalupa.Online<br/><span class="text-muted">${desc_get}</span>`,
            q = current_c_item_name, g.addEventListener("input", n => {
                donateCoinsPay(a)
            }));
        h.innerHTML = k.replaceAll("\n", "");
        for (d = 0; d < l.length; d++) l[d].addEventListener("input", n => {
            donateResetPaymentState(a)
        });
        switch_modal_containers("service_coins");
        modal_open_();
        c && (c = document.querySelector("input#donate_customer_c"), c.setAttribute("placeholder", glob_auth_player_data.NICKNAME), c.value = glob_auth_player_data.NICKNAME, c.setAttribute("disabled", ""));
        donateResetPaymentState(a, !1, !0);
        (n => {
            m.innerText = m.innerText.replace(/\([\s\S]*?\)/).trim();
            m.innerText = `${m.innerText} (${n})`
        })(q)
    },
    linksSet = (a, b = !1) => {
        a = document.getElementById(a);
        let c = "margin-left: 0 !important";
        for (let d = 0; d < links_lt.length; d++) {
            if (!b || d) c = "";
            a.innerHTML += `<a href="${links_lt[d].link}" target="_blank" style="${c}" class="btn btn-icon btn-secondary btn-${links_lt[d].name} mx-2"><i class="bx bxl-${links_lt[d].name}"></i></a>`
        }
    },
    initCrypto = () => {
        freeze_crypto || (freeze_crypto = !0, getCrypto(a => {
            crypto_token = a
        }))
    },
    finishLoad = () => {
        document.querySelector("main").setAttribute("style",
            "");
        document.querySelector("footer").setAttribute("style", "");
        document.getElementById("footer-text-blc").innerHTML = 'Создал KovalYRS с <i class="emoji" style="background-image:url(\'assets/images/emoji/red-heart.png\');font-size: .7rem;bottom:-1px"><b>❤️</b></i>, специально для ZALUPA.ONLINE';
        grecaptcha && (document.getElementById("re-badge-text").innerText = "This site uses Google ReCaptcha technology")
    },
    observerSystemTheme = () => {
        const a = ["dark", "light"],
            b = document.querySelector('[data-bs-toggle="mode"]').querySelector(".form-check-input");
        for (let c = 0; c < a.length; c++) window.matchMedia(`(prefers-color-scheme: ${a[c]})`).addEventListener("change", d => {
            if (d = d.matches) "dark" === a[c] ? (root.classList.add("dark-mode"), b.checked = !0) : (root.classList.remove("dark-mode"), b.checked = !1), d = void 0;
            return d
        })
    },
    callSucessPayModal = (a = 0) => {
        let b;
        const c = document.getElementById("donate-cart-list-success"),
            d = document.getElementById("success-pay-text-js"),
            g = document.getElementById("only-ok-payment"),
            e = document.querySelector(".modal-title");
        donateSwitchContainer(!0);
        checkPayment(f => {
                if ("undefined" !== typeof f.status) {
                    if (f.status && a == parseInt(f.id)) {
                        b = f;
                        d.innerText = "Оплата прошла успешно, Шеф доволен, спасибо тебе.";
                        g.style.display = "";
                        var h = document.createElement("button");
                        h.id = "private_gift_button_modal";
                        h.setAttribute("class", "btn btn-primary shadow-primary btn-lg mb-2 btn-shadow-hide");
                        h.innerText = "button::init";
                        const l = f.product.name.toLowerCase().includes("токен") ? 1 : 2;
                        var k = `<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Система</h6></div><span>${f.payment_system}</span></li>`;
                        let m = `<li class="list-group-item d-flex justify-content-between"><span>Сумма зачисления</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${f.enrolled} ${getNoun(f.enrolled,
"рубль","рубля","рублей")}</strong></li>`;
                        coins_sell_mode && (1 === l ? m = `<li class="list-group-item d-flex justify-content-between"><span>Сумма</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${f.enrolled} ${getNoun(f.enrolled,"токен","токена","токенов")}</strong></li>` : 2 === l && (m = `<li class="list-group-item d-flex justify-content-between"><span>Сумма</span><strong class="bottom-line-set bottom-line-set-zlp color-set-zlp">${f.product.price} ${getNoun(f.enrolled,
"рубль","рубля","рублей")}</strong></li>`, document.querySelector("div.modal-footer").prepend(h)));
                        if (!f.enrolled || 1 > f.enrolled) m = "";
                        if (!f.email.length || f.email.match("undefined")) f.email = "Ну указано";
                        if (!f.payment_system || f.payment_system.match("undefined")) k = "";
                        f.created_at && f.created_at.length ? (h = new Date(f.created_at), f.created_at = `${h.toLocaleDateString()} ${h.toLocaleTimeString()}`) :
                            f.created_at = "Неизвестно";
                        h = "";
                        f.private_invite && (h = `<li class="list-group-item d-flex justify-content-between lh-sm mb-2 mb-lg-3 mt-4 mt-lg-5"><a href="${f.private_invite}" id="private-chat-button" target="_blank" style="margin:auto"class="btn btn-primary shadow-primary btn-lg btn-shadow-hide">Приглашение в приватный чат <i class="ms-1 bx bxl-telegram"></i></a></li>`);
                        c.innerHTML = `<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Никнейм</h6></div><span>${f.customer}</span></li><li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Почта</h6></div><span>${f.email}</span></li>${k}<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0 text-start">Время</h6></div><span>${f.created_at}</span></li>${m}${h}`
                    } else d.innerText =
                        "Чек неоплачен, Шеф недоволен.", document.querySelector("img.payment-sucess-vova").setAttribute("src", "assets/images/vova-fail.webp");
                    switch_modal_containers("success");
                    modal_open_();
                    (k = b.product.image) && k.length && (document.querySelector(".payment-sucess-vova").src = k, document.querySelector(".item-name-payment-result").style.marginBottom = "4vh");
                    e.innerText = `Чек #${f.id}`
                } else notify("Ошибка, чек не найден или EasyDonate вернул недействительный ответ")
            },
            a)
    },
    successPay = () => {
        const a = (new URL(window.location.href)).searchParams.get("pg_order_id");
        a && callSucessPayModal(a)
    },
    displayPromotion = () => {
        const a = document.querySelector("div.promotion-header");
        document.querySelector("main");
        requestCall(b => {
            if (b.active) {
                const c = b.text;
                a.style.minHeight = "40px";
                a.style.height = "100%";
                a.setAttribute("onclick", `clipboardFunc("input.promotionInput", "Промокод <span class=\\"text-primary\\" style=\\"font-weight:800\\">${b.var}</span> скопирован в буфер обмена.")`);
                a.innerHTML = `<p class="text-center" style="color:#fff!important;line-height:200%">${c}</p><input class="promotionInput" value="${b.var}" style="display:none">`;
                b = document.querySelector("div.promotion-header>p").style;
                b.marginBottom = "0";
                b.paddingRight = "1.25rem";
                b.paddingLeft = "1.25rem";
                b.paddingTop = ".18rem"
            }
        }, "assets/data/promotion.json", "GET", !0)
    },
    adaptiveDisplayLand = () => {
        const a = () => {
            const b = document.querySelector("header").offsetHeight,
                c = document.getElementById("head-container"),
                d = document.querySelector("div.vova-bg-landing"),
                g = document.querySelector("div.vova-bg-landing-mask");
            0 === first_init_head_adapt && 0 === first_init_head_adapt_vova && (first_init_head_adapt = c.offsetHeight, first_init_head_adapt_vova = d.offsetHeight);
            c.style.height = `${first_init_head_adapt-b}px`;
            d.style.height = `${first_init_head_adapt_vova-b}px`;
            g.style.height = `${first_init_head_adapt_vova-b}px`;
            c.style.marginTop = `${b}px`
        };
        a();
        setInterval(a, 350)
    },
    clipboardFunc = (a, b) => {
        a = document.querySelector(a);
        a.select();
        a.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(a.value);
        notify(b);
        return a.value
    },
    donateContainerHash = () => {
        observerContainerHash(["donate", "donate_block"], () => {
            donate_displayed = !0;
            donateSwitchContainer(donate_displayed)
        })
    },
    observerContainerHash = (a, b) => {
        a.includes(linkHash()) && b();
        addEventListener("hashchange", c => {
            a.includes(linkHash()) && b()
        })
    },
    openTelegramAuthModal = (a = !1) => {
        checkTelegramAuthData(function (b) {
            if (!b) {
                b = document.createElement("script");
                b.src = "https://telegram.org/js/telegram-widget.js?21";
                b.setAttribute("async", "");
                b.setAttribute("data-telegram-login",
                    telegram_bot_username);
                b.setAttribute("data-size", "large");
                b.setAttribute("data-radius", "8");
                b.setAttribute("data-onauth", "onTelegramAuth(user)");
                b.setAttribute("data-request-access", "write");
                b.onload = () => {
                    switch_modal_containers("info", {
                        title: "",
                        content: ""
                    });
                    modal_open_()
                };
                const c = document.getElementById("info-content-modal"),
                    d = document.createElement("div"),
                    g = document.createElement("p");
                c.innerHTML = "";
                c.appendChild(d);
                c.appendChild(g);
                g.innerHTML = `Для некоторых функций на этом сайте необходимо авторизироваться. Мы не получим никаких конфиденциальных данных о вас, например, ваш номер или локацию, это нужно только для того, чтобы Telegram подтвердил, что вы являетесь владельцем своего аккаунта. Также не забудьте связать свой аккаунт Telegram с игровым аккаунтом в <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.`;
                g.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
                d.id = "telegram-auth-container";
                d.appendChild(b)
            }
        }, a)
    },
    openLoginHint = () => {
        if (allow_display_login_hint) {
            var a = document.getElementById("info-content-modal"),
                b = document.createElement("div"),
                c = document.createElement("p");
            a.innerHTML = "";
            a.appendChild(b);
            a.appendChild(c);
            c.innerHTML = `Похоже что ты не прочитал текст в первом окне авторизации, повторим процедуру. Чтобы завершить авторизацию на сайте - тебе нужно связать свой Telegram с своим игровым аккаунтом в&nbsp; <a href="${telegram_social_bot}" target="_blank" class="text-primary">нашем боте</a>.`;
            c.setAttribute("class", "text-start px-3 pt-1 pt-lg-2");
            b.id = "telegram-auth-hint";
            notify("Прочитай внимательно инструкцию!");
            switch_modal_containers("info", {
                title: "Помощь авторизации",
                content: ""
            });
            modal_open_()
        }
    },
    initJarallax = () => {
        jarallax(document.querySelectorAll(".jarallax"), {
            speed: .15,
            type: "scale-opacity"
        })
    },
    initTooltip = () => {
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(a => {
            tooltip_instance = new bootstrap.Tooltip(a, {
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
            })
        });
        tooltip_instance && setInterval(() => {
            tooltip_instance.update()
        }, 1500)
    },
    initSmoothScrollObserver = () => {
        const a = new SmoothScroll("section"),
            b = () => {
                const c = linkHash().toLowerCase();
                if (c && c.length && !["private_rules"].includes(c)) try {
                    a.animateScroll(document.querySelector(`section[id="${c}"]`),
                        null, {
                            offset: 50
                        })
                } catch (d) {}
            };
        b();
        window.onhashchange = b
    },
    privateServerModuleInit = () => {
        document.getElementById("private-server-hub-description").innerHTML = 'Проект Zalupa.Online за период своего существования от единого сервера Анархии перерос в проект с несколькими режимами, один из таких – приватный сервер с ванильным выживанием. Особенность этого сервера, что туда попадают только те, кто поддержал сервер финансово. Также единственный режим, где вы можете быть на уровне с администрацией, ведь здесь можно играть только с правами обычного игрока, никаких привилегий. Также не забудь <a class="text-gradient-primary" href="https://www.notion.so/zaluparules/zalupa-online-1e6269506d084d6ba9549cbb7d40e3a4">прочитать правила</a>.'
    },
    tonyComeBack = () => {
        const a = document.getElementById("AppleTony_comeback_days"),
            b = g => {
                a.innerText = `${g} ${getNoun(g,"день","дня","дней")}`
            };
        var c = new Date;
        c = (new Date("11/30/2023")).getTime() - c.getTime();
        const d = parseInt(c / 864E5);
        b(d);
        setInterval(function () {
            b(d)
        }, 9999)
    },
    autoAuthTelegramObserver = () => {
        telegram_auth_enabled && (document.getElementById("telegram-auth-avatar").style.display = "");
        checkTelegramAuthData(a => {
            if (a) {
                a = document.getElementById("contact-button-land");
                const b = document.querySelector(".avatar-container"),
                    c = document.getElementById("telegram-auth-avatar");
                b.removeAttribute("onclick");
                feedback_module_enabled && (a.style.display = "");
                c.style.display = "";
                setAvatar(getTelegramAuth())
            }
        });
        setInterval(displayTokens, 2E3)
    },
    initCore = () => {
        initHost();
        initCrypto();
        observerSystemTheme();
        appendPostsNews();
        initComments();
        appendServices();
        gameServerUpdater();
        initDonate();
        initEventsList();
        initJarallax();
        finishLoad();
        successPay();
        ytVideoSetter();
        setRandomStickerLand();
        donateContainerHash();
        privateServerModuleInit();
        autoAuthTelegramObserver();
        tonyComeBack();
        displayPromotion();
        adaptiveDisplayLand();
        setLauncherLinks();
        donate_bg_preload();
        check_modal_();
        const a = document.getElementById("dark-perm-set-bv");
        a.parentNode.removeChild(a);
        window.onload = () => {
            if (!debug_lock_init) {
                const b = document.querySelector(".page-loading");
                setTimeout(() => {
                    b.classList.remove("active");
                    donate_displayed || (document.body.style.overflowY = "");
                    window.scrollTo({
                        top: 0
                    })
                }, 1500);
                setTimeout(() => {
                    b.remove();
                    initTooltip();
                    initSmoothScrollObserver()
                }, 1600);
                setInterval(() => {
                    checkTelegramAuthData(function (c) {}, !1, !1, !0)
                }, 12E3)
            }
        }
    };
script_core.onload = () => {
    initCore()
};
