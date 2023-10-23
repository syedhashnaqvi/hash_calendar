class HashCalendar {
    constructor (baseId,options = null){
        this.baseId = baseId;
        this.options = options;
        this.events = (options !== null && options.hasOwnProperty('events'))?options.events:[];
        this.months = (options !== null && options.hasOwnProperty('shortMonthName') && options.shortMonthName === true)?["jan", "feb", "mar", "apr", "may", "Jun", "Jul","aug", "sep", "oct", "nov", "dec"] : ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
        this.dayNames =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.daysTag = this.currentDate = this.prevNextIcon = this.eventsBtns = this.selectedDate = '';
        this.viewSelect = '';
        this.date = new Date();
        this.currYear = this.date.getFullYear(),
        this.currMonth = this.date.getMonth();
        this.currentDate='';
        this.currentView = (options !== null && options.hasOwnProperty('defaultView') && options.defaultView !== '')?options.defaultView:'Month';
        this.weekWorkTime = (options !== null && options.hasOwnProperty('weekWorkTime')) ? options.weekWorkTime:null;
        this.weekCusrsor = this.getStartOfWeek();

        // Week
        this.currentWeekStart = new Date(this.date);
        this.currentWeekStart.setDate(this.date.getDate() - this.date.getDay());
        this.init();
    }

    // initiating plugin
    init = () => {
        
        let baseElem = document.getElementById(this.baseId);
        if (baseElem === null) {console.log("Error: "+this.baseId+" NOT FOUND !!!!!");return;}
        baseElem.innerHTML = (this.currentView == 'Month') ? this.getMonthHtml() : ((this.currentView == "Week")?this.getWeekHtml():this.getDayHtml());
        this.daysTag = document.querySelector(".days"),
        this.currentDate = document.querySelector(".current-date"),
        this.prevNextIcon = document.querySelectorAll(".icons span");
        this.eventsBtns = document.querySelectorAll(".cell-event");
        this.viewSelect = document.getElementById("view_select");
        this.selectedDate = document.getElementById("selected_date");
        let lastDateofCurrentMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate()

        // Adding event listeners to pre next btn
        this.prevNextIcon.forEach(icon => { // getting prev and next icons
            icon.addEventListener("click", () => { // adding click event on both icons
                // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
                if(this.currentView == "Month"){
                    this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;
                    if(this.currMonth < 0 || this.currMonth > 11) { // if current month is less than 0 or greater than 11
                        // creating a new date of current year & month and pass it as date value
                        this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
                        this.currYear = this.date.getFullYear(); // updating current year with new date year
                        this.currMonth = this.date.getMonth(); // updating current month with new date month
                    } else {
                        this.date = new Date(); // pass the current date as date value
                    }
                }else if(this.currentView == "Week"){
                    let el = document.querySelector('.week-cell.calendar-cell.active');
                    if(el !== null) el.classList.remove("active")
                    this.weekCusrsor = (icon.id === "prev") ? (this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7)) : (this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7));
                }else{
                    (icon.id === "prev") ? (this.date.setDate(this.date.getDate() - 1)) : (this.date.setDate(this.date.getDate() + 1));
                }
                this.renderCalendar(); // calling renderCalendar function
            });
        });

        // Adding event listeners to event btns
        this.eventsBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log(e.currentTarget)
            });
        });
        // change view listener
        this.viewSelect.addEventListener("change", (e) => {
            this.currentView = e.currentTarget.value;
            this.init();
        });

        this.renderCalendar();
        
    }


    // print calendar
    renderCalendar = () => {
        if(this.currentView == "Month"){this.renderMonthCalendar()}else if(this.currentView == "Week"){this.renderWeekCalendar()}else{this.renderDayCalendar()}
    }


    getCurrentDateEvent = (day,month,year) => {
        month = (parseInt(month)+1);
        let eventDate = year+"-"+(month<10?'0'+month:month)+"-"+((day<10)?'0'+day:day);
        return (this.events.hasOwnProperty(eventDate))?this.events[eventDate]:false;
    }

    getDayHtml = () => {
        return `
            <div class="wrapper">
                <div class="tool-bar">
                    <header>
                    <div class="icons">
                        <div id="selected_date">${((new Date().getDate()<10)?"0"+new Date().getDate():new Date().getDate())+"-"+((new Date().getMonth()<10)?"0"+new Date().getMonth():new Date().getMonth())+"-"+new Date().getFullYear()}</div>
                        <span id="prev" class="material-symbols-rounded"><i class="fa-solid fa-caret-left"></i></span>
                        <div class="current-date"></div>
                        <span id="next" class="material-symbols-rounded"><i class="fa-solid fa-caret-right"></i></span>
                    </div>
                </header>
                <div class="calendar-tools">
                    <div class="view">
                        <select id="view_select">
                            <option value="Day" selected="true">Day</option>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                        </select>
                    </div>
                </div>
                </div>
                <div class="calendar">
                <div class="days"></div>
                </div>
            </div>
        `;
    }

    getWeekHtml = () => {
        return `
            <div class="wrapper">
                <div class="tool-bar">
                    <header>
                    <div class="icons">
                        <div id="selected_date">${((new Date().getDate()<10)?"0"+new Date().getDate():new Date().getDate())+"-"+((new Date().getMonth()<10)?"0"+new Date().getMonth():new Date().getMonth())+"-"+new Date().getFullYear()}</div>
                        <span id="prev" class="material-symbols-rounded"><i class="fa-solid fa-caret-left"></i></span>
                        <div class="current-date"></div>
                        <span id="next" class="material-symbols-rounded"><i class="fa-solid fa-caret-right"></i></span>
                    </div>
                </header>
                <div class="calendar-tools">
                    <div class="view">
                        <select id="view_select">
                            <option value="Day">Day</option>
                            <option value="Week" selected="true">Week</option>
                            <option value="Month">Month</option>
                        </select>
                    </div>
                </div>
                </div>
                <div class="calendar">
                <div class="weeks">
                    <div class="week-cell calendar-cell"></div>
                    <div class="week-cell calendar-cell"><div id="Sunday" class="cell-date"></div>Sunday</div>
                    <div class="week-cell calendar-cell"><div id="Monday" class="cell-date"></div>Monday</div>
                    <div class="week-cell calendar-cell"><div id="Tuesday" class="cell-date"></div>Tuesday</div>
                    <div class="week-cell calendar-cell"><div id="Wednesday" class="cell-date"></div>Wednesday</div>
                    <div class="week-cell calendar-cell"><div id="Thursday" class="cell-date"></div>Thursday</div>
                    <div class="week-cell calendar-cell"><div id="Friday" class="cell-date"></div>Friday</div>
                    <div class="week-cell calendar-cell"><div id="Saturday" class="cell-date"></div>Saturday</div>
                </div>
                <div class="days"></div>
                </div>
            </div>
        `;
    }

    getMonthHtml = () => {
        return `
        <div class="wrapper">
            <div class="tool-bar">
                <header>
                <div class="icons">
                    <div id="selected_date">${((new Date().getDate()<10)?"0"+new Date().getDate():new Date().getDate())+"-"+((new Date().getMonth()<10)?"0"+new Date().getMonth():new Date().getMonth())+"-"+new Date().getFullYear()}</div>
                    <span id="prev" class="material-symbols-rounded"><i class="fa-solid fa-caret-left"></i></span>
                    <div class="current-date"></div>
                    <span id="next" class="material-symbols-rounded"><i class="fa-solid fa-caret-right"></i></span>
                </div>
            </header>
            <div class="calendar-tools">
                <div class="view">
                    <select id="view_select">
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                        <option value="Month" selected="true">Month</option>
                    </select>
                </div>
            </div>
            </div>
            <div class="calendar">
            <div class="weeks">
                <div class="calendar-cell">Sunday</div>
                <div class="calendar-cell">Monday</div>
                <div class="calendar-cell">Tuesday</div>
                <div class="calendar-cell">Wednesday</div>
                <div class="calendar-cell">Thursday</div>
                <div class="calendar-cell">Friday</div>
                <div class="calendar-cell">Saturday</div>
            </div>
            <div class="days"></div>
            </div>
        </div>
    `;
    }

    renderMonthCalendar = () => {
        let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag += `<div class="calendar-cell inactive">
                <div class="cell-date">${lastDateofLastMonth - i + 1}</div>
            </div>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let currentDateEvents = this.getCurrentDateEvent(i,this.currMonth,this.currYear);
            let isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth() 
                        && this.currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<div class="calendar-cell  ${isToday} ${currentDateEvents.hasOwnProperty('holyDay')?'holyday-cell':''}">
                <div class="cell-date ${currentDateEvents.hasOwnProperty('holyDay')?'holyday-date':''}">${i}</div>`
                if(currentDateEvents !== false){
                    liTag += `<div class="event-container">`;
                    if(currentDateEvents.hasOwnProperty('multiEvents')){
                        for (var prop in currentDateEvents) {
                            if (prop !== 'multiEvents'){
                                liTag+=`<div class="cell-event" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                    ${currentDateEvents[prop]?currentDateEvents[prop].title:''}
                                </div>`;
                            }
                        }
                    }else if(currentDateEvents.hasOwnProperty('wholeDay') && currentDateEvents.wholeDay == false){
                        if(currentDateEvents.hasOwnProperty('wholeDay')){
                            for (var prop in currentDateEvents) {
                                if(prop != 'wholeDay'){
                                    if(prop.split("-").length>1){
                                        for (let index = 0; index < prop.split("-").length; index++) {
                                            liTag+=`<div class="cell-event multihour" data-border_color="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?currentDateEvents[prop].background:''}" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                            ${(currentDateEvents[prop] && index<1)?currentDateEvents[prop].title:''}
                                            </div>`;
                                        }
                                    }else{
                                        liTag+=`<div class="cell-event" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                        ${currentDateEvents[prop]?currentDateEvents[prop].title:''}
                                        </div>`;
                                    }
                                    // liTag+=`<div class="cell-event" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                    //     ${currentDateEvents[prop]?currentDateEvents[prop].title:''}
                                    // </div>`;
                                }
                            }
                        }
                    }else if(currentDateEvents.hasOwnProperty('holyDay')){
                        liTag+=`<div class="cell-event" style="background:#eee;color:#bdbdbd">
                                    ${currentDateEvents && currentDateEvents.title !== undefined ?currentDateEvents.title:'Holyday'}
                                </div>`;
                    }else{
                        liTag+=`<div class="cell-event" style="${(currentDateEvents&&currentDateEvents.hasOwnProperty('background'))?'background:'+currentDateEvents.background:''};${(currentDateEvents&&currentDateEvents.hasOwnProperty('color'))?'color:'+currentDateEvents.color:''}">
                        ${currentDateEvents?currentDateEvents.title:''}
                        </div>`;
                    }
                    liTag+=`</div>`;
                }
            liTag+=`</div>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            liTag += `<div class="calendar-cell inactive">
            <div class="cell-date">${i - lastDayofMonth + 1}</div>
            </div>`;
        }
        this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`; // passing current mon and yr as currentDate text
        this.daysTag.innerHTML = liTag;
        this.addMoreEventsBox();
    }

    renderWeekCalendar = () => {
        let startTime = (this.weekWorkTime !== null && this.weekWorkTime.hasOwnProperty('start'))?this.weekWorkTime.start:0;
        let endTime = (this.weekWorkTime !== null && this.weekWorkTime.hasOwnProperty('end'))?this.weekWorkTime.end:23;
        let liTag = "";
        for (let t = startTime; t <= endTime; t++) {
            for (let i = 0; i < 7; i++) {
                const day = new Date(this.currentWeekStart);
                day.setDate(this.currentWeekStart.getDate() + i);
                let weekDay = day.toLocaleDateString('EN', { weekday: 'long' });
                let dateLabel = ((day.getDate())<10)?'0'+(day.getDate()):(day.getDate());
                document.getElementById(weekDay).innerHTML = `<div class="cell-date" data-month="${day.getMonth()}" data-year="${day.getFullYear()}">${dateLabel}</div>`
                let isToday = (day.getDate()==new Date().getDate() && day.getMonth()==new Date().getMonth() && day.getFullYear()==new Date().getFullYear()) ? "active" : "";
                if(isToday=="active"){
                    let activeDayId = day.toLocaleDateString('EN', { weekday: 'long' });
                    document.getElementById(activeDayId).parentNode.classList += " "+isToday;
                }
            }
            for (let d = 0; d <= 7; d++) {
                let loopDate = document.getElementById(this.dayNames[(d==0?d:d-1)]).childNodes[0];
                let ldate = loopDate.innerHTML;
                let lMonth = loopDate.getAttribute('data-month');
                let lyear = loopDate.getAttribute('data-year');
                let currentDateEvents = this.getCurrentDateEvent(ldate,lMonth,lyear);
                let text = '';
                if(d==0){
                    text = t<12 ? (t<10?'0'+t:t)+" AM":(t==12?t+" PM":(t>12?((t-12)<10?'0'+(t-12):(t-12))+" PM":""));
                    text = `<div class="">${text}</div>`;
                }
                else{
                    if(currentDateEvents.hasOwnProperty('wholeDay')){
                        text = `<div class="event-container">`
                        if(currentDateEvents.hasOwnProperty('wholeDay')){
                            for (var prop in currentDateEvents) {
                                if(prop != 'wholeDay'){
                                    if(prop == t){
                                        text+=`<div class="cell-event" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                        ${currentDateEvents[prop]?currentDateEvents[prop].title:''}
                                    </div>`;
                                    }
                                }
                            }
                        }
                        text += `</div>`;
                    }else if(currentDateEvents.hasOwnProperty('holyDay')){

                    }else{
                        text = `<div class="event-container">
                            <div class="cell-event" style="background:#fff;color:#000">
                            </div>
                        </div>`;
                    }
                }
                liTag += `<div class="week-cell calendar-cell">${text}</div>`;
            }

        }
        this.currentDate.innerText = (this.months[this.currentWeekStart.getMonth()]+" "+this.currentWeekStart.getFullYear()); 
        this.daysTag.innerHTML = liTag;
    }

    renderDayCalendar = () => {
        let startTime = (this.weekWorkTime !== null && this.weekWorkTime.hasOwnProperty('start'))?this.weekWorkTime.start:0;
        let endTime = (this.weekWorkTime !== null && this.weekWorkTime.hasOwnProperty('end'))?this.weekWorkTime.end:23;
        let liTag = "";
        let currentDateEvents = this.getCurrentDateEvent(this.date.getDate(),(this.date.getMonth()),this.date.getFullYear());
        for (let t = startTime; t <= endTime; t++) {
            for (let d = 0; d <= 1; d++) {
                let text = '';
                if(d==0){
                    text = t<12 ? (t<10?'0'+t:t)+" AM":(t==12?t+" PM":(t>12?((t-12)<10?'0'+(t-12):(t-12))+" PM":""));
                    text = `<div class="">${text}</div>`;
                }
                else{
                    if(currentDateEvents.hasOwnProperty('wholeDay')){
                        text = `<div class="event-container">`
                        if(currentDateEvents.hasOwnProperty('wholeDay')){
                            for (var prop in currentDateEvents) {
                                if(prop != 'wholeDay'){
                                    if(prop.split("-").length>1){
                                        
                                        for (let index = 0; index < prop.split("-").length; index++) {
                                            if(prop.split("-")[index] == t){
                                                text+=`<div class="cell-event multihour" data-border_color="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?currentDateEvents[prop].background:''}" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                                ${(currentDateEvents[prop] && index<1)?currentDateEvents[prop].title:''}
                                                </div>`;
                                            }
                                        }
                                    }else{
                                        if(prop == t){
                                            text+=`<div class="cell-event" style="${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('background'))?'background:'+currentDateEvents[prop].background:''};${(currentDateEvents[prop]&&currentDateEvents[prop].hasOwnProperty('color'))?'color:'+currentDateEvents[prop].color:''}">
                                            ${currentDateEvents[prop]?currentDateEvents[prop].title:''}
                                            </div>`;
                                        }
                                    }
                                }
                            }
                        }
                        text += `</div>`;
                    }else{
                        text = `<div class="event-container">
                            <div class="cell-event" style="background:#fff;color:#000">
                            </div>
                        </div>`;
                    }
                    // text = `<div class="event-container">
                    //     <div class="cell-event" style="background:#fff;color:#000">
                    //     </div>
                    // </div>`;
                }
                liTag += `<div class="day-cell calendar-cell">${text}</div>`;
            }

        }
        this.currentDate.innerText = (this.months[this.currentWeekStart.getMonth()]+" "+this.currentWeekStart.getFullYear()); 
        this.daysTag.innerHTML = liTag;
        this.selectedDate.innerHTML = (this.date.getDate()<10?("0"+this.date.getDate()):this.date.getDate())+"-"+((this.date.getMonth()+1)<10?("0"+(this.date.getMonth()+1)):(this.date.getMonth()+1))+"-"+this.date.getFullYear();
        this.changeMultihourBorder('multihour',2);
    }

    getStartOfWeek = () => 
    {
        const now = new Date();
        const currentDay = now.getDay();
        const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday
        const startOfWeek = new Date(now.setDate(diff));
        return startOfWeek;
    }

    changeMultihourBorder = (className,level=1) => {
        let elements = document.getElementsByClassName(className);
        Array.from(elements).forEach(function(element) {
            let parent = element;
            let borderColor = element.getAttribute("data-border_color")
            for (let i = 0; i < level; i++) {
                parent = parent.parentNode;
            }
            // parent.classList+=" multi-hour-event-cell"
            parent.style.borderBottomColor = borderColor;
            parent.style.borderTopColor = borderColor;
        });
    }

    addMoreEventsBox = () => {
        let eventsToShow = 2;
        document.querySelectorAll('.event-container').forEach(function(container) {
            let totalEvents = container.childNodes.length;
            if(totalEvents>eventsToShow){
                for (let i = 0; i < totalEvents; i++) {
                    let element = container.childNodes[i];
                    if((i+1)>eventsToShow && element !== undefined){element.remove();}
                }
                container.innerHTML+=`
                    <div class="cell-event more">
                        ${totalEvents-eventsToShow} More Event${(totalEvents-eventsToShow)>1?'s':''}
                    </div>
                `
            }
        });
    }
}