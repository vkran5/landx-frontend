import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import TaskComponent from "../Components/TaskComponent";
import { useQuery, useQueryClient } from 'react-query';
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../helper";

const MainPages = () => {

    const { isLoading, data } = useQuery('fetchTasks', async () => {
        let res = await axios.get(API_URL);
        return res.data
    });

    const printTask = () => {

        return data.map((task, idx) => {
            return (
                <TaskComponent key={idx} task={task} idx={idx} />
            )
        })
    };


    return (
        <div className="w-screen ">
            {/* Add Task pada navbar*/}
            <NavbarComponent />

            {/* Task list */}
            <div className="flex flex-wrap gap-4 w-4/5 mt-6 mx-auto pb-5">
                {isLoading ? <Spinner className="mx-auto mt-[35vh]"/> : printTask()}
            </div>
        </div>
    )
}

export default MainPages;