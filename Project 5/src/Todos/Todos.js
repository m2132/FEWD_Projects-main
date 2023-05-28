import { useEffect, useState } from "react"
import TodoItem from "../TodoItem/TodoItem";
import Registration from '../localStorage';
import { useLocation } from "react-router-dom";
import { OPTIONS } from "../SortKeyOptions";
import SelectSortKey from "../SelectSortKey/SelectSortKey";
import { Divider, LinearProgress } from "@material-ui/core";

export default function Todos() {

    const userId = Registration.getUserId();
    const [todos, setTodods] = useState();
    const sortKey = useLocation().search.slice(6);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then(response => response.json())
            .then(data => data.sort(OPTIONS[sortKey]))
            .then(todos => setTodods(todos))
    }, [userId, sortKey]);

    return (
        <div>
            {!todos ? <LinearProgress />
                : <>
                    <SelectSortKey />
                    <br />
                    <Divider />
                    <div>
                        {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
                    </div>
                </>
            }

        </div>
    )
}