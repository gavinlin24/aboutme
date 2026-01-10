'use client';

interface ExperienceCardProps {
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate?: string | null;
    description: string;
}

export default function ExperienceCard({
    company,
    title,
    location,
    startDate,
    endDate,
    description
}: ExperienceCardProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="bg-white/90 rounded-lg p-8 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{company}</h2>
                    <h3 className="text-lg font-medium text-slate-600">{title}</h3>
                </div>
                <span className="text-sm text-slate-500 whitespace-nowrap ml-4">
                    {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
                </span>
            </div>

            <p className="text-slate-600 mb-4">{location}</p>

            <p className="text-slate-700 leading-relaxed">{description}</p>
        </div>
    );
}