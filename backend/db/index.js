const conn = require("./conn");
const { User, Blogpost, Tag, Image } = require("./Models");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const adminPW = process.env.ADMIN_PW;

const syncAndSeed = async () => {
  await conn.sync({ force: true });
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

    const [samplePost1, samplePost2, samplePost3, samplePost4, samplePost5, samplePost6] =
      await Promise.all([
        Blogpost.create({
          title: "Understanding Personal Finance: A Beginner's Guide",
          subtitle: "Navigating the Basics of Money Management",
          content:
            "<strong>The more words, the better we can play with the design of the site.</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
          published: false,
          publishedAt: "Mon Jul 10 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
        }),
        Blogpost.create({
          title: "Post 2. Smart Investment Strategies for Beginners",
          subtitle: "Making Your Money Work for You",
          content:
            "<strong>This is blog post number 2!</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
          published: true,
          publishedAt: "Mon Aug 12 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
        }),
        Blogpost.create({
          title: "Post 3. The Importance of Building an Emergency Fund",
          subtitle: "Secure Your Financial Future with Smart Saving",
          content: "This is blog post number 4!",
          published: true,
          publishedAt: "Mon Nov 14 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
        }),
        Blogpost.create({
          title: "Post 4. The Importance of Building an Emergency Fund",
          subtitle: "Secure Your Financial Future with Smart Saving",
          content: "This is blog post number 4!",
          published: true,
          publishedAt: "Mon Nov 16 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
        }),
        Blogpost.create({
          title: "Post 5. The Importance of Building an Emergency Fund",
          subtitle: "Secure Your Financial Future with Smart Saving",
          content: "This is blog post number 5!",
          published: true,
          publishedAt: "Mon Nov 18 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
        }),
        Blogpost.create({
          title: "Post 6. The Importance of Building an Emergency Fund",
          subtitle: "Secure Your Financial Future with Smart Saving",
          content: "This is blog post number 6!",
          published: true,
          publishedAt: "Mon Nov 20 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
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

    const [financeJpgHome, financeDefinitionHome] = await Promise.all([
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
        picCaption: "home pic caption",
      }),
    ]);

    const promises = [
      samplePost1.addTags([trials, finances, money]),
      samplePost2.addTags([finances, smbs, dei]),
      samplePost3.addTags([money, smbs, dei]),
      samplePost4.addTags([trials, errors, money]),
      samplePost5.addTags([finances, smbs, dei]),
      samplePost6.addTags([money, smbs, dei]),

      samplePost1.addImages(financeJpgHome),
      samplePost2.addImages(financeDefinitionHome),
      samplePost3.addImages(financeJpgHome),
      samplePost4.addImages(financeDefinitionHome),
      samplePost5.addImages(financeJpgHome),
      samplePost6.addImages(financeDefinitionHome),
    ].map((p) => p.catch((e) => ({ error: e.message })));

    await Promise.all(promises);

    // results.forEach((result, index) => {
    //   if (result.error) {
    //     console.log(`Promise ${index + 1} failed with error: ${result.error}`);
    //   } else {
    //     console.log(`Promise ${index + 1} succeeded`);
    //   }
    // });

    // await Promise.all([
    //   samplePost1.addTags([trials, finances, money]),
    //   samplePost2.addTags([finances, smbs, dei]),
    //   samplePost3.addTags([money, smbs, dei]),
    //   samplePost4.addTags([trials, errors, money]),
    //   samplePost5.addTags([finances, smbs, dei]),
    //   samplePost6.addTags([money, smbs, dei]),

    //   samplePost1.addImages([financeJpgHome]),
    //   samplePost2.addImages([financeDefinitionHome]),
    //   samplePost3.addImages([financeJpgHome]),
    //   samplePost4.addImages([financeDefinitionHome]),
    //   samplePost5.addImages([financeJpgHome]),
    //   samplePost6.addImages([financeDefinitionHome]),

    //   samplePost2.addImages([financeJpgBanner]),
    //   samplePost1.addImages([financeDefinitionBanner]),
    //   samplePost4.addImages([financeJpgBanner]),
    //   samplePost3.addImages([financeDefinitionBanner]),
    //   samplePost6.addImages([financeJpgBanner]),
    //   samplePost5.addImages([financeDefinitionBanner]),
    // ]);

    return {
      users: {
        admin,
      },
      blogposts: {
        samplePost1,
        samplePost2,
        samplePost3,
        samplePost4,
        samplePost5,
        samplePost6,
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
        financeJpgHome,
        financeDefinitionHome,
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
