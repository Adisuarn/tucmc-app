import path from 'path'
import { PDFDocument, PDFFont, PageSizes, rgb } from 'pdf-lib'
import { formatThaiDate, startPeriodtoTime, endPeriodtoTime } from '../constants/pdfconstant'
import fontkit from '@pdf-lib/fontkit'
import * as fs from 'fs/promises'
import type { docData } from '../types/activity.type'

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

    const page = pdfDoc.addPage(PageSizes.A4)

    const MARGIN = {
      top: 40,
      bottom: 40,
      left: 70,
      right: 70
    };

    page.drawImage(TULogo, {
      width: TULogo.width * 0.4,
      height: TULogo.height * 0.4,
      x: 260,
      y: 750,
    })

    page.drawText(
      'แบบขออนุญาตให้นักเรียนมาทำกิจกรรม', {
      font: THSarabunBold,
      size: 14,
      x: 215,
      y: 720,
    }
    )

    page.drawText(
      `${formatThaiDate(data.date)}`, {
      font: THSarabun,
      size: 14,
      x: 385,
      y: 690,
    }
    )

    page.drawText(
      `เรียน คุณครูผู้สอนคาบที่ ${data.startPeriod}-${data.endPeriod}`, {
      font: THSarabun,
      size: 14,
      x: MARGIN.left,
      y: 670
    }
    )

    const referenceText = `เนื่องจากมีนักเรียนห้อง ${data.room} ชั้น  ${data.students[0]?.level}  จำนวน ${data.students.length} คน  ดังมีรายชื่อท้ายหนังสือขออนุญาตฉบับนี้  นั้นได้รับ`;

    page.drawText(
      referenceText, {
      font: THSarabun,
      size: 14,
      x: MARGIN.left + 70,
      y: 650
    }
    )

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

        // eslint-disable-next-line
        let extraSpace = ' '.repeat(Math.max(1, spacesToAdd))
        justifiedText += ' ' + extraSpace + words[i]

        remainingExtraSpace -= spacesToAdd * 1.3
      }

      const justifiedWidth = font.widthOfTextAtSize(justifiedText!, fontSize)

      if (targetWidth - justifiedWidth > 10) {
        justifiedText += ' '.repeat(Math.ceil((targetWidth - justifiedWidth) / 5))
      }

      return justifiedText
    }

    const EventText = `อนุญาต ให้ไป${data.activityName} ใน${formatThaiDate(data.date)} ตั้งแต่เวลา ${startPeriodtoTime[data.startPeriod]} น. ถึงเวลา ${endPeriodtoTime[data.endPeriod]} น.`

    // eslint-disable-next-line
    let eventTextLines = wrapText(EventText, refTextWidth, THSarabun, 14)

    for (let i = 0; i < eventTextLines.length - 1; i++) {
      eventTextLines[i] = justifyText(eventTextLines[i]!, refTextWidth, THSarabun, 14)!
    }

    // eslint-disable-next-line
    let yPosition = 630
    const lineHeight = 20

    eventTextLines.forEach((line, index) => {
      page.drawText(line, {
        font: THSarabun,
        size: 14,
        x: MARGIN.left,
        y: yPosition - (index * lineHeight)
      })
    })

    const finalYPosition = yPosition - ((eventTextLines.length - 1) * lineHeight) - lineHeight

    page.drawText(
      'ขอความกรุณาคุณครูผู้สอน อนุญาตให้นักเรียนออกจากห้องเรียนไปทำกิจกรรมตามเวลาดังกล่าว และขอ', {
      font: THSarabun,
      size: 14,
      x: MARGIN.left + 70,
      y: finalYPosition
    }
    )

    page.drawText(
      'ความอนุเคราะห์เรื่องเวลาเรียนในช่วงนี้เป็นชั่วโมงกิจกรรม ซึ่งไม่นับเป็นการขาดเรียน ขอขอบคุณในความร่วมมือของคุณครู', {
      font: THSarabun,
      size: 14,
      x: MARGIN.left,
      y: finalYPosition - 20
    })

    page.drawRectangle({
      x: MARGIN.left,
      y: (finalYPosition - 20) - 45,
      borderWidth: 0.5,
      borderColor: rgb(0, 0, 0),
      width: 220,
      height: 35
    })

    page.drawText(
      `ขออนุญาตนักเรียนห้องนี้จำนวน ${data.students.length} คน ดังนี้`, {
      font: THSarabunBold,
      size: 14,
      x: MARGIN.left + 5,
      y: (finalYPosition - 20) - 25
    }
    )


    data.students.forEach((student, index) => {
      const studentY = (finalYPosition - 20) - 58 - (index * 20)

      page.drawRectangle({
        x: MARGIN.left,
        y: studentY - 7,
        width: 220,
        height: 20,
        borderWidth: 0.5,
        borderColor: rgb(0, 0, 0),
      })

      page.drawText(
        `${index + 1}. ${student.firstName + ' ' + student.lastName} `, {
        font: THSarabun,
        size: 14,
        x: MARGIN.left + 10,
        y: studentY
      }
      )
    })

    page.drawText(
      'ขอแสดงความนับถือ', {
      font: THSarabun,
      size: 14,
      x: MARGIN.left * 5.5,
      y: (finalYPosition - 20) - 75
    }
    )

    const signatureLine = '(.......................................................)'
    const signatureLineX = (MARGIN.left * 5) + 5
    const signatureLineY = (finalYPosition - 20) * 0.73

    page.drawText(
      signatureLine, {
      font: THSarabun,
      size: 14,
      x: signatureLineX,
      y: signatureLineY
    }
    )

    const signatureLineWidth = THSarabun.widthOfTextAtSize(signatureLine, 14)

    const TName = 'ครูผู้สอนอนุญาต'
    const TNameTextWidth = THSarabun.widthOfTextAtSize(TName, 14)

    const teacherTextX = signatureLineX + (signatureLineWidth - TNameTextWidth) / 2

    page.drawText(
      TName, {
      font: THSarabun,
      size: 14,
      x: teacherTextX,
      y: signatureLineY - 20
    }
    )

    page.drawText(
      '-----------------------------------------------------------------------------------------------------------------------------------------------------', {
      font: THSarabun,
      size: 14,
      x: MARGIN.left,
      y: signatureLineY - 60
    }
    )

    const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    return base64DataUri
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}
