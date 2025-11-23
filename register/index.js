const isNumber = numri => {
  const numrat = '123456789';
  return numrat.includes(numri);
};

const hasSymbol = input => {
  let returnedValue = false;
  const symbols = '!@#$%^&*()_+=';
  const arrInput = input.split('');
  arrInput.forEach(char => {
    if (symbols.includes(char)) returnedValue = true;
  });
  return returnedValue;
};

const handleSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('.username').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const repeatPassword = document.querySelector('.repeatPassword').value;

  if (username == '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Username should not be empty!',
      icon: 'error',
    });
    return;
  }

  if (username.length < 7) {
    Swal.fire({
      title: 'Oops!',
      text: 'Username should at least 7 characters!',
      icon: 'error',
    });
    return;
  }
  if (username.includes(' ')) {
    Swal.fire({
      title: 'Oops!',
      text: 'Username should not contain empty spaces',
      icon: 'error',
    });
    return;
  }

  if (email == '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Email should not be empty!',
      icon: 'error',
    });
    return;
  }

  if (!email.includes('@')) {
    Swal.fire({
      title: 'Oops!',
      text: 'Email should contain a "@" !',
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

  if (password.length < 7) {
    Swal.fire({
      title: 'Oops!',
      text: 'Password should at least 7 characters!',
      icon: 'error',
    });
    return;
  }

  if (!hasSymbol(password)) {
    console.log(hasSymbol(password), password);

    Swal.fire({
      title: 'Oops!',
      text: 'Password should have at least 1 symbol (!@#$%^&*()_+=)',
      icon: 'error',
    });
    return;
  }

  if (repeatPassword == '') {
    Swal.fire({
      title: 'Oops!',
      text: 'Repeat Password is empty',
      icon: 'error',
    });
    return;
  }

  if (password !== repeatPassword) {
    Swal.fire({
      title: 'Oops!',
      text: 'Repeat Password should be same as Password!',
      icon: 'error',
    });
    return;
  }
  const loggedInUser = {
    username: username,
    email: email,
  };
  window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

  Swal.fire({
    title: 'Success!',
    text: 'You registered successfully ' + username,
    icon: 'success',
  });

  setTimeout(() => (window.location.href = '/register/choose-profile'), 2000);
};
