import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import AddTaskComponent from "./AddTaskComponent";

const NavbarComponent = () => {

    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();

    return (
        <div className=" h-[72px] w-screen shadow-sm ">
            <div className="w-4/5 flex items-center justify-start mx-auto">
                <p className="text-[22px] font-bold">Task Tracker</p>
                <button
                    className="m-4  w-[124px] h-[42px] rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                    onClick={() => {
                        onOpenAdd();
                    }}
                >
                    + Add Task
                </button>

                <AddTaskComponent isOpenAdd={isOpenAdd} onCloseAdd={onCloseAdd} />
            </div>
        </div>
    )
};

export default NavbarComponent;