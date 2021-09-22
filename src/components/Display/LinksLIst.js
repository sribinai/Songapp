var form = document.getElementById('link-input');

form.addEventListener('submit',addDetails);

function addDetails(e){
    e.preventDefault();

    var display = document.getElementById('link').value;
    var table = document.getElementById("ls-song-table");
    var row = table.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = display;
}