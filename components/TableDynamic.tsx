"use client"
import { Paginate } from "@/interfaces/paginate";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Avatar } from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, createElement, useState } from "react";


type Props = {
    rows: any[];
    columns: any[];
    paginate: {
        limit: number;
        offset: number;
    },
    setPaginate: Dispatch<SetStateAction<Paginate>>;
    count: number;
}

const TableDynamic: FC<Props> = ({ rows, columns, paginate, setPaginate, count }) => {

    const [page, setPage] = useState(1)

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
                        total={Math.ceil(count / paginate.limit)}
                        onChange={(page) => {

                            setPaginate({
                                ...paginate,
                                offset: (page - 1) * paginate.limit
                            })
                            setPage(page)
                        }}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => {


                            if (columnKey === 'image') {
                                return <TableCell><Avatar isBordered radius="sm" src={item.image} /></TableCell>
                            }

                            if (columnKey === "option") {
                                console.log(item.option)
                                return <TableCell>{createElement(item.option)}</TableCell>
                            };

                            return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TableDynamic