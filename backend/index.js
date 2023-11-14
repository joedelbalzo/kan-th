const { syncAndSeed, User, conn } = require("./db");

const app = require("./app");
const cors = require("cors");
app.use(cors());

const init = async () => {
  try {
    await conn.sync({ force: true });
    await syncAndSeed();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
