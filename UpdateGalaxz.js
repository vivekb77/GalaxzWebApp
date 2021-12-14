firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("home.html") // if user is not logged in , send to home page to login
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email  // if user is logged in , show add galaxz admin view
    }
})


//get all the galaxzies created by the user
function GetGalaxz(){
  

    const database = firebase.database();

    database.ref('/galaxz').orderByChild("createdById")
    .equalTo(firebase.auth().currentUser.uid)   // get galaxz which are created by logged in user
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
                var createdBy = CurrentRecord.val().createdBy;
                var createdById = CurrentRecord.val().createdById;
                var createdDate = CurrentRecord.val().createdDate;
                var description = CurrentRecord.val().description;
                var followers = CurrentRecord.val().followers;
                var galaxzId = CurrentRecord.val().galaxzId;
                var name = CurrentRecord.val().name;
                var numberOfSolasys = CurrentRecord.val().numberOfSolasys;
                var priority = CurrentRecord.val().priority;
                var shares = CurrentRecord.val().shares;
                var status = CurrentRecord.val().status;
                var tags = CurrentRecord.val().tags;
                var views = CurrentRecord.val().views;
               
                //firebase date to readable date
                 
                 var date = new Date(createdDate).toDateString();

                AddGalaxzDataToTable(name,description,createdBy,createdById,date,status,views,followers,shares,priority,tags,numberOfSolasys,galaxzId)
            }
        );
            
        });
}

// add galaxzies to table view
function AddGalaxzDataToTable(name,description,createdBy,createdById,date,status,views,followers,shares,priority,tags,numberOfSolasys,galaxzId){

    var tablebody = document.getElementById('galaxztable');
    var tablerow = document.createElement('tr');
    var tabledata1 = document.createElement('td');
    var tabledata2 = document.createElement('td');
    var tabledata3 = document.createElement('td');
    var tabledata4 = document.createElement('td');
    var tabledata5 = document.createElement('td');
    var tabledata6 = document.createElement('td');
    var tabledata7 = document.createElement('td');
    var tabledata8 = document.createElement('td');
    var tabledata9 = document.createElement('td');
    var tabledata10 = document.createElement('td');
    var tabledata11 = document.createElement('td');
    var tabledata12 = document.createElement('td');
    var tabledata13 = document.createElement('td');

   

    tabledata1.innerHTML = name;
    tabledata2.innerHTML = description;
    tabledata3.innerHTML = createdBy;
    tabledata4.innerHTML = createdById;
    tabledata5.innerHTML = date;
    tabledata6.innerHTML = status;
    tabledata7.innerHTML = views;
    tabledata8.innerHTML = followers;
    tabledata9.innerHTML = shares;
    tabledata10.innerHTML = priority;
    tabledata11.innerHTML = tags;
    tabledata12.innerHTML = numberOfSolasys;
    tabledata13.innerHTML = galaxzId;

    tablerow.appendChild(tabledata1); 
    tablerow.appendChild(tabledata2);
    tablerow.appendChild(tabledata3); 
    tablerow.appendChild(tabledata5); 
    tablerow.appendChild(tabledata6); 
    tablerow.appendChild(tabledata12);
    tablerow.appendChild(tabledata7); 
    tablerow.appendChild(tabledata8);
    tablerow.appendChild(tabledata9); 

    tablerow.appendChild(tabledata10);
    tablerow.appendChild(tabledata11); 
    
    tablerow.appendChild(tabledata13); 
    tablerow.appendChild(tabledata4);

    tablebody.appendChild(tablerow);


}