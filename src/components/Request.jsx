import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/users/requests/recieved", {
        withCredentials: true,
      });
      console.log(response.data.data);
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.log(error.resposne);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!request) return;

  if (request.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold">No Requests</h1>
      </div>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="text-2xl font-bold">Requests</h1>
      {request.map((user) => (
        <div key={user._id} className="mx-50 border border-gray-200">
          <img
            className="mx-auto w-20 h-20 rounded-full"
            src={user.fromUserId.photoURL}
            alt=""
          />
          <p>{user.fromUserId.firstName + " " + user.fromUserId.lastName}</p>
          <p>{user.fromUserId.age + " " + user.fromUserId.gender}</p>
          <p>{user.fromUserId.about}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-secondary">Ignore</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Request;
