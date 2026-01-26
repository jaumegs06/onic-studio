// Test login endpoint
const testLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });

        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

        if (data.token) {
            console.log('\n✅ Login successful!');
            console.log('Token:', data.token);
        } else {
            console.log('\n❌ Login failed');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
};

testLogin();
