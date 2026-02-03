// js/comprobante.js - Módulo para la generación de comprobantes

/**
 * Clase para gestionar la generación de comprobantes
 */
class GeneradorComprobante {
    constructor() {
        this.configuracion = {
            ancho: 900,
            alto: 700,
            caracteristicas: 'width=900,height=700,scrollbars=yes'
        };
    }

    /**
     * Genera y abre el comprobante en una nueva ventana
     * @param {Object} datos - Datos del comprobante
     * @param {string} datos.paciente - Nombre del paciente
     * @param {string} datos.cedula - Cédula del paciente
     * @param {Array} datos.examenes - Array de exámenes seleccionados
     * @param {number} datos.total - Total a pagar
     */
    generar(datos) {
        // Validar datos requeridos
        if (!this.validarDatos(datos)) {
            console.error('Datos incompletos para generar el comprobante');
            return;
        }

        const html = this.construirHTML(datos);
        this.abrirVentana(html);
    }

    /**
     * Valida que los datos necesarios estén presentes
     * @param {Object} datos - Datos a validar
     * @returns {boolean}
     */
    validarDatos(datos) {
        return datos && 
               datos.paciente && 
               datos.examenes && 
               Array.isArray(datos.examenes) &&
               datos.examenes.length > 0 &&
               typeof datos.total === 'number';
    }

    /**
     * Construye el HTML completo del comprobante
     * @param {Object} datos - Datos del comprobante
     * @returns {string} HTML del comprobante
     */
    construirHTML(datos) {
        const fechaHora = this.obtenerFechaHora();
        
        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización - ${datos.paciente}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${this.obtenerEstilos()}
</head>
<body>
    <div class="comprobante-container">
        ${this.generarEncabezado()}
        ${this.generarTitulo(fechaHora)}
        ${this.generarInfoCliente(datos)}
        ${this.generarTablaExamenes(datos.examenes)}
        ${this.generarTotal(datos.total)}
        ${this.generarNotas()}
        ${this.generarBotones()}
    </div>
</body>
</html>`;
    }

    /**
     * Obtiene la fecha y hora actual formateada
     * @returns {Object} Objeto con día, mes, año y hora
     */
    obtenerFechaHora() {
        const ahora = new Date();
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        return {
            dia: ahora.getDate(),
            mes: meses[ahora.getMonth()],
            año: ahora.getFullYear(),
            hora: ahora.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            })
        };
    }

    /**
     * Genera los estilos CSS del comprobante
     * @returns {string} Estilos CSS
     */
    obtenerEstilos() {
        return `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background: #f5f5f5;
            padding: 20px;
        }
        
        .comprobante-container {
            background: white;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .comprobante-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2b6da3;
            padding-bottom: 20px;
        }
        
        .comprobante-header img {
            max-width: 100%;
            height: auto;
        }
        
        .comprobante-title {
            text-align: center;
            margin: 30px 0;
        }
        
        .comprobante-title h1 {
            color: #2b6da3;
            font-size: 28px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .comprobante-title p {
            color: #555;
            font-size: 14px;
            margin: 5px 0;
        }
        
        .comprobante-client-info {
            background: #f9f9f9;
            padding: 20px;
            border-left: 4px solid #2b6da3;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .comprobante-client-info strong {
            color: #2b6da3;
            display: inline-block;
            min-width: 80px;
        }
        
        .comprobante-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .comprobante-table thead {
            background: linear-gradient(135deg, #2b6da3 0%, #1a5280 100%);
        }
        
        .comprobante-table th {
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 1px;
        }
        
        .comprobante-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .comprobante-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .comprobante-table tbody tr:hover {
            background-color: #f0f7ff;
        }
        
        .comprobante-total {
            text-align: right;
            padding: 20px;
            background: linear-gradient(135deg, #2b6da3 0%, #1a5280 100%);
            color: white;
            font-size: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        
        .comprobante-total strong {
            font-size: 24px;
        }
        
        .comprobante-notes {
            background: #fffbf0;
            border-left: 4px solid #ffa500;
            padding: 20px;
            font-size: 12px;
            line-height: 1.8;
            color: #666;
        }
        
        .comprobante-notes p {
            margin-bottom: 8px;
        }
        
        .comprobante-notes p:last-child {
            margin-top: 15px;
            font-style: italic;
            color: #888;
        }
        
        .comprobante-buttons {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .comprobante-button {
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .comprobante-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .btn-print {
            background-color: #2b6da3;
            color: white;
        }
        
        .btn-print:hover {
            background-color: #1a5280;
        }
        
        .btn-close {
            background-color: #d83b01;
            color: white;
        }
        
        .btn-close:hover {
            background-color: #b02e00;
        }
        
        @media print {
            body {
                padding: 0;
                background: white;
            }
            
            .comprobante-container {
                box-shadow: none;
                padding: 20px;
            }
            
            .comprobante-buttons {
                display: none !important;
            }
        }
        
        @media (max-width: 768px) {
            .comprobante-container {
                padding: 20px;
            }
            
            .comprobante-buttons {
                position: static;
                margin-top: 20px;
                justify-content: center;
            }
        }
    </style>`;
    }

    /**
     * Genera el encabezado del comprobante
     * @returns {string} HTML del encabezado
     */
    generarEncabezado() {
        return `
        <div class="comprobante-header">
            <img src="images/top.png" alt="Logo Laboratorio Josemaria" onerror="this.style.display='none'">
        </div>`;
    }

    /**
     * Genera el título del comprobante
     * @param {Object} fechaHora - Objeto con fecha y hora
     * @returns {string} HTML del título
     */
    generarTitulo(fechaHora) {
        return `
        <div class="comprobante-title">
            <h1>Cotización</h1>
            <p>Guayaquil, ${fechaHora.dia} de ${fechaHora.mes} de ${fechaHora.año} - ${fechaHora.hora}</p>
        </div>`;
    }

    /**
     * Genera la información del cliente
     * @param {Object} datos - Datos del cliente
     * @returns {string} HTML de la información del cliente
     */
    generarInfoCliente(datos) {
        const cedula = datos.cedula || 'No especificada';
        
        return `
        <div class="comprobante-client-info">
            <div><strong>Paciente:</strong> ${this.escaparHTML(datos.paciente)}</div>
            <div><strong>Cédula:</strong> ${this.escaparHTML(cedula)}</div>
        </div>`;
    }

    /**
     * Genera la tabla de exámenes SIN MOSTRAR PRECIOS INDIVIDUALES
     * @param {Array} examenes - Lista de exámenes
     * @returns {string} HTML de la tabla
     */
    generarTablaExamenes(examenes) {
        const filasExamenes = examenes.map(examen => `
            <tr>
                <td>${this.escaparHTML(examen.nombre)}</td>
            </tr>`
        ).join('');

        return `
        <table class="comprobante-table">
            <thead>
                <tr>
                    <th>Descripción del Examen</th>
                </tr>
            </thead>
            <tbody>
                ${filasExamenes}
            </tbody>
        </table>`;
    }

    /**
     * Genera la sección del total
     * @param {number} total - Total a pagar
     * @returns {string} HTML del total
     */
    generarTotal(total) {
        return `
        <div class="comprobante-total">
            <strong>TOTAL: $${total.toFixed(2)}</strong>
        </div>`;
    }

    /**
     * Genera las notas del comprobante
     * @returns {string} HTML de las notas
     */
    generarNotas() {
        return `
        <div class="comprobante-notes">
            <p><strong>Importante:</strong></p>
            <p>* Los precios de algunos exámenes especiales están sujetos a variaciones por los procesos de análisis.</p>
            <p>* Nos reservamos el derecho de modificar precios sin previo aviso.</p>
            <p>* Aplican restricciones.</p>
            <p>Cotización generada por: COTIZADOR WEB</p>
        </div>`;
    }

    /**
     * Genera los botones de acción
     * @returns {string} HTML de los botones
     */
    generarBotones() {
        return `
        <div class="comprobante-buttons">
            <button class="comprobante-button btn-print" onclick="window.print()">
                <i class="fas fa-print"></i> Imprimir
            </button>
            <button class="comprobante-button btn-close" onclick="window.close()">
                <i class="fas fa-times"></i> Cerrar
            </button>
        </div>`;
    }

    /**
     * Abre una nueva ventana con el HTML del comprobante
     * @param {string} html - HTML completo del comprobante
     */
    abrirVentana(html) {
        const ventana = window.open('', '_blank', this.configuracion.caracteristicas);
        
        if (!ventana) {
            alert('No se pudo abrir la ventana del comprobante. Por favor, permita ventanas emergentes.');
            return;
        }

        ventana.document.write(html);
        ventana.document.close();
        
        // Auto-focus en la ventana nueva
        ventana.focus();
    }

    /**
     * Escapa caracteres HTML para prevenir XSS
     * @param {string} texto - Texto a escapar
     * @returns {string} Texto escapado
     */
    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    /**
     * Genera un comprobante en formato PDF (requiere biblioteca adicional)
     * Esta función es un placeholder para futura implementación
     */
    generarPDF(datos) {
        console.warn('Generación de PDF no implementada aún');
        // Aquí se podría integrar jsPDF o similar
    }

    /**
     * Permite personalizar la configuración de la ventana
     * @param {Object} config - Nueva configuración
     */
    configurar(config) {
        this.configuracion = { ...this.configuracion, ...config };
    }
}

// Crear instancia global
window.GeneradorComprobante = GeneradorComprobante;

// Exportar para uso con módulos ES6 (si se usa)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeneradorComprobante;
}
