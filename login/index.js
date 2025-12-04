const isNumber = numri => {
  const numrat = '123456789';
  return numrat.includes(numri);
};

const handleSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  const errorMessage = document.querySelector('.errorMessage');

  if (username == '') {
    errorMessage.textContent = 'Username should not be empty!';
    return;
  }

  if (password == '') {
    errorMessage.textContent = 'Password should not be empty!';
    return;
  }

  let response = await fetch('/data/users.json');
  let users = await response.json();
  let noUserFound = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      let loggedInUser = {
        username: users[i].username,
        profileImage: '/assets/images/profile.png',
      };

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      noUserFound = false;
      break;
    } else {
      noUserFound = true;
    }
  }
  if (noUserFound) {
    errorMessage.textContent = 'No users with those credentials found';
  } else {
    Swal.fire({
      title: 'Success!',
      text: 'You are logged In!',
      icon: 'success',
    });
    errorMessage.classList.add('hide');
    setTimeout(() => (window.location.href = '/login/succeed'), 2000);
  }
};

const toggleShowPassword = e => {
  const password = document.querySelector('.password');

  const ikona = e.currentTarget;
  if (ikona.getAttribute('iconName') == 'passwordEye') {
    ikona.setAttribute('iconName', 'passwordShow');
    password.setAttribute('type', 'text');
  } else {
    ikona.setAttribute('iconName', 'passwordEye');
    password.setAttribute('type', 'password');
  }
};
