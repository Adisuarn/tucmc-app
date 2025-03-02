export const startPeriodtoTime: Record<string, string> = {
  '1': '07.50',
  '2': '08.40',
  '3': '09.40',
  '4': '10.30',
  '5': '12.20',
  '6': '13.10',
  '7': '14.10',
  '8': '15.00',
}

export const endPeriodtoTime: Record<string, string> = {
  '1': '08.40',
  '2': '09.40',
  '3': '10.30',
  '4': '11.20',
  '5': '13.10',
  '6': '14.10',
  '7': '15.00',
  '8': '15.50',
}

export function formatThaiDate(isoDateString: string): string {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;

  return `วันที่ ${day} เดือน ${month} พ.ศ.${year}`;
}
