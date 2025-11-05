import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit(); // bir marta yaratamiz
const path = "./data.json";

// Git foydalanuvchini sozlash
await git.addConfig("user.name", "Developer-Mustafo");
await git.addConfig("user.email", "mustaforahimov30@gmail.com");

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    console.log("✅ All commits pushed!");
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "y")
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

makeCommits(100);