import React from "react";

const HomeShowCase = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Raleway"
      />

      <div className="p-4 text-gray-600">
        <h1 className="mb-8 text-center text-3xl font-bold text-indigo-900">
          Our Features:
        </h1>

        <ul className="grid place-content-center sm:grid-cols-2 gap-8">
          <li className="flex">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              01.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Task Management
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                Manage your tasks and projects with ease. You can create tasks,
                assign them to users, and track their progress.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              02.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Work with Team
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                You can collaborate with your team and share tasks with them.
                You can also see the progress of your team members.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              03.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Generate project Report
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                You can genertate project report with ease. You can see the
                progress of your team members.
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="px-4 text-5xl font-extralight text-indigo-700">
              04.
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-800">
                Secure and Private
              </div>
              <p className="max-w-xs py-2 text-sm text-indigo-900">
                Your data is safe with us. We use encryption to protect your
                data.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomeShowCase;
