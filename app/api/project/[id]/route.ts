import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id }
        });

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { error: 'Failed to fetch project' },
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

        const project = await prisma.project.update({
            where: { id },
            data: body
        });

        return NextResponse.json(project, { status: 200 });
    } catch (error: any) {
        console.error('Error updating project:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Project not found' },
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
            { error: 'Failed to update project', details: error.message },
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
        await prisma.project.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: 'Project deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting project:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}