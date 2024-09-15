import React from "react";
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

export default function Title() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 pb-1">
          Campañas Activas
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Administra las campañas (creación, edición y seguimiento).
        </p>
      </div>
      <Button
        size="md"
        color="secondary"
        className="dark:bg-purple-700"
        onPress={onOpen}
      >
        + Crear Nueva Campaña
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
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
                    <Input label="Nombre" className="mb-4" />
                    <Slider
                      label="Rango de edad"
                      step={1}
                      minValue={1}
                      maxValue={100}
                      defaultValue={[10, 20]}
                      className="max-w-md mb-4"
                    />
                    {/* <Slider
                                            label="Experiencia financiera"
                                            color="foreground"
                                            size="md"
                                            step={1}
                                            maxValue={2}
                                            hideValue={true}
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
                                            className="max-w-md mb-8"
                                        /> */}
                    <RadioGroup
                      label="Experiencia financiera"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Básica</Radio>
                      <Radio value="2">Intermedia</Radio>
                      <Radio value="3">Avanzada</Radio>
                    </RadioGroup>
                    <RadioGroup label="Ubicación" orientation="horizontal">
                      <Radio value="rural">Zona rural</Radio>
                      <Radio value="urbana">Zona urbana</Radio>
                    </RadioGroup>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Configuración de tono del bot"
                    title="Configuración de tono del bot"
                  >
                    <RadioGroup
                      label="Personalidad"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Amigable</Radio>
                      <Radio value="2">Profesional</Radio>
                      <Radio value="3">Humorístico</Radio>
                    </RadioGroup>
                    <RadioGroup
                      label="Longitud"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Conciso</Radio>
                      <Radio value="2">Regular</Radio>
                      <Radio value="3">Extenso</Radio>
                    </RadioGroup>
                    <RadioGroup
                      label="Tecnicismo"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Básico</Radio>
                      <Radio value="2">Intermedio</Radio>
                      <Radio value="3">Avanzado</Radio>
                    </RadioGroup>
                    <RadioGroup
                      label="Proactividad"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Reactivo</Radio>
                      <Radio value="2">Moderado</Radio>
                      <Radio value="3">Proactivo</Radio>
                    </RadioGroup>
                    <RadioGroup
                      label="Uso de Emojis"
                      orientation="horizontal"
                      className="mb-4"
                    >
                      <Radio value="1">Ninguno</Radio>
                      <Radio value="2">Pocos</Radio>
                      <Radio value="3">Moderado</Radio>
                    </RadioGroup>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
    </div>
  );
}
