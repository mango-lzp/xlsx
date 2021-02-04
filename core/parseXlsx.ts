import xlsx from 'xlsx'
import path from 'path'
import fs from 'fs'
import mustache from 'mustache'

// path && fs import出错。 yarn add @types/node --dev
// import 出错。修改tsconfig - module & target


// 表头行数
const TABLE_TITLE_INDEX = 4

const filePath = path.resolve(__dirname, '../excel/2020.1.xlsx')

// 读取文件
const workbook = xlsx.readFile(filePath)

console.log(workbook)

export const build = () => {}