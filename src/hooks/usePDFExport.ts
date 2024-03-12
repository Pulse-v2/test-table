import {useState} from 'react';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

interface PDFExportHook {
    handleExport: () => void;
    exporting: boolean;
}

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

export const usePDFExport = (tableSelector: string, fileName: string): PDFExportHook => {
    const [exporting, setExporting] = useState<boolean>(false);

    const handleExport = () => {
        setExporting(true);

        setTimeout(() => {
            const doc = new jsPDF() as any;
            doc.autoTable({html: tableSelector});
            doc.save(fileName);
            setExporting(false);
        }, 100);
    };

    return {handleExport, exporting};
};

export default usePDFExport;
