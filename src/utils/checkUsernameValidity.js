const checkUsernameValidity = (username) => {
  if (username === '') {
    throw new Error('Username cannot be empty.');
  }

  if (username.startsWith(' ')) {
    throw new Error('Username cannot start with a space.');
  }

  if (username.endsWith(' ')) {
    throw new Error('Username cannot end with a space.');
  }

  if (/\s\s/.test(username)) {
    throw new Error('Username cannot have consecutive spaces.');
  }

  if (username.length > 24) {
    throw new Error('Maximum username length is 24 characters.');
  }
};

export default checkUsernameValidity;
