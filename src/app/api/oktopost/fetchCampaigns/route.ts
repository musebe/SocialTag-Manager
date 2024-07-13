import { NextResponse } from 'next/server';
import { fetchCampaigns } from '@/lib/api/oktopostApi';

export async function GET() {
    try {
        const campaigns = await fetchCampaigns();
        return NextResponse.json(campaigns);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
