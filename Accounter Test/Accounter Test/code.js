//VARIABLES

var app = {
  password: "",
  passwordFiller: "",
};
var password = "";
var passwordcheck = "";
var expense;
var newBalance;
var balance;
var dateCheck;
var month;
var day;
var hours;
var year;
var minutes;
var date_monthDay;
var date_hourMinute;
var string;
var string1;
var string2;
var string3;
var string4;
var a = [];
var group = ["transactionLabel"];
var stepValue = 5;
var size;
var e;
var d;
var purpose;

//STYLING

setStyle("passwordButton","border-radius:50px;");
hideElement("PasswordWT");

//SCREEN 1(PASSWORD)

onEvent("passwordInput", "click", function() {
  hideElement("PasswordWT");

});
onEvent("passwordInput", "input", function() {
  
  var content = getText("passwordInput");
  
  // Checking if backspace
  if (content.length < app.password.length){
    app.password = app.password.slice(0, -1);
    app.passwordFiller = app.passwordFiller.slice(0, -1);
  } else {
  
    if (app.password.length == 0){
      app.password = content;
        app.passwordFiller+="*";
    } else {
      app.password += content.substring(app.password.length);
       app.passwordFiller+="*";
    }
  }
  
  
  setText("passwordInput", app.passwordFiller);
  //console.log(app.password);
});
  


onEvent("passwordButton", "click", function() {
  password = getText("passwordInput");
  check();
  setTimeout(function() {
    if (app.password == passwordcheck) {
     setScreen("screen3");
       
    }
    else(showElement("PasswordWT"));
  }, 1250);
});

function check(){
  readRecords("Passsword", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      //console.log(records[i].id + ': ' + records[i].password);
      passwordcheck = records[i].password;
    }
  });
}

// SCREEN 2(EXPENDITURE)
function check1(){
readRecords("Balance", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    balance = records[i].balance;
  }
});

}

onEvent("expenseButton", "click", function( ) {
  expense = getNumber("expenseInput");
  purpose = getText("expensePurposeInput");
  check1();
  setTimeout(function() {
    newBalance = balance - expense;
    updateRecord("Balance", {id:1, balance:newBalance}, function() {
      console.log(newBalance);
      setText("balanceLabel", "Now the available balance in your account is ₹ "+newBalance);
      showElement("balanceLabel");
      newDateCheck();
      createRecord("dateTime", {datetime:string3}, function() {
  });
  e = size+80;
      setSize("transactionLabel",280,e);
     });
     updateRecord("TransLabel", {id:1, size:size+80}, function() {
       
     });
  }, 1000);
  
});

//SCREEN 3(DEPOSIT)

onEvent("depositButton", "click", function( ) {
  expense = getNumber("depositInput");
  purpose = getText("depositPurposeInput");
  check1();
  setTimeout(function() {
    newBalance = balance + expense;
    updateRecord("Balance", {id:1, balance:newBalance}, function() {
      console.log(newBalance);
      setText("balance1Label", "Now the available balance in your account is ₹ "+newBalance);
      showElement("balance1Label");
      newDateCheck();
      createRecord("dateTime", {datetime:string2}, function() {
  });
   d = size+80;
      setSize("transactionLabel",280,d);
     });
    setTimeout(function() {
       updateRecord("TransLabel", {id:1, size: size+80}, function() {
       
     });
     }, 1000);
      
    
  }, 1000);
  
});

//SCREEN 4(CHOICE)

onEvent("expenseButton1", "click", function( ) {
  setScreen("screen2");
  showElement("expenseBackButton");
  hideElement("balanceLabel");
  setText("expenseInput","");
});

onEvent("depositButton1", "click", function( ) {
  setScreen("screen4");
  showElement("depositBackButton");
  hideElement("balance1Label");
  setText("depositInput","");
});

//BACK BUTTON
onEvent("expenseBackButton", "click", function( ) {
  setScreen("screen3");

});

onEvent("depositBackButton", "click", function( ) {
  setScreen("screen3");

});

onEvent("button5", "click", function( ) {
  setScreen("screen3");

});

onEvent("backButton", "click", function( ) {
  setScreen("screen3");

});


// DATE AND TIME AND TRANSACTIONS IN DATABASE
function newDateCheck(){
  dateCheck = new Date();
  month = dateCheck.getMonth() + 1;
  day = dateCheck.getDate();
  hours = dateCheck.getHours();
  year = dateCheck.getFullYear();
  minutes = dateCheck.getMinutes();
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  date_monthDay = month + "-" + day;
  date_hourMinute = hours + ":" + minutes;
  string = dateCheck.toString();
  string1 = string.slice(4,25)+" "+purpose+"\n"+"Deposit : "+"₹"+expense+"\n";
  string2 = string1.toString();
  string3 = string.slice(4,25)+" "+purpose+"\n"+"Expense : "+"₹"+expense+"\n";
  string4 = string3.toString();
}

// SCREEN 5 (TRANSACTIONS PRINT)

readRecords("TransLabel", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    size = records[i].size;
  }
});
setTimeout(function() {
  setSize("transactionLabel",280,size);
}, 1000);
onEvent("transactionButton", "click", function( ) {
  records();
  setTimeout(function() {
  setText("transactionLabel", a);
  },1000);
    setScreen("screen5");
    a = [];
});
function records(){
readRecords("dateTime", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      a.push(records[i].datetime);
      console.log(a);
    }
    
  });
}

// SCROLLING

function scrollGroup(group, dir){
  for (var i = 0; i < group.length; i++) {
    setPosition(group[i],getXPosition(group[i]),getYPosition(group[i]) + dir);
  }
}

onEvent("btnUp", "click", function( ) {
  var dir = -2*stepValue;
  scrollGroup(group,dir);
});
onEvent("btnDown", "click", function( ) {
  var dir = 2*stepValue;
  scrollGroup(group,dir);
});

//SCREEN 6 (BALANCE)

onEvent("button4", "click", function( ) {
  setScreen("screen6");
  readRecords("Balance", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    balance = records[i].balance;
  }
});

  setTimeout(function() {
    setText("label2", "The available balance in your account is ₹ "+balance);
  }, 1000);
});
setTimeout(function() {
  console.log(getProperty("transactionLabel", "height"));

}, 2000);

// CLEAR TRANSACTIONS

onEvent("clearTransactions", "click", function( ) {
  readRecords("dateTime", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      console.log(records[i].id + ': ' + records[i].datetime);
      deleteRecord("dateTime", {id:records[i].id}, function() {
        
      });
    }
  });
});

// EXPENDITURE PER HEAD`

onEvent("monthlyExpenses", "click", function( ) {
  records();
});









