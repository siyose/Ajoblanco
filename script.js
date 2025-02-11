
document.addEventListener('DOMContentLoaded', cargarPrecios);

function cargarPrecios() {
    fetch('precios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar precios.');
            }
            return response.json();
        })
        .then(data => {
            mostrarProductos(data.productos);
        })
        .catch(error => {
            console.error('Error al cargar precios:', error);
            const preciosContainer = document.getElementById('product-list');
            preciosContainer.innerHTML = '<p>No se pudieron cargar los precios. Por favor, intente nuevamente más tarde.</p>';
        });
}

function mostrarProductos(productos) {
    const preciosContainer = document.getElementById('product-list');
    preciosContainer.innerHTML = '';

    if (productos.length === 0) {
        preciosContainer.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const productoElement = document.createElement('article');
        productoElement.className = 'item';
        productoElement.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio.toFixed(0)}</p>
        `;
        preciosContainer.appendChild(productoElement);
    });
}

function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    fetch('precios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar precios.');
            }
            return response.json();
        })
        .then(data => {
            const productosFiltrados = data.productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchInput)
            );
            mostrarProductos(productosFiltrados);
        })
        .catch(error => {
            console.error('Error al filtrar productos:', error);
        });
}

    function submitForm() {
        // Obtener los valores del formulario
        const school = document.getElementById('school').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const studentName = document.getElementById('student-name').value;
        const course = document.getElementById('course').value;
    
        // Crear el mensaje para WhatsApp
        const whatsappMessage = `¡Nuevo contacto!\nColegio: ${school}\nNombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nNombre del Alumno: ${studentName}\nCurso: ${course}`;
    
        // Crear el enlace de WhatsApp con el mensaje
        const whatsappLink = `https://wa.me/3185584060?text=${encodeURIComponent(whatsappMessage)}`;
    
        // Redirigir a la página de WhatsApp
        window.location.href = whatsappLink;
    }

   

    function calculateTotal() {
        const denominations = [50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50];
        let total = 0;
    
        denominations.forEach(denomination => {
            const input = document.getElementById(`denomination-${denomination}`);
            const value = parseInt(input.value, 10) || 0;
            total += value * denomination;
        });
    
        const totalOutput = document.getElementById('total-all');
        totalOutput.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    
    function clearForm() {
        // Limpiar todos los campos del formulario
        const inputs = document.querySelectorAll('.money-form input[type="number"]');
        inputs.forEach(input => input.value = '');
    
        // Restablecer el total a $0
        document.getElementById('total-all').textContent = '$0';
    }