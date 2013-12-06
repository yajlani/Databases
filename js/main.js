contacts = {};
contacts.db = window.openDatabase('contact database', '1.0', 'Contact information', 5*1024*1024);
	var contact_firstname = "";
	var contact_lastname = "";
	var contact_mobilephone = "";
	var contact_homephone = "";
	var contact_workemail = "";
	var contact_homeemail = "";
	var contact_howwemet = "";

function createDB() {
	var db = contacts.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS Contacts(ID INTEGER PRIMARY KEY ASC, firstname TEXT, lastname TEXT, mobilephone TEXT, homephone TEXT, workemail TEXT, homeemail TEXT, howwemet TEXT)",[],
			function(tx, result) {
				alert("Table created!");
			},
			function(tx, error) {
				alert("Table creation error: " + error);
			}
		);
	});
}

function addContact(contact_firstname, contact_lastname, contact_mobilephone, contact_homephone, contact_workemail, contact_homeemail, contact_howwemet) {

	var db = contacts.db;

	db.transaction(
	function(tx) { tx.executeSql("INSERT INTO Contacts(firstname, lastname, mobilephone, homephone, workemail, homeemail, howwemet) VALUES (?, ?, ?, ?, ?, ?, ?) ",
			[contact_firstname, contact_lastname, contact_mobilephone, contact_homephone, contact_workemail, contact_homeemail, contact_howwemet],
			function(tx, result) {
				alert("Contact added: " + contact_firstname + contact_lastname + contact_mobilephone + contact_homephone + contact_workemail + contact_homeemail + contact_howwemet);
			},
	
			function(tx, error) {
				alert("Error adding " + contact_firstname + contact_lastname + contact_mobilephone + contact_homephone + contact_workemail + contact_homeemail + contact_howwemet + ": " + error);
			}
		);
	});
}

function addNewContact(){
	
		var contactfirstname = document.getElementById("inputFirstName").value;
		var contactlastname = document.getElementById("inputLastName").value;
		var contactmobilephone = document.getElementById("inputMobilePhone").value;
		var contacthomephone = document.getElementById("inputHomePhone").value;
		var contactworkemail = document.getElementById("inputWorkEmail").value;
		var contacthomeemail = document.getElementById("inputHomeEmail").value;
		var contacthowwemet = document.getElementById("inputHowWeMet").value;

		addContact(contactfirstname, contactlastname, contactmobilephone, contacthomephone, contactworkemail, contacthomeemail, contacthowwemet);
	
}

function getContacts() {
	
	var db = contacts.db;
	var ul = document.createElement("ul");
	
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Contacts",
		[],
		function(tx, result) {
			var firstname = "";
			var lastname = "";
			var mobilephone = "";
			var homephone = "";
			var workemail = "";
			var homeemail = "";
			var howwemet = "";
			
			for(var i=0; i < result.rows.length; i++) {
                	contacts = result.rows.item(i).firstname + " - " + result.rows.item(i).lastname + " - " + result.rows.item(i).mobilephone + " - " + result.rows.item(i).homephone + " - " + result.rows.item(i).workemail + " - " + result.rows.item(i).homeemail + " - " + result.rows.item(i).howwemet;
					
					
					var li = document.createElement("li");
					var txt = document.createTextNode(contacts);
					li.appendChild(txt);
					ul.appendChild(li);
			}
			
			if(document.getElementById("outputDiv")){
				var output = document.getElementById("outputDiv");
				output.appendChild(ul);
			}
			alert("got contacts");
			
		},
		function (tx, error) {
			alert("error");
		}
		);
	});
}
	
function allContactsClick(){
	//bb.pushScreen('results.htm', 'contacts');
	//getContacts();
	$("#inputDiv").hide();
	$("#outputDiv").show();
}
function addContactsClick(){
	//bb.pushScreen('add.htm', 'add');
	$("#outputDiv").hide();
	$("#inputDiv").show();
}

function openWebLink() {
    // open web link - allows the system to choose an appropriate target that handles http://
    blackberry.invoke.invoke({
		action: "bb.action.OPEN",
        uri: "http://www.octranpso1.com/mobi"
    }, onInvokeSuccess, onInvokeError);
}

function openWebLinkInBrowser() {
    // open web link in browser
    blackberry.invoke.invoke({
		action: "bb.action.OPEN",
        target: "sys.browser",
        uri: "http://www.octranpso1.com/mobi"
    }, onInvokeSuccess, onInvokeError);
}

function addToBbContacts() {
	blackberry.invoke.invoke({
		action: "bb.action.ADDTOCONTACT",
		target: "sys.pim.contacts.app",
		type: "application/vnd.blackberry.string.firstname, application/vnd.blackberry.string.lastname, application/vnd.blackberry.string.mobilephone, application/vnd.blackberry.string.homephone, application/vnd.blackberry.string.email1, application/vnd.blackberry.string.email2"
	}, onInvokeSuccess, onInvokeError);
}

function onInvokeSuccess(response) {
 console.log("<p>Invocation query successful: " + response + "</p>");
}

function onInvokeError(error) {
 console.log("<p>Invocation query error: " + error + "</p>");
}
	