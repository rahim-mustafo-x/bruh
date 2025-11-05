import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

// Git foydalanuvchini sozlash
await git.addConfig("user.name", "Developer-Mustafo");
await git.addConfig("user.email", "mustaforahimov30@gmail.com");

const makeCommits = async (n) => {
  if (n === 0) {
    try {
      // Push with authentication handling
      await git.push();
      console.log("✅ All commits pushed!");
    } catch (error) {
      console.log("⚠️  Push failed, but commits are created locally");
      console.log("💡 To push to GitHub, use one of these methods:");
      console.log("   1. Run with GitHub Actions and GITHUB_TOKEN");
      console.log("   2. Use SSH key authentication");
      console.log("   3. Use personal access token");
    }
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(2, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log(`📅 Commit date: ${date}`);

  jsonfile.writeFile(path, data, async () => {
    await git.add([path]);
    await git.commit(`Commit on ${date}`, { "--date": date });
    makeCommits(--n);
  });
};

makeCommits(500);
