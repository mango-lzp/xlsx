import { WorkSheet } from 'xlsx'

// 获取ColumnIndex,zero based
export const getColumnIndex = (cellName: string) => {
  if (!cellName) {
    return null
  }
  const columnReference = cellName.replace(/\d.*/, '')
  let columnNumber = -1
  let mulitplier = 1

  //working from the end of the letters take the ASCII code less 64 (so A = 1, B =2...etc)
  //then multiply that number by our multiplier (which starts at 1)
  //multiply our multiplier by 26 as there are 26 letters
  columnReference
    .split('')
    .reverse()
    .forEach(char => {
      columnNumber += mulitplier * (char.charCodeAt(0) - 64)
      mulitplier = mulitplier * 26
    })
  //the result is zero based
  return columnNumber
}

// Sheet转换为二维数组
export const sheetToAoa = (sheet: WorkSheet) => {
  const cellNames = Object.keys(sheet).filter(cv => !cv.match('!'))
  const table: Array<Array<string>> = []
  cellNames.forEach(cellName => {
    const rowIndex = Number(cellName.match(/\d.*/)?.[0])
    const columnIndex = getColumnIndex(cellName)
    if (rowIndex > 0 && rowIndex !== NaN && columnIndex !== null) {
      ;(table[rowIndex - 1] || (table[rowIndex - 1] = []))[columnIndex] = sheet[cellName].v ?? null
    }
  })
  return table
}