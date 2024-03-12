import {Select} from 'antd';
import React, {useState} from 'react';

interface DropdownProps {
    tagsOptions: { label: string; value: string; }[];
    brandOptions: { label: string; value: string; }[];
    setRequestString: (requestString: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({tagsOptions, brandOptions, setRequestString}) => {
    const [tagsValue, setTagsValue] = useState<string[]>([]);
    const [brandValue, setBrandValue] = useState<string>();


    const handleTagsChange = (value: string[]) => {
        setTagsValue(value);
        updateRequestString(value, brandValue);
    };

    const handleBrandChange = (value: string) => {
        setBrandValue(value);
        updateRequestString(tagsValue, value);
    };

    const updateRequestString = (tags: string[], brand: string | undefined) => {
        const tagsQueryString = tags.length > 0 ? `product_tags=${tags.join(',')}` : '';
        const brandQueryString = brand && brand.length > 0 ? `brand=${brand}` : '';

        // Constructing the request string based on whether both tagsQueryString and brandQueryString are present,
        // only tagsQueryString is present, only brandQueryString is present, or neither is present.
        const requestString = tagsQueryString && brandQueryString // Check if both tagsQueryString and brandQueryString exist
            ? `?${tagsQueryString}&${brandQueryString}` // If both exist, concatenate them with '&' as the separator
            : tagsQueryString // If only tagsQueryString exists
                ? `?${tagsQueryString}` // Construct the request string with tagsQueryString
                : brandQueryString // If only brandQueryString exists
                    ? `?${brandQueryString}` // Construct the request string with brandQueryString
                    : ''; // If neither tagsQueryString nor brandsQueryString exist, set the request string as empty string

        setRequestString(requestString);
    };

    return (
        <>
            <Select
                mode="multiple"
                style={{width: '20%', marginBottom: '1rem'}}
                placeholder="Select Tags"
                onChange={handleTagsChange}
                options={tagsOptions}
                value={tagsValue}
            />
            <Select
                allowClear={true}
                style={{width: '20%', marginBottom: '1rem', marginLeft: '1rem'}}
                placeholder="Select Brand"
                onChange={handleBrandChange}
                options={brandOptions}
                value={brandValue}
            />
        </>
    )
}

export default DropdownComponent
