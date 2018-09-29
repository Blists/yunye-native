(function(global) {
    var url = "yunye:native?";
    var methods = {
        record: {
            name: "跳转录像页面",
            method: "record"
        },
        getRecord: {
            name: "获取录像文件",
            method: "getRecord"
        },
        saveRecord: {
            name: "保存录像到相册",
            method: "saveRecord"
        },
        openapp: {
            name: "打开app",
            method: "openapp"
        },
        getLocation: {
            name: "获取位置",
            method: "getLocation"
        },
        getMapApp: {
            name: "获取手机上的app",
            method: "hasapp"
        },
        getHomeBack: {
            name: "获取手安卓home健",
            method: "back"
        },
        sharingapplication: {
            name: "分享",
            method: "share"
        },
        alertCloseAdr: {
            name: "提醒用户是否退出app",
            method: "close"
        },
        getAccount: {
            name: "原生获取账号",
            method: "getAccount"
        },
        getCodeData: {
            name: "调用扫码功能",
            method: "getCodeData"
        },
        openTab: {
            name: "打开webview",
            method: "openTab"
        },
        closeTab: {
            name: "关闭webview",
            method: "closeTab"
        },
        restartApp: {
            name: "重启app",
            method: "restartApp"
        },
        forceClose: {
            name: "强制关闭app",
            method: "forceClose"
        }
    };

    var native = function(method, params) {
        if (!method || !methods[method] || !methods[method].method) throw new Error("方法为空或未添加此方法");
        if (window.YUNYE) {
            if (window.YUNYE[methods[method].method]) {
                params ? window.YUNYE[methods[method].method](JSON.stringify(params)) : window.YUNYE[methods[method].method]();
            } else {
                oldNative(method, params, methods[method].name + ":window.YUNYE未找到" + methods[method].method + ",使用url交互方式");
            }
        } else {
            oldNative(method, params, "未找到window.YUNYE");
        }
    };

    var oldNative = function(method, params, warnInfo) {
        if (!method || !methods[method] || !methods[method].method) throw new Error("方法为空或未添加此方法");
        // ios不建议使用注入方式 不输出warn
        if (!/iPhone/.test()) console.warn(warnInfo);
        var paramsArr = ["method=" + encodeURIComponent(methods[method].method)];
        for (var key in params || {}) {
            paramsArr.push(key + "=" + encodeURIComponent(params[key]));
        }
        var href = url + paramsArr.join("&");
        console.log(href);
        window.location.href = href;
    };
    typeof exports === "object" ? (module.exports = native) : (global.native = native);
})(this);
