'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ExperienceCard from '@/components/ExperienceCard';

interface Experience {
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate?: string | null;
    description: string;
}

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                const response = await fetch('/api/experience');

                if (!response.ok) {
                    throw new Error('Failed to fetch experiences');
                }

                const data = await response.json();
                setExperiences(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchExperiences();
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
                    <h1 className="text-4xl font-bold text-slate-800 mb-12">Experience</h1>

                    {experiences.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-600 text-lg">No experiences found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {experiences.map((experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    company={experience.company}
                                    title={experience.title}
                                    location={experience.location}
                                    startDate={experience.startDate}
                                    endDate={experience.endDate}
                                    description={experience.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}