const { conn } = require("./db");
const app = require("./app");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const init = async () => {
  try {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      const { syncAndSeed } = require("./db");
      await conn.sync({ force: true });
      await syncAndSeed();
    } else {
      await conn.authenticate();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
