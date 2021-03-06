
function logOut()
{
    window.localStorage.removeItem("user");
    window.location.reload();
}

function goToUserPage() {
    fetch(url + "/user", {headers: authHeader()}).then(response=>
        {
          console.log(response);
          if (response.status === 200) 
            {
            window.location.href = response.url;
            }
        });
}

function goToAdminPage() {
  fetch(url + "/admin", {headers: authHeader()}).then(response=>
      {
        console.log(response);
        if (response.status === 200) 
            {
            window.location.href = response.url;
            }
      });
}

window.onload = function() 
{
    var navLinks = document.getElementById('mySidenav');
    var actionButtons = document.getElementById('actionButtons');
    var mainPageContent = document.getElementById('mainPageContent');
    if(window.localStorage.getItem('user') == undefined)
    {
        actionButtons.innerHTML =`  
      <a href="/signIn" class=" text-decoration-none">
        <input type="button" value="Вход" class="btn btn-secondary border"/>
      </a>
      <a href="/signUp" class=" text-decoration-none">
        <input type="button" value="Регистрация" class="btn btn-secondary border"/>
      </a>`;
      mainPageContent +=
      `
      <div class="col-6 p-5">
            <h5>Войдите в аккаунт или зарегистрируйтесь для пользования функционалом приложения</h5>
          </div>
          <div class="col-6 p-5">
          <a href="/signIn" class=" text-decoration-none">
            <input type="button" value="Вход" class="btn w-100 rounded-0  btn-outline-dark border-dark m-2 "/>
          </a>
          <a href="/signUp" class=" text-decoration-none">
            <input type="button" value="Регистрация" class="btn w-100 rounded-0 btn-outline-dark border-dark m-2 "/>
          </a>
          </div>
      `
      navLinks.innerHTML += `
      <h6><a href="/" class=" text-decoration-none">Главная страница</a></h6>`
    }
    else
    {
        var user= JSON.parse(window.localStorage.getItem("user")); 
        if(user.roles[0] == "ROLE_USER")
        { 
          actionButtons.innerHTML = 
          `<p class="m-0">Привет,${user.username}</p>
          <div class="dropdown">
          <a class="btn btn-floating m-1 ripple-surface"
          id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          role="button">
              <i class="far fa-user"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu">
              <a onclick="goToUserPage()" role="button" class=" dropdown-item text-decoration-none">Страница пользователя</a>
              <a onclick="logOut()" role="button" class=" dropdown-item text-decoration-none">Выход</a>
          </div>
          </div>`
          mainPageContent +=
      `
      <div class="col-6 p-5">
            <h5>Перейдите на страницу пользователя для пользования функционалом приложения</h5>
          </div>
          <div class="col-6 p-5">
          <a href="/signIn" class=" text-decoration-none">
            <input type="button" value="Вход" class="btn w-100 rounded-0  btn-outline-dark border-dark m-2 "/>
          </a>
          <a href="/signUp" class=" text-decoration-none">
            <input type="button" value="Регистрация" class="btn w-100 rounded-0 btn-outline-dark border-dark m-2 "/>
          </a>
          <a onclick="goToUserPage()" class=" text-decoration-none">
            <input type="button" value="Страница пользователя" class="btn w-100 rounded-0 btn-outline-dark border-dark m-2 "/>
          </a>
          </div>
      `
          
          ;
        }
        else if(user.roles[0] == "ROLE_ADMIN")
        {
          actionButtons.innerHTML = `
          <p class="m-0">Привет,${user.username} </p>
          <div class="dropdown">
          <a class="btn btn-floating m-1 ripple-surface"
          id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          role="button">
              <i class="far fa-user"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu">
              <a onclick="goToAdminPage()" role="button" class=" dropdown-item text-decoration-none">Страница администратора</a>
              <a onclick="logOut()" role="button" class=" dropdown-item text-decoration-none">Выход</a>
          </div>
          </div>`;

          mainPageContent +=
      `
      <div class="col-6 p-5">
            <h5>Перейдите на страницу пользователя или администратора для пользования функционалом приложения</h5>
          </div>
          <div class="col-6 p-5">
          <a onclick="goToUserPage()" class=" text-decoration-none">
            <input type="button" value="Страница пользователя" class="btn w-100 rounded-0 btn-outline-dark border-dark m-2 "/>
          </a>
          <a onclick="goToAdminPage()" class=" text-decoration-none">
            <input type="button" value="Страница Администратора" class="btn w-100 rounded-0 btn-outline-dark border-dark m-2 "/>
          </a>
          </div>
      `
        }
    }
};


