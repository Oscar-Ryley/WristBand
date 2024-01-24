let GlobalId = 0;

window.addEventListener('load', async function (event) {
  reload(GlobalId, '');
}
);

async function reload (userId, tag = '') {
  try {
    let numPosts = 0;
    let column = 1;
    const response = await fetch('http://127.0.0.1:8080/posts/' + userId + '/' + tag);
    const body = (await response.json());
    this.document.getElementById('content1').innerHTML = '';
    this.document.getElementById('content2').innerHTML = '';
    this.document.getElementById('content3').innerHTML = '';
    for (const index in body) {
      const current = body[index];
      this.document.getElementById('content' + column).insertAdjacentHTML('afterBegin',
            `<div class="card song-container my-auto" style="width: 18rem;"><div class="card-body"><h4 class="card-title">${current.name}</h4><h5 class="card-text">by ${current.author}</h5><p class="card-text"> Musician: ${current.musician} <br> Instrument: ${current.instrument}<br> Date: ${current.date}</p> <a href="${current.link}" target = "_blank" class="btn btn-outline-primary" id="link-button">Link to Song on Youtube</a></div></div> <br><br>`
      );
      numPosts++;
      column++;
      if (column === 4) {
        column = 1;
      };
    }
    const user = await this.fetch('http://127.0.0.1:8080/user/' + userId);
    const userData = (await user.json());
    this.document.getElementById('username').innerHTML = userData.username;
    this.document.getElementById('profile-username').innerHTML = userData.username;
    this.document.getElementById('profile-bio').innerHTML = userData.biography;
    this.document.getElementById('posts-number').innerHTML = numPosts;

    this.document.getElementById('profile-picture-container').innerHTML = "<img id='profile-pic' src='http://127.0.0.1:8080/user/" + userId + "/profile-pic' width='50px' height='50px' alt='profile picture'>";
    this.document.getElementById('profile-picture-container-large').innerHTML = "<img id='profile-pic-large' src='http://127.0.0.1:8080/user/" + userId + "/profile-pic' width='180px' height='180px' alt='profile picture'>";

    this.document.getElementById('accounts-list').innerHTML = "<div class='dropdown-divider'></div><li><a class='dropdown-item' href='#' onclick='newUser()'>+ New User</a></li>";
    const userIds = await fetch('http://127.0.0.1:8080/user/ids');
    const userIdsBody = (await userIds.json());
    for (const fUserId of userIdsBody) {
      const userDataFromId = await fetch('http://127.0.0.1:8080/user/' + fUserId);
      const userFromUserId = (await userDataFromId.json());
      this.document.getElementById('accounts-list').insertAdjacentHTML('afterBegin',
          '<li><a class="dropdown-item" href="#" onclick="reload(' + parseInt(fUserId) + ')">' + userFromUserId.username + '</a></li>');
    };

    GlobalId = userId;
  } catch (e) {
    this.alert(e);
  };
}

async function newUser () {
  await fetch('http://127.0.0.1:8080/user/new', {
    method: 'POST'
  });
};

const tagsForm = document.getElementById('search-bar-form');

tagsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(tagsForm);
  const dataJson = Object.fromEntries(formData.entries());
  reload(GlobalId, dataJson['tag-query']);
});

const editForm = document.getElementById('user-edit-form');

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
    await fetch('http://127.0.0.1:8080/user/' + GlobalId + '/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dataJson
  });
});

const picForm = document.getElementById('profile-upload-form');

picForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(picForm);
  const dataJson = Object.fromEntries(formData.entries());
  await fetch('http://127.0.0.1:8080/user/' + GlobalId + '/profile-pic/upload', {
    method: 'POST',
    headers: {
      'encType': 'multipart/form-data'
    },
    body: formData
  });
});

const logForm = document.getElementById('song-input-form');

logForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(logForm);
    const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
    await fetch('/posts/' + GlobalId + '/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dataJson
  });
});
