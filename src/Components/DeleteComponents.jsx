import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Box
} from '@chakra-ui/react'
import { API_URL } from "../helper";
import axios from "axios";

const DeleteComponent = ({ isOpenDelete, onCloseDelete, deletedTask, setDeletedTask }) => {

    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(API_URL + id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    });


    const onBtnDelete = (id) => {
        mutation.mutate(id);
        onCloseDelete();
        setDeletedTask(null);
        toast({
            position: 'top',
            render: () => (
                <Box color='white' p={3} bg='blue.500'>
                    Task successfully deleted
                </Box>
            ),
        })

    };

    return (
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Are you sure want to delete this task?</p>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onCloseDelete}>
                        Cancel
                    </Button>

                    <Button colorScheme='blue' onClick={() => onBtnDelete(deletedTask)}>
                        Yes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default DeleteComponent;