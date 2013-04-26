// ==UserScript==
// @name        flink2
// @namespace   flink
// @include     https://www.facebook.com/*
// @grant 		none
// @version     1
// ==/UserScript==

// debugging stuff
window.goOffline = goOffline;
window.goOnline = goOnline;
window.isOnline = isOnline;
window.showNames = showNames;
window.chat_names = chat_names;
window.getOffline = getOffline;

var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var thread_delay = 100;
var blink = 30000;
var chat_names = '';

var go_offline_flag = false;

function getOffline() {
    return go_offline_flag;
}

function goOffline() {
    if (!go_offline_flag || !isOnline() 
	|| $('.moreOnlineFriends').length == 0)
	return;
    setTimeout(function(){
	if (!isOnline()) return;
	//	alert("go offline");
	if (chat_names != '') return;
	chat_names = $('.fbChatOrderedList')[0].innerHTML;
	// go offline
	$('.uiGrid._4oes .wrap a')[0].click();
	$('.fbChatGoOfflineItem a')[0].click();
	go_offline_flag = false;
    }, 750);
}

function showNames() {
    if (!isOnline() && chat_names != '' 
	&& $('.fbChatOrderedList')[0].innerHTML != chat_names) {

	$('.fbChatOrderedList')[0].innerHTML = chat_names;
	$('.fbChatOrderedList li a').click(function() {
	    $('.uiGrid input[aria-label="Search"]')[0].focus();				
	    $('.uiGrid input[aria-label="Search"]').val($(this).find('.name').html() + '\n');
	    var e = jQuery.Event("keydown");
	    e.which = 50; // # Some key code value
	    $('.uiGrid input[aria-label="Search"]').trigger(e);				
	    //$('.uiGrid input[aria-label="Search"]')[0].click();
	    /*$('.uiGrid input[aria-label="Search"]').attr({
	      'aria-activedescendant': 'js_5',
	      'aria-expanded': 'true'
	      });*/ 
	});
    }
}

alert("Im here!");

function goOnline() {
    if (isOnline()) {
	go_offline_flag = true;
	return;
    }
    //	alert("go online");
    // go online
    $('.fbChatOrderedList')[0].innerHTML = '';
    $('.fbChatGoOnlineLink')[1].click();
    chat_names = '';
    go_offline_flag = true;
}

function isOnline() {
    if ($('.fbChatGoOnlineLink').length >= 2)
	return false;
    return true;
}

window.called = false;

$(function(){
    if (window.called) return;
    window.called = true;
    //	alert("Function running");
    setTimeout(function() {
	//				alert("trying to go online!");
	try {
	    goOnline();
	}
	catch (error) {}
    }, 5000);
    
    setInterval(goOnline, blink);
    setInterval(goOffline, thread_delay);
    setInterval(showNames, thread_delay);
}); 


