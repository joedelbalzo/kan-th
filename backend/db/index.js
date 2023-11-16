const conn = require("./conn");
const { User, Blogpost, Tag, Image } = require("./Models");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const adminPW = process.env.ADMIN_PW;

const syncAndSeed = async () => {
  // await conn.sync({ force: true });
  try {
    const admin = await Promise.all([
      User.create({
        username: "admin",
        // password: "Admin12345!",
        password: adminPW,
        email: "jdelbalzo99@gmail.com",
        adminStatus: true,
        authorId: 666,
      }),
    ]);

    const [samplePost1, samplePost2, samplePost3] = await Promise.all([
      Blogpost.create({
        title: "Understanding Personal Finance: A Beginner's Guide",
        subtitle: "Navigating the Basics of Money Management",
        content:
          "<strong>The more words, the better we can play with the design of the site.</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: false,
        publishedAt: "2021-01-01",
      }),
      Blogpost.create({
        title: "Post 2. Smart Investment Strategies for Beginners",
        subtitle: "Making Your Money Work for You",
        content:
          "<strong>This is blog post number 2!</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2022-02-02",
      }),
      Blogpost.create({
        title: "Post 3. The Importance of Building an Emergency Fund",
        subtitle: "Secure Your Financial Future with Smart Saving",
        content:
          "This is blog post number 3! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2022-02-04",
      }),
    ]);

    const [trials, errors, money, finances, smbs, dei] = await Promise.all([
      Tag.create({ tagName: "Trials" }),
      Tag.create({ tagName: "Errors" }),
      Tag.create({ tagName: "Money" }),
      Tag.create({ tagName: "Finances" }),
      Tag.create({ tagName: "SMBs" }),
      Tag.create({ tagName: "Diversity and Inclusion" }),
    ]);

    const [financeJpg, financeDefinition, topTenJPG] = await Promise.all([
      Image.create({
        position: "home",
        awsPicID: "top-ten-matter-most-personal-finance-scaled-1-2048x1366.jpg.jpg",
        picNickname: "from-joe-shadi-wedding.jpg",
        // awsPicURL,
        picCaption: "home pic caption",
      }),
      Image.create({
        position: "home",
        awsPicID: "finance-financial-performance-concept-illustration_53876-40450.jpg.jpg",
        picNickname: "giphy.gif",
        // awsPicURL,
        picCaption: "content pic caption",
      }),
      Image.create({
        position: "banner",
        awsPicID: "6ca87ec9c928d49b1eac0ea14b8d79532f54e07711b18fa3983bd8d66beee404",
        picNickname: "IMG_4829 (2).JPG",
        // awsPicURL,
        picCaption: "banner pic caption",
      }),
    ]);

    await samplePost1.addTags([trials, errors, money]);
    await samplePost2.addTags([finances, smbs, dei]);
    await samplePost3.addTags([money, smbs, dei]);

    await samplePost1.addImages([financeJpg]);
    await samplePost2.addImages([financeDefinition]);
    await samplePost3.addImages([topTenJPG]);

    return {
      users: {
        admin,
      },
      blogposts: {
        samplePost1,
        samplePost2,
        samplePost3,
      },
      tags: {
        trials,
        errors,
        money,
        finances,
        smbs,
        dei,
      },
      images: {
        financeJpg,
        financeDefinition,
        topTenJPG,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeed,
  User,
  Blogpost,
  Tag,
  Image,
  conn,
};
