import path from 'path'
import { PDFDocument, PDFFont, PageSizes, rgb } from 'pdf-lib'
import { formatThaiDate, startPeriodtoTime, endPeriodtoTime } from '../constants/pdfconstant'
import fontkit from '@pdf-lib/fontkit'
import * as fs from 'fs/promises'
import type { docData } from '../types/activity.type'
import { error } from 'elysia'

export const documentBuilder = async (data: docData[]) => {
  try {
    const pdfDoc = await PDFDocument.create()

    pdfDoc.registerFontkit(fontkit)

    const THSarabunPath = path.join(process.cwd(), './src/server/api/assets', 'THSarabunNew.ttf')
    const THSarabunByte = await fs.readFile(THSarabunPath)

    const THSarabunBoldPath = path.join(process.cwd(), './src/server/api/assets', 'THSarabunNew Bold.ttf')
    const THSarabunBoldByte = await fs.readFile(THSarabunBoldPath)

    const TULogoPath = path.join(process.cwd(), './src/server/api/assets', 'Logo.png')
    const TULogoByte = await fs.readFile(TULogoPath)

    const THSarabun = await pdfDoc.embedFont(THSarabunByte)
    const THSarabunBold = await pdfDoc.embedFont(THSarabunBoldByte)
    const TULogo = await pdfDoc.embedPng(TULogoByte)

    let currentPage = pdfDoc.addPage(PageSizes.A4)
    let yOffset = 0
    let isFirstDocOnPage = true

    const MARGIN = {
      left: 70,
      right: 70
    }

    // Calculate document height based on content
    //const calculateDocumentHeight = (studentCount: number): number => {
      // Base height for document + extra space for each student
      //const baseHeight = 230
      //const studentsHeight = Math.max(0, studentCount - 3) * 10 // Extra height for students
      //return baseHeight
    //}

    const baseHeight = 230

    for (const item of data) {
      if (!item) continue
      // Check document height to determine if we need a new page
      //const documentHeight = calculateDocumentHeight(item.students.length!)

      if (!isFirstDocOnPage && yOffset + baseHeight > 680) {
        currentPage = pdfDoc.addPage(PageSizes.A4)
        yOffset = 0
        isFirstDocOnPage = true
      }

      // Calculate starting Y position based on whether this is first doc or not
      const startY = isFirstDocOnPage ? 780 : 780 - yOffset

      // Draw logo
      currentPage.drawImage(TULogo, {
        width: TULogo.width * 0.3,
        height: TULogo.height * 0.3,
        x: 275,
        y: startY,
      })

      // Draw title
      currentPage.drawText(
        'แบบขออนุญาตให้นักเรียนมาทำกิจกรรม', {
        font: THSarabunBold,
        size: 14,
        x: 220,
        y: startY - 30,
      })

      // Draw date
      currentPage.drawText(
        `${formatThaiDate(item.date)}`, {
        font: THSarabun,
        size: 14,
        x: 400,
        y: startY - 45,
      })

      // Draw period
      currentPage.drawText(
        `เรียน คุณครูผู้สอนคาบที่ ${item.startPeriod}-${item.endPeriod}`, {
        font: THSarabun,
        size: 14,
        x: MARGIN.left,
        y: startY - 60
      })

      // Reference text
      const referenceText = `เนื่องจากมีนักเรียนห้อง ${item.room} ชั้น  ${item.students[0]?.level}  จำนวน ${item.students.length} คน  ดังมีรายชื่อท้ายหนังสือขออนุญาตฉบับนี้  นั้นได้รับ`

      currentPage.drawText(
        referenceText, {
        font: THSarabun,
        size: 14,
        x: MARGIN.left + 70,
        y: startY - 80
      })

      const refTextWidth = THSarabun.widthOfTextAtSize(referenceText, 14)

      const wrapText = (text: string, maxWidth: number, font: PDFFont, fontSize: number) => {
        const words = text.split(' ')
        const lines: string[] = []
        let currentLine = words[0]

        for (let i = 1; i < words.length; i++) {
          const word = words[i]
          const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize)

          if (width < maxWidth + 70) {
            currentLine += ' ' + word
          } else {
            lines.push(currentLine!)
            currentLine = word
          }
        }

        lines.push(currentLine!)
        return lines
      }

      const justifyText = (line: string, targetWidth: number, font: PDFFont, fontSize: number) => {
        const currentWidth = font.widthOfTextAtSize(line, fontSize)

        if (!line.includes(' ')) {
          return line
        }

        const spaces = line.split(' ').length - 1
        if (spaces === 0) return line

        const extraSpaceNeeded = targetWidth - currentWidth
        const extraSpacePerGap = extraSpaceNeeded / spaces
        const words = line.split(' ')
        let justifiedText = words[0]
        let remainingExtraSpace = extraSpaceNeeded

        for (let i = 1; i < words.length; i++) {
          const spacesToAdd = i < words.length - 1
            ? Math.floor(extraSpacePerGap)
            : Math.ceil(remainingExtraSpace / 5)

          const extraSpace = ' '.repeat(Math.max(1, spacesToAdd))
          justifiedText += ' ' + extraSpace + words[i]
          remainingExtraSpace -= spacesToAdd * 1.3
        }

        const justifiedWidth = font.widthOfTextAtSize(justifiedText!, fontSize)
        if (targetWidth - justifiedWidth > 10) {
          justifiedText += ' '.repeat(Math.ceil((targetWidth - justifiedWidth) / 5))
        }

        return justifiedText
      }

      const EventText = `อนุญาต ให้ไป${item.activityName} ใน${formatThaiDate(item.date)} ตั้งแต่เวลา ${startPeriodtoTime[item.startPeriod]} น. ถึงเวลา ${endPeriodtoTime[item.endPeriod]} น.`
      const eventTextLines = wrapText(EventText, refTextWidth, THSarabun, 14)

      for (let i = 0; i < eventTextLines.length - 1; i++) {
        eventTextLines[i] = justifyText(eventTextLines[i]!, refTextWidth, THSarabun, 14)!
      }

      const yPosition = startY - 100
      const lineHeight = 20

      eventTextLines.forEach((line, index) => {
        currentPage.drawText(line, {
          font: THSarabun,
          size: 14,
          x: MARGIN.left,
          y: yPosition - (index * lineHeight)
        })
      })

      const finalYPosition = yPosition - ((eventTextLines.length - 1) * lineHeight) - lineHeight

      currentPage.drawText(
        'ขอความกรุณาคุณครูผู้สอน อนุญาตให้นักเรียนออกจากห้องเรียนไปทำกิจกรรมตามเวลาดังกล่าว และขอ', {
        font: THSarabun,
        size: 14,
        x: MARGIN.left + 70,
        y: finalYPosition
      })

      currentPage.drawText(
        'ความอนุเคราะห์เรื่องเวลาเรียนในช่วงนี้เป็นชั่วโมงกิจกรรม ซึ่งไม่นับเป็นการขาดเรียน ขอขอบคุณในความร่วมมือของคุณครู', {
        font: THSarabun,
        size: 14,
        x: MARGIN.left,
        y: finalYPosition - 20
      })

      currentPage.drawRectangle({
        x: MARGIN.left,
        y: (finalYPosition - 20) - 45,
        borderWidth: 0.5,
        borderColor: rgb(0, 0, 0),
        width: 220,
        height: 35
      })

      currentPage.drawText(
        `ขออนุญาตนักเรียนห้องนี้จำนวน ${item.students.length} คน ดังนี้`, {
        font: THSarabunBold,
        size: 14,
        x: MARGIN.left + 5,
        y: (finalYPosition - 20) - 25
      })

      // Student list
      item.students.forEach((student, index) => {
        const studentY = (finalYPosition - 20) - 58 - (index * 20)

        currentPage.drawRectangle({
          x: MARGIN.left,
          y: studentY - 7,
          width: 220,
          height: 20,
          borderWidth: 0.5,
          borderColor: rgb(0, 0, 0),
        })

        currentPage.drawText(
          `${index + 1}. ${student.firstName + ' ' + student.lastName} เลขที่ ${student.number}`, {
          font: THSarabun,
          size: 14,
          x: MARGIN.left + 10,
          y: studentY
        })
      })

      const signatureY = finalYPosition - 100

      currentPage.drawText(
        'ขอแสดงความนับถือ', {
        font: THSarabun,
        size: 14,
        x: MARGIN.left * 5.5,
        y: signatureY
      })

      const signatureLine = '(.......................................................)'
      const signatureLineX = (MARGIN.left * 5) + 5
      const signatureLineY = signatureY - 65

      currentPage.drawText(
        signatureLine, {
        font: THSarabun,
        size: 14,
        x: signatureLineX,
        y: signatureLineY
      })

      const signatureLineWidth = THSarabun.widthOfTextAtSize(signatureLine, 14)

      const TName = `ครู${item.TFirstName} ${item.TLastName}`
      const TNameTextWidth = THSarabun.widthOfTextAtSize(TName, 14)

      const teacherNameX = signatureLineX + (signatureLineWidth - TNameTextWidth) / 2

      currentPage.drawText(
        TName, {
        font: THSarabun,
        size: 14,
        x: teacherNameX,
        y: signatureLineY - 15
      })

      const teacherPositionX = signatureLineX + (signatureLineWidth - THSarabun.widthOfTextAtSize(item.TPosition, 14)) / 2

      currentPage.drawText(
        item.TPosition, {
        font: THSarabun,
        size: 14,
        x: teacherPositionX,
        y: signatureLineY - 30
      })

      if (isFirstDocOnPage) {
        currentPage.drawText(
          '-----------------------------------------------------------------------------------------------------------------------------------------------------', {
          font: THSarabun,
          size: 14,
          x: MARGIN.left,
          y: signatureLineY - 50
        })
      }

      const docEndY = signatureLineY - 80
      const docHeight = startY - docEndY
      yOffset += docHeight + 30
      isFirstDocOnPage = false
    }

    const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    return base64DataUri

  } catch (err) {
    console.error('Error generating PDF:', err)
    return error(500, 'Failed to generate PDF. Please try again.')
  }
}
