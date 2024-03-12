import './App.css';
import {Button} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import usePDFExport from './hooks/usePDFExport';

import Table from './components/Table';

function App() {
    const {handleExport, exporting} = usePDFExport('table', 'price.pdf');

    return (
        <>
            <Table />
            <Button type='primary' onClick={handleExport} icon={<DownloadOutlined/>} disabled={exporting}
                    size={'large'}>
                {exporting ? 'Exporting...' : 'Export to PDF'}
            </Button>
        </>
    );
}

export default App;
