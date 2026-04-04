import { readFile } from 'node:fs/promises'

export const runtime = 'nodejs'

const PDF_FILE_URL = new URL('../assets/documents/zive_sklo_informacni_list.pdf', import.meta.url)
const DOWNLOAD_FILE_NAME = 'zive-sklo-informacni-list.pdf'

export async function GET() {
  try {
    const pdfBuffer = await readFile(PDF_FILE_URL)

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${DOWNLOAD_FILE_NAME}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return new Response('Soubor se nepodarilo nacist.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }
}
