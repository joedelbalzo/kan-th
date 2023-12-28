const conn = require("./conn");
const { User, Blogpost, Tag, Image, Business, MailingListUser, FinancialInfo } = require("./Models");
const { encrypt, decrypt } = require("./Models/FinancialInfo");
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
      email: "jdelbalzotest@gmail.com",
      adminStatus: false,
      businessId: null,
      isNewUser: false,
      firstName: "James",
      lastName: "Del Balzo",
      city: "Astoria",
      state: "New York",
      mailingList: true,
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

    const [growthStrategies, valuationsAndBenchmarks, equityAndDebt, financingInsights, marketAnalysis, competitiveEdge] =
      await Promise.all([
        Tag.create({ name: "Growth Strategies" }),
        Tag.create({ name: "Valuations and Benchmarks" }),
        Tag.create({ name: "Equity and Debt" }),
        Tag.create({ name: "Financing Insights" }),
        Tag.create({ name: "Market Analysis" }),
        Tag.create({ name: "Competitive Edge" }),
      ]);

    await Promise.all([
      posts[0].addTags(growthStrategies),
      posts[0].addTags(competitiveEdge),
      posts[1].addTags(valuationsAndBenchmarks),
      posts[1].addTags(growthStrategies),
      posts[2].addTags(equityAndDebt),
      posts[2].addTags(valuationsAndBenchmarks),
      posts[3].addTags(financingInsights),
      posts[3].addTags(equityAndDebt),
      posts[4].addTags(marketAnalysis),
      posts[4].addTags(financingInsights),
      posts[5].addTags(competitiveEdge),
      posts[5].addTags(marketAnalysis),
      posts[6].addTags(marketAnalysis),
      posts[6].addTags(financingInsights),
      posts[7].addTags(competitiveEdge),
      posts[7].addTags(marketAnalysis),
    ]);

    const business = await Business.create({
      name: "Jimbo's Tech Solutions",
      userId: notAdmin.id,
      categoryOfBusiness: "Technology",
      yearsOpen: 5,
      numberOfPartners: 2,
      numberOfLocations: 3,
      description: "Innovative tech solutions for modern businesses.",
      legalStructure: "LLC",
      mainProducts: "Software Development, IT Consulting",
      servicesOffered: "Custom Software, Tech Support, IT Strategy",
      keyMarkets: "Small to Medium-sized Businesses",
      majorCompetitors: "TechCorp, Innovatech, NextGen Solutions",
    });

    const financialRecords = [
      {
        businessId: business.id,
        year: 2020,
        revenue: 500000,
        assets: 200000,
        liabilities: 100000,
        netIncome: "75000",
        operatingExpenses: 150000,
        cashFlow: 80000,
        debt: "50000",
        equity: "150000",
      },
      {
        businessId: business.id,
        year: 2021,
        revenue: 550000,
        assets: 250000,
        liabilities: 120000,
        netIncome: "85000",
        operatingExpenses: 170000,
        cashFlow: 90000,
        debt: "60000",
        equity: "160000",
      },
    ];

    await FinancialInfo.bulkCreate(financialRecords);

    return {
      users: {
        admin,
        notAdmin,
      },
      blogposts: {
        posts,
      },
      tags: {
        growthStrategies,
        valuationsAndBenchmarks,
        equityAndDebt,
        financingInsights,
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
  decrypt,
  User,
  Blogpost,
  Tag,
  Image,
  conn,
  MailingListUser,
  Business,
  FinancialInfo,
};
