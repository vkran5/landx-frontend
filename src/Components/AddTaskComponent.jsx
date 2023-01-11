import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    useToast,
    Input
} from '@chakra-ui/react'
import { API_URL } from "../helper";
import axios from "axios";

const AddTaskComponent = ({ isOpenAdd, onCloseAdd }) => {

    const [newTask, setNewTask] = useState('');

    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: async (data) => {
            return await axios.post(API_URL, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    });

    const onSubmitTask = () => {
        mutation.mutate({ task: newTask })
        onCloseAdd();
        toast({
            position: 'top',
            render: () => (
                <Box color='white' p={3} bg='blue.500'>
                    New task successfully added
                </Box>
            ),
        })
    };

    return (
        <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="font-bold">Add new task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <Input
                        size='lg'
                        placeholder="Add new task"
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onCloseAdd}>
                        Close
                    </Button>

                    <Button colorScheme='blue' onClick={onSubmitTask}>
                        Add task
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default AddTaskComponent;