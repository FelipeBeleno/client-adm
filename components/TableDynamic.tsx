"use client"
import { Avatar, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, user } from '@nextui-org/react'
import React, { FC } from 'react'


type Props = {

    headers: string[];
    items: any[]
}

const TableDynamic: FC<Props> = ({ headers, items }) => {


    const users = [
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'inactive' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'Active' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'inactive' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'Active' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'inactive' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'Active' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'inactive' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'Active' },
        { name: 'Felipe', role: 'SUPER_ADMIN', status: 'inactive' }
    ]

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    return (
        <Table
            aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}
        >
            <TableHeader>
                <TableColumn key="name">NAME</TableColumn>
                <TableColumn key="role">ROLE</TableColumn>
                <TableColumn key="status">STATUS</TableColumn>
            </TableHeader>
            <TableBody >
                {users.map((it, i) => {

                    return <TableRow key={it.name}>

                        <TableCell className='flex gap-5 items-center'>
                            <Avatar isBordered radius="lg"  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            {it.name}

                        </TableCell>
                        <TableCell>hola</TableCell>
                        <TableCell>hola</TableCell>
                    </TableRow>

                })}

            </TableBody>
        </Table>
    )
}

export default TableDynamic