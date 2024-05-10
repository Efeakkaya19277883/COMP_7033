const express = require('express');
const cors = require('cors')



const app = express();
app.use(cors());
app.use(express.json());

app.get("/qwe", (req, res) => {
    return res.status(200).json({})
  });

app.get("/users/:userId", (req, res) => {
    res.status(200).json({})
  });

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
