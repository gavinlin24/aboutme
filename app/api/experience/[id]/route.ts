import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const experience = await prisma.experience.findUnique({
            where: { id }
        });

        if (!experience) {
            return NextResponse.json(
                { error: 'Experience not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(experience, { status: 200 });
    } catch (error) {
        console.error('Error fetching experience:', error);
        return NextResponse.json(
            { error: 'Failed to fetch experience' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const experience = await prisma.experience.update({
            where: { id },
            data: body
        });

        return NextResponse.json(experience, { status: 200 });
    } catch (error: any) {
        console.error('Error updating experience:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Experience not found' },
                { status: 404 }
            );
        }

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A unique constraint would be violated' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update experience', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.experience.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: 'Experience deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting experience:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Experience not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete experience' },
            { status: 500 }
        );
    }
}