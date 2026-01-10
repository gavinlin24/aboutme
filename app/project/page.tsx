'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';

interface Project {
    id: string;
    projectName: string;
    description: string;
    startDate: string;
    endDate?: string | null;
    deploymentLink?: string | null;
    githubLink?: string | null;
}

export default function ProjectPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/project');

                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
                <Navbar />
                <div className="pt-32 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
                <Navbar />
                <div className="pt-32 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-12">Projects</h1>

                    {projects.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-600 text-lg">No projects found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    projectName={project.projectName}
                                    description={project.description}
                                    startDate={project.startDate}
                                    endDate={project.endDate}
                                    deploymentLink={project.deploymentLink}
                                    githubLink={project.githubLink}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}