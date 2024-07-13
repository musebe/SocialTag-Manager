import { NextRequest, NextResponse } from 'next/server';
import { fetchMessagesByCampaignId } from '@/lib/api/oktopostApi';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const network = searchParams.get('network');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!campaignId || !network || !from || !to) {
        return NextResponse.json(
            { error: 'Missing required query parameters: campaignId, network, from, to' },
            { status: 400 }
        );
    }

    try {
        const messages = await fetchMessagesByCampaignId(campaignId, network, from, to);
        return NextResponse.json(messages);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
