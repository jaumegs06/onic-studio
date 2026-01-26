import { useState, useEffect, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { projectsAPI, uploadAPI, productsAPI } from '@/lib/api';
import { Loader2, ArrowLeft, Upload, X, GripVertical, Image as ImageIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CATEGORIES = ['Hoteles', 'Restauración', 'Residencial'];

interface ImageItem {
    url: string;
    file?: File;
    id: string; // Add ID for dnd-kit
}

const SortableImage = ({
    item,
    index,
    onRemove,
    setMain
}: {
    item: ImageItem,
    index: number,
    onRemove: () => void,
    setMain: () => void
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.3 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 group touch-none"
        >
            <img src={item.url} alt="" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <div
                    className="cursor-grab active:cursor-grabbing p-1 text-white hover:bg-white/20 rounded"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="w-6 h-6" />
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={setMain}
                        className="text-xs bg-white/90 text-black px-2 py-1 rounded hover:bg-white transition-colors"
                        title="Usar como portada"
                    >
                        Portada
                    </button>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {index === 0 && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow-sm z-10">
                    Portada
                </div>
            )}
        </div>
    );
};

// Overlay component for dragging visuals
const ImageOverlay = ({ item }: { item: ImageItem }) => {
    return (
        <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 shadow-xl cursor-grabbing">
            <img src={item.url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <GripVertical className="w-8 h-8 text-white" />
            </div>
        </div>
    );
};

export default function ProjectEditor() {
    const [, setLocation] = useLocation();
    const [match, params] = useRoute('/admin/projects/edit/:id');
    const isEditing = !!match;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: CATEGORIES[0],
        description: '',
        location: '',
        year: new Date().getFullYear().toString(),
        materials: '',
        is_featured: false
    });
    const [images, setImages] = useState<ImageItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [availableProducts, setAvailableProducts] = useState<any[]>([]);
    const [openMaterials, setOpenMaterials] = useState(false);

    const id = params?.id;

    // Sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require movement of 8px to start drag to avoid accidental clicks
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (id) {
            loadProject(parseInt(id));
        }
        loadProducts();
    }, [id]);

    const loadProducts = async () => {
        try {
            const data = await productsAPI.getAll();
            setAvailableProducts(data);
        } catch (error) {
            console.error("Error loading products:", error);
            toast.error("Error al cargar lista de materiales");
        }
    };

    const loadProject = async (projectId: number) => {
        setLoading(true);
        try {
            const project = await projectsAPI.getById(projectId);
            setFormData({
                title: project.title,
                category: project.category,
                description: project.description || '',
                location: project.location || '',
                year: project.year || '',
                materials: project.materials || '',
                is_featured: project.is_featured || false
            });

            // Map images to include unique IDs for dnd-kit
            if (project.images && project.images.length > 0) {
                setImages(project.images.map((url: string) => ({
                    url,
                    id: url // Use URL as ID if unique, or handle duplicates better if needed
                })));
            } else if (project.image) {
                setImages([{ url: project.image, id: project.image }]);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar el proyecto');
            setLocation('/admin/projects');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        try {
            const files = Array.from(e.target.files);
            const data = await uploadAPI.multiple(files);

            // Assuming API returns { urls: string[] } or string[]
            const newUrls: string[] = Array.isArray(data) ? data : (data.urls || []);
            const newImages: ImageItem[] = newUrls.map(url => ({
                url,
                id: url // using URL as ID
            }));

            setImages(prev => [...prev, ...newImages]);

            toast.success(`${newUrls.length} imágenes subidas`);
        } catch (error) {
            console.error(error);
            toast.error('Error al subir imágenes');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setImages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    };

    const removeImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const setMainImage = (indexToMain: number) => {
        setImages(prev => {
            const newImages = [...prev];
            const [item] = newImages.splice(indexToMain, 1);
            newImages.unshift(item);
            return newImages;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return toast.error('El título es obligatorio');
        if (images.length === 0) return toast.error('Debes subir al menos una imagen');

        setSubmitting(true);
        try {
            // Extract just the URLs for the API payload
            const imageUrls = images.map(img => img.url);

            const payload = {
                ...formData,
                images: imageUrls,
                image: imageUrls[0] // Set cover image
            };

            if (isEditing && params?.id) {
                await projectsAPI.update(parseInt(params.id), payload);
                toast.success('Proyecto actualizado');
            } else {
                await projectsAPI.create(payload);
                toast.success('Proyecto creado');
            }
            setLocation('/admin/projects');
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al guardar el proyecto';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    const activeItem = activeId ? images.find(item => item.id === activeId) : null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => setLocation('/admin/projects')}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold font-serif">
                        {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 space-y-6">
                    <h3 className="text-lg font-medium border-b border-neutral-100 pb-4">Información General</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium uppercase tracking-wide">Título</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:border-black outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium uppercase tracking-wide">Categoría</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:border-black outline-none"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            {/* Year Input */}
                            <label className="block text-sm font-medium mb-1">Año</label>
                            <input
                                type="text"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Featured Checkbox */}
                        <div>
                            <label className="flex items-center gap-2 cursor-pointer mt-8">
                                <input
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <span className="text-sm font-medium">Destacar en la página de inicio</span>
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium uppercase tracking-wide">Ubicación</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:border-black outline-none"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-medium uppercase tracking-wide">Materiales</label>
                            <Popover open={openMaterials} onOpenChange={setOpenMaterials}>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button" // Prevent form submission
                                        role="combobox"
                                        aria-expanded={openMaterials}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded outline-none text-left flex justify-between items-center min-h-[42px]"
                                    >
                                        <div className="flex flex-wrap gap-1">
                                            {formData.materials ? (
                                                formData.materials.split(',').map((material) => (
                                                    <Badge key={material} variant="secondary" className="mr-1 mb-1">
                                                        {material.trim()}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-neutral-500">Seleccionar materiales...</span>
                                            )}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Buscar material..." />
                                        <CommandList>
                                            <CommandEmpty>No se encontraron materiales.</CommandEmpty>
                                            <CommandGroup>
                                                {availableProducts.map((product) => {
                                                    const currentMaterials = formData.materials ? formData.materials.split(',').map(m => m.trim()) : [];
                                                    const isSelected = currentMaterials.includes(product.name);

                                                    return (
                                                        <CommandItem
                                                            key={product.id}
                                                            value={product.name}
                                                            onSelect={() => {
                                                                let newMaterials;
                                                                if (isSelected) {
                                                                    newMaterials = currentMaterials.filter(m => m !== product.name);
                                                                } else {
                                                                    newMaterials = [...currentMaterials, product.name];
                                                                }
                                                                setFormData({ ...formData, materials: newMaterials.join(', ') });
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    isSelected ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                {product.image && (
                                                                    <img src={product.image} alt="" className="w-6 h-6 object-cover rounded-sm" />
                                                                )}
                                                                <span>{product.name}</span>
                                                                <span className="text-xs text-neutral-400">({product.category})</span>
                                                            </div>
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p className="text-xs text-neutral-500">
                                Selecciona los materiales utilizados en este proyecto. Deben estar registrados previamente en la sección de Productos.
                            </p>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-medium uppercase tracking-wide">Descripción</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:border-black outline-none h-32 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                        <h3 className="text-lg font-medium">Galería de Imágenes</h3>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-sm bg-neutral-100 px-4 py-2 rounded hover:bg-neutral-200 transition-colors"
                            disabled={uploading}
                        >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            <span>Añadir Fotos</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {images.length === 0 ? (
                        <div
                            className="border-2 border-dashed border-neutral-300 rounded-lg h-48 flex flex-col items-center justify-center text-neutral-400 gap-2 cursor-pointer hover:bg-neutral-50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon className="w-8 h-8" />
                            <p>Haz clic para subir imágenes</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <p className="text-sm text-neutral-500 mb-4 flex items-center gap-1">
                                <GripVertical className="w-4 h-4" />
                                Arrastra las imágenes para reordenarlas. La primera será la portada.
                            </p>

                            <SortableContext
                                items={images.map(img => img.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {images.map((item, index) => (
                                        <SortableImage
                                            key={item.id} // use id as key
                                            item={item}
                                            index={index}
                                            onRemove={() => removeImage(index)}
                                            setMain={() => setMainImage(index)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>

                            <DragOverlay adjustScale={true}>
                                {activeItem ? (
                                    <ImageOverlay item={activeItem} />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    )}
                </div>

                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => setLocation('/admin/projects')}
                        className="px-6 py-3 text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={submitting || uploading}
                        className="px-8 py-3 bg-black text-white rounded hover:bg-neutral-800 transition-colors flex items-center gap-2"
                    >
                        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
                    </button>
                </div>
            </form>
        </div>
    );
}
