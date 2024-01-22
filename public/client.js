let GlobalId = 0

window.addEventListener('load', async function (event) {
  reload(GlobalId)
}
);

async function reload(userid){
  try {
    var numposts = 0;
    var column = 1;
    const response = await fetch('http://127.0.0.1:8080/songs/'+userid);
    const body = (await response.json());
    this.document.getElementById('content1').innerHTML = "";
    this.document.getElementById('content2').innerHTML = "";
    this.document.getElementById('content3').innerHTML = "";
    for (var i in body) {
      const current = body[i];
      this.document.getElementById('content'+column).insertAdjacentHTML('afterBegin',
            `<div class="card song-container my-auto" style="width: 18rem;"><div class="card-body"><h4 class="card-title">${current[1]}</h4><h5 class="card-text">by ${current[2]}</h5><p class="card-text"> Musician: ${current[5]} <br> Instrument: ${current[4]}<br> Date: ${current[0]}</p> <a href="${current[3]}" target = "_blank" class="btn btn-outline-primary" id="link-button">Link to Song on Youtube</a></div></div> <br><br>`
      );
      numposts ++;
      column ++;
      if (column == 4) {
        column = 1;
      };
    }
    const user = await this.fetch('http://127.0.0.1:8080/user/'+userid);
    const userdata = (await user.json());
    this.document.getElementById('username').innerHTML = userdata["username"];
    this.document.getElementById('profile-username').innerHTML = userdata["username"];
    this.document.getElementById('profile-bio').innerHTML = userdata["biography"];
    this.document.getElementById('posts-number').innerHTML = numposts;

    this.document.getElementById('profile-picture-container').innerHTML = "<img id='profile-pic' src='http://127.0.0.1:8080/user/" + userid + "/profile-pic' width='50px' height='50px' alt='profile picture'>";
    this.document.getElementById('profile-picture-container-large').innerHTML = "<img id='profile-pic-large' src='http://127.0.0.1:8080/user/" + userid + "/profile-pic' width='180px' height='180px' alt='profile picture'>";

    this.document.getElementById("accounts-list").innerHTML = "<div class='dropdown-divider'></div><li><a class='dropdown-item' href='#' onclick='newuser()'>+ New User</a></li>"
    const userids = await fetch('http://127.0.0.1:8080/user/ids');
    const useridsbody = (await userids.json());
    for (var fuserid of useridsbody){
      const userdatafromid = await fetch('http://127.0.0.1:8080/user/'+fuserid);
      const userfromuserid = (await userdatafromid.json());
      this.document.getElementById("accounts-list").insertAdjacentHTML('afterBegin',
          '<li><a class="dropdown-item" href="#" onclick="reload(' +parseInt(fuserid)+ ')">' +userfromuserid.username+'</a></li>');  
    };
    
    GlobalId = userid;
  } catch (e) {
    this.alert(e);
  };
}

async function newuser(){
  const create_new = await fetch("http://127.0.0.1:8080/user/new", {
    method: "POST"
  });
}


const editForm = document.getElementById("user-edit-form");

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    const dataJson  = JSON.stringify(Object.fromEntries(formData.entries()));
    const edit_current = await fetch("http://127.0.0.1:8080/user/"+GlobalId+"/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: dataJson
  });
});