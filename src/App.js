import { useState, useEffect } from "react";
import { users as USERS } from "./users";
import { USERS1 } from "./User";
import UserWorker from "./UserWorker";
import AppWorker from "./AppWorker";

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [unregisteredUsers, setUnRegisteredUsers] = useState([]);
  const myWorker = new AppWorker(UserWorker);

  useEffect(() => {
    const regusers = USERS.filter((user) => user.isRegistered);
    const unregUsers = USERS.filter((user) => !user.isRegistered);
    setRegisteredUsers(regusers);
    setUnRegisteredUsers(unregUsers);
  }, []);

  const handleWorkerMessage = (event) => {
    const { type, users: newUsers } = event.data;
    if (type === "usersRegistered") {
      setRegisteredUsers((prevUsers) => [...prevUsers, ...newUsers]);
      const unRegsUsers = unregisteredUsers.filter(
        (regUser) =>
          !newUsers.some((unregUser) => regUser.userId === unregUser.userId)
      );
      setUnRegisteredUsers(unRegsUsers);
    }
  };

  useEffect(() => {
    return () => {
      myWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  const startRegistration = () => {
    myWorker.postMessage({ type: "register", data: unregisteredUsers });
    myWorker.addEventListener("message", handleWorkerMessage);
  };

  return (
    <div>
      <h3>
        Registered Users: {registeredUsers.length} | Un-Registered Users:{" "}
        {unregisteredUsers.length}
      </h3>
      <ul>
        {registeredUsers.map((user) => {
          return (
            <li key={user.userId}>
              <img src={user.avatar} alt="" />
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.registeredAt.toString()}</p>
              <hr />
            </li>
          );
        })}
      </ul>
      <h3>Un-Registered Users</h3>
      <ul>
        {unregisteredUsers.map((user) => {
          return (
            <li key={user.userId}>
              <img src={user.avatar} alt="" />
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.registeredAt.toString()}</p>
              <hr />
            </li>
          );
        })}
      </ul>
      {unregisteredUsers.length && (
        <button onClick={startRegistration}>Start Registration</button>
      )}
    </div>
  );
}

export default App;
