"use client"

import FormUser from '@/components/User/FormUser';
import FormUserEdit from '@/components/User/FormUserEdit';
import { Tab, Tabs } from '@nextui-org/react';

const UserPage = () => {


  return (
    <div className="col-span-12">
      <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
        tabList: 'bg-white shadow xs:flex-wrap w-full',
        base: 'w-full'
      }} >
        <Tab title="Nuevo Usuario">
          <FormUser />
        </Tab>

        <Tab title="Edicion">
          <FormUserEdit />
        </Tab>

      </Tabs>
    </div>
  )
}

export default UserPage