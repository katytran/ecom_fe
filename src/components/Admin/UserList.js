import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import authActions from "../../redux/actions/auth.actions";
import { useSelector, useDispatch } from "react-redux";
const capitalizeFirstLetters = (words) => {
  let tempWords = words.split(" ");
  tempWords = tempWords.map((word) => word[0].toUpperCase() + word.slice(1));
  return tempWords.join(" ");
};

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  useEffect(() => {
    dispatch(authActions.getAllUser());
  }, []);

  console.log("users", users);

  let data = {
    columns: [
      {
        label: "User ID",
        field: "id",
        sort: "asc",
        width: 270,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 100,
      },
    ],

    rows: users.map((user) => {
      return {
        id: user._id,
        name: capitalizeFirstLetters(user.name),
        email: user.email,
        role: user.role,
      };
    }),
  };

  return (
    <div>
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>User List</h1>
              <MDBDataTable searchTop striped bordered small data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
