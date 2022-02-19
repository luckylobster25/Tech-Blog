const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value;
  const email = document.querySelector('#email-signup').value;
  const password = document.querySelector('#password-signup').value;

  console.log(email,password);
  if (!username || !email || !password) {
    alert ('Please fill out all fields.')
  } else {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Account created successfully!')
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  };
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);