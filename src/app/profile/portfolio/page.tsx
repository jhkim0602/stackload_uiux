'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft, GripVertical, Briefcase, Code2, FolderGit2 } from 'lucide-react';
import Link from 'next/link';

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
    <div className="bg-[#f8f9fa] min-h-screen pt-24 pb-20 font-sans">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/profile" className="p-2 -ml-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Manage Portfolio</h1>
                    <p className="text-gray-500">AI 면접관에게 보여줄 커리어 자료를 정리하세요.</p>
                </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/20">
                <Save className="w-4 h-4" /> Save Changes
            </button>
        </div>

        <div className="space-y-8">
            {/* Skills Section */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Tech Stack</h2>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <div key={skill} className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 font-bold text-sm rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))}>
                            {skill}
                            <Trash2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                <form onSubmit={addSkill} className="flex gap-2">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill (e.g. Next.js)..."
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium transition-all"
                    />
                    <button type="submit" disabled={!newSkill} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl disabled:opacity-50 hover:bg-blue-700 transition-colors">
                        Add
                    </button>
                </form>
            </section>

            {/* Projects Section */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                    </div>
                    <button onClick={addProject} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" /> Add Project
                    </button>
                </div>

                <div className="space-y-6">
                    {projects.map((project, idx) => (
                        <div key={project.id} className="group relative p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors">
                            <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={project.name}
                                    className="font-bold text-lg bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none py-1 transition-colors w-full"
                                    onChange={(e) => {
                                        const newProjects = [...projects];
                                        newProjects[idx].name = e.target.value;
                                        setProjects(newProjects);
                                    }}
                                />
                                <textarea
                                    placeholder="Describe your project contribution and challenges..."
                                    value={project.description}
                                    className="w-full bg-transparent resize-none text-gray-600 text-sm leading-relaxed focus:outline-none min-h-[60px]"
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
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                    </div>
                    <button onClick={addExperience} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" /> Add Experience
                    </button>
                </div>

                <div className="space-y-6">
                    {experiences.map((exp, idx) => (
                        <div key={exp.id} className="group relative p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors">
                             <button onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={exp.company}
                                    className="font-bold text-base bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none py-1 transition-colors"
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
                                    className="font-medium text-base bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none py-1 transition-colors"
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
                                className="text-sm text-gray-400 font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none mb-3 py-1 transition-colors w-full"
                                onChange={(e) => {
                                    const newExps = [...experiences];
                                    newExps[idx].period = e.target.value;
                                    setExperiences(newExps);
                                }}
                            />
                             <textarea
                                placeholder="Describe your key achievements..."
                                value={exp.description}
                                className="w-full bg-transparent resize-none text-gray-600 text-sm leading-relaxed focus:outline-none min-h-[60px]"
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
