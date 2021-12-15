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

function getSolasys(){

    document.getElementById("getsolasys").options.length=0;  // clear the drop down first
    const galaxzId = document.getElementById('getgalaxz');

    const gdatabase = firebase.database();
    
    gdatabase.ref('/solasys').orderByChild("galaxzId")
    .equalTo(galaxzId.value)   
    .once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let solasysName = childSnapshot.val().name;
       let solasysId = childSnapshot.val().solasysId;
        var solasysNamelist = new Array(solasysName);
       var solasysIdlist = new Array(solasysId);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("getsolasys");

           // Loop through the array
         for (var i = 0; i < solasysNamelist.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(solasysNamelist[i], solasysIdlist[i]);  // drop down list display value and real value is same
}
})
    })
}


//get all the galaxzies created by the user
function GetXanets(){
  
    const solasysId = document.getElementById('getsolasys');

    const database = firebase.database();



    database.ref('/articles').orderByChild("solasysId")
    .equalTo(solasysId.value)   
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
                var articleId = CurrentRecord.val().articleId;
                var curatedBy = CurrentRecord.val().curatedBy;
                var curatedDate = CurrentRecord.val().curatedDate;
                var description = CurrentRecord.val().description;
                var reads = CurrentRecord.val().reads;
                var name = CurrentRecord.val().name;
                var shares = CurrentRecord.val().shares;
                var solasysId = CurrentRecord.val().solasysId;
                var status = CurrentRecord.val().status;
                var views = CurrentRecord.val().views;
                var likes = CurrentRecord.val().likes;
                var url = CurrentRecord.val().url;
               
                //firebase date to readable date
                 
                 var date = new Date(curatedDate).toDateString();

                AddXanetDataToTable(articleId,name,description,url,curatedBy,date,status,views,reads,likes,shares,articleId,solasysId)
            }
        );
            
        });
}

// add galaxzies to table view
function AddXanetDataToTable(articleId,name,description,url,curatedBy,date,status,views,
    reads,likes,shares,articleId,solasysId)
{
    var tablebody = document.getElementById('xanetstable');
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
   
   

    tabledata1.innerHTML = name;
    tabledata2.innerHTML = description;
    tabledata3.innerHTML = url;
    tabledata4.innerHTML = curatedBy;
    tabledata5.innerHTML = date;
    tabledata6.innerHTML = status;
    tabledata7.innerHTML = views;
    tabledata8.innerHTML = likes;
    tabledata9.innerHTML = reads;
    tabledata10.innerHTML = shares;
    tabledata11.innerHTML = articleId;
    tabledata12.innerHTML = solasysId;
  

    tablerow.appendChild(tabledata1); 
    tablerow.appendChild(tabledata2);
    tablerow.appendChild(tabledata3); 
    tablerow.appendChild(tabledata4); 
    tablerow.appendChild(tabledata5); 
    tablerow.appendChild(tabledata6);
    tablerow.appendChild(tabledata7); 
    tablerow.appendChild(tabledata8);
    tablerow.appendChild(tabledata9); 
    tablerow.appendChild(tabledata10);
    tablerow.appendChild(tabledata11); 
    tablerow.appendChild(tabledata12); 
    tablebody.appendChild(tablerow);

}