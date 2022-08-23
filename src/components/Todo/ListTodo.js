import EditTodo from "./EditTodo";
import axios from "axios";
import React, { useEffect } from "react";
import baseUrl from "../../baseUrl";
import { parseJwt } from "../../utils/parseJwt";
import Spinner from "../Spinner/Spinner";
import EmptyData from "../EmptyData/EmptyData";
import moment from "moment";
import { toast } from "react-toastify";

const ListTodo = () => {
  const userToken = JSON.parse(localStorage.getItem("TH:user-token"));
  const [todos, setTodos] = React.useState({});
  const [todosList, setTodolList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [todosId, setTodosId] = React.useState("");
  const { id } = parseJwt(userToken);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/todos/list-todos/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setTodos(res.data.todo);
        setTodolList(res.data.todo.todos);
        setTodosId(res.data.todo._id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userToken, id]);

  const handleDelete = (todoId) => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/todos/delete-todo`,
        {
          id: todosId,
          userId: id,
          todoId: todoId,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setTodolList(todosList.filter((todo) => todo._id !== todoId));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(todosList);
  return (
    <>
      {loading && <Spinner />}
      <div className="main flex flex-col m-5">
        {todosList.length <= 0 ? (
          <EmptyData message="Oops! No todos found!" />
        ) : (
          todosList.map((todo) => (
            <div
              key={todo._id}
              className="each flex hover:shadow-lg select-none p-4 rounded-lg border-gray-300 border mb-3 hover:border-gray-500 cursor-pointer"
            >
              <div className="left">
                <div className="header text-blue-600 font-semibold text-2xl">
                  {todo.todoTitle}
                </div>
                <div className="desc text-gray-600">{todo.todoDescription}</div>
                <div className="text-gray-500 text-sm">
                  {moment(todo.createdAt).fromNow()}
                </div>
              </div>
              <div className="right m-auto mr-0">
                <div className="icon">
                  <EditTodo todo={todo} listedTodoId={todos._id} />
                </div>
                <div
                  className="icon"
                  onClick={() => {
                    handleDelete(todo._id);
                  }}
                >
                  <i className="h-8 w-8 text-red-600  hover:text-red-700 text-2xl fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListTodo;
