import React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Input } from "@/components/ui/input";

const SecondaryDashboard: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger>+ Crear campaña</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva campaña</DialogTitle>
                    <DialogDescription>
                        <Collapsible>
                            <CollapsibleTrigger>
                                Perfil demográfico
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                Yes. Free to use for personal and commercial
                                projects. No attribution required.
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger>
                                Configuración de tono del bot
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                Yes. Free to use for personal and commercial
                                projects. No attribution required.
                            </CollapsibleContent>
                        </Collapsible>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default SecondaryDashboard;
