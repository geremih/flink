// ==UserScript==
// @name				Flink
// @namespace			vik
// @description			Facebook blink
// @version 			1.0
// @include				http://*.facebook.com/*
// @include				http://*.facebook.com/login*
// @include				https://*.facebook.com/*
// @include				https://*.facebook.com/login*
// @include				https://*.facebook.com/logout*
// ==/UserScript==

/**
* Simple DOM traversing copied from MooTools.
*/

//alert("Hi!");

//Refresh time for the script (in seconds)

var refresh_time = 45;

//Expire time for the password (in seconds)
var password_expire = 3600


function show_alert() {
	if (typeof this.called == 'undefined')
		alert("Hi!");
	this.called = true;
}

//show_alert();

DOM = function () {

function get(id) {
if (id && typeof id === 'string') {
id = document.getElementById(id);
}
return id || null;
}

//alert("hi");

function walk(element, tag, walk, start, all) {
	var el = get(element)[start || walk], elements = all ? [] : null;
	while (el) {
		if (el.nodeType === 1 && (!tag || el.tagName.toLowerCase() === tag)) {
			if (!all) {
				return el;
			}
		elements.push(el);}
		el = el[walk];
		}
	return elements;
}

return {

// Get the element by its id
get: get,

walk: walk,

// Returns the previousSibling of the Element (excluding text nodes).
getPrevious: function (el, tag) {
return walk(el, tag, 'previousSibling');
},

// Like getPrevious, but returns a collection of all the matched previousSiblings.
getAllPrevious: function (el, tag) {
return walk(el, tag, 'previousSibling', null, true);
},

// As getPrevious, but tries to find the nextSibling (excluding text nodes).
getNext: function (el, tag) {
return walk(el, tag, 'nextSibling');
},

// Like getNext, but returns a collection of all the matched nextSiblings.
getAllNext: function (el, tag) {
return walk(el, tag, 'nextSibling', null, true);
},

// Works as getPrevious, but tries to find the firstChild (excluding text nodes).
getFirst: function (el, tag) {
return walk(el, tag, 'nextSibling', 'firstChild');
},

// Works as getPrevious, but tries to find the lastChild.
getLast: function (el, tag) {
return walk(el, tag, 'previousSibling', 'lastChild');
},

// Works as getPrevious, but tries to find the parentNode.
getParent: function (el, tag) {
return walk(el, tag, 'parentNode');
},

// Like getParent, but returns a collection of all the matched parentNodes up the tree.
getParents: function (el, tag) {
return walk(el, tag, 'parentNode', null, true);
},

// Returns all the Element's children (excluding text nodes).
getChildren: function (el, tag) {
return walk(el, tag, 'nextSibling', 'firstChild', true);
},

// Removes the Element from the DOM.
dispose: function (el) {
el = get(el);
return (el.parentNode) ? el.parentNode.removeChild(el) : el;
}

};
}();

//alert("hi!");

//alert("hi!");

function login(email, pass) {
	//alert("hi!");
	var email_input = DOM.get('email');
	email_input.value=email;
	var pass_input = DOM.get('pass');
	pass_input.value=pass;
	var checkbox = DOM.get('persist_box');
	checkbox.value='0';
	checkbox.checked='0';
	var login_form = DOM.get('login_form');
	login_form.submit();
}

function logout(){
var logout_form = DOM.get('logout_form')
logout_form.submit()
}

function get_quote() {
//alert('Get quote called');
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlhttp.open("GET","http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.tk421.net%2Fquotes%22%20and%20xpath%3D'%2F%2Fp'",false);
//alert('xml opened');
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
	//alert('Set response');
   	var i = Math.floor( Math.random() *100);
   	//alert('Getting quote');
    var quote = "<span style=\"font-style:italic\">" + xmlDoc.getElementsByTagName("p")[i].childNodes[0].nodeValue + 
    	'</span> <br /> <small class=\"pull-right\">' + xmlDoc.getElementsByTagName("p")[i].childNodes[2].nodeValue+'</small>'; 
    //alert('Quote got.');
	return quote;
}




function get_names(){

//alert("get_names() called");
var code_regex_str = "\"([0-9]+)\":\{\"a\":2,\"i\":false\}";
//alert("Hi!");
//code_regex_str = "See All Messages";
var code_regex = new RegExp(code_regex_str, 'g');
var num_regex = new RegExp("\\d+");
var code_matches = document.body.innerHTML.match(code_regex);
//alert('Code matches:' + code_matches);
var name_matches = new Array()


//alert(num_regex.exec(code_matches[0]));

//code_match = code_matches[0];
//alert(code_match);
if (code_matches)
for (var i=0; i<code_matches.length; ++i) {
	//alert(code_matches.length);
	var code_match = num_regex.exec(code_matches[i]);
	name_regex = new RegExp("\""+code_match+"\""+ ":\{\"name\":\"(\\w+ \\w+)\"");
	//name_regex = new RegExp("\"name\":\"(\\w+ \\w+)\"");
	//alert(num_regex.exec(code_match));
	//alert(code_match);
	clean_name_regex = new RegExp("\\w+ \\w+");
	name = clean_name_regex.exec(name_regex.exec(document.body.innerHTML));
	//alert('Hi!');
	//alert(name);
	name_matches.push(name);
}
//alert("Hi!");
return name_matches;
}

function get_cartoon_src() {
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

var cartoon_code = Math.floor(Math.random()*1000);

xmlhttp.open("GET","http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fxckd.com%2F" 
+ cartoon_code + "%22%20and%20xpath%3D'%2F%2Fimg'",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

        var cartoon_src = xmlDoc.getElementsByTagName("img")[1].getAttribute("src"); 
        return cartoon_src;
}
  
  



function display_names(names) {

//alert('display_names entered');

html = "<!DOCTYPE html>";
html += "<html lang=\"en\">";
html+=  "<head><meta charset=\"utf-8\">";
html +=    "<title>fLink</title>";
html +=    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
html +=    "<meta name=\"description\" content=\"\">";
html +=    "<meta name=\"author\" content=\"\">";

html +=    "<link href=\"http://dl.dropbox.com/u/48593651/bootstrap.css\" rel=\"stylesheet\">\
<link href=\"http://dl.dropbox.com/u/48593651/bootstrap-responsive.css\" rel=\"stylesheet\">\
<link href=\"http://dl.dropbox.com/u/48593651/docs.css\" rel=\"stylesheet\">";
    
html += "<style type=\"text/css\">";
html += "body {\
  padding: 0;\
padding-top: 60px;\
  margin: 0;\
  font:  11px/14px \"Helvetica Neue\", Helvetica, Arial, sans-serif;\
  text-rendering: optimizeLegibility;\
  \
}\
\
blockquote\
{\
font-size:300%;\
font-family:Verdana;\
align:center;\
}\
\
table,th, td\
{\
\
font-size : 150%;\
  font-family : Helvetica;\
border-spacing:100px;\
\
}\
th\
{\
font-size : 250%;\
  \
}\
\
    </style>\
    </head>\
\
  <body  data-spy=\"scroll\" data-target=\".subnav\" data-offset=\"50\" data-twttr-rendered=\"true\">\
\
    <div class=\"navbar navbar-fixed-top\">\
      <div class=\"navbar-inner\">\
        <div class=\"container\">\
          <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\
            <span class=\"icon-bar\"></span>\
            <span class=\"icon-bar\"></span>\
            <span class=\"icon-bar\"></span>\
          </a>\
          <a class=\"brand\" href=\"#\">fLink</a>\
          <div class=\"nav-collapse\">\
            <ul class=\"nav\">\
              <li class=\"active\"><a href=\"#\">Home</a></li>\
              <li><a href=\"#about\">About</a></li>\
            </ul>\
          </div><!--/.nav-collapse -->\
        </div>\
      </div>\
    </div>\
\
\
<div class=\"container\">\
\
<!-- Masthead\
================================================== -->\
<header class=\"jumbotron masthead\">\
  <div class=\"inner\">\
    <h1><span style=\"color:#3B5998\">f</span>Link</h1>\
<div class=\"quote\" style=\"margin-left:auto; margin-right:auto; width:20em; align:center; font-size:150%;\">\
    ";
    //alert('Getting quote');
    html+= get_quote();
    html+="\
</div>\
   \
  </div>\
\
 \
</header>\
\
</div>\
\
<div class=\"container-fluid\">\
  <div class=\"row-fluid\">\
    <div class=\"span3\">\
      <table class=\"table\" style=\"left-margin:5em;\">\
 <thead>\
    <tr>\
      <th>\
<button class=\"btn btn-large btn-success\" type=\"submit\" style=\"font-size:105%;\">\
 &nbsp &nbsp Online&nbsp &nbsp\
 </button></th>\
    </tr>\
  </thead>\
  <tbody>";
  names_list = names.split(',');
names_list = names_list.sort();
for (var i=0; i<names_list.length;++i)
	if (names_list[i]!='null')
	html += "<tr><td>"+names_list[i]+"</td></tr>";
html +=  "</tbody>\
</table>\
    </div>\
\
    <div class=\"span8 \">\
      <img style=\"margin-left:10em;\" src=\"";
      html += get_cartoon_src();
      html += "\" />\
    </div>\
  </div>\
</div>\
</div>\
  </body>\
</html>";
//html+= get_quote(); + '</p><br />';
/*html += "<h1>People Online:</h1><br /><ul>";
names_list = names.split(',');
names_list = names_list.sort();
for (var i=0; i<names_list.length;++i)
	if (names_list[i]!='null')
	html += "<li>"+names_list[i]+"</li>";
html += "</ul><br />";
*/
/*var cartoon_src = get_cartoon_src();
html += "<img class=\"cartoon\" src="+cartoon_src+" />"; 
html+="</body></html>";*/
//alert("generated html");
document.documentElement.innerHTML = html;
}
//alert(match);
//if (code_matches)
//alert(code_matches[0]);
//else alert('No one online.');

//else logout();

//alert('Hi!');




function createCookie(name,value,secs) {
	
	if (secs) {
	 	//alert('Using date?');
		var date = new Date();
		
		date.setTime(date.getTime()+(secs*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
	document.cookie = name+"="+value+expires+';';
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var user_email;
var user_pass;

function check_login() {
	//alert('Entered check_login()');
	var header = document.getElementsByTagName('noscript');
	if (header) {
		//alert('Noscript tag found');
		login_regex = new RegExp("login\\.php\\?login_attempt=1");
		var found = login_regex.exec(document.head.innerHTML);
		if (found)
		{
			alert('Something seems to be wrong. Username was ' + readCookie('user_email') + '. Resetting...');
			//alert(found);
			eraseCookie('user_email');
			eraseCookie('user_pass');
			eraseCookie('facebook_online_friends');
			window.location.replace('http://www.facebook.com');
			return false;
		}}
	return true;
}

function check_or_set_password() {
//alert("Entered function");
if (!readCookie('user_email')) {
//alert("Entered if");
	user_email = prompt("Please enter your email id");
	createCookie('user_email',user_email, password_expire);
	user_pass = prompt("Please enter your password. \n Warning:\
	This password is stored as a cookie. \n \
	It will expire in " + password_expire +" seconds.");
	createCookie('user_pass', user_pass, password_expire);
}
}

//alert('Hi');
if (document.getElementById('firstname')) {
	//alert('Reached login page');
	//alert('Hi!');
	var names;
	if (names = readCookie('facebook_online_friends')){
		//alert('Cookie already set, displaying names.');
		display_names(names); 
		//alert('Names displayed, going to refresh...');
		//var time = refresh_time*1000;
		var timer = new Array();
		//for (var i = 0; i < 10; ++i)
			var timer = window.setTimeout(function(){ //alert('HI!');
			window.location='http://www.facebook.com';
			}
			, refresh_time*1000);
			//alert(timer);
		
		
		//window.location.replace('http://www.facebook.com');
	}
	else {
		//alert('Cookie not set, logging in to set cookie');
		check_or_set_password();
		login(readCookie('user_email'), readCookie('user_pass'));
	}
}

	

else {
	if (check_login()) {
	//alert('Logged in, getting names...');
	var names = get_names();
	//alert('Got names:'+names+' and setting a cookie.');
	if (names == '') names = 'None';
	//alert("There are names:" + names);
	document.cookie =createCookie('facebook_online_friends', names, refresh_time-5);	
	//alert('Cookie set, logging out.');
	logout();
}}

/*

html = "<!DOCTYPE html>";
html += "<html lang=\"en\">";
html+=  "<head><meta charset=\"utf-8\">";
html +=    "<title>fLink</title>";
html +=    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
html +=    "<meta name=\"description\" content=\"\">";
html +=    "<meta name=\"author\" content=\"\">";

html +=    "<link href=\"https://github.com/twitter/bootstrap/blob/master/docs/assets/css/bootstrap.css\" rel=\"stylesheet\">\
<link href=\"https://github.com/twitter/bootstrap/blob/master/docs/assets/css/bootstrap-responsive.css\" rel=\"stylesheet\">\
<link href=\"https://github.com/twitter/bootstrap/blob/master/docs/assets/css/docs.css\" rel=\"stylesheet\">";
    
html += "<style type=\"text/css\">";
html += "body {\
  padding: 0;\
padding-top: 60px;\
  margin: 0;\
  font:  11px/14px \"Helvetica Neue\", Helvetica, Arial, sans-serif;\
  text-rendering: optimizeLegibility;\
  \
}\
\
blockquote\
{\
font-size:300%;\
font-family:Verdana;\
align:center;\
}\
\
table,th, td\
{\
\
font-size : 150%;\
  font-family : Helvetica;\
border-spacing:100px;\
\
}\
th\
{\
font-size : 250%;\
  \
}\
\
    </style>\
    <link href=\"docs/assets/css/bootstrap-responsive.css\" rel=\"stylesheet\">  \
    </head>\
\
  <body  data-spy=\"scroll\" data-target=\".subnav\" data-offset=\"50\" data-twttr-rendered=\"true\">\
\
    <div class=\"navbar navbar-fixed-top\">\
      <div class=\"navbar-inner\">\
        <div class=\"container\">\
          <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\
            <span class=\"icon-bar\"></span>\
            <span class=\"icon-bar\"></span>\
            <span class=\"icon-bar\"></span>\
          </a>\
          <a class=\"brand\" href=\"#\">fLink</a>\
          <div class=\"nav-collapse\">\
            <ul class=\"nav\">\
              <li class=\"active\"><a href=\"#\">Home</a></li>\
              <li><a href=\"#about\">About</a></li>\
            </ul>\
          </div><!--/.nav-collapse -->\
        </div>\
      </div>\
    </div>\
\
\
<div class=\"container\">\
\
<!-- Masthead\
================================================== -->\
<header class=\"jumbotron masthead\">\
  <div class=\"inner\">\
    <h1><span style=\"color:#3B5998\">f</span>Link</h1>\
    <p>and its gone.</p>\
<div class=\"quote\" style=\"margin-left:auto; margin-right:auto; width:75% align:center;\">\
    <blockquote>You fucka- </blockquote>\
</div>\
   \
  </div>\
\
 \
</header>\
\
</div>\
\
<div class=\"container-fluid\">\
  <div class=\"row-fluid\">\
    <div class=\"span3\">\
      <table class=\"table\" >\
 <thead>\
    <tr>\
      <th>\
<button class=\"btn btn-large btn-success\" type=\"submit\" style=\"font-size:105%;\">\
 &nbsp &nbsp Online&nbsp &nbsp\
 </button></th>\
    </tr>\
  </thead>\
  <tbody>\
    <tr>\
      <td>Mihir Rege</td>\
    </tr>\
    <tr>\
      <td>Ass</td>\
    </tr>\
  </tbody>\
</table>\
    </div>\
\
    <div class=\"span8 offset3\">\
      <img style=\"align=center;\" src=\"mnemonics.png\" />\
    </div>\
  </div>\
</div>\
</div>\
  </body>\
</html>";

*/







	






