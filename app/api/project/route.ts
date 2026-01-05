import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                startDate: 'desc'
            }
        });
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const project = await prisma.project.create({
            data: body
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error('Error creating project:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A unique constraint would be violated' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create project', details: error.message },
            { status: 500 }
        );
    }
}