import "./styles.css";
import Image from "../../assest/black-beautiful-ladies-smiling 1.png";
import CustomeForm from "../form";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, DELETE_TODO, COMPLETE_TODO } from "../../../lib/queries";

function App() {
  const { loading, data } = useQuery(GET_TODOS);
  const [onDeleteTodo] = useMutation(DELETE_TODO);
  const [changeTodoStatus] = useMutation(COMPLETE_TODO);

  const myTodos = data && data.getTodos;
  if (loading) return <p>Loading ...</p>;

  const handleDeleteTodo = async (id) => {
    try {
      await onDeleteTodo({
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCompletedTodo = async (id) => {
    await changeTodoStatus({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome To My App</h1>
      </header>

      <section className="container">
        <section className="form">
          <CustomeForm />
        </section>

        <section className="cards">
          <div className="card">
            <h2>Todos</h2>
            <ul>
              {myTodos.length ? (
                myTodos.map(
                  ({ title, description, _id, completed = false }) => (
                    <li
                      key={title}
                      styles={{ backgroundColo: `${completed && "#f7f7f7"}` }}
                    >
                      <h3 style={{ color: `${completed && "#d7d7d7"}` }}>
                        {title}
                      </h3>
                      <p style={{ color: `${completed && "#d7d7d7"}` }}>
                        {description}
                      </p>
                      <div className="status">
                        <small
                          className="delete"
                          onClick={() => handleDeleteTodo(_id)}
                        >
                          Delete
                        </small>

                        {!completed ? (
                          <small className="completed">
                            Completed
                            <input
                              type="checkbox"
                              onChange={() => handleCompletedTodo(_id)}
                            />
                          </small>
                        ) : null}
                      </div>
                    </li>
                  )
                )
              ) : (
                <p>You do not have any todos in your list</p>
              )}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
