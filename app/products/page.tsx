"use client"
import FormProduct from "@/components/Product/FormProduct";
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
                    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad quia molestias quidem fugit a asperiores ipsum laboriosam, est, commodi delectus odio veritatis cum animi tempora adipisci exercitationem cupiditate soluta corrupti?</h1>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProductPage;