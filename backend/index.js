const { conn } = require("./db");
const app = require("./app");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const init = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      // console.log("in dev");
      const { syncAndSeed } = require("./db");
      await conn.sync({ force: true });
      await syncAndSeed();
    } else {
      // console.log("in prod");
      await conn.authenticate();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
