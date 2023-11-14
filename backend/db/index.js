const conn = require("./conn");
const { User, Blogpost, Tag } = require("./Models");
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

    // Blogpost.belongsToMany(Tag, { through: "BlogpostTags" });
    // Tag.belongsToMany(Blogpost, { through: "BlogpostTags" });

    const [samplePost1, samplePost2, samplePost3, samplePost4] = await Promise.all([
      Blogpost.create({
        title: "Understanding Personal Finance: A Beginner's Guide",
        subtitle: "Navigating the Basics of Money Management",
        content:
          "Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2021-01-01",
        authorId: 666,
        // homePicture: "8bf1ee47493d6db86b84e19b91f9395995e731fb571fcbcd9249064c3ca66aa8",
        // homePictureNickname: "from-joe-shadi-wedding.jpg",
        // bannerPicture: "a4225d9cab96aeafbe945c05dcd93a8ec77864b3c096f8d9c6cc432d3621605e",
        // bannerPictureNickname: "giphy.gif",
        // contentPicture: "6ca87ec9c928d49b1eac0ea14b8d79532f54e07711b18fa3983bd8d66beee404",
        // contentPictureNickname: "IMG_4829 (2).JPG",
      }),
      Blogpost.create({
        title: "Post 2. Smart Investment Strategies for Beginners",
        subtitle: "Making Your Money Work for You",
        content:
          "Let's give this a shoooooooooooooot tooooooooooo! THIS IS THE SECOND BLOG POST, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2022-02-02",
        authorId: 666,
        // homePicture: "de06bf265b35353a60ab792b1265e688f9690336525deff2e32917540d5b3d44",
        // homePictureNickname: "from-joe-shadi-wedding.jpg",
        // bannerPicture: "a4225d9cab96aeafbe945c05dcd93a8ec77864b3c096f8d9c6cc432d3621605e",
        // bannerPictureNickname: "giphy.gif",
        // contentPicture: "6ca87ec9c928d49b1eac0ea14b8d79532f54e07711b18fa3983bd8d66beee404",
        // contentPictureNickname: "IMG_4829 (2).JPG",
      }),
      Blogpost.create({
        title: "Post 3. The Importance of Building an Emergency Fund",
        subtitle: "Secure Your Financial Future with Smart Saving",
        content:
          "THIS IS THE THIRD BLOG POST, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2022-02-04",
        authorId: 666,
        // homePicture: "8bf1ee47493d6db86b84e19b91f9395995e731fb571fcbcd9249064c3ca66aa8",
        // homePictureNickname: "from-joe-shadi-wedding.jpg",
        // bannerPicture: "a4225d9cab96aeafbe945c05dcd93a8ec77864b3c096f8d9c6cc432d3621605e",
        // bannerPictureNickname: "giphy.gif",
        // contentPicture: "6ca87ec9c928d49b1eac0ea14b8d79532f54e07711b18fa3983bd8d66beee404",
        // contentPictureNickname: "IMG_4829 (2).JPG",
      }),
      Blogpost.create({
        title: "Post 4. We Love Finance. Yes We Do! We Love Finance, How Bout You?",
        subtitle: "Do you really love finance, or are you just faking it?",
        content:
          "THIS IS THE FOURTH BLOG POST, and it's all about LOVING FINANCE. It needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the second paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/> This is the third paragraph, and it's going to look a lot like the first two. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>This is the fourth paragraph, and it's going to look a lot like the first. Let's give this a shot! This is the first blog post, and it needs to be at least 50 characters. I'll probably want to change that, but I guess the more text I have here, <strong>the better I can handle the design of the site.</strong> Let's Lorem Ipsum some shit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>",
        published: true,
        publishedAt: "2022-04-03",
        authorId: 666,
        // homePicture: "8bf1ee47493d6db86b84e19b91f9395995e731fb571fcbcd9249064c3ca66aa8",
        // homePictureNickname: "from-joe-shadi-wedding.jpg",
        // bannerPicture: "a4225d9cab96aeafbe945c05dcd93a8ec77864b3c096f8d9c6cc432d3621605e",
        // bannerPictureNickname: "giphy.gif",
        // contentPicture: "6ca87ec9c928d49b1eac0ea14b8d79532f54e07711b18fa3983bd8d66beee404",
        // contentPictureNickname: "IMG_4829 (2).JPG",
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

    await samplePost1.addTags([trials, errors, money]);
    await samplePost2.addTags([finances, smbs, dei]);
    await samplePost3.addTags([money, smbs, dei]);
    await samplePost4.addTags([trials, errors, dei]);

    return {
      users: {
        admin,
      },
      blogposts: {
        samplePost1,
        samplePost2,
        samplePost3,
        samplePost4,
      },
      tags: {
        trials,
        errors,
        money,
        finances,
        smbs,
        dei,
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
  conn,
};
