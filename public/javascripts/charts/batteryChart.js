// Chart.js configuration for Battery Inventory
let batteryChart = null;
let chartType = 'totals'; // 'totals', 'platforms', 'sizes'

// Fetch battery data and render chart
async function loadBatteryData() {
    try {
        const response = await fetch('/api/v1/batteries');
        const result = await response.json();
        
        if (result.success && result.data) {
            const batteries = result.data;
            const totalCount = batteries.length;
            
            // Update total count display
            const totalElement = document.getElementById('totalBatteries');
            if (totalElement) {
                totalElement.textContent = totalCount;
            }
            
            // Process data for chart
            const chartData = processChartData(batteries, chartType);
            
            // Render or update chart
            renderChart(chartData);
            
            // Populate table
            populateBatteryTable(batteries);
        }
    } catch (error) {
        console.error('Error loading battery data:', error);
        const totalElement = document.getElementById('totalBatteries');
        if (totalElement) {
            totalElement.textContent = 'Error';
        }
        const tableBody = document.getElementById('batteryTableBody');
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading batteries</td></tr>';
        }
    }
}

function populateBatteryTable(batteries) {
    const tableBody = document.getElementById('batteryTableBody');
    if (!tableBody) {
        return;
    }
    
    if (!batteries || batteries.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No batteries found</td></tr>';
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Create rows for each battery
    batteries.forEach(battery => {
        const row = document.createElement('tr');
        
        // Format purchase date
        const purchaseDate = battery.purchase_date 
            ? new Date(battery.purchase_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })
            : 'N/A';
        
        // Format status with badge color
        const statusBadge = getStatusBadge(battery.battery_status);
        
        row.innerHTML = `
            <td>${battery.serial_number || 'N/A'}</td>
            <td>${battery.platform_model || 'N/A'}</td>
            <td>${battery.capacity ? battery.capacity.toLocaleString() + ' mAh' : 'N/A'}</td>
            <td>${statusBadge}</td>
            <td>${purchaseDate}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getStatusBadge(status) {
    const statusColors = {
        'active': 'success',
        'warning': 'warning',
        'retired': 'danger'
    };
    
    const color = statusColors[status] || 'secondary';
    const statusText = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    
    return `<span class="badge bg-${color}">${statusText}</span>`;
}

function processChartData(batteries, type) {
    if (type === 'totals') {
        // Count by status
        const statusCounts = {
            active: 0,
            warning: 0,
            retired: 0
        };
        
        batteries.forEach(battery => {
            if (statusCounts.hasOwnProperty(battery.battery_status)) {
                statusCounts[battery.battery_status]++;
            }
        });
        
        return {
            labels: ['Active', 'Warning', 'Retired'],
            data: [statusCounts.active, statusCounts.warning, statusCounts.retired],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        };
    } else if (type === 'platforms') {
        // Count by platform
        const platformCounts = {};
        batteries.forEach(battery => {
            const platform = battery.platform_model || 'Unknown';
            platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        });
        
        return {
            labels: Object.keys(platformCounts),
            data: Object.values(platformCounts),
            backgroundColor: generateColors(Object.keys(platformCounts).length)
        };
    } else if (type === 'sizes') {
        // Count by capacity ranges
        const sizeRanges = {
            'Small (< 3000mAh)': 0,
            'Medium (3000-5000mAh)': 0,
            'Large (5000-7000mAh)': 0,
            'Extra Large (> 7000mAh)': 0
        };
        
        batteries.forEach(battery => {
            const capacity = battery.capacity || 0;
            if (capacity < 3000) {
                sizeRanges['Small (< 3000mAh)']++;
            } else if (capacity < 5000) {
                sizeRanges['Medium (3000-5000mAh)']++;
            } else if (capacity < 7000) {
                sizeRanges['Large (5000-7000mAh)']++;
            } else {
                sizeRanges['Extra Large (> 7000mAh)']++;
            }
        });
        
        return {
            labels: Object.keys(sizeRanges),
            data: Object.values(sizeRanges),
            backgroundColor: ['#17a2b8', '#007bff', '#6610f2', '#e83e8c']
        };
    }
}

function generateColors(count) {
    const colors = [
        '#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8',
        '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#6c757d'
    ];
    return colors.slice(0, count);
}

function renderChart(chartData) {
    const canvas = document.getElementById('batteryChart');
    if (!canvas) {
        console.error('Chart canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (batteryChart) {
        batteryChart.destroy();
    }
    
    // Determine chart type based on current selection
    let type = chartType === 'totals' ? 'doughnut' : 'bar';
    
    batteryChart = new Chart(ctx, {
        type: type,
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Battery Count',
                data: chartData.data,
                backgroundColor: chartData.backgroundColor,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: type === 'bar' ? {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            } : {}
        }
    });
}

function updateButtonStates(activeId) {
    ['btn-totals', 'btn-platforms', 'btn-sizes'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            if (id === activeId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
}

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadBatteryData();
    
    // Set up button handlers
    const btnTotals = document.getElementById('btn-totals');
    const btnPlatforms = document.getElementById('btn-platforms');
    const btnSizes = document.getElementById('btn-sizes');
    
    if (btnTotals) {
        btnTotals.addEventListener('click', function() {
            chartType = 'totals';
            loadBatteryData();
            updateButtonStates('btn-totals');
        });
    }
    
    if (btnPlatforms) {
        btnPlatforms.addEventListener('click', function() {
            chartType = 'platforms';
            loadBatteryData();
            updateButtonStates('btn-platforms');
        });
    }
    
    if (btnSizes) {
        btnSizes.addEventListener('click', function() {
            chartType = 'sizes';
            loadBatteryData();
            updateButtonStates('btn-sizes');
        });
    }
});

