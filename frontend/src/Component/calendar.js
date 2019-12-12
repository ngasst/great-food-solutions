// import React, { useState } from "react";
// import {format, startOfWeek, startOfMonth, endOfMonth, endOfWeek } from "date-fns";
// import {addDays, addMonths, isSameDay, isSameMonth, parse, subMonths} from "date-fns";
// import "./calendar.css";

// const Calendar = () => {
//     const [currentDate, setCurrentDate] = useState(new Date())
//     const [selectedDate, setSelectedDate] = useState(new Date())

//     const header = () => {
//         const dateFormat = "MMMM YYYY";
//         return (
//             <div className="header row flex-middle">
//                 <div className="column col-start">
//                     <div className="icon" onClick={prevMonth}>
//                         chevron_left
//                  </div>
//                 </div>
//                 <div className="column col-center">
//                     <span>{format(currentDate, dateFormat)}</span>
//                 </div>
//                 <div className="column col-end">
//                     <div className="icon" onClick={nextMonth}>
//                         chevron_right
//                  </div>
//                 </div>
//             </div>
//         );
//     };

//     const daysOfWeek = () => {
//         const dateFormat = "ddd";
//         const days = [];
//         let startDate = startOfWeek(currentDate);
//         for (let i = 0; i < 7; i++) {
//             days.push(
//                 <div className="column col-center" key={i}>
//                     {format(addDays(startDate, i), dateFormat)}
//                 </div>
//             );
//         }
//         return <div className="days row">{days}</div>;
//     };

//     const cells = () => {
//         const monthStart = startOfMonth(currentDate);
//         const monthEnd = endOfMonth(monthStart);
//         const startDate = startOfWeek(monthStart);
//         const endDate = endOfWeek(monthEnd);
//         const dateFormat = "D";
//         const rows = [];

//         let days = [];
//         let day = startDate;
//         let formattedDate = "";

//         while (day <= endDate) {
//            for (let i = 0; i < 7; i++) {
//            formattedDate = format(day, dateFormat);
//            const cloneDay = day;
//            days.push(
//               <div 
//                className={`column cell ${!isSameMonth(day, monthStart)
//                ? "disabled" : isSameDay(day, selectedDate) 
//                ? "selected" : "" }`} 
//                key={day} 
//                onClick={() => onDateClick(parse(cloneDay))}
//                > 
//                <span className="number">{formattedDate}</span>
//                <span className="bg">{formattedDate}</span>
//              </div>
//              );
//            day = addDays(day, 1);
//           }
//            rows.push(
//               <div className="row" key={day}> {days} </div>
//             );
//            days = [];
//          }
//         return <div className="body">{rows}</div>;
//         }

//     const nextMonth = () => {
//         setCurrentDate(addMonths(currentDate, 1));
//     }

//     const prevMonth = () => {
//         setCurrentDate(subMonths(currentDate, 1));
//     }
    
//     const onDateClick = day => {
//         setSelectedDate(day);
//         }

//     return (
//         <div className="calendar">
//             <div>{header()}</div>
//             <div>{daysOfWeek()}</div>
//             <div>{cells()}</div>
//         </div>
//     );
// }

// export default Calendar;
