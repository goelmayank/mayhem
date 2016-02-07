define(["core/Logger", "core/CoreAPI", "core/vendor/jquery.min", "core/vendor/Brightline.min", "core/vendor/text!components/List/list.tpl", "core/vendor/text!components/Blacklist/blacklist.tpl", "components/List/ListView"], function(e, t, i, s, n, o, a) {
    return t.Class.extend(a, {
        setJQuery: function(e) {
            i = e || i, this._parent.setJQuery(e)
        },
        refreshList: function() {
            this._parent.refreshList(i("#blockedSitesList"), i("#newBlockedSites"), "hideOnBypass")
        },
        render: function() {
            return this._parent.render(o)
        },
        renderList: function() {
            return this._parent.renderList("hideOnBypass")
        },
        bindUIHandlers: function() {
            this._parent.bindUIHandlers(), this.bindBlacklistUIHandlers()
        },
        bindListUIHandlers: function() {
            this._parent.bindListUIHandlers(), t.Settings.get("productivityBypass") === !0 && i(".hideOnBypass").hide()
        },
        bindBlacklistUIHandlers: function() {
            var e = i("#blockedSitesMsg"),
                s = i("input[name=stalkerOption]"),
                n = this;
            t.StayFocusd.isMaxTimeAllowedExceeded() && (e.html(t.Chrome.Translation.get("cannotRemoveBlockedSites")), e.show()), i("input[name=addBlockedSites]").click(function() {
                t.PubSub.publish(n.getClassName() + ".domains.add.BLACKLIST")
            }), s.click(function() {
                t.PubSub.publish(n.getClassName() + ".checkbox.toggle.STALKER_OPTION")
            }), i("#showSuggestedSitesList").click(function() {
                t.PubSub.publish(n.getClassName() + ".data.load.SUGGESTED_SITES")
            }), i("#blockExtensionsPage").click(function() {
                t.PubSub.publish(n.getClassName() + ".domain.add.BLACKLIST", {
                    domain: "chrome://extensions"
                })
            }), t.StayFocusd.isOutgoingLinksOptionActive() && (s.prop("checked", !0), t.StayFocusd.isMaxTimeAllowedExceeded() && s.prop("disabled", !0))
        },
        addListeners: function() {
            var e = this;
            t.PubSub.listen("*.data.loaded.SUGGESTED_SITES", function(t, i) {
                e.renderSuggestedSitesList(i.data)
            }), this._parent.addListeners()
        },
        getNewDomains: function() {
            return this._parent.getNewDomains(i("#newBlockedSites").val())
        },
        renderSuggestedSitesList: function(e) {
            var o = this,
                a = new s(n);
            for (var d in e)
                if (e.hasOwnProperty(d)) {
                    var r = e[d];
                    if (o.model.has(r)) continue;
                    var c = d.split(" ").join("-").toLowerCase();
                    a.set("id", c), a.set("addToList", t.Chrome.Translation.get("addToList")), a.set("domain", d), a.parse("addDomain")
                }
            i("#suggestedSitesList").html(a.render()), this.bindSuggestedSitesListUIHandlers(e)
        },
        bindSuggestedSitesListUIHandlers: function(e) {
            var s = this;
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    var o = e[n];
                    if (s.model.has(o)) continue;
                    var a = n.split(" ").join("-").toLowerCase();
                    ! function(e, n) {
                        i("#" + n + " img").click(function() {
                            t.PubSub.publish(s.getClassName() + ".domain.add.BLACKLIST", {
                                domain: e
                            }), i("#" + n).remove()
                        })
                    }(o, a)
                }
            i("#suggestedSites").slideToggle()
        }
    })
});
