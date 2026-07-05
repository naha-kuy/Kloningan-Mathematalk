// Load token from server-side flash (for server-rendered pages)
if (typeof window.__API_TOKEN === 'string' && window.__API_TOKEN.length > 0) {
    localStorage.setItem('mathematalk_token', window.__API_TOKEN);
}

function getToken() {
    return localStorage.getItem('mathematalk_token');
}

function handleUnauthorized() {
    localStorage.removeItem('mathematalk_token');
    window.location.href = 'login.html';
}

async function apiFetch(url, options = {}) {
    const token = getToken() || window.__API_TOKEN;
    const headers = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
    };

    // Add CSRF token for stateful requests
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    if (csrfTokenMeta) {
        headers['X-CSRF-TOKEN'] = csrfTokenMeta.getAttribute('content');
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const fetchOptions = {
        ...options,
        headers,
        credentials: 'same-origin'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Use url directly - no API_BASE_URL prepending
    const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? '' : '';
    const response = await fetch(apiBase + url, fetchOptions);

    if (response.status === 401) {
        handleUnauthorized();
        return;
    }

    return response;
}

async function apiGet(url, options = {}) {
    const response = await apiFetch(url, { ...options, method: 'GET' });
    if (!response) return null;

    try {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return null;
        }
        return await response.json();
    } catch (error) {
        // Return null for empty or invalid JSON responses
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
            return null;
        }
        throw error;
    }
}

async function apiPost(url, data) {
    const isFormData = data instanceof FormData;
    const response = await apiFetch(url, {
        method: 'POST',
        body: isFormData ? data : JSON.stringify(data)
    });
    if (!response) return null;

    try {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return null;
        }

        const jsonResponse = await response.json();

        // Handle error responses (422, 500, etc.)
        if (!response.ok) {
            return {
                success: false,
                message: jsonResponse.message || 'Terjadi kesalahan',
                errors: jsonResponse.errors || null
            };
        }

        return jsonResponse;
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
            return null;
        }
        throw error;
    }
}

async function apiPatch(url, data) {
    const isFormData = data instanceof FormData;
    const response = await apiFetch(url, {
        method: 'PATCH',
        body: isFormData ? data : JSON.stringify(data)
    });
    if (!response) return null;

    try {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return null;
        }

        const jsonResponse = await response.json();

        // Handle error responses (422, 500, etc.)
        if (!response.ok) {
            return {
                success: false,
                message: jsonResponse.message || 'Terjadi kesalahan',
                errors: jsonResponse.errors || null
            };
        }

        return jsonResponse;
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
            return null;
        }
        throw error;
    }
}

async function apiPut(url, data) {
    const isFormData = data instanceof FormData;
    const response = await apiFetch(url, {
        method: 'PUT',
        body: isFormData ? data : JSON.stringify(data)
    });
    if (!response) return null;

    try {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return null;
        }

        const jsonResponse = await response.json();

        // Handle error responses (422, 500, etc.)
        if (!response.ok) {
            return {
                success: false,
                message: jsonResponse.message || 'Terjadi kesalahan',
                errors: jsonResponse.errors || null
            };
        }

        return jsonResponse;
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
            return null;
        }
        throw error;
    }
}

async function apiDelete(url) {
    const response = await apiFetch(url, { method: 'DELETE' });
    if (!response) return null;

    try {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return null;
        }

        const jsonResponse = await response.json();

        // Handle error responses (422, 500, etc.)
        if (!response.ok) {
            return {
                success: false,
                message: jsonResponse.message || 'Terjadi kesalahan',
                errors: jsonResponse.errors || null
            };
        }

        return jsonResponse;
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
            return null;
        }
        throw error;
    }
}

// Toast notification helper
window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-xl text-white font-bold transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Format currency
window.formatCurrency = function(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// Format date
window.formatDate = function(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Global Alpine data for auth check
document.addEventListener('alpine:init', () => {
    Alpine.data('authCheck', () => ({
        init() {
            const publicPaths = ['index.html', 'about-us.html', 'contact.html', 'store.html', 'hall-of-fame.html', 'kelas-aktif.html', 'private-class.html', 'login.html', 'register.html', 'forgot-password.html'];
            const current = window.location.pathname.split('/').pop() || 'index.html';
            if (!getToken() && !current.startsWith('ortu-') && !publicPaths.includes(current)) {
                window.location.href = 'login.html';
            }
        }
    }));
});
