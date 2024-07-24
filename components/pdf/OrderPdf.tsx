'use client'

import { Button } from '@nextui-org/react';
import { Document, Image, Link, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer'
import dayjs from 'dayjs';
import { FC } from 'react';
import { BsFiletypePdf } from "react-icons/bs"





const fakeData = {
    address_shopping: {
        city: "Bogotá",
        phone_number: "+57 123 456 7890",
        address: "Carrera 123 #45-67",
        postal_code: "111111",
    },
    client: {
        name: "Juan Pérez",
        type_identification: "C.C.",
        identification: "123456789",
    },
    code: "ORD123456",
    createdAt: new Date(),
    value: 1234567,
    iva: 234567,
    products: [
        { name: "Producto A", cant: 2, value: 100000 },
        { name: "Producto B", cant: 1, value: 300000 }
    ]
}

const MyDoc: FC = () => {

    return <Document>
        <Page size="A4">
            <View style={{
                width: '100vw',
                height: 8,
                backgroundColor: '#2d6ca8'
            }}></View>
            <View style={{ padding: 32 }}>
                <Text fixed>
                    BATERY
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 20
                }}>
                    <View style={{
                        width: '50%',
                        borderLeft: 2,
                        borderColor: '#2d6ca8',
                        paddingLeft: 6
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: "#2d6ca8",
                            fontWeight: 900,
                            marginBottom: 10
                        }}>INFORMACIÓN DE ENVIO</Text>
                        <Text style={{ fontSize: 12 }}>{fakeData.address_shopping.city}</Text>
                        <Text style={{ fontSize: 12 }}>{fakeData.address_shopping.phone_number}</Text>
                        <Text style={{ fontSize: 12 }}>{fakeData.address_shopping.address}</Text>
                        <Text style={{ fontSize: 12 }}>Codigo postal: {fakeData.address_shopping.postal_code}</Text>
                        <Text style={{ fontSize: 12 }}>{fakeData.client.name}</Text>
                        <Text style={{ fontSize: 12 }}>{fakeData.client.type_identification} {fakeData.client.identification}</Text>
                    </View>
                    <View style={{
                        width: '50%',
                        borderLeft: 2,
                        borderColor: '#2d6ca8',
                        paddingLeft: 6,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: "#2d6ca8",
                            fontWeight: 900,
                            marginBottom: 10
                        }}>LOCACIÓN DE VENTA</Text>
                        <Text style={{ fontSize: 12 }}>Bogotá Colombia</Text>
                        <Text style={{ fontSize: 12 }}>+57 601 6855462</Text>
                        <Text style={{ fontSize: 12 }}>Cra 91 # 136 12</Text>
                        <Text style={{ fontSize: 12 }}>Codigo postal 111121</Text>
                        <Text style={{ fontSize: 12 }}>Nit: 900.008.003</Text>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#2d6ca8',
                    marginTop: 20
                }}></View>
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    gap: 5,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        padding: 10
                    }}>
                        <Text style={{ fontSize: 12, fontWeight: 900 }}>Número de orden</Text>
                        <Text style={{ fontSize: 18, fontWeight: 600 }}>{fakeData.code}</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        padding: 10
                    }}>
                        <Text style={{ fontSize: 12, fontWeight: 900 }}>Fecha de registro</Text>
                        <Text style={{ fontSize: 18, fontWeight: 600 }}>{dayjs(fakeData.createdAt).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        backgroundColor: '#edf2fd',
                        padding: 10
                    }}>
                        <Text style={{ fontSize: 12, fontWeight: 900 }}>Valor de orden</Text>
                        <Text style={{ fontSize: 18, fontWeight: 600 }}>
                            {Number(fakeData.value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#2d6ca8',
                    marginTop: 20
                }}></View>
                <View style={{
                    border: 1,
                    borderColor: '#2d6ca8',
                    marginTop: 20
                }}>
                    <View style={{
                        width: '100%',
                        borderBottom: 1,
                        borderBottomColor: '#2d6ca8',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        fontSize: 14,
                        fontWeight: 900,
                        padding: 6
                    }}>
                        <Text style={{ width: '20%', textAlign: 'center' }}>Producto</Text>
                        <Text style={{ width: '20%', textAlign: 'center' }}>Cantidad</Text>
                        <Text style={{ width: '20%', textAlign: 'center' }}>Valor Unidad</Text>
                        <Text style={{ width: '20%', textAlign: 'center' }}>Valor Iva</Text>
                        <Text style={{ width: '20%', textAlign: 'center' }}>Valor Total</Text>
                    </View>
                    {fakeData.products.map((p, i) => (
                        <View
                            key={i}
                            style={{
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                fontSize: 14,
                                fontWeight: 300,
                                padding: 6
                            }}>
                            <Text style={{ width: '20%', textAlign: 'center' }}>{p.name}</Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>{p.cant}</Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>
                                {Number(p.value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                            </Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>
                                {Number(p.value * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                            </Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>
                                {Number(p.value * p.cant).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={{
                    marginTop: 20,
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Text style={{ fontSize: 10, fontWeight: 900 }}>Nota</Text>
                        <Text style={{ fontSize: 10, fontWeight: 300 }}>
                            Todos los productos cuentan con 30 días de garantía a partir de {dayjs(fakeData.createdAt).format('DD/MM/YYYY')}. Si tiene algún comentario o alguna inquietud, no dude en contactarnos.
                        </Text>
                    </View>
                    <View style={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Text style={{ fontSize: 10, padding: 10, fontWeight: 300, textAlign: 'right' }}>
                            SUB TOTAL {Number(fakeData.value - fakeData.iva).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        </Text>
                        <Text style={{ fontSize: 10, padding: 10, fontWeight: 300, textAlign: 'right' }}>IVA 19%</Text>
                        <Text style={{ fontSize: 10, padding: 10, fontWeight: 300, textAlign: 'right' }}>
                            IVA {Number(fakeData.iva).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        </Text>
                        <Text
                            style={{
                                padding: 10,
                                fontSize: 14,
                                fontWeight: 900,
                                backgroundColor: '#edf2fd',
                                textAlign: 'right'
                            }}
                        >
                            TOTAL {Number(fakeData.value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                        </Text>
                    </View>
                </View>
            </View>
            <Text style={{
                position: 'absolute',
                fontSize: 12,
                bottom: 73,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'grey',
            }} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
            <View style={{
                position: 'absolute',
                fontSize: 12,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                backgroundColor: '#2d6ca8',
                height: 70,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                color: 'white',
                paddingHorizontal: 32,
                paddingVertical: 16
            }}>
                <View style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                    <Text>Desarrollado por Coffee Labs</Text>
                    <Text>www.coffeelabs.com</Text>
                </View>
                <View style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                    <Text>Whatsapp me: <Link style={{ textDecoration: 'none', color: 'white', fontWeight: 900 }} src='https://wa.me/573143223129'>+57 314 322 31 29</Link></Text>
                    <Text>coffeelabs@mail.com</Text>
                </View>
            </View>
        </Page>
    </Document>
};

export const ButtonPdf: FC = () => (
    <div>
        <Button variant='ghost' startContent={<BsFiletypePdf />}>
            <PDFDownloadLink document={<MyDoc />} fileName="factura.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Cargando factura...' : 'Factura'
                }
            </PDFDownloadLink>
        </Button>
    </div>
);