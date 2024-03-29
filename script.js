// Cargar y mostrar precios desde el JSON
fetch('precios.json')
    .then(response => response.json())
    .then(data => {
        const preciosContainer = document.getElementById('prices');

        data.productos.forEach(producto => {
            const productoElement = document.createElement('article');
            productoElement.className = 'item';
            productoElement.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio.toFixed(0)}</p>
            `;
            preciosContainer.appendChild(productoElement);
        });
    })
    .catch(error => console.error('Error al cargar precios:', error));


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

    function filterProducts() {
        const searchInput = document.getElementById('search');
        const searchText = searchInput.value.toLowerCase();
        const pricesContainer = document.getElementsByClassName('item');
        
    
        for (const product of pricesContainer) {
            const productName = product.querySelector('h2').innerText.toLowerCase();
            console.log(productName);
            if (productName.includes(searchText)) {
                console.log(productName)
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
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