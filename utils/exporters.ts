import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import type { HeadlineRecord } from './headlines';

export function ensureOutputDir(): string {
  const outputDir = path.resolve(process.cwd(), 'output');
  fs.mkdirSync(outputDir, { recursive: true });
  return outputDir;
}

export function exportToCsv(records: HeadlineRecord[], fileName: string): string {
  const outputDir = ensureOutputDir();
  const csvPath = path.join(outputDir, fileName);
  const rows = [
    ['title', 'href', 'sourceBucket', 'isGloboDomain'],
    ...records.map((r) => [r.title, r.href, r.sourceBucket, String(r.isGloboDomain)])
  ];

  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  fs.writeFileSync(csvPath, csv, 'utf8');
  return csvPath;
}

export function exportToExcel(records: HeadlineRecord[], fileName: string): string {
  const outputDir = ensureOutputDir();
  const excelPath = path.join(outputDir, fileName);
  const worksheet = XLSX.utils.json_to_sheet(records);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Headlines');
  XLSX.writeFile(workbook, excelPath);
  return excelPath;
}
