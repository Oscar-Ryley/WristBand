window.addEventListener('load', async function (event) {
  try {
    var numposts = 0;
    var column = 1;
    const response = await fetch('http://127.0.0.1:8080/songs/song');
    const body = (await response.json());
    for (i in body) {
      const current = body[i];
      this.document.getElementById('content'+column).insertAdjacentHTML('afterBegin',
            `<div class="card song-container my-auto" style="width: 18rem;"><div class="card-body"><h4 class="card-title">${current[2]}</h4><h5 class="card-text">by ${current[3]}</h5><p class="card-text"> Musician: ${current[6]} <br> Instrument: ${current[5]}<br> Date: ${current[0]}</p> <a href="${current[4]}" target = "_blank" class="btn btn-outline-primary" id="link-button">Link to Song on Youtube</a></div></div> <br><br>`
      );
      numposts ++;
      column ++;
      if (column == 4) {
        column = 1;
      };
    }
    const user = await this.fetch('http://127.0.0.1:8080/user');
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

async function loadTaggedFacts(tag){
  let response = await fetch('http://127.0.0.1:8080/songs/' + tag);
  if(response.ok){
    let songList = await response.json();
    console.WriteLine(songList)
    document.getElementById("content").innerHTML = html;
  } else{
      alert("Sorry you cannot type you have a 404");
  }
};

let sf = document.getElementById("search-bar-form")

sf.addEventListener("submit", async function(event){
  event.preventDefault();
  try{
    let tag = document.getElementById("tag-search").value;
    loadTaggedFacts(tag);
  } catch(e) {
    alert(e);
  }
});