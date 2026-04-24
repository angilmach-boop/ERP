(function () {
  const data = window.ERP_CHART_DATA || { categories: [], categoryValues: [], stockTrend: [] };
  const colors = ['#ff6b9a', '#ff9bbf', '#ffc6df', '#ffd8e8', '#ffeef6'];
  // Pie chart
  const pieEl = document.getElementById('pieChart');
  if (pieEl) {
    new Chart(pieEl.getContext('2d'), {
      type: 'pie',
      data: {
        labels: data.categories,
        datasets: [{ data: data.categoryValues, backgroundColor: colors.slice(0, data.categories.length) }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
  // Line chart (stock trend)
  const lineEl = document.getElementById('lineChart');
  if (lineEl) {
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].slice(0, data.stockTrend.length);
    new Chart(lineEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{ label: 'Stock', data: data.stockTrend, borderColor: '#ff6b9a', backgroundColor: 'rgba(255,107,154,0.12)', fill: true }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
  // Bar chart
  const barEl = document.getElementById('barChart');
  if (barEl) {
    new Chart(barEl.getContext('2d'), {
      type: 'bar',
      data: {
        labels: data.categories,
        datasets: [{ label: 'Quantity', data: data.categoryValues, backgroundColor: '#ff9bbf' }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
})();
