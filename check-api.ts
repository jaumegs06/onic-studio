
// Native fetch is available in Node.js 18+

async function checkApi() {
    console.log('Testing connection to http://localhost:5000/api/products ...');
    try {
        const response = await fetch('http://localhost:5000/api/products');
        console.log('Status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('SUCCESS! Data received.');
            console.log('Product count:', Array.isArray(data) ? data.length : 'Not an array');
        } else {
            console.error('ERROR: Server returned', response.status, response.statusText);
            const text = await response.text();
            console.error('Body:', text);
        }
    } catch (error) {
        console.error('FATAL: Could not connect to server.');
        console.error(error);
    }
}

checkApi();
