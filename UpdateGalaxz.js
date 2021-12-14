firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("home.html") // if user is not logged in , send to home page to login
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email  // if user is logged in , show add galaxz admin view
    }
})
