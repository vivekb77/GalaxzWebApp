firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("home.html") // if user is not logged in , send to home page to login
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email  // if user is logged in , show add galaxz admin view
    }
})


function addGalaxz() {


    const gname = document.getElementById('gname');
    const gdescription = document.getElementById('description');
    const createdby = document.getElementById('createdby');
    const status = document.getElementById('status');
    const tags = document.getElementById('tags');

 const database = firebase.database();
 const usersRef = database.ref('/galaxz');
 const autoId = usersRef.push().key

 usersRef.child(autoId).set({
     name: gname.value,
     description: gdescription.value,
     createdBy: createdby.value,
     createdById:firebase.auth().currentUser.uid,
     galaxzId: autoId,
     priority:1001, //(parseInt(spriority.value)), value more than 1000 means inactive . set this value when activating galaxz
     status:status.value,
     tags:tags.value,
     numberOfSolasys:  0,
     views: 0,
     followers:0,
     shares: 0,
     createdDate: firebase.database.ServerValue.TIMESTAMP

 })
 
 document.getElementById('success').innerHTML = 'Galaxz added! Make it actice after adding Solasys and Xanets';

 }

function logout(){
    firebase.auth().signOut()
    location.replace("home.html") //  send to home page to login after logout
}

// get the list if curator names for galaxz form
function getCurators(){

    document.getElementById("createdby").options.length=0;  //clear the drop down first

    const cdatabase = firebase.database();
    
    cdatabase.ref('/curators').once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let Curatornames = childSnapshot.val().curatorname;
       // let curatorid = childSnapshot.val().id;
        var curatorList = new Array(Curatornames);
       // var curatorListid = new Array(curatorid);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("createdby");

           // Loop through the array
         for (var i = 0; i < curatorList.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(curatorList[i], curatorList[i]);  // drop down list display value and real value is same
}
})
    })
}
        
// get the list of galaxz names for solasys form
function getGalaxz(){

    document.getElementById("getgalaxz").options.length=0;  //clear the drop down first

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
   
//get curators for solasys form
function getCurators1(){

    document.getElementById("screatedby").options.length=0;  //clear the drop down first

    const sdatabase = firebase.database();
    
    sdatabase.ref('/curators').once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let Curatornames = childSnapshot.val().curatorname;
       // let curatorid = childSnapshot.val().id;
        var curatorList = new Array(Curatornames);
       // var curatorListid = new Array(curatorid);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("screatedby");

           // Loop through the array
         for (var i = 0; i < curatorList.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(curatorList[i], curatorList[i]);  // drop down list display value and real value is same
}
})
    })
}

 function addSolasys() {


    const sname = document.getElementById('sname');
    const sdescription = document.getElementById('sdescription');
    const screatedby = document.getElementById('screatedby');
    const spriority = document.getElementById('spriority');
    const sstatus = document.getElementById('sstatus');
    const stags = document.getElementById('stags');
    const galaxzId = document.getElementById('getgalaxz');
   //const galaxzName = document.getElementById('getgalaxz');

 const database1 = firebase.database();
 const usersRef1 = database1.ref('/solasys');
 const autoId = usersRef1.push().key

 usersRef1.child(autoId).set({
     name: sname.value,
     description: sdescription.value,
     createdBy: screatedby.value,
     createdById:firebase.auth().currentUser.uid,
     galaxzId: galaxzId.value,
     solasysId: autoId,
     priority: (parseInt(spriority.value)),  // priority should be number
     status:sstatus.value,
     tags:stags.value,
     numberOfArticles:  0,
     views: 0,
     followers:0,
     shares: 0,
     createdDate: firebase.database.ServerValue.TIMESTAMP,
     galaxzId_status:galaxzId.value+"_"+sstatus.value
     
 })

 //add +1 to number of solasys in galaxz table only if status is selected as active 

 if (sstatus.value == "Active"){
 const database = firebase.database();
 
 database.ref('/galaxz/' +galaxzId.value).update({ 
    numberOfSolasys:firebase.database.ServerValue.increment(1)
  });
}

 document.getElementById('ssuccess').innerHTML = 'Solasys added! under Galaxz   '   +galaxzId.value;


 }

 // get the list if galaxz names for xanet form
function getGalaxz2(){

    document.getElementById("getgalaxz2").options.length=0;  // clear the drop down first

    const gdatabase = firebase.database();
    
    gdatabase.ref('/galaxz').once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let galaxzName = childSnapshot.val().name;
       let galaxzId = childSnapshot.val().galaxzId;
        var galaxzNamelist = new Array(galaxzName);
       var galaxzIdlist = new Array(galaxzId);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("getgalaxz2");

           // Loop through the array
         for (var i = 0; i < galaxzNamelist.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(galaxzNamelist[i], galaxzIdlist[i]);  // drop down list display value and real value is same
}
})
    })
}

// get the list of solasys names for xanet form
function getSolasys(){

    document.getElementById("getsolasys").options.length=0;  //clear the drop down first

    const galaxzId = document.getElementById('getgalaxz2');  // get the value of galaxz id

    const gdatabase = firebase.database();
    
    gdatabase.ref('solasys').orderByChild("galaxzId")
    .equalTo(galaxzId.value)
    .once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let SolasysName = childSnapshot.val().name;
       let SolasysId = childSnapshot.val().solasysId;
        var SolasysNamelist = new Array(SolasysName);
       var SolasysIdlist = new Array(SolasysId);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("getsolasys");

           // Loop through the array
         for (var i = 0; i < SolasysNamelist.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(SolasysNamelist[i], SolasysIdlist[i]);  // drop down list display value and real value is same
}
})
    })
}

//get curators for xanet form
function getCurators2(){

    document.getElementById("xcreatedby").options.length=0;  //clear the drop down first

    const sdatabase = firebase.database();
    
    sdatabase.ref('/curators').once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
        
        let Curatornames = childSnapshot.val().curatorname;
       // let curatorid = childSnapshot.val().id;
        var curatorList = new Array(Curatornames);
       // var curatorListid = new Array(curatorid);
        
        // Get dropdown element from DOM
         var dropdown = document.getElementById("xcreatedby");

           // Loop through the array
         for (var i = 0; i < curatorList.length; ++i) {
           // Append the element to the end of Array list
         dropdown[dropdown.length] = new Option(curatorList[i], curatorList[i]);  // drop down list display value and real value is same
}
})
    })
}

//add Xanet
function addXanet() {


    const xname = document.getElementById('xname');
    const xdescription = document.getElementById('xdescription');
    const xurl = document.getElementById('xurl');
    const xcreatedby = document.getElementById('xcreatedby');
    const xpriority = document.getElementById('xpriority');
    const xstatus = document.getElementById('xstatus');
    const xtags = document.getElementById('xtags');
    const xgalaxzId = document.getElementById('getgalaxz2');
    const xsolasysId = document.getElementById('getsolasys');

 const database1 = firebase.database();
 const usersRef1 = database1.ref('/articles');
 const autoId = usersRef1.push().key

 usersRef1.child(autoId).set({
     articleId:autoId,
     name: xname.value,
     description: xdescription.value,
     url: xurl.value,
     curatedBy: xcreatedby.value,
     createdById:firebase.auth().currentUser.uid,
     galaxzId: xgalaxzId.value,
     solasysId: xsolasysId.value,
     priority: (parseInt(xpriority.value)),  // priority should be number
     status:xstatus.value,
     tags:xtags.value,
     views: 0,
     likes:0,
     reads:0,
     shares: 0,
     curatedDate: firebase.database.ServerValue.TIMESTAMP,
     solasysIdStatus:xsolasysId.value+"_"+xstatus.value
     
 })

 //add +1 to number of solasys in galaxz table only if status is selected as active 

 if (xstatus.value == "Active"){
 const database = firebase.database();
 
 database.ref('/solasys/' +xsolasysId.value).update({ 
    numberOfArticles:firebase.database.ServerValue.increment(1)
  });
 }

 document.getElementById('xsuccess').innerHTML = 'Xanet added! under Solasys   '   +xsolasysId.value;

}
