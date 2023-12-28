const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });

const JWT_SECRET = process.env.JWT || "itsa389F5C6458C7uhadsfoandix64FF43152asd81DB1E3Fdevsecretbaby12302398#$";

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    // unique: true,
  },
  adminStatus: {
    type: BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  password: {
    type: STRING,
    // validate: {
    //   is: {
    //     args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //     msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //   },
    // },
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  googleId: {
    type: STRING,
    unique: true,
  },
  mailingList: {
    type: BOOLEAN,
    defaultValue: true,
  },
  isNewUser: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.generateToken = function () {
  const payload = { id: this.id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  return { token };
};

User.register = async function (credentials) {
  const user = await this.create(credentials);
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async function (credentials) {
  const { username, password } = credentials;
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

module.exports = User;
