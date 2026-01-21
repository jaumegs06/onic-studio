import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { projectsAPI } from '@/lib/api';
import { Plus, Edit, Trash2, Loader2, MapPin, Calendar, Layers } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    location?: string;
    year?: string;
    materials?: string;
}

export default function ProjectsList() {
    const [, setLocation] = useLocation();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await projectsAPI.getAll();
            setProjects(data);
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar proyectos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

        try {
            await projectsAPI.delete(id);
            setProjects(projects.filter(p => p.id !== id));
            toast.success('Proyecto eliminado correctamente');
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar el proyecto');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-serif">Proyectos</h2>
                    <p className="text-neutral-600">Gestiona los proyectos del portfolio</p>
                </div>
                <Link href="/admin/projects/new">
                    <a className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-neutral-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Proyecto</span>
                    </a>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden group">
                        <div className="relative aspect-[4/3] bg-neutral-100">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-neutral-400">
                                    No imagen
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Link href={`/admin/projects/edit/${project.id}`}>
                                    <a className="p-3 bg-white text-black rounded-full hover:bg-neutral-100 transition-colors flex items-center justify-center shadow-md transform hover:scale-105" title="Editar">
                                        <Edit className="w-5 h-5" />
                                    </a>
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="absolute bottom-3 right-3 p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center shadow-sm"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-sm">
                                {project.category}
                            </span>
                            <h3 className="text-lg font-bold mt-2 font-serif truncate">{project.title}</h3>

                            <div className="mt-3 space-y-1 text-sm text-neutral-500">
                                {project.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3" />
                                        <span>{project.location}</span>
                                    </div>
                                )}
                                {project.year && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        <span>{project.year}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-neutral-300">
                        <p className="text-neutral-500 mb-4">No hay proyectos todavía</p>
                        <Link href="/admin/projects/new">
                            <a className="text-black font-medium hover:underline">
                                Crear el primer proyecto
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
