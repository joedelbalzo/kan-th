const conn = require("./conn");
const { User, Blogpost, Tag, Image, Business } = require("./Models");
const path = require("path");
const { faker } = require("@faker-js/faker");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const SeededPosts = require("./SeedData/Blogs");
const SeededImages = require("./SeedData/Images");

const adminPW = process.env.ADMIN_PW;

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  try {
    const admin = await User.create({
      username: "admin",
      password: adminPW,
      email: "jdelbalzo99@gmail.com",
      adminStatus: true,
    });
    const notAdmin = await User.create({
      username: "jimbo",
      password: "123",
      email: "jdelbalzo99@gmail.com",
      adminStatus: false,
      businessId: null,
    });

    // const [samplePost1, samplePost2, samplePost3, samplePost4, samplePost5, samplePost6] = await Promise.all([
    //   Blogpost.create({
    //     title: "Understanding Personal Finance: A Beginner's Guide",
    //     subtitle: "Navigating the Basics of Money Management",
    //     content: faker.lorem.paragraph(3),
    //     published: false,
    //     publishedAt: "Mon Jul 10 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    //   Blogpost.create({
    //     title: "Post 2. Smart Investment Strategies for Beginners",
    //     subtitle: "Making Your Money Work for You",
    //     content:
    //       "<strong>This is blog post number 2!</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
    //     published: true,
    //     publishedAt: "Mon Aug 12 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    //   Blogpost.create({
    //     title: "Post 3. The Importance of Building an Emergency Fund",
    //     subtitle: "Secure Your Financial Future with Smart Saving",
    //     content: `This is blog post number 3! ${faker.lorem.paragraphs(3, "<br/></br>\n")}`,
    //     published: true,
    //     publishedAt: "Mon Nov 14 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    //   Blogpost.create({
    //     title: "Post 4. The Importance of Building an Emergency Fund",
    //     subtitle: "Secure Your Financial Future with Smart Saving",
    //     content: `This is blog post number 4! ${faker.lorem.paragraphs(3, "<br/></br></br>\n")}`,
    //     published: true,
    //     publishedAt: "Mon Nov 16 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    //   Blogpost.create({
    //     title: "Post 5. The Importance of Building an Emergency Fund",
    //     subtitle: "Secure Your Financial Future with Smart Saving",
    //     content: `This is blog post number 5! ${faker.lorem.paragraphs(3, "<br/></br>\n")}`,
    //     published: true,
    //     publishedAt: "Mon Nov 18 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    //   Blogpost.create({
    //     title: "Post 6. The Importance of Building an Emergency Fund",
    //     subtitle: "Secure Your Financial Future with Smart Saving",
    //     content: `This is blog post number 6! ${faker.lorem.paragraphs(3, "<br/></br>\n")}`,
    //     published: true,
    //     publishedAt: "Mon Nov 20 2023 11:06:12 GMT-0500 (Eastern Standard Time)",
    //   }),
    // ]);

    const posts = await Promise.all(SeededPosts.map((post) => Blogpost.create(post)));
    const images = await Promise.all(SeededImages.map((image) => Image.create(image)));

    await Promise.all(posts.map((post, index) => post.addImage(images[index])));

    const [growthStrategies, valuations, equityAndDebt, businessPlanning, financingInsights, benchmarks, marketAnalysis, competitiveEdge] =
      await Promise.all([
        Tag.create({ name: "Growth Strategies" }),
        Tag.create({ name: "Valuations and Benchmarks" }),
        Tag.create({ name: "Equity and Debt" }),
        Tag.create({ name: "Financing Insights" }),
        Tag.create({ name: "Market Analysis" }),
        Tag.create({ name: "Competitive Edge" }),
      ]);

    const jimbosPizzeria = await Business.create({
      name: "Jimbo's Pizzeria",
    });

    // const promises = [
    //   post1.addTags([valuations, growthStrategies, businessPlanning]),
    //   post2.addTags([valuations, benchmarks, marketAnalysis]),
    // ].map((p) => p.catch((e) => ({ error: e.message })));

    // await Promise.all(promises);

    notAdmin.businessId = jimbosPizzeria.id;
    await notAdmin.save();

    return {
      users: {
        admin,
        notAdmin,
      },
      businesses: {
        jimbosPizzeria,
      },
      blogposts: {
        posts,
      },
      tags: {
        growthStrategies,
        valuations,
        equityAndDebt,
        businessPlanning,
        financingInsights,
        benchmarks,
        marketAnalysis,
        competitiveEdge,
      },
      images: {
        images,
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
