import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../baseUrl";
import EmptyData from "../../components/EmptyData/EmptyData";
import Spinner from "../../components/Spinner/Spinner";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

const ProjectLog = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [projectLogs, setProjectLogs] = useState({});
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/projects/report/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setProjectLogs(res.data.report);
        setProjectTitle(res.data.report.projectId.projectTitle);
        setProjectDescription(res.data.report.projectId.projectDescription);
        setLogs(res.data.report.logs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userToken]);

  return (
    <>
      {loading && <Spinner />}
      {projectLogs ? (
        <div className="container mx-auto px-6 py-3">
          <div className="-mt-3 -ml-5 mb-2">
            <BreadCrumb
              textOne="Dashboard"
              linkOne="/"
              textTwo="Single Project"
              linkTwo={`/projects/single-project/${id}`}
              textThree="Project Log Report"
            />
          </div>
          <h3 className="text-gray-700 text-3xl font-bold">{projectTitle}</h3>
          <h3 className="text-gray-700 text-sm ">{projectDescription}</h3>
          <hr />
          <div className="mt-3">
            <h3 className="text-gray-700 text-xl mb-2 font-bold">
              Project log details
            </h3>
            <div className="px-4 sm:px-8 max-w-5xl m-auto">
              {logs.length <= 0 ? (
                <EmptyData message="Oops! No log report data found !" />
              ) : (
                logs.map((log) => (
                  <ul
                    key={log._id}
                    className="border border-gray-200 rounded overflow-hidden shadow-md flex justify-between p-2"
                  >
                    <li className="px-4 py-2 bg-white hover:bg-sky-100 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                      {log.log}
                    </li>
                    <li className="px-4 py-2 bg-white hover:bg-sky-100  border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                      {moment(log.reportedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </li>
                  </ul>
                ))
              )}
            </div>

            <hr />
          </div>
        </div>
      ) : (
        <EmptyData message="Oops! No log report data found !" />
      )}
    </>
  );
};

export default ProjectLog;
