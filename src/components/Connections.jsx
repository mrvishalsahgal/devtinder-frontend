import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const fecthConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(response.data.data);
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error.resposne);
    }
  };
  useEffect(() => {
    fecthConnections();
  }, []);

  const connection = useSelector((store) => store.connection);
  if (!connection) return;

  if (connection.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold">No Connections</h1>
      </div>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="text-2xl font-bold">Connections</h1>
      {connection.map((user) => (
        <div key={user._id} className="mx-50 border border-gray-200">
          <img
            className="mx-auto w-20 h-20 rounded-full"
            src={user.photoURL}
            alt=""
          />
          <p>{user.firstName + " " + user.lastName}</p>
          <p>{user.age + " " + user.gender}</p>
          <p>{user.about}</p>
        </div>
      ))}
    </div>
  );
};

export default Connections;
