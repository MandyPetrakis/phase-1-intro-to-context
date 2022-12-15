function createEmployeeRecord(array) {
  let employee = {};

  employee.firstName = `${array[0]}`;
  employee.familyName = `${array[1]}`;
  employee.title = `${array[2]}`;
  employee.payPerHour = parseInt(`${array[3]}`);
  employee.timeInEvents = [];
  employee.timeOutEvents = [];

  return employee;
}

function createEmployeeRecords(arrays) {
  let employees = arrays.map((employee) => createEmployeeRecord(employee));
  return employees;
}

function createTimeInEvent(employee, dateStamp) {
  let stamp = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  };

  employee.timeInEvents.push(stamp);
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let stamp = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  };

  employee.timeOutEvents.push(stamp);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeInObj = employee.timeInEvents.find((stamp) => stamp.date === date);

  let timeOutObj = employee.timeOutEvents.find((stamp) => stamp.date === date);

  return parseInt((timeOutObj.hour - timeInObj.hour) * 0.01);
}

function wagesEarnedOnDate(employee, date) {
  return parseInt(hoursWorkedOnDate(employee, date) * employee.payPerHour);
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map((event) => event.date);

  let wages = datesWorked.map((date) => wagesEarnedOnDate(employee, date));

  let allWages = wages.reduce((acc, val) => acc + val);

  return allWages;
}

function calculatePayroll(employees) {
  let allWages = employees.map((employee) => allWagesFor(employee));
  let payroll = allWages.reduce((acc, val) => acc + val);
  return parseInt(payroll);
}
