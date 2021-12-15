firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("home.html") // if user is not logged in , send to home page to login
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email  // if user is logged in , show add galaxz admin view
    }
})

function getGalaxz(){

    document.getElementById("getgalaxz").options.length=0;  // clear the drop down first

    const gdatabase = firebase.database();
    
    gdatabase.ref('/galaxz').orderByChild("createdById")
    .equalTo(firebase.auth().currentUser.uid)   // get galaxz which are created by logged in user
    .once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let galaxzName = childSnapshot.val().name;
       let galaxzId = childSnapshot.val().galaxzId;
        var galaxzNamelist = new Array(galaxzName);
       var galaxzIdlist = new Array(galaxzId);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("getgalaxz");

           // Loop through the array
         for (var i = 0; i < galaxzNamelist.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(galaxzNamelist[i], galaxzIdlist[i]);  // drop down list display value and real value is same
}
})
    })
}


//get all the galaxzies created by the user
function GetSolasys(){
  
    const galaxzId = document.getElementById('getgalaxz');

    const database = firebase.database();



    database.ref('/solasys').orderByChild("galaxzId")
    .equalTo(galaxzId.value)   
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
                var createdBy = CurrentRecord.val().createdBy;
                var createdDate = CurrentRecord.val().createdDate;
                var description = CurrentRecord.val().description;
                var followers = CurrentRecord.val().followers;
                var galaxzId = CurrentRecord.val().galaxzId;
                var name = CurrentRecord.val().name;
                var numberOfArticles = CurrentRecord.val().numberOfArticles;
                var shares = CurrentRecord.val().shares;
                var solasysId = CurrentRecord.val().solasysId;
                var status = CurrentRecord.val().status;
                var views = CurrentRecord.val().views;
               
                //firebase date to readable date
                 
                 var date = new Date(createdDate).toDateString();

                AddSolasysDataToTable(name,description,createdBy,date,status,views,followers,shares,numberOfArticles,solasysId,galaxzId)
            }
        );
            
        });
}

// add galaxzies to table view
function AddSolasysDataToTable(name,description,createdBy,date,status,views,followers,shares,numberOfArticles,solasysId,galaxzId){

    var tablebody = document.getElementById('solasystable');
    var tablerow = document.createElement('tr');
    var tabledata1 = document.createElement('td');
    var tabledata2 = document.createElement('td');
    var tabledata3 = document.createElement('td');
    var tabledata13 = document.createElement('td');
    var tabledata5 = document.createElement('td');
    var tabledata6 = document.createElement('td');
    var tabledata7 = document.createElement('td');
    var tabledata8 = document.createElement('td');
    var tabledata9 = document.createElement('td');
    var tabledata11 = document.createElement('td');
    var tabledata12 = document.createElement('td');
   
   

    tabledata1.innerHTML = name;
    tabledata2.innerHTML = description;
    tabledata3.innerHTML = createdBy;
    tabledata5.innerHTML = date;
    tabledata6.innerHTML = status;
    tabledata7.innerHTML = views;
    tabledata8.innerHTML = followers;
    tabledata9.innerHTML = shares;
    tabledata11.innerHTML = solasysId;
    tabledata12.innerHTML = numberOfArticles;
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
    tablerow.appendChild(tabledata11); 
    tablerow.appendChild(tabledata13); 
    tablebody.appendChild(tablerow);

}