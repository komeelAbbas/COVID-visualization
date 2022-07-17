const toBorderDark = (id) => document.getElementById(id).classList.remove('border-danger');

let SDInput = document.getElementById('start_of_startDate');
let EDInput = document.getElementById('start_of_endDate');

// const periodLength = () => parseInt(document.getElementById('periodLength').value);

function adjust_min_of_2nd_period(){
    if ((SDInput.value != '')){
        var vals = SDInput.value.split('-');
        var year = vals[0];
        var month = vals[1];
        var day = vals[2];
        var date = new Date(year, month-1, day);
        date.setDate(date.getDate());
        var month = parseInt(date.getMonth())+1
        if (month < 10){
            month = 0+month.toString();
        }
        var exactDate = date.getDate();
        if (exactDate < 10){
            exactDate = 0+exactDate.toString();
        }
        var x = EDInput.min = date.getFullYear() + "-" + month + "-" + exactDate;
    }
}

// ... ?
function monthName(m){
    if (m == '01') return "Jan";
    if (m == '02') return "Feb";
    if (m == '03') return "Mar";
    if (m == '04') return "Apr";
    if (m == '05') return "May";
    if (m == '06') return "Jun";
    if (m == '07') return "Jul";
    if (m == '08') return "Aug";
    if (m == '09') return "Sep";
    if (m == '10') return "Oct";
    if (m == '11') return "Nov";
    if (m == '12') return "Dec";
    if (m == 'Jan') return "01";
    if (m == 'Feb') return "02";
    if (m == 'Mar') return "03";
    if (m=="Apr") return "04";
    if (m=="Jun") return "06";
    if (m=='Jul') return "07";
    if (m == 'Aug') return "08";
    if (m == "Sep") return "09"; 
    if (m == "Oct") return "10";
    if (m == "Nov") return "11";
    if (m == "Dec") return "12";
}

function set_max_date(){
    //var today = new Date();
    // ASantra (2/16/22): Adjusting based on user's local time
    var now = new Date();
    var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    var today = new Date(utc.getTime() - 660 * 60000); // converting to current time in CDT (updates at 5am CDT)    

    var end = new Date();
    
    end.setDate(today.getDate() - (periodLength()));
    var date = end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate();
    var vals = date.split('-');
    var year = vals[0];
    var month = vals[1];
    var day = vals[2];
    if (month < 10){
        month = 0+month.toString();
    }
    if (day < 10){
        day = 0+day.toString();
    }
    var date = year +'-'+ month +'-'+ day;
    var maxEndDate = EDInput.max = date; 
    
    var start = new Date();
    start.setDate(today.getDate() - 2*(periodLength()));
    date = start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate();
    vals = date.split('-');
    year = vals[0];
    month = vals[1];
    day = vals[2];
    if (month < 10){
        month = 0+month.toString();
    }
    if (day < 10){
        day = 0+day.toString();
    }
    date = year +'-'+ month +'-'+ day;
    var maxStartDate = SDInput.max = date;
}

// function enable_2nd_calendar(){
//     if ((SDInput.value != '') && (document.getElementById('periodLength').value != 0)){
//         EDInput.disabled = false;
//     }

//     if ((document.getElementById('periodLength').value == 0) || (SDInput.value == '')){
//         EDInput.disabled = true;
//     }
// }

// function enable_1st_calendar(){
//     if (document.getElementById('periodLength').value == 0){
//         SDInput.disabled = true;
//     }
//     else{
//         SDInput.disabled = false;
//     }
// }

function enableSubmit(){
    if (periodLength() == 0){
        document.getElementById('submit').classList.add('btn-danger');
        document.getElementById('submit').disabled = true;
    }
    else if((SDInput.value == '') || (EDInput.value == '')){
        document.getElementById('submit').classList.add('btn-danger');
        document.getElementById('submit').disabled = true;
    }
    // ASantra (2/16/22): Severity must be selected for submit to be activated
    else if (document.getElementById('interval').value == 0){ 
	document.getElementById('submit').classList.add('btn-danger');
        document.getElementById('submit').disabled = true;
    }
    else{
    	document.getElementById('submit').classList.add('btn-dark');
        document.getElementById('submit').disabled = false;
    }
}


function setEnd(id){
    // ASantra (2/16/22): Added changes from paris version
                if (id == 'start_of_startDate'){
                    var vals = document.getElementById('start_of_startDate').value.split('-');
                }
                else if (id == 'start_of_endDate'){
                    var vals = document.getElementById('start_of_endDate').value.split('-');
                    var endOfStart = document.getElementById('end_of_startDate').innerHTML.split('-');
                    // console.log(document.getElementById('end_of_startDate').innerHTML);
                    var endOfStartDate = new Date(endOfStart[2], monthName(endOfStart[1])-1, endOfStart[0]);
                }
                    var year = vals[0];
                    var month = vals[1];
                    var day = vals[2];
                    var date = new Date(year, month-1, day);
                    var dateTemp = new Date(year, month-1, day);

                    // end date 
                    date.setDate(date.getDate() + parseInt(document.getElementById('periodLength').value)-1);
                    var month = parseInt(date.getMonth())+1
                    if (month < 10){
                        month = 0+month.toString();
                    }
                    var exactDate = date.getDate();
                    if (exactDate < 10){
                        exactDate = 0+exactDate.toString();
                    }

                    // ASantra (11/20): check if generated date is >= (INVALID) or < (VALID) compared to today's date
                    // ASantra (12/7): Adjusting based on user's local time
                    var now = new Date();
                    var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
                    var today = new Date(utc.getTime() - 660 * 60000); // converting to current time in CDT

                    // var today = new Date();
                    var todayTemp = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                   // console.log(date>=todayTemp);
                   // console.log(date<todayTemp);
                    console.log(isNaN(date));
                   // console.log(todayTemp);
                    if (isNaN(date) || date>=todayTemp){
                        // Beyond today's date => RESET
                        if (id == 'start_of_startDate'){
                            var x = document.getElementById('start_of_startDate').value = '';
                            var y = document.getElementById('end_of_startDate').innerHTML = '-';
                            enableSubmit(); // new update
                        }
                        else if (id == 'start_of_endDate'){
                            var x = document.getElementById('start_of_endDate').value = '';
                            var y = document.getElementById('end_of_endDate').innerHTML = '-';
                            enableSubmit(); // new update
                        }
                    }
                    else if (id == 'start_of_endDate' && dateTemp <= endOfStartDate){
                            // ASantra (12/2): If the period change leads to a case where start of end date is beyond or equal to the updated end of start date
                            var x = document.getElementById('start_of_endDate').value = '';
                            var y = document.getElementById('end_of_endDate').innerHTML = '-';
                            enableSubmit(); // new update                        
                    }
                    else {
                        // Valid end date => UPDATE
                        if (id == 'start_of_startDate'){
                            var x = document.getElementById('end_of_startDate').innerHTML =  exactDate + "-" + monthName(month) + "-" +date.getFullYear();
                        }
                        else if (id == 'start_of_endDate'){
                            var x = document.getElementById('end_of_endDate').innerHTML = exactDate + "-" + monthName(month) + "-" +date.getFullYear();
                        }    
                    }


}

function resetDates(id){
    if (id != 'start_of_startDate'){
        
        if (id == 'start_of_endDate'){
            var vals = document.getElementById('end_of_startDate').innerHTML.split('-');
            var vals_end = EDInput.value.split('-');

            var date = new Date(vals[2], parseInt(monthName(vals[1]))-1, vals[0]);
            var date_end = new Date(vals_end[0], parseInt(vals_end[1])-1, vals_end[2]);

            if (date >= date_end){
                var x = SDInput.value = '';
                var y = document.getElementById('end_of_startDate').innerHTML = '-';
		// ASantra (2/16/22)
		enableSubmit();
            }
        }

    }
    if (id != 'start_of_endDate'){
        
        if (id == 'start_of_startDate'){
            var vals = document.getElementById('end_of_startDate').innerHTML.split('-');
            var vals_end = EDInput.value.split('-');

            var date = new Date(vals[2], parseInt(monthName(vals[1]))-1, vals[0]);
            var date_end = new Date(vals_end[0], parseInt(vals_end[1])-1, vals_end[2]);

            if (date >= date_end){
                var x = EDInput.value = '';
                var y = document.getElementById('end_of_endDate').innerHTML = '-';
		// ASantra (2/16/22)
		enableSubmit();
            }
        }
    }

    if (id == 'periodLength'){
            if (document.getElementById('start_of_startDate').value != '')
	    	setEnd('start_of_startDate');
	    
	    if (document.getElementById('start_of_endDate').value != '')
		setEnd('start_of_endDate');
	    // ASantra(2/16/22): Code for updating dates once new period selected in setEnd()
    }   
}

const loadingScreen = (id) => document.getElementById('iframe').src ="static/maps/loading_screen.html";  // "static/maps/default.html"; // "static/maps/loading_screen.html";
