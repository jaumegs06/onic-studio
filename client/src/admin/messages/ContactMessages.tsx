import { useState, useEffect } from 'react';
import { Mail, RefreshCw, Calendar, User, Phone, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { contactAPI } from '@/lib/api';
import { motion } from 'framer-motion';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
    timestamp: string;
    emailSent: boolean;
}

export default function ContactMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadMessages = async () => {
        try {
            setRefreshing(true);
            const data = await contactAPI.getMessages();
            setMessages(data.data || []);
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getProjectTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            residencial: 'Residencial',
            hoteles: 'Hoteles',
            restauracion: 'Restauración',
            otro: 'Otro',
        };
        return types[type] || type;
    };

    if (loading) {
        return <div className="text-center py-12">Cargando mensajes...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Mensajes de Contacto</h2>
                    <p className="text-neutral-600 mt-2">
                        {messages.length} {messages.length === 1 ? 'mensaje' : 'mensajes'} recibido{messages.length === 1 ? '' : 's'}
                    </p>
                </div>
                <button
                    onClick={loadMessages}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Mail className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                        No hay mensajes todavía
                    </h3>
                    <p className="text-neutral-500">
                        Los mensajes del formulario de contacto aparecerán aquí
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <User className="w-5 h-5 text-neutral-500" />
                                            <h3 className="text-lg font-semibold">{message.name}</h3>
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                                {getProjectTypeLabel(message.projectType)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                <a
                                                    href={`mailto:${message.email}`}
                                                    className="hover:text-black transition-colors"
                                                >
                                                    {message.email}
                                                </a>
                                            </div>
                                            {message.phone && (
                                                <div className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    <a
                                                        href={`tel:${message.phone}`}
                                                        className="hover:text-black transition-colors"
                                                    >
                                                        {message.phone}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(message.timestamp)}
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${message.emailSent
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {message.emailSent ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    Email enviado
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3" />
                                                    Email no enviado
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mt-4 p-4 bg-neutral-50 rounded-lg border-l-4 border-black">
                                    <div className="flex items-start gap-2 mb-2">
                                        <MessageSquare className="w-4 h-4 text-neutral-500 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-neutral-700 mb-1">Mensaje:</p>
                                            <p className="text-neutral-800 whitespace-pre-wrap">{message.message}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex gap-2">
                                    <a
                                        href={`mailto:${message.email}?subject=Re: ${getProjectTypeLabel(message.projectType)}&body=Hola ${message.name},%0D%0A%0D%0A`}
                                        className="px-4 py-2 text-sm text-white bg-black hover:bg-neutral-800 rounded transition-colors"
                                    >
                                        Responder por Email
                                    </a>
                                    {message.phone && (
                                        <a
                                            href={`tel:${message.phone}`}
                                            className="px-4 py-2 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                                        >
                                            Llamar
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* ID Footer */}
                            <div className="px-6 py-2 bg-neutral-50 border-t border-neutral-100">
                                <p className="text-xs text-neutral-500">ID: {message.id}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
