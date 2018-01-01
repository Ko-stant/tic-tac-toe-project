### TODO

Need to create HTML and UI elements to display users

Need to configure Game Stats dropdown to display data

const userName = function () {
  var str = "runmorelol@yahoo.com"; // this will be store.user.email
  var n = str.indexOf("@");
	var length = n;
	var trimmedString = str.substring(0, length);

    document.getElementById("player-x").innerHTML = trimmedString;
}
