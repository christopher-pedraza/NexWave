// import React from "react";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// import { Input } from "@/components/ui/input";

// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";

// import { Button } from "@/components/ui/button";

// const SecondaryDashboard: React.FC = () => {
//     function onSubmit(data: any) {
//         console.log(data);
//     }

//     return (
//         <Dialog>
//             <DialogTrigger>+ Crear campaña</DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Nueva campaña</DialogTitle>
//                     <DialogDescription>
//                         <Form
//                             onSubmit={onSubmit}
//                             className="w-2/3 space-y-6"
//                         >
//                             <FormField
//                                 control={form.control}
//                                 name="username"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Username</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="shadcn"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormDescription>
//                                             This is your public display name.
//                                         </FormDescription>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit">Submit</Button>

//                             <Collapsible>
//                                 <CollapsibleTrigger>
//                                     Perfil demográfico
//                                 </CollapsibleTrigger>
//                                 <CollapsibleContent>
//                                     Yes. Free to use for personal and commercial
//                                     projects. No attribution required.
//                                 </CollapsibleContent>
//                             </Collapsible>
//                             <Collapsible>
//                                 <CollapsibleTrigger>
//                                     Configuración de tono del bot
//                                 </CollapsibleTrigger>
//                                 <CollapsibleContent>
//                                     Yes. Free to use for personal and commercial
//                                     projects. No attribution required.
//                                 </CollapsibleContent>
//                             </Collapsible>
//                         </Form>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default SecondaryDashboard;
