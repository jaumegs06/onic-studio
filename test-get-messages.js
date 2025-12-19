import axios from 'axios';

async function testGetMessages() {
    try {
        console.log('🧪 Testing GET /api/contact/messages...\n');

        const response = await axios.get('http://localhost:5000/api/contact/messages');

        console.log('✅ Respuesta recibida:');
        console.log('Status:', response.status);
        console.log('Success:', response.data.success);
        console.log('Número de mensajes:', response.data.data?.length || 0);
        console.log('\n📋 Mensajes:');
        console.log(JSON.stringify(response.data.data, null, 2));

    } catch (error) {
        console.error('\n❌ ERROR:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
    }
}

testGetMessages();
