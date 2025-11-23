const isNumber = numri => {
  const numrat = '123456789';
  return numrat.includes(numri);
};

const handleSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;

  if (username == '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Username should not be empty!',
      icon: 'error',
    });
    return;
  }

  if (password == '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Password should not be empty!',
      icon: 'error',
    });
    return;
  }

  let response = await fetch('/data/users.json');
  let users = await response.json();
  let noUserFound = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      let loggedInUser = {
        username: users[i].username,
      };

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      noUserFound = false;
      break;
    } else {
      noUserFound = true;
    }
  }
  if (noUserFound) {
    Swal.fire({
      title: 'Oops!',
      text: 'No users with those credentials found',
      icon: 'error',
    });
  } else {
    Swal.fire({
      title: 'Success!',
      text: 'You are logged In!',
      icon: 'success',
    });
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
