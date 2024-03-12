import {Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useGetProducts} from '../hooks/useGetProducts';
import type {Product} from '../types/Product';
import DropdownComponent from './Dropdown';
import tags from '../json/tags.json';
import brands from '../json/brands.json';
import SwitcherComponent from "./Switcher";

const TableComponent = () => {
    const [requestString, setRequestString] = useState<string>('');
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [dataSource, setDataSource] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortTypes, setSortTypes] = useState([]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image_link',
            render: (theImageURL: string) => (theImageURL && <img width={70} alt={'error'} src={theImageURL}/>)
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category: string) => (
                category && category.charAt(0).toUpperCase() + category.slice(1)
            )
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            render: (brand: string) => (
                brand && brand.charAt(0).toUpperCase() + brand.slice(1)
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a: Product, b: Product) => Number(a.price) - Number(b.price),

        },
        {
            title: 'Product type',
            dataIndex: 'product_type',
            render: (product_type: string) => (
                product_type && product_type.charAt(0).toUpperCase() + product_type.slice(1)
            )
        },
        {
            title: 'Product rating',
            dataIndex: 'rating',
            sorter: (a: Product, b: Product) => Number(a.rating) - Number(b.rating),
            render: (rating: number) => (
                <meter value={rating} min={0} max={5}
                       title={rating ? rating.toString() : '0.0'}>{rating?.toString()}</meter>
            )
        },
    ];

    const {data, error, getProducts} = useGetProducts();

    useEffect(() => {
        setLoading(true);
        getProducts(requestString).then(() => !error && setLoading(false));
    }, [requestString]);

    useEffect(() => {
        if (data) {
            let sortedData = [...data];

            if (sortTypes.length > 0) {
                sortedData.sort((a, b) => {
                    for (let sortType of sortTypes) {
                        if (a[sortType] < b[sortType]) return -1;
                        if (a[sortType] > b[sortType]) return 1;
                    }
                    return 0;
                });
            }

            const updatedData = sortedData.map((item, index) => ({
                ...item,
                key: `product-${index}`,
            }));

            setDataSource(updatedData);
        }
    }, [data, sortTypes]);

    const handleSortChange = (values: any) => {
        setSortTypes(values);
    };
    const handleRowExpand = (expanded: boolean, record: any) => {
        const keys = expanded ? [record.key] : [];
        setExpandedRowKeys(keys);
    };

    return (
        <>
            <DropdownComponent tagsOptions={tags} brandOptions={brands} setRequestString={setRequestString}/>
            <SwitcherComponent onSortChange={handleSortChange}/>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                expandable={{
                    expandedRowRender: (product) => (
                        <>
                            {product.product_colors.map((color: {
                                hex_value: string | undefined;
                                colour_name: string | undefined;
                            }, index: number) => (
                                <Tag color={color.hex_value} style={{margin: '0.1rem'}} key={index}>{color.colour_name}</Tag>
                            ))}
                        </>
                    ),
                    onExpand: handleRowExpand,
                    expandedRowKeys: expandedRowKeys,
                }}
            />
        </>
    )
}

export default TableComponent
