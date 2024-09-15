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
    Input,
    Slider,
    RadioGroup,
    Radio,
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
                                        <Input label="Nombre" />
                                        <Slider
                                            label="Rango de edad"
                                            step={1}
                                            minValue={1}
                                            maxValue={100}
                                            defaultValue={[10, 20]}
                                            className="max-w-md"
                                        />
                                        <Slider
                                            label="Experiencia financiera"
                                            color="foreground"
                                            size="sm"
                                            step={1}
                                            maxValue={2}
                                            marks={[
                                                {
                                                    value: 0,
                                                    label: "Básica",
                                                },
                                                {
                                                    value: 1,
                                                    label: "Intermedia",
                                                },
                                                {
                                                    value: 2,
                                                    label: "Avanzada",
                                                },
                                            ]}
                                            defaultValue={0}
                                            className="max-w-md"
                                        />
                                        <RadioGroup
                                            label="Ubicación"
                                            orientation="horizontal"
                                        >
                                            <Radio value="rural">
                                                Zona rural
                                            </Radio>
                                            <Radio value="urbana">
                                                Zona urbana
                                            </Radio>
                                        </RadioGroup>
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
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Crear Campaña
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
