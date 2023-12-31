// export default () => {
//   /* eslint-disable-next-line no-restricted-globals */
//   self.addEventListener("message", (e) => {
//     if (!e) return;
//     let { user } = e.data;
//     let k = 0;
//     const limit = Math.random() * 10000000000;
//     while (k < limit) {
//       k++;
//     }
//     user.isRegistered = true;
//     user.registeredAt = new Date();
//     postMessage(user);
//   });
// };

export default () => {
  const registerUser = async (username) => {
    //  simulation for api call can be replaced witha ctual api call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`User ${username} registered`);
        resolve();
      }, 1000);
    });
  };
  /* eslint-disable-next-line no-restricted-globals */
  self.addEventListener("message", async (event) => {
    const { type, data } = event.data;

    if (type === "register") {
      const newUsers = [];

      for (const user of data) {
        await registerUser(user.username);
        const newUser = {
          ...user,
          isRegistered: true,
        };
        newUsers.push(newUser);
        // self.postMessage({ type: "userRegistered", user: newUser });
      }
      postMessage({ type: "usersRegistered", users: newUsers });
    }
  });
};
