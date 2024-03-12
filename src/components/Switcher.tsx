import React, {useState} from 'react';
import {Space, Switch} from 'antd';

interface SwitcherComponentProps {
    onSortChange: (checkedValues: string[]) => void;
}

const SwitcherComponent: React.FC<SwitcherComponentProps> = ({onSortChange}) => {
    const [switchStates, setSwitchStates] = useState({
        product_type: false,
        brand: false,
        category: false,
    });

    const handleSwitchChange = (value: boolean, key: string) => {
        const newSwitchStates = {...switchStates, [key]: value};
        setSwitchStates(newSwitchStates);

        const checkedValues = Object.entries(newSwitchStates)
            .filter(([_, val]) => val)
            .map(([key, _]) => key);

        onSortChange(checkedValues);
    };

    return (
        <Space style={{marginLeft: '2rem'}} direction="horizontal">
            <Switch checkedChildren="Type" unCheckedChildren="Type"
                    onChange={(checked) => handleSwitchChange(checked, 'product_type')}/>
            <Switch checkedChildren="Brand" unCheckedChildren="Brand"
                    onChange={(checked) => handleSwitchChange(checked, 'brand')}/>
            <Switch checkedChildren="Сategory" unCheckedChildren="Сategory"
                    onChange={(checked) => handleSwitchChange(checked, 'category')}/>
        </Space>
    );
};

export default SwitcherComponent;
