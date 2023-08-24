import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

  function getData() {
    console.log("hello");
    axios
      .get("https://64e6fafab0fd9648b78f214c.mockapi.io/crud-app")
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://64e6fafab0fd9648b78f214c.mockapi.io/crud-app/${id}`)
      .then(() => {
        getData();
      });
  }

  function setToLocalStorage(id, name, email){
     localStorage.setItem("id",id)
     localStorage.setItem("name",name)
     localStorage.setItem("email",email)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Read Opration</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{eachData.id}</th>
                <td>{eachData.name}</td>
                <td>{eachData.email}</td>
                <td>
                  <Link to="/update">
                    <button
                      className="btn-success"
                      onClick={() => {
                        setToLocalStorage(
                          eachData.id,
                          eachData.name,
                          eachData.email
                        );
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      handleDelete(eachData.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Read;
