exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    // Basit kullanıcı doğrulama
    if (username === 'admin' && password === '123') {
      res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
      res.status(401).json({ message: 'Login failed, username or password incorrect' });
    }
  };
  