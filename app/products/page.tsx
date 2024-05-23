"use client"
import FormProduct from "@/components/Product/FormProduct";
import FormProductEdit from "@/components/Product/FormProductEdit";
import { Tab, Tabs } from "@nextui-org/react";

const ProductPage = () => {



    return (

        <div className="col-span-12">
            <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
                tabList: 'bg-white shadow xs:flex-wrap  w-full',
                base: 'w-full'
            }} >
                <Tab title="Nuevo">
                    <FormProduct />
                </Tab>

                <Tab title="Productos">
                    <FormProductEdit />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProductPage;