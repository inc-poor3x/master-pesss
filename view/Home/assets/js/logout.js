function logout() {
    sessionStorage.clear();
    location.reload();
  }
  let i=sessionStorage.length
  if (i<1){
    document.getElementById('logout').style.display='none';
    document.getElementById('My_Account').style.display='none';
    document.getElementById('login').style.display='inline-block';

} else{
    document.getElementById('My_Account').style.display='inline';

    document.getElementById("login").style.display = "none";
    document.getElementById('logout').style.display='inline';

}  