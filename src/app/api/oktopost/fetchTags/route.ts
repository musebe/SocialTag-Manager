import { fetchTags } from '@/lib/api/oktopostApi';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tags = await fetchTags();
        return NextResponse.json(tags);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
