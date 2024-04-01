"use client"
import { Tab, Tabs } from "@nextui-org/react"

import FormComponent from "@/components/Component/FormComponent";
import FormComponentEdit from "@/components/Component/FormComponentEdit";

const page = () => {



    return (
        <div className="col-span-12">
            <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
                tabList: 'bg-white shadow xs:flex-wrap  w-full',
                base: 'w-full'
            }} >

                <Tab title="Edicion de componente">
                    <FormComponentEdit />
                </Tab>

                <Tab title="Componentes">

                </Tab>


                <Tab title="Nuevo componente">
                    <FormComponent />
                </Tab>

            </Tabs>
        </div>
    )
}

export default page