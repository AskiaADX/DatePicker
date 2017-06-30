{%
dim inputNameX = CurrentQuestion.InputName("date")

dim defaultDate = CurrentADC.PropValue("defaultDate").ToString()
dim bound = CurrentADC.PropValue("bound")
dim position = "'"+CurrentADC.PropValue("position").ToString()+"'"
dim setDefaultDate = CurrentADC.PropValue("setDefaultDate")
dim firstDay = CurrentADC.PropValue("firstDay").ToNumber()
dim dpTheme = "'"+CurrentADC.PropValue("theme").ToString()+"'"
dim disableWeekends = CurrentADC.PropValue("disableWeekends")
dim showWeekNumber = CurrentADC.PropValue("showWeekNumber")
dim showMonthAfterYear = CurrentADC.PropValue("showMonthAfterYear")
dim numberOfMonths = CurrentADC.PropValue("numberOfMonths")
dim mainCalendar = "'"+CurrentADC.PropValue("mainCalendar")+"'"
dim minDate = CurrentQuestion.MinDate.Format("yyyy-MM-dd")
dim maxDate = CurrentQuestion.MaxDate.Format("yyyy-MM-dd")

dim minBound = CurrentQuestion.MinDate.Format("yyyy").ToNumber()
dim maxBound = CurrentQuestion.MaxDate.Format("yyyy").ToNumber()

if CvDkNa(minBound) < 1 Then
	minBound = 1900
EndIf

if CvDkNa(maxBound) < 1 Then
    maxBound = 2100
EndIf
%}

//Validate inputs
var xdefaultDate = '{%=defaultDate.ToString()%}';
var xminBound = '{%=minBound%}';
var xmaxBound = '{%=maxBound%}';


if (xdefaultDate.length == 0) {
    xdefaultDate = new Date();
}
if (xminBound == '0' || xminBound.length == 0 ) {
    xminBound = new Date().getFullYear();
}
if (xmaxBound == '0' || xmaxBound.length == 0) {
    xmaxBound = new Date().getFullYear();
}


//var xdateFormat = '{%= Interview.Language.DateFormat.ToUpperCase() %}';
//if (xdateFormat.length == 0) {
    var xdateFormat = "YYYY-MM-DD";
//}


// Prototype the indexOf function
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}


var lang = {%= Interview.Language.Id %};

var xi18n = {
    previousMonth : 'Previous Month',
    nextMonth     : 'Next Month',
    months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
};

var frLangs = [1036,2060,11276,3084,9228,12300,15372,5132,13324,6156,14348,58380,8204,10252,4108,7180];
var deLangs = [1031,3079,5127,4103,2055];
var itLangs = [1040,2064];
var esLangs = [3082,1034,11274,16394,13322,9226,5130,7178,12298,17418,4106,18442,22538,2058,19466,6154,15370,10250,20490,21514,14346,8202];
var duLangs = [1043,2067];
if (frLangs.indexOf(lang) > -1) {
    xi18n = {
		previousMonth	: 'Mois précédent',
		nextMonth		: 'Mois prochain',
		months 			: ['Janvier','Février', 'Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		weekdays		: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		weekdaysShort	: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
	};
} else if (deLangs.indexOf(lang) > -1) {
    xi18n = {
        previousMonth : 'Vormonat',
        nextMonth     : 'Nächster Monat',
        months        : ['Januar','Februar', 'März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
        weekdays      : ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
        weekdaysShort : ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
	};
} else if (itLangs.indexOf(lang) > -1) {
    xi18n = {
        previousMonth : 'il mese scorso',
        nextMonth     : 'il prossimo mese',
        months        : ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],
        weekdays      : ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'],
        weekdaysShort : ['do.','lun.','mar.','mer.','gio.','ven.','sab.']
    };
} else if (esLangs.indexOf(lang) > -1) {
    xi18n = {
        previousMonth : 'mes anterior',
    	nextMonth     : 'próximo mes',
    	months        : ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
    	weekdays      : ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    	weekdaysShort : ['D','L','M','X','J','V','S']
    };
}

//Kill the jQueryUI datepicker on load
window.onload = function() {
    if (window.jQuery && document.querySelectorAll(".hasDatepicker")) {  
        var tbremoved = document.getElementById("ui-datepicker-div");
        var bodies = document.getElementsByTagName("body");
        if (bodies && bodies.length > 0 && tbremoved) {
            var body = bodies[0];
            body.removeChild(tbremoved);
        }
    }
}

var picker{%= CurrentADC.InstanceId %} = new Pikaday(
    {
        field: document.getElementById('{%=inputNameX%}'),
		firstDay: {%=firstDay%},
		defaultDate: new Date(xdefaultDate),
		bound: {%=bound%},
		position: {%=position%},
		setDefaultDate: {%=setDefaultDate%},
		yearRange: [xminBound,xmaxBound],
		theme: {%=dpTheme%},
        disableWeekends: {%=disableWeekends%},
        showWeekNumber: {%=showWeekNumber%},
        showMonthAfterYear: {%=showMonthAfterYear%},
        numberOfMonths: {%=numberOfMonths%},
        mainCalendar: {%=mainCalendar%},
        format: xdateFormat,
        minDate: new Date('{%=minDate%}'),
        maxDate: new Date('{%=maxDate%}'),
        i18n: xi18n,
    	onOpen: function(event) {
   			var adcIndex = {%= CurrentADC.InstanceId.ToInt() %};
        	var elms = document.getElementsByClassName('pika-title');
    		for (var i = 0; i<elms.length; i++) {
            	var el = document.getElementsByClassName('pika-title')[i]
                el.parentNode.setAttribute('id', 'picker'+adcIndex);
            }
		},
    	onSelect: function(event) {
            if (window.askia 
                && window.arrLiveRoutingShortcut 
                && window.arrLiveRoutingShortcut.length > 0
                && window.arrLiveRoutingShortcut.indexOf('{%:= CurrentQuestion.Shortcut %}') >= 0) {
                askia.triggerAnswer();
            }
        },
        onDraw: function(event) {
   			var adcIndex = {%= CurrentADC.InstanceId.ToInt() %};
        	var elms = document.getElementsByClassName('pika-title');
    		for (var i = 0; i<elms.length; i++) {
            	var el = document.getElementsByClassName('pika-title')[i]
            	el.parentNode.setAttribute('id', 'picker'+adcIndex);
            }
    		//var el = document.getElementsByClassName('pika-title')[0];
		},
        /*onClose: function(event) {
   			var adcIndex = {%= CurrentADC.InstanceId.ToInt() %};
        	var el = document.getElementsByClassName('pika-lendar')[adcIndex-1];
    		el.setAttribute('id', 'picker'+adcIndex);
		}*/
    });