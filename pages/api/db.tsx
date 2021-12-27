const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "tudu-336316",
  keyFilename: "tudu-service-account.json",
});

export default db;
