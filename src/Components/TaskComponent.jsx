import React, { useState } from "react";
import { Progress } from '@chakra-ui/react'
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { useDisclosure} from "@chakra-ui/react";
import EditComponent from "./EditComponent";
import DeleteComponent from "./DeleteComponents";
import { AiFillCheckCircle } from "react-icons/ai";


const TaskComponent = ({ task, idx }) => {

    const [editTask, setEditTask] = useState(null);
    const [deleteTask, setDeleteTask] = useState(null);

    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    
    return (
        <div className={`w-[328px] border-2 rounded-md ${task.progress === 0 ? 'border-red-200 bg-red-50 p-2' : task.progress === 100 ? 'border-green-200 bg-green-50 p-2' : 'border-blue-200 bg-blue-50 p-2'}  `}>
            <div className="flex justify-between">
                <div className={`m-2 p-1 border px-2 border-blue-200 text-white rounded-md flex justify-between ${task.progress === 0 ? 'bg-red-500' : task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}>
                    <p className="text-center font-semibold">Task {idx + 1}</p>
                </div>

                <TiDeleteOutline
                    className="m-2 text-[24px] text-red-400 cursor-pointer"
                    onClick={() => {
                        onOpenDelete();
                        setDeleteTask(task.id)
                    }}
                />
            </div>


            <div className="m-2 p-1 border bg-[#FAFAFA] border-blue-200 rounded-md">
                <p className="m-2">{task.task}</p>

                <hr className="mx-2 my-4" />

                <Progress hasStripe value={task.progress} colorScheme={task.progress === 100 ? 'green' : 'blue'} className='m-2' />

                <div className="flex justify-between">

                    {
                        task.progress === 100 ? <AiFillCheckCircle className="m-2 text-green-700 text-[24px]" /> : <p className="m-2 font-semibold">{task.progress}%</p>
                    }


                    <button
                        className="m-4 px-2 py-1 rounded-lg bg-yellow-300 hover:bg-yellow-400 font-semibold"
                        onClick={() => {
                            onOpenEdit();
                            setEditTask(task.id)
                        }}
                    >
                        <TbEdit />
                    </button>
                </div>

                <EditComponent isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} editTask={editTask} setEditTask={setEditTask} task={task}/>
                <DeleteComponent isOpenDelete={isOpenDelete} onCloseDelete={onCloseDelete} deletedTask={deleteTask} setDeletedTask={setDeleteTask} />
            </div>
        </div>
    )
}

export default TaskComponent