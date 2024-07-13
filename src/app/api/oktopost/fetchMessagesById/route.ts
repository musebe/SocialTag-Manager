import { NextRequest, NextResponse } from 'next/server';
import { fetchMessagesById } from '@/lib/api/oktopostApi';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('messageId');

    if (!messageId) {
        return NextResponse.json(
            { error: 'Missing required query parameter: messageId' },
            { status: 400 }
        );
    }

    try {
        const message = await fetchMessagesById(messageId);
        return NextResponse.json(message);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
