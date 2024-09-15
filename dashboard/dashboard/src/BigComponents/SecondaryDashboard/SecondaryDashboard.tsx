import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Accordion,
    AccordionItem,
} from "@nextui-org/react";

function SecondaryDashboard() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>+ Crear Campaña</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Nueva campaña
                            </ModalHeader>
                            <ModalBody>
                                <Accordion>
                                    <AccordionItem
                                        key="1"
                                        aria-label="Perfil demográfico"
                                        title="Perfil demográfico"
                                    >
                                        <h1>Hola</h1>
                                    </AccordionItem>
                                    <AccordionItem
                                        key="2"
                                        aria-label="Configuración de tono del bot"
                                        title="Configuración de tono del bot"
                                    >
                                        <h1>Adios</h1>
                                    </AccordionItem>
                                </Accordion>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default SecondaryDashboard;
