'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Trash, Edit, ExternalLink, Eye, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string[];
  date: string;
  featured: boolean;
  createdAt: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch projects on initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/projects');

      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a project
  const deleteProject = async (id: string) => {
    try {
      setDeletingId(id);

      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      // Update local state to remove deleted project
      setProjects(projects.filter(project => project._id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  // Function to toggle featured status
  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (!res.ok) {
        throw new Error('Failed to update project');
      }

      // Update local state
      setProjects(projects.map(project =>
        project._id === id ? { ...project, featured: !featured } : project
      ));

      toast.success(`Project ${!featured ? 'marked as featured' : 'removed from featured'}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  return (
    <div className="animate-fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[550px]">
      <Toaster position="top-center" />

      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-sm"
        >
          <Plus size={14} />
          New Project
        </Link>
      </div> */}

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="h-6 w-6 text-blue-500 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h2>
          <p className="text-gray-600 mb-4">Get started by creating your first project</p>
          <Link
            href="/admin/projects/new"
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 text-sm"
          >
            <Plus size={14} />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Categories
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{project.title}</div>
                          <div className="text-xs text-gray-500 hidden sm:block">{project.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.category.slice(0, 2).map((cat, index) => (
                          <span
                            key={index}
                            className="px-1.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800"
                          >
                            {cat}
                          </span>
                        ))}
                        {project.category.length > 2 && (
                          <span className="text-xs text-gray-500">+{project.category.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 hidden sm:table-cell">
                      {project.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(project._id, project.featured)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          project.featured ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            project.featured ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          href={`/project/${project._id}`}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/projects/edit/${project._id}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteProject(project._id)}
                          disabled={deletingId === project._id}
                          className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === project._id ? (
                            <Loader className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
