/*
    所有 mobile、娛樂、desktop 版本共用的 js function
*/

$(document).ready(function () {

    $("img").each(function () {
        var alt = $(this).attr("alt");
        if(alt!= null){

            if (alt.indexOf("業配") > -1) {

                $(this).attr("alt", "特稿");
            }
        }
    });

    $(".sbNewsList").each(function () {
        var id = $(this).data("layid");
        if (id != "") {
            $("#" + id).append($(this));
        }
    });


    $(".accordionTitle").mouseover(function () {
        $(".accordionMain").removeClass("active");

        var $_mainItem = $(this).parent();

        var $_img = $_mainItem.find("img");
        $_img.each(function () {
            var src = $(this).attr("src");
            if (src == "") {
                 $(this).attr("src", $(this).data("imglink"));
            }
        });

        $_mainItem.addClass("active");
    });


    $(".area18-bt.bt-left").on("click", function () {
        var bUrl = document.referrer;
        //alert(bUrl);
        if (bUrl.indexOf("setmoney") != -1 || bUrl.indexOf("setmoney") != -1 || bUrl.indexOf("localhost") != -1) {
            history.back();
        }
        else {
            location.href = '/';
        }

    });
    var PageGroupID = 1;
    if ($("#hfPageGroupId").length > 0) {
        PageGroupID = $("#hfPageGroupId").val();

        if (PageGroupID == 10 || PageGroupID == 0) {
            PageGroupID = 1;
        }
    }
    var VoteId = 0;
    if ($("#hfVoteId").length > 0) {
        VoteId = $("#hfVoteId").val();
    }


    if ($(".sidebarLay").length > 0) {
        var sidebarCon = AjaxGetData('/Extensions/SetMainServices.asmx/GetAllSidebarContent', '{"PageGroupID":"' + PageGroupID + '", "VoteID":"' + VoteId + '"}', false, false, null);
        if (sidebarCon != null) {
            var list = jQuery.parseJSON(sidebarCon);

            $(".sidebarLay").each(function () {
                var box = {
                    'typev': $(this).data("typev"),
                    'title': $(this).data("title"),
                    'pa': $(this).data("pa"),
                    'pl': $(this).data("pl"),
                    'hasPoint': $(this).data("haspoint"),
                    'showImg': $(this).data("showimg"),
                    'layout': $(this).data("layout"),
                    'count': $(this).data("count"),
                    'showSummary': $(this).data("summary"),
                    'imgWidth': $(this).data("imgwidth"),
                    'moreView': $(this).data("moreview"),
                    'Circle': $(this).data("circle"),
                };

                var dList = list[box.typev];

                if (dList != null) {

                    if (box.layout != "Vote") {
                        $(this).append(sidebarBaseLay(box, dList));
                    }
                    else {
                        if (dList[0].IsActive) {
                            $(this).append(sidebarVoteLay(box, dList));
                        }
                    }

                }
            });
        }
    }

    //**右側新浮水印
    $(".floatL").click(function () {
        $("#divFloatToolsView").toggle("slow");
        var $_arrow = $(this).find(".arrowBlock span");
        $_arrow.toggleClass("arrowR");

    });

    $owlFloat = $('#owl-Float');
    $owlFloatSlides = $owlFloat.children('div');

    if ($owlFloatSlides.length > 1) {
        $("#owl-Float").owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            controlsClass: "edm_controls",
            animateOut: 'fadeOut'
        });
    }
    else {
        //$owlFloat.removeClass();
        $("#owl-Float").height(270);
    }

    $owlFloat2 = $('#owl-Float2');
    $owlFloatSlides2 = $owlFloat2.children('div');

    if ($owlFloatSlides2.length > 1) {
        $("#owl-Float2").owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            controlsClass: "edm_controls",
            animateOut: 'fadeOut'
        });
    }
    else {
        //$owlFloat2.removeClass();
        $("#owl-Float2").height(135);
    }


    //箭頭動畫
    var bottomArrowNum = $('.on_air_bottom > .arrow').length;
    setInterval(function () {
        for (var i = 0; i < $('.on_air_bottom > .arrow').length; i++) {
            if (bottomArrowNum > i) {
                $('.on_air_bottom > .arrow').eq(i).hide();
            }
            else {
                $('.on_air_bottom > .arrow').eq(i).show();
            }
        }
        bottomArrowNum--;
        if (bottomArrowNum === -1) { bottomArrowNum = $('.on_air_bottom > .arrow').length; }
    }, 500);

    //**右側新浮水印-結束


    //內文 img alt 加入識別
    if ($('#ckuse').length > 0) {
        $('#ckuse img').each(function () {
            try {
                var ha = document.createElement("a");
                ha.href = $(this).attr('src');
                var matchs = ha.pathname.split('/');
                var imgId = matchs[matchs.length - 1].split('-')[0];
                $(this).attr('alt', $(this).attr('alt') + " ID-" + imgId);
            }
            catch (ex) {
            }
        });
    }

    //內文頁文字廣告
    if ($("#newsTextAD").length > 0) {
        $.ajax({
            url: "https://ad.setn.com/Ads/TextAD",
            dataType: 'text',
            type: 'GET',
            success: function (result) {
                var obj = $.parseJSON(result);
                var contItem = "";
                jQuery.each(obj, function (i, item) {
                    $("#newsTextAD").append('<li data-layid="' + item.ADPage + '"><a href="' + item.Url + '" target="_blank" data-layid="' + item.ADRowid + '" class="gt newsTextADItem" pa="新聞內頁文字廣告" pl="' + item.ADPage + "_" + item.ADRowid + '">' + item.Text + '</a><span class="sponsored"></span></li>');
                });
            },
            error: function (result, status, jqXHR) { }
        }).done(function () {
            ga_track("#newsTextAD");

            $('body').on("click", '.newsTextADItem', function () {
                var id = $(this).data("layid");


                $.ajax({
                    url: "https://ad.setn.com/AdsDataCollect/AdsClick/" + id,
                    dataType: 'text',
                    type: 'GET',
                    success: function (result) {
                    },
                    error: function (result, status, jqXHR) { }
                });
            });
        });
    }


});

function sidebarBaseLay(box, list) {
    var count = 10;
    if (box.count != null) count = box.count;
    var reItem = "";
    reItem += '<div class="sbNewsList ' + box.typev + '">';
    if (box.typev == "FBAnchor") {
        reItem += '<div class="sbTitle"><a href="AnchorSET.aspx">' + box.title + '</a></div>';
    }
    else {
        reItem += '<div class="sbTitle">' + box.title + '</div>';
    }

    reItem += '<div class="sbNewsItem">';
    jQuery.each(list, function (i, cItem) {
        if (i >= count) {
            return false;
        }

        switch (box.layout) {
            case "LivePrg":
                reItem += sidebarPrgItem(box.pa, box.pl, cItem);
                break;
            case "Prg":
            case "News":
            default:
                if (i <= 0 && box.hasPoint) {
                    reItem += sidebarPointItem(box.pa, box.pl, cItem);
                }
                else {
                    reItem += sidebarBaseItem(box, cItem, i + 1);
                }

                break;
        }
    });
    reItem += '</div>';
    if (box.moreView != null) {
        if (box.typev == "MarketingNews") {
            reItem += '<div class="more"><a href="' + box.moreView + '">看更多 &gt;&gt;</a></div>';
        }
        else {
        reItem += '<div class="more"><a href="' + box.moreView + '">看更多' + box.title + '&gt;&gt;</a></div>';
        }
    }

    reItem += '</div>';

    return reItem

}

function sidebarBaseItem(box, cItem, i) {
    var link = cItem.Link;
    if (cItem.Link == null) {
        link = "/News.aspx?NewsID=" + cItem.Id
    }
    var reItem = "";
    reItem += '<div>';
    if (box.Circle) {
        reItem += '<span class="ListCircle">' + i + '</span>';
    }
    reItem += '<a class="gt" pa="' + box.pa + '" pl="' + box.pl + '" href="' + link + '" target="_blank">';
    if (box.showImg) {
        var errImg = "this.src = 'http://attach2.setn.com/newsimages/Default/Working-XL.jpg'"
        reItem += '<img src="' + cItem.Image + '" onerror="' + errImg + '" width="' + box.imgWidth + '" alt="' + cItem.Title + '" />';
    }

    if (box.showSummary) {
        reItem += '<span><b>' + cItem.Title + '</b></span>';
        reItem += '<p>' + cItem.Summary + '</p>';
    }
    else {
        reItem += '<span>' + cItem.Title + '</span>';
    }

    reItem += '</a>';
    reItem += '</div>';
    return reItem
}

function sidebarPointItem(pa, plate, cItem) {
    var link = cItem.Link;
    if (cItem.Link == null) {
        link = "/News.aspx?NewsID=" + cItem.Id
    }
    var reItem = "";
    reItem += '<div class="sbNewsItemPoint">';
    reItem += '<a class="gt" pa="'+ pa +'" pl="' + plate + '" href="' + link + '"><img src="' + cItem.Image + '" onerror="" width="300" height="169" alt="' + cItem.Title + '" /></a>';
    reItem += '<span class="f_16"><strong><a class="gt" pa="' + pa + '" pl="' + plate + '" href="' + link + '">' + cItem.Title + '</a></strong></span>';
    reItem += '<p>';
    if (cItem.Summary.length > 60) {
        reItem += cItem.Summary.substring(0, 60) + "...";
    }
    else {
        reItem += cItem.Summary;
    }
    reItem += '</p>';
    reItem += '</div>';

    return reItem

}

function sidebarPrgItem(pa, plate, cItem) {
    var link = cItem.Link;
    if (cItem.Link == null) {
        link = "/News.aspx?NewsID=" + cItem.Id
    }
    var reItem = "";

    reItem += '<div class="sbNewsItemPoint">';
    reItem += '<div>';
    reItem += '<span class="f_16"><strong><a class="gt" pa="' + pa + '" pl="' + plate + '" href="' + link + '">' + cItem.Title + '</a></strong></span>';
    reItem += '<p>' + cItem.Summary + '</p>';
    reItem += '</div>';
    reItem += '<a class="gt" pa="' + pa + '" pl="' + plate + '" href="' + link + '"><img src="' + cItem.Image + '" onerror="" width="300" height="169" alt="' + cItem.Title + '" /></a>';
    reItem += '</div>';

    return reItem
}

function sidebarVoteLay(box, list) {
    var count = 10;
    if (box.count != null) count = box.count;
    var reItem = "";
    reItem += '<div class="sbNewsList ' + box.typev + '">';
    reItem += '<div class="sbTitle">' + box.title + '</div>';
    jQuery.each(list, function (i, item) {
        
        reItem += '<div class="VoteTitle">' + item.Title + '</div>';
        reItem += '<ul>';
        jQuery.each(item.StrObj, function (j, cItem) {
            if (j >= count) {
                return false;
            }
            reItem += '<li>' + cItem + '</li>';
        });
        reItem += '</ul>';
        if (item.StrObj.length > 10) {
            reItem += '<div style="text-align: right; color: #999; margin: 5px 10px;" class="f_14"><a href="/Vote.aspx?VoteID=' + item.Id + '" >......更多選項</a></div>';
        }
        reItem += '<div style="margin: 10px;" class="sidebarVoteBtn">';
        reItem += '<a href="/Vote.aspx?VoteID=' + item.Id + '"><img src="/images/vote/vote-bt-3.png" /></a>';
        var cFn = "setCookie('ViewVote', '1')";
        reItem += '<a href="/Vote.aspx?VoteID=' + item.Id + '" onclick="' + cFn + '" class="Vote">【我想直接看結果】</a>';
        reItem += "</div>";
    });

    reItem += '</div>';
    return reItem
}


$.ajaxWebService = function (url, dataMap, fnSuccess) {
    console.log(url);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: dataMap,
        dataType: "json",
        success: fnSuccess
    });
}

function AjaxGetData(service, json, isAsync, isTextMode, errShowType) {
    return this.ajax_base(service, json, isAsync, isTextMode, errShowType);
};

function ajax_base(service, json, isAsync, isTextMode, errShowType) {

    if (service === null | service === undefined | typeof (service) !== 'string') {
        alert('AjaxGetData操作錯誤!');
        return;
    }

    //json 的處理
    var jSonData = "{}";
    if (json.length > 0) { jSonData = json; }

    //錯誤的 Func 處理
    var errFunc = AjaxErrorAlert;
    if (errShowType !== null | errShowType !== undefined) {
        if (errShowType === 'box') { errFunc = AjaxErrorShowMsg; }
    }

    var reDt = null;
    var cType = "application/json; charset=utf-8";
    var dType = "json";
    if (isTextMode === true) {
        cType = "application/x-www-form-urlencoded";
        dType = "text";
    }

    try {
        jQuery.ajax({
            type: "POST",
            url: service,
            cache: false,
            async: isAsync,
            contentType: cType,
            data: jSonData,
            dataType: dType,
            success: function (dt, arg1, arg2) {
                if (isTextMode === true) {
                    reDt = dt;

                }
                else {
                    reDt = dt.d;
                }
            },
            error: errFunc
        });
    }
    catch (ex) {
        //alert(ex.toString());
    }
    return reDt;
};


//Ajax 錯誤訊息 alert
function AjaxErrorAlert(msg, args) {
    //alert(msg.responseText);
};
//Ajax 錯誤訊息 show box
function AjaxErrorShowMsg(msg, args) {
    //this.showMsg(msg.responseText, 0);
};

function JSON_ToJsonString(obj) {
    var restr = "";
    for (var k in obj) {
        if (restr) { restr += ","; }
        restr += "\"" + k + "\":\"" + obj[k] + "\"";
    }
    restr = "{" + restr + "}";
    return restr;
}

function GoogleADExecute(exPara, cbEvent) {


    //移除沒有區塊的參數
    var para = new Array();
    for (var i = 0; i < exPara.length; i++) {
        if ($('#' + exPara[i].area).length > 0) { para.push(exPara[i]); }
    }

    googletag.cmd.push(function () {
        var mapping = googletag.sizeMapping().
        addSize([320, 100], [320, 100]).
        addSize([468, 60], [468, 60]).
        addSize([728, 90], [728, 90]).
        addSize([970, 250], [970, 250]).build();

        var id_obj = null;
        for (var i = 0; i < para.length; i++) {

            if (para[i].isrwd == true) {
                googletag.defineSlot(para[i].plate, para[i].size, para[i].id)
                    .defineSizeMapping(mapping)
                    .addService(googletag.pubads());
            }
            else {
                googletag.defineSlot(para[i].plate, para[i].size, para[i].id).addService(googletag.pubads());
            }
            if (para[i].identifier) { id_obj = para[i].identifier }     //廣告指定參數時 , ** key 大小寫有差
        }

        try{
            var crtg_split = (crtg_content || '').split(';');
            var pubads = googletag.pubads();
            for (var i = 1; i < crtg_split.length; i++) {
                pubads.setTargeting("" + (crtg_split[i - 1].split('='))[0] + "", "" + (crtg_split[i - 1].split('='))[1] + "");
            }

        } catch (ex) {
           console.log("exception CRTG");
        }


        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();

        if (id_obj) {
            googletag.pubads().setTargeting(id_obj.key, id_obj.value);
        }
        //廣告回傳事件
        if (cbEvent !== null && typeof (cbEvent) === 'function') {
            googletag.pubads().addEventListener('slotRenderEnded', cbEvent);
        }




        googletag.enableServices();
    });

    for (var i = 0; i < para.length; i++) {
        $('#' + para[i].area).html(GetAdContent(para[i]));
    }
};

function GetAdContent(p) {

    try {
        if (p.marginTop == undefined || p.marginTop == null) {
            p.marginTop = 15;
        }
        if (p.marginBottom == undefined || p.marginBottom == null) {
            p.marginBottom = 0;
        }
        var wh = '';
        if (p.size !== null && p.size != undefined) {
            if (typeof (p.size[0]) === 'number') {
                wh = 'width:' + p.size[0] + 'px; height:' + p.size[1] + 'px;';
            }
        }
        /*
        return '<div id="' + p.id + '" style="' + wh + 'margin-top:' + p.marginTop + 'px;margin-left:auto;margin-right:auto;margin-bottom:' + p.marginBottom + 'px">' +
               '    <scr' + 'ipt type="text/javascript">googletag.cmd.push(function() { googletag.display("' + p.id + '"); });' +
               '    </scr' + 'ipt>' +
               '</div>';
       */
        return '<div id="' + p.id + '" style="' + wh + 'margin-top:' + p.marginTop + 'px;margin-left:auto;margin-right:auto;margin-bottom:' + p.marginBottom + 'px">' +
               '    <scr' + 'ipt type="text/javascript">googletag.cmd.push(function() { console.log("display start"); googletag.display("' + p.id + '"); console.log("display finish"); });' +
               '    </scr' + 'ipt>' +
               '</div>';
    }
    catch (ex) {
        console.log('DFP-AD', ex);
    }
    return '';
};

function GetDfpVideoAd(container, w, h, autoPlay) {
    var dateTick = new Date().valueOf();
    var url = 'https://pubads.g.doubleclick.net/gampad/ads?sz=1024x768&iu=/18689016/TonyAD1&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=' + dateTick;
    console.log(url);
    $.ajax({
        url: url,
        data: '',
        success: function (dt, arg1, arg2) {
            var str = '';

            if ($(dt).find('MediaFiles').length > 0) {
                str = '<video id="videoDFP" style="width:' + w + 'px;height:' + h + 'px;" controls>';
                var mf = $(dt).find('MediaFiles').eq(0).find('MediaFile');
                for (var i = 0; i < mf.length; i++) {
                    var dom_f = mf[i];
                    str += '<source src="' + dom_f.textContent + '" type="' + dom_f.attributes['type'].value + '">';
                }
                str += '</video>';
            }

            //clickThrough
            if ($(dt).find('ClickThrough').length > 0) {
                //alert($(dt).find('ClickThrough')[0]);
            }


            //for (var i = 0; i < dt.childNodes[0].childNodes[0].childNodes[0].childNodes.length; i++) {
            //    var dom = dt.childNodes[0].childNodes[0].childNodes[0].childNodes[i];
            //    alert(dom.tagName);
            //    if(dom.tagName === 'Creatives'){
            //        for (var j = 0; j < dom.childNodes[0].childNodes[0].childNodes.length; j++) {
            //            var dom_m = dom.childNodes[0].childNodes[0].childNodes[j];
            //            if (dom_m.tagName === 'MediaFiles') {
            //                for (var k = 0; k < dom_m.childNodes.length; k++) {
            //                    var dom_f = dom_m.childNodes[k];
            //                    //var dom_f = dom_m.children[j];
            //                }
            //            }
            //        }
            //    }

            $('#' + container).html(str);

            if (autoPlay) {
                document.getElementById("videoDFP").play();
            }
        },
        dataType: 'xml'
    });
}

function setCookie(cname, cvalue, seconds) {
    var d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    var expires = "expires=" + d.toGMTString();
    if (seconds > 0) {
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    else {
        document.cookie = cname + "=" + cvalue;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

var parseQueryString = function () {

    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            objURL[$1.toString().toLowerCase()] = $3;
        }
    );
    return objURL;
};


/// <summary>Web Service 傳回的時間處理</summary>
var WebService_DateTimeFormat = function (dateTime) {
    if (dateTime == null) { alert("呼叫前須先判斷為非null"); }
    var ticks = parseInt(dateTime.replace("Date(", "")
                                .replace(")", "")
                                .replace("\"", "")
                                .replace("\/", ""), 10);
    var d = new Date(ticks);
    return d;
}
var WebService_DateTimeFormat_AMFM = function (dateTime) {
    if (dateTime === null || dateTime === undefined || dateTime === "") { return ""; }
    var d = WebService_DateTimeFormat(dateTime);
    var HourFormat = " AM " + d.getHours();
    if (d.getHours() > 12) {
        HourFormat = " PM " + (d.getHours() - 12);
    }
    var tStr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours()) + ":" + ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
    return d.getFullYear().toString() + "/" + (d.getMonth() + 1).toString() + "/" + d.getDate().toString() + " " + tStr;
}
var WebService_DateTimeFormat_NoTime = function (dateTime, label) {
    if (dateTime === null || dateTime === undefined || dateTime === "") { return ""; }
    var d = WebService_DateTimeFormat(dateTime);

    if (label) {
        return d.getFullYear().toString() + label + (d.getMonth() + 1).toString() + label + d.getDate().toString();
    }
    else {
        return d.getFullYear().toString() + "/" + (d.getMonth() + 1).toString() + "/" + d.getDate().toString();
    }

}
var WebService_DateTimeFormat_HasTime = function (dateTime) {
    if (dateTime === null || dateTime === undefined || dateTime === "") { return ""; }
    var d = WebService_DateTimeFormat(dateTime);
    var tStr = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours()) + ":" + ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes());
    return d.getFullYear().toString() + "/" + (d.getMonth() + 1).toString() + "/" + d.getDate().toString() + " " + tStr;
}


function shareFacebookUrl(url) {
    try{
        FB.ui(
     {
         method: 'share',
         href: url
     }, function (response) { });
    }
    catch (e) {

    }
    
}

function GetImageURL(szImageID, szImagePath, ImgSize, isAdult) {
    if ($("#IMAGESHOST").length > 0) {
        image_shost = $("#IMAGESHOST").val();
    }

    if (isAdult === true) {
        return image_shost + "/Adult/Working-" + ImgSize + ".jpg";
    }

    var sImageFile = image_shost + "/Default/Working-" + ImgSize + ".jpg";

    if (szImageID != null && szImageID != "") {
        sImageFile = image_shost + "/" + szImagePath + szImageID + "-" + ImgSize + ".jpg";
    }
    return sImageFile;
}


function floatVideo($_anchorPoint, $_videoObj, winScrollTop) {
    var contScrollLeft = $("#othercontent").offset().left;
    if (!isMobile() && contScrollLeft >= 250) {
        var vScrolltop = $_anchorPoint.offset().top;
        if (winScrollTop > vScrolltop && !$_videoObj.hasClass("floatVideo") && !$_videoObj.hasClass("removedFloat")) {

            $_videoObj.addClass("floatVideo");
            $(".topVideoBlock > span").show();

            $(".floatVideo").draggable({
                containment: "window",
                scroll: false,
                handle: ".movefloatVideo",
                stop: function () {
                    var top = $(this).position().top;
                    var left = $(this).position().left;

                    cookieHelper.SetFloatVideo(top, left);
                }
            }).css({ width: contScrollLeft, height: contScrollLeft*9/16, });

            var floatvb = cookieHelper.GetFloatVideo();

            if (floatvb !== null) {

                if (floatvb.left <= screen.width && floatvb.top <= screen.height) {
                    $(".floatVideo").css({ left: floatvb.left, top: floatvb.top });
                }

            }
        }
        else if (winScrollTop <= vScrolltop && $_videoObj.hasClass("floatVideo")) {
            $_videoObj.removeClass("floatVideo").removeAttr("style");

        }
    }
}

function isMobile(){
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

