// @ts-nocheck
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const initExcelConfig = (config) => {
	config.creator ??= 'Crossnet';
	config.lastModifiedBy ??= 'Crossnet';
	config.creator ??= new Date();
	config.modified ??= new Date();
	config.lastPrinted ??= new Date();
	config.sheetName ??= 'Sheet 1';
	config.fileName ??= 'Export Data';
	return config;
};

export const exportToExcel = async (data, config) => {
	config = initExcelConfig(config);

	const workbook = new ExcelJS.Workbook();
	workbook.creator = config.creator;
	workbook.lastModifiedBy = config.lastModifiedBy;
	workbook.created = config.created;
	workbook.modified = config.modified;
	workbook.lastPrinted = config.lastPrinted;

	const sheet = workbook.addWorksheet(config.sheetName);

	// sheet.columns = [
	// 	{ header: 'ID', key: 'id' },
	// 	{ header: 'Name', key: 'name' },
	// 	{ header: 'Age', key: 'age' }
	// ];
	sheet.columns = data.columns;

	// sheet.addRow({ id: 1, name: 'John Doe', age: '35' });
	data.rows.forEach((obj) => {
		sheet.addRow(obj);
	});

	const buf = await workbook.xlsx.writeBuffer();
	FileSaver.saveAs(new Blob([buf]), `${config.fileName}.xlsx`);
};
