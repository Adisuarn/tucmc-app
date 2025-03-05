import { PDFFont, PDFPage, PDFImage } from 'pdf-lib'
import { PDF_CONFIG } from '../constants/pdfconstant'
import type { docData } from '../types/activity.type'

export class PDFGenerationError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message)
    this.name = 'PDFGenerationError'
  }
}

export const wrapText = (
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] => {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize)

    if (width < maxWidth + 60) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine!)
      currentLine = word
    }
  }

  lines.push(currentLine!)
  return lines
}

export const justifyText = (
  line: string,
  targetWidth: number,
  font: PDFFont,
  fontSize: number
): string => {
  if (!line.includes(' ')) return line

  const currentWidth = font.widthOfTextAtSize(line, fontSize)
  const spaces = line.split(' ').length - 1
  if (spaces === 0) return line

  const extraSpaceNeeded = targetWidth - currentWidth
  const extraSpacePerGap = extraSpaceNeeded / spaces
  const words = line.split(' ')

  return words.reduce((justified, word, i) => {
    if (i === 0) return word

    const spacesToAdd = i < words.length - 1
      ? Math.floor(extraSpacePerGap)
      : Math.ceil((targetWidth - font.widthOfTextAtSize(justified, fontSize)) / 5)

    return `${justified} ${' '.repeat(Math.max(1, spacesToAdd))}${word}`
  }, '')
}

export const drawDocumentHeader = (
  page: PDFPage,
  assets: {
    TULogo: PDFImage
    THSarabunBold: PDFFont
    THSarabun: PDFFont
  },
  item: docData,
  startY: number,
  formatThaiDate: (date: string) => string
): void => {
  const { TULogo, THSarabunBold, THSarabun } = assets

  page.drawImage(TULogo, {
    width: TULogo.width * 0.3,
    height: TULogo.height * 0.3,
    x: 275,
    y: startY,
  })

  page.drawText('แบบขออนุญาตให้นักเรียนมาทำกิจกรรม', {
    font: THSarabunBold,
    size: PDF_CONFIG.FONT_SIZE,
    x: 220,
    y: startY - 30,
  })

  page.drawText(formatThaiDate(item.date), {
    font: THSarabun,
    size: PDF_CONFIG.FONT_SIZE,
    x: 420,
    y: startY - 45,
  })

  page.drawText(
    `เรียน คุณครูผู้สอนคาบที่ ${item.startPeriod}-${item.endPeriod}`, {
    font: THSarabun,
    size: PDF_CONFIG.FONT_SIZE,
    x: PDF_CONFIG.MARGIN.left,
    y: startY - 60
  })
}
