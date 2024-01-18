window.addEventListener('load', async function (event) {
  try {
    var numposts = 0;
    var column = 1;
    const response = await fetch('http://127.0.0.1:8080/songs/0');
    const body = (await response.json());
    for (i in body) {
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
    const user = await this.fetch('http://127.0.0.1:8080/user/0');
    const userdata = (await user.json());
    this.document.getElementById('username').innerHTML = userdata["username"];
    this.document.getElementById('profile-username').innerHTML = userdata["username"];
    this.document.getElementById('profile-bio').innerHTML = userdata["biography"];
    this.document.getElementById('posts-number').innerHTML = numposts;
  } catch (e) {
    this.alert(e);
  }
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
    for (i in body) {
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

  } catch (e) {
    this.alert(e);
  }
}


form = document.getElementById("username");

form.addEventListener("click", async (event) => {
  console.log("clicked!")
  const response = await fetch("http://127.0.0.1:8080/changeuser/", {
    method: "PUT",
    headers: {
      "Content-Type": "integer"
    },
    body: 1
  });
});