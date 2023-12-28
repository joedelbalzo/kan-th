const conn = require("../conn");
const { UUID, INTEGER, STRING } = conn.Sequelize;
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });
const secretKey = process.env.ENCRYPTION_KEY;

const FinancialInfo = conn.define("financial_info", {
  businessId: {
    type: UUID,
    allowNull: true,
    references: {
      model: "businesses",
      key: "id",
    },
  },
  year: { type: INTEGER, allowNull: false },
  revenue: { type: INTEGER, allowNull: true },
  assets: { type: INTEGER, allowNull: true },
  liabilities: { type: INTEGER, allowNull: true },
  netIncome: {
    type: STRING,
    allowNull: true,
    get() {
      const value = this.getDataValue("netIncome");
      return value ? decrypt(value) : null;
    },
    set(value) {
      this.setDataValue("netIncome", value ? encrypt(value) : null);
    },
  },
  operatingExpenses: { type: INTEGER, allowNull: true },
  cashFlow: { type: INTEGER, allowNull: true },
  debt: {
    type: STRING,
    allowNull: true,
    get() {
      const value = this.getDataValue("debt");
      return value ? decrypt(value) : null;
    },
    set(value) {
      this.setDataValue("debt", value ? encrypt(value) : null);
    },
  },
  equity: {
    type: STRING,
    allowNull: true,
    get() {
      const value = this.getDataValue("equity");
      return value ? decrypt(value) : null;
    },
    set(value) {
      this.setDataValue("equity", value ? encrypt(value) : null);
    },
  },
});

function encrypt(text) {
  if (!text) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
  if (!text) return null;
  const parts = text.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted data format");
  }
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = Buffer.from(parts[1], "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  try {
    decrypted += decipher.final("utf8");
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
  return parseFloat(decrypted);
}

module.exports = { FinancialInfo, encrypt, decrypt };
