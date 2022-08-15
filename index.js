// Your code here
let createEmployeeRecord = function (element){
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents:[],
        timeOutEvents:[]
       }
}

function createEmployeeRecords(twoElements){
    return twoElements.map(function(element){
        return createEmployeeRecord(element);
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(employee, dateSought){
    let payWage= hoursWorkedOnDate(employee,dateSought)*employee.payPerHour
    return parseFloat(payWage.toString());
}

let allWagesFor = function(employee){
    let workingDates = employee.timeOutEvents.map((element)=> element.date)
    let wagesSum = workingDates.reduce(function (acc,date){
        return acc + wagesEarnedOnDate(employee,date);
    },0)
    return wagesSum;
    }

    function calculatePayroll(arrOfEmployeeRecords){
        return arrOfEmployeeRecords.reduce(function(acc,emp){
            return acc + allWagesFor(emp)
        },0)
    }

    function findEmployeeByFirstName(srcArray,firstName){
        return srcArray.find(function(employRecords){
            return employRecords.firstName === firstName;
        })

    }