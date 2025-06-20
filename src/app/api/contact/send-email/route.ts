import { NextRequest, NextResponse } from 'next/server';
import { IndicatorsService } from '@services/contact/ContactService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await IndicatorsService.sendEmail(body);
    console.info('POST:atendimento/send-email', { body });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST:atendimento/send-email', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
