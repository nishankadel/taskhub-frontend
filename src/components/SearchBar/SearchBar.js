import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../baseUrl";

const SearchBar = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const userProfile = JSON.parse(localStorage.getItem("TH:user-profile"));

  const [searchText, setSearchText] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${baseUrl}/projects/search`,
        { userId: userProfile._id, searchText },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setSearchedItems(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchText, userProfile._id, userToken]);

  return (
    <>
      <div className="flex  flex-col items-center justify-center bg-white">
        <div className="md:w-[584px] mx-auto mt-7 flex w-[92%] items-center rounded-full border hover:shadow-lg border-gray-600">
          <div className="pl-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none"
          />
        </div>
      </div>
      {searchText && (
        <section className="text-gray-600">
          <div className="container px-3 py-3 mx-auto">
            <div className="flex flex-wrap w-full mb-8">
              <div className="w-full mb-6 lg:mb-0">
                <h1 className="sm:text-4xl text-5xl font-bold title-font mb-2 text-gray-900">
                  Search Results
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center">
              {searchedItems.map((project) => (
                <div
                  key={project._id}
                  className="flex flex-col gap-4 items-center justify-center ml-7 mr-7 mb-7  bg-white"
                >
                  <Link
                    to={`/projects/single-project/${project._id}`}
                    className=" border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-300"
                  >
                    <div className="grid grid-cols-6 p-5 gap-y-2">
                      <div className="col-span-5 md:col-span-4 ml-4">
                        <div className="flex">
                          <p className="text-gray-600 font-bold mr-2">
                            {project.projectTitle}
                          </p>
                          {project.userId === userProfile._id ? (
                            <button className="bg-indigo-700 text-white font-bold text-sm px-1 py-1 rounded shadow  mb-1">
                              Owner
                            </button>
                          ) : (
                            <button className="bg-indigo-500 text-white font-bold text-sm px-1 py-1 rounded shadow  mb-1">
                              Collab
                            </button>
                          )}
                        </div>
                        <p className="text-gray-400">
                          {project.projectDescription.substring(0, 19)} ....
                        </p>

                        <p className="text-gray-400">
                          {moment(project.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchBar;
