import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Project {
    id?: number;
    title: string;
    category: string;
    location: string;
    year?: string;
    materials?: string;
    description?: string;
    thumbnail: string;
    images: string[];
    featured: boolean;
}

interface ProjectFormProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
    const [formData, setFormData] = useState<Project>({
        title: '',
        category: 'Residencial',
        location: '',
        year: new Date().getFullYear().toString(),
        materials: '',
        description: '',
        thumbnail: '',
        images: [],
        featured: false,
    });
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        const token = localStorage.getItem('token');

        try {
            const uploadedImages: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload ${file.name}`);
                }

                const data = await response.json();
                uploadedImages.push(data.url);
            }

            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedImages],
                // Set first image as thumbnail if no thumbnail exists
                thumbnail: prev.thumbnail || uploadedImages[0] || '',
            }));

            toast.success(`${uploadedImages.length} imagen(es) subida(s) correctamente`);
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Error al subir imágenes');
        } finally {
            setUploadingImages(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData((prev) => {
            const newImages = prev.images.filter((_, i) => i !== index);
            // If the removed image was the thumbnail, set the first remaining image as thumbnail
            const newThumbnail = prev.thumbnail === prev.images[index]
                ? (newImages[0] || '')
                : prev.thumbnail;

            return {
                ...prev,
                images: newImages,
                thumbnail: newThumbnail,
            };
        });
    };

    const handleSetThumbnail = (imageUrl: string) => {
        setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
        toast.success('Imagen principal actualizada');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.category || !formData.location || !formData.thumbnail) {
            toast.error('Por favor completa todos los campos obligatorios');
            return;
        }

        if (formData.images.length === 0) {
            toast.error('Por favor sube al menos una imagen');
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const url = project ? `/api/projects/${project.id}` : '/api/projects';
            const method = project ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            toast.success(
                project ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente'
            );
            onClose();
        } catch (error) {
            console.error('Error saving project:', error);
            toast.error('Error al guardar proyecto');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Residencial', 'Hoteles', 'Restauración', 'Comercial', 'Otros'];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onClose}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h2>
                    <p className="text-muted-foreground">
                        {project ? 'Modifica los detalles del proyecto' : 'Completa los detalles del nuevo proyecto'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Título */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Nombre del Proyecto <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ej: Hotel Meliá Beach"
                            required
                        />
                    </div>

                    {/* Categoría */}
                    <div className="space-y-2">
                        <Label htmlFor="category">
                            Categoría <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.category} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Localización */}
                    <div className="space-y-2">
                        <Label htmlFor="location">
                            Localización <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Ej: Mallorca, Barcelona, Madrid..."
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Si es una nueva localización, se añadirá automáticamente al filtro
                        </p>
                    </div>

                    {/* Año */}
                    <div className="space-y-2">
                        <Label htmlFor="year">Año</Label>
                        <Input
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="Ej: 2024"
                        />
                    </div>

                    {/* Materiales */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="materials">Materiales Utilizados</Label>
                        <Input
                            id="materials"
                            name="materials"
                            value={formData.materials}
                            onChange={handleChange}
                            placeholder="Ej: Techlam, Quarzo, Granito..."
                        />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Descripción (Opcional)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Breve descripción del proyecto..."
                            rows={3}
                        />
                    </div>

                    {/* Featured */}
                    <div className="flex items-center space-x-2 md:col-span-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                            }
                            className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <Label htmlFor="featured" className="cursor-pointer flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Destacar proyecto (aparecerá en la página de inicio)
                        </Label>
                    </div>
                </div>

                {/* Images Gallery */}
                <div className="space-y-4">
                    <div>
                        <Label>
                            Fotos del Proyecto <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Sube las fotos del proyecto. La primera imagen marcada como principal será la que aparezca en el listado.
                        </p>
                    </div>

                    {/* Upload Button */}
                    <div className="border-2 border-dashed rounded-lg p-6">
                        <input
                            type="file"
                            id="image-upload"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImages}
                        />
                        <label
                            htmlFor="image-upload"
                            className={`flex flex-col items-center justify-center cursor-pointer ${uploadingImages ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">
                                {uploadingImages ? 'Subiendo...' : 'Click para subir imágenes'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Puedes seleccionar múltiples imágenes
                            </p>
                        </label>
                    </div>

                    {/* Images Grid */}
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {formData.images.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${imageUrl === formData.thumbnail
                                            ? 'border-blue-500'
                                            : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Project image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {imageUrl !== formData.thumbnail && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleSetThumbnail(imageUrl)}
                                                className="text-xs"
                                            >
                                                <Star className="h-3 w-3 mr-1" />
                                                Principal
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* Thumbnail Badge */}
                                    {imageUrl === formData.thumbnail && (
                                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                            PRINCIPAL
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading || uploadingImages}>
                        {loading ? 'Guardando...' : project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}
