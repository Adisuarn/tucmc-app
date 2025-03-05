import path from 'path'
import { PDFDocument, PageSizes, rgb, PDFPage, PDFFont } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import * as fs from 'fs/promises'
import { formatThaiDate, startPeriodtoTime, endPeriodtoTime } from '../constants/pdfconstant'
import { PDF_CONFIG } from '../constants/pdfconstant'
import { wrapText, justifyText, drawDocumentHeader, PDFGenerationError } from '../utils/pdfutils'
import type { docData } from '../types/activity.type'

async function loadPDFAssets(pdfDoc: PDFDocument) {
  try {
    pdfDoc.registerFontkit(fontkit)
    const assetsPath = path.join(process.cwd(), PDF_CONFIG.ASSETS_PATH)

    const [THSarabunByte, THSarabunBoldByte, TULogoByte] = await Promise.all([
      fs.readFile(path.join(assetsPath, 'THSarabunNew.ttf')),
      fs.readFile(path.join(assetsPath, 'THSarabunNew Bold.ttf')),
      fs.readFile(path.join(assetsPath, 'Logo.png'))
    ])

    const [THSarabun, THSarabunBold, TULogo] = await Promise.all([
      pdfDoc.embedFont(THSarabunByte),
      pdfDoc.embedFont(THSarabunBoldByte),
      pdfDoc.embedPng(TULogoByte)
    ])

    return { THSarabun, THSarabunBold, TULogo }
  } catch (error) {
    throw new PDFGenerationError('Failed to load PDF assets', error as Error)
  }
}

async function drawStudentList(
  page: PDFPage,
  students: docData['students'],
  font: PDFFont,
  finalYPosition: number
) {
  students.forEach((student, index) => {
    const studentY = (finalYPosition - 20) - 58 - (index * 20)

    page.drawRectangle({
      x: PDF_CONFIG.MARGIN.left,
      y: studentY - 7,
      width: 220,
      height: 20,
      borderWidth: 0.5,
      borderColor: rgb(0, 0, 0),
    })

    page.drawText(
      `${index + 1}. ${student.firstName} ${student.lastName} เลขที่ ${student.number}`, {
      font: font,
      size: PDF_CONFIG.FONT_SIZE,
      x: PDF_CONFIG.MARGIN.left + 10,
      y: studentY
    })
  })
}

async function drawSignature(
  page: PDFPage,
  item: docData,
  font: PDFFont,
  finalYPosition: number
) {
  const signatureY = finalYPosition - 100

  page.drawText('ขอแสดงความนับถือ', {
    font: font,
    size: PDF_CONFIG.FONT_SIZE,
    x: PDF_CONFIG.MARGIN.left * 5.5,
    y: signatureY
  })

  const signatureLine = '(.......................................................)'
  const signatureLineX = (PDF_CONFIG.MARGIN.left * 5) + 5
  const signatureLineY = signatureY - 65

  page.drawText(signatureLine, {
    font: font,
    size: PDF_CONFIG.FONT_SIZE,
    x: signatureLineX,
    y: signatureLineY
  })

  const signatureLineWidth = font.widthOfTextAtSize(signatureLine, PDF_CONFIG.FONT_SIZE)
  const TName = `ครู${item.TFirstName} ${item.TLastName}`
  const TNameTextWidth = font.widthOfTextAtSize(TName, PDF_CONFIG.FONT_SIZE)
  const teacherNameX = signatureLineX + (signatureLineWidth - TNameTextWidth) / 2

  page.drawText(TName, {
    font: font,
    size: PDF_CONFIG.FONT_SIZE,
    x: teacherNameX,
    y: signatureLineY - 15
  })

  const teacherPositionX = signatureLineX + (signatureLineWidth - font.widthOfTextAtSize(item.TPosition, PDF_CONFIG.FONT_SIZE)) / 2

  page.drawText(item.TPosition, {
    font: font,
    size: PDF_CONFIG.FONT_SIZE,
    x: teacherPositionX,
    y: signatureLineY - 30
  })

  return { signatureLineY }
}

export const documentBuilder = async (data: docData[]): Promise<string> => {
  try {
    const pdfDoc = await PDFDocument.create()
    const assets = await loadPDFAssets(pdfDoc)

    let currentPage = pdfDoc.addPage(PageSizes.A4)
    let yOffset = 0
    let isFirstDocOnPage = true

    for (const item of data) {
      if (!isFirstDocOnPage && yOffset + 230 > 680) {
        currentPage = pdfDoc.addPage(PageSizes.A4)
        yOffset = 0
        isFirstDocOnPage = true
      }

      const startY = isFirstDocOnPage ? 780 : 780 - yOffset

      // Draw document header
      drawDocumentHeader(currentPage, assets, item, startY, formatThaiDate)

      // Draw reference text and event details
      const referenceText = `เนื่องจากมีนักเรียนห้อง ${item.room} จำนวน ${item.students.length} คน ดังมีรายชื่อท้ายหนังสือขออนุญาตฉบับนี้ มีความจำเป็นต้องไป`
      const refTextWidth = assets.THSarabun.widthOfTextAtSize(referenceText, PDF_CONFIG.FONT_SIZE)

      currentPage.drawText(referenceText, {
        font: assets.THSarabun,
        size: PDF_CONFIG.FONT_SIZE,
        x: PDF_CONFIG.MARGIN.left + 70,
        y: startY - 80
      })

      const EventText = `${item.activityName} ใน${formatThaiDate(item.date)} ตั้งแต่เวลา ${startPeriodtoTime[item.startPeriod]} น. ถึงเวลา ${endPeriodtoTime[item.endPeriod]} น.`
      const eventTextLines = wrapText(EventText, refTextWidth, assets.THSarabun, PDF_CONFIG.FONT_SIZE)

      const yPosition = startY - 100
      const lineHeight = 20

      eventTextLines.forEach((line, index) => {
        //const justifiedLine = justifyText(line, refTextWidth, assets.THSarabun, PDF_CONFIG.FONT_SIZE)
        currentPage.drawText(line, {
          font: assets.THSarabun,
          size: PDF_CONFIG.FONT_SIZE,
          x: PDF_CONFIG.MARGIN.left,
          y: yPosition - (index * lineHeight)
        })
      })

      const finalYPosition = yPosition - ((eventTextLines.length - 1) * lineHeight) - lineHeight

      currentPage.drawText(
        'ขอความกรุณาคุณครูผู้สอน อนุญาตให้นักเรียนออกจากห้องเรียนไปทำกิจกรรมตามเวลาดังกล่าว และขอ', {
        font: assets.THSarabun,
        size: PDF_CONFIG.FONT_SIZE,
        x: PDF_CONFIG.MARGIN.left + 70,
        y: finalYPosition
      })

      currentPage.drawText(
        'ความอนุเคราะห์เรื่องเวลาเรียนในช่วงนี้เป็นชั่วโมงกิจกรรม ซึ่งไม่นับเป็นการขาดเรียน ขอขอบคุณในความร่วมมือของคุณครู', {
        font: assets.THSarabun,
        size: PDF_CONFIG.FONT_SIZE,
        x: PDF_CONFIG.MARGIN.left,
        y: finalYPosition - 20
      })

      // Draw student list box
      currentPage.drawRectangle({
        x: PDF_CONFIG.MARGIN.left,
        y: (finalYPosition - 20) - 45,
        borderWidth: 0.5,
        borderColor: rgb(0, 0, 0),
        width: 220,
        height: 35
      })

      currentPage.drawText(
        `ขออนุญาตนักเรียนห้องนี้จำนวน ${item.students.length} คน ดังนี้`, {
        font: assets.THSarabunBold,
        size: PDF_CONFIG.FONT_SIZE,
        x: PDF_CONFIG.MARGIN.left + 5,
        y: (finalYPosition - 20) - 25
      })

      // Draw student list
      await drawStudentList(currentPage, item.students, assets.THSarabun, finalYPosition)

      // Draw signature section
      const { signatureLineY } = await drawSignature(currentPage, item, assets.THSarabun, finalYPosition)

      if (isFirstDocOnPage) {
        currentPage.drawText(
          '-----------------------------------------------------------------------------------------------------------------------------------------------------', {
          font: assets.THSarabun,
          size: PDF_CONFIG.FONT_SIZE,
          x: PDF_CONFIG.MARGIN.left,
          y: signatureLineY - 50
        })
      }

      const docEndY = signatureLineY - 80
      const docHeight = startY - docEndY
      yOffset += docHeight + 30
      isFirstDocOnPage = false
    }

    return await pdfDoc.saveAsBase64({ dataUri: true })

  } catch (err) {
    console.error('Error generating PDF:', err)
    if (err instanceof PDFGenerationError) {
      throw err
    }
    throw new PDFGenerationError('Failed to generate PDF', err as Error)
  }
}
