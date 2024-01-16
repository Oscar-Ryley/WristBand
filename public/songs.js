window.addEventListener('load', async function (event) {
  try {
    const response = await fetch('http://127.0.0.1:8080/songs/song');
    const body = (await response.json());
    for (let i = 0; i < body.length; i++) {
      const current = body[i];
      this.document.getElementById('content').insertAdjacentHTML('afterend',
            `<div class="card song-container my-auto" style="width: 18rem;"><div class="card-body"><h4 class="card-title">${current[2]}</h4><h5 class="card-text">by ${current[3]}</h5><p class="card-text">Instrument: ${current[5]}<br> Lecture: ${current[1]}<br> Date: ${current[0]}<br> Musician: ${current[6]}</p> <a href="${current[4]}" target = "_blank" class="btn btn-primary" id="link-button">Link to Song on Youtube</a></div></div><br>`
      );
    }
  } catch (e) {
    this.alert(e);
  }
}
);
