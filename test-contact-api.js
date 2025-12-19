import axios from 'axios';

async function testContactAPI() {
    try {
        console.log('🧪 Testing Contact API...\n');

        const testData = {
            name: 'Usuario de Prueba',
            email: 'prueba@ejemplo.com',
            phone: '612345678',
            projectType: 'hoteles',
            message: 'Este es un mensaje de prueba para verificar que funciona correctamente'
        };

        console.log('📤 Enviando mensaje...');
        const startTime = Date.now();

        const response = await axios.post('http://localhost:5000/api/contact', testData);

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log('\n✅ Respuesta recibida:');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
        console.log(`\n⏱️  Tiempo de respuesta: ${duration}ms`);

        if (response.data.success) {
            console.log('\n✅ ÉXITO: El mensaje se guardó correctamente');
            console.log('ID del mensaje:', response.data.data.id);
            console.log('Email enviado:', response.data.data.emailSent);
        }

    } catch (error) {
        console.error('\n❌ ERROR:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
    }
}

testContactAPI();
