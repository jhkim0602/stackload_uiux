'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft, GripVertical, Briefcase, Code2, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'StackLoad Platform', description: 'Developer Career Platform built with Next.js', stack: ['Next.js', 'React', 'TypeScript'] }
  ]);
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: '1', company: 'Tech Corp', role: 'Frontend Engineer', period: '2023 - Present', description: 'Leading the frontend team.' }
  ]);
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: '', description: '', stack: [] }]);
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), company: '', role: '', period: '', description: '' }]);
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 font-sans text-base-900">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
                <Link href="/profile" className="p-3 -ml-3 text-base-400 hover:text-base-900 transition-colors rounded-full hover:bg-base-50">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-base-900 mb-1">Manage Portfolio</h1>
                    <p className="text-base-500 font-medium">AI 면접관에게 보여줄 커리어 자료를 정리하세요.</p>
                </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-base-900 text-white font-bold rounded-xl hover:bg-black transition-all">
                <Save className="w-4 h-4" /> Save Changes
            </button>
        </div>

        <div className="space-y-10">
            {/* Skills Section */}
            <section className="bg-white rounded-3xl p-10 ring-4 ring-base-50 border border-base-200">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-base-50 text-base-900 rounded-xl border border-base-100">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-base-900">Tech Stack</h2>
                </div>

                <div className="mb-8 flex flex-wrap gap-2.5">
                    {skills.map(skill => (
                        <div key={skill} className="group flex items-center gap-2 px-4 py-2 bg-base-50 text-base-700 font-bold text-sm rounded-lg border border-base-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))}>
                            {skill}
                            <Trash2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                <form onSubmit={addSkill} className="flex gap-3">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill (e.g. Next.js)..."
                        className="flex-1 px-5 py-3.5 bg-white border border-base-200 rounded-xl focus:outline-none focus:border-accent-200 focus:ring-4 focus:ring-accent-50 font-bold text-base-900 transition-all placeholder:text-base-300"
                    />
                    <button type="submit" disabled={!newSkill} className="px-8 py-3.5 bg-accent-600 text-white font-bold rounded-xl disabled:opacity-50 hover:bg-accent-700 transition-colors">
                        Add
                    </button>
                </form>
            </section>

            {/* Projects Section */}
            <section className="bg-white rounded-3xl p-10 ring-4 ring-base-50 border border-base-200">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                         <div className="p-2.5 bg-base-50 text-base-900 rounded-xl border border-base-100">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-black text-base-900">Projects</h2>
                    </div>
                    <button onClick={addProject} className="flex items-center gap-2 text-sm font-bold text-accent-600 hover:bg-accent-50 px-4 py-2 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" /> Add Project
                    </button>
                </div>

                <div className="space-y-6">
                    {projects.map((project, idx) => (
                        <div key={project.id} className="group relative p-6 bg-white rounded-2xl border border-base-200 hover:border-accent-200 hover:ring-2 hover:ring-accent-50 transition-all">
                            <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="absolute top-4 right-4 p-2 text-base-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={project.name}
                                    className="font-black text-lg bg-transparent border-b border-transparent hover:border-base-200 focus:border-accent-500 focus:outline-none py-1 transition-colors w-full text-base-900 placeholder:text-base-300"
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[idx].name = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                                <textarea
                                    placeholder="Describe your project contribution and challenges..."
                                    value={project.description}
                                    className="w-full bg-transparent resize-none text-base-500 text-sm font-medium leading-relaxed focus:outline-none min-h-[80px] placeholder:text-base-300"
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[idx].description = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="bg-white rounded-3xl p-10 ring-4 ring-base-50 border border-base-200">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                         <div className="p-2.5 bg-base-50 text-base-900 rounded-xl border border-base-100">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-black text-base-900">Work Experience</h2>
                    </div>
                    <button onClick={addExperience} className="flex items-center gap-2 text-sm font-bold text-accent-600 hover:bg-accent-50 px-4 py-2 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" /> Add Experience
                    </button>
                </div>

                <div className="space-y-6">
                    {experiences.map((exp, idx) => (
                        <div key={exp.id} className="group relative p-6 bg-white rounded-2xl border border-base-200 hover:border-accent-200 hover:ring-2 hover:ring-accent-50 transition-all">
                             <button onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} className="absolute top-4 right-4 p-2 text-base-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={exp.company}
                                    className="font-black text-base bg-transparent border-b border-transparent hover:border-base-200 focus:border-accent-500 focus:outline-none py-1 transition-colors text-base-900 placeholder:text-base-300"
                                    onChange={(e) => {
                                        const newExps = [...experiences];
                                        newExps[idx].company = e.target.value;
                                        setExperiences(newExps);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Role / Title"
                                    value={exp.role}
                                    className="font-bold text-base bg-transparent border-b border-transparent hover:border-base-200 focus:border-accent-500 focus:outline-none py-1 transition-colors text-base-700 placeholder:text-base-300"
                                    onChange={(e) => {
                                        const newExps = [...experiences];
                                        newExps[idx].role = e.target.value;
                                        setExperiences(newExps);
                                    }}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Period (e.g. 2022.03 - 2023.08)"
                                value={exp.period}
                                className="text-sm text-base-400 font-bold bg-transparent border-b border-transparent hover:border-base-200 focus:border-accent-500 focus:outline-none mb-4 py-1 transition-colors w-full placeholder:text-base-300"
                                onChange={(e) => {
                                    const newExps = [...experiences];
                                    newExps[idx].period = e.target.value;
                                    setExperiences(newExps);
                                }}
                            />
                             <textarea
                                placeholder="Describe your key achievements..."
                                value={exp.description}
                                className="w-full bg-transparent resize-none text-base-500 text-sm font-medium leading-relaxed focus:outline-none min-h-[80px] placeholder:text-base-300"
                                onChange={(e) => {
                                    const newExps = [...experiences];
                                    newExps[idx].description = e.target.value;
                                    setExperiences(newExps);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
