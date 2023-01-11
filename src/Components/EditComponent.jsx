import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Box,
    useToast
} from '@chakra-ui/react';
import { FaChevronDown } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { API_URL } from "../helper";
import axios from "axios";

const EditComponent = ({ isOpenEdit, onCloseEdit, editTask, setEditTask, task }) => {

    const [newTask, setNewTask] = useState('');
    const [newProgress, setNewProgress] = useState(0);

    const data = {
        task: !newTask ? task.task : newTask,
        progress: !newProgress ? task.progress : newProgress

    };

    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: async (id) => {
            return await axios.patch(API_URL + id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    });

    const onBtnSave = (id) => {

        mutation.mutate(id);
        onCloseEdit();
        setEditTask(null);
        setNewTask('')
        toast({
            position: 'top',
            render: () => (
                <Box color='white' p={3} bg='blue.500'>
                    Task successfully updated
                </Box>
            ),
        });

        
    };

    return (
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <div>
                        <Input
                            size='lg'
                            placeholder={task.task}
                            onChange={(e) => setNewTask(e.target.value)}
                            value={newTask}
                            className='mb-4'
                        />

                        <Menu>
                            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() =>{setNewProgress(25)}}>25%</MenuItem>
                                <MenuItem onClick={() =>{setNewProgress(50)}}>50%</MenuItem>
                                <MenuItem onClick={() =>{setNewProgress(75)}}>75%</MenuItem>
                                <MenuItem onClick={() =>{setNewProgress(100)}}>Done</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { onCloseEdit(); setNewTask('') }}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={() => {
                        onBtnSave(editTask)
                    }}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default EditComponent;