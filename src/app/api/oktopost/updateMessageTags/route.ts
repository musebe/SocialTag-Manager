import { NextRequest, NextResponse } from 'next/server';
import { updateMessageTags } from '@/lib/api/oktopostApi';

export async function POST(request: NextRequest) {
    try {
        const { id, tags } = await request.json() as { id: string, tags: string[] };

        if (!id || !Array.isArray(tags)) {
            return NextResponse.json(
                { error: 'Invalid input: id and tags are required and tags should be an array' },
                { status: 400 }
            );
        }

        const updatedMessage = await updateMessageTags(id, tags);
        return NextResponse.json(updatedMessage);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
