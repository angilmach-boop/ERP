// small responsive helpers (kept minimal)
document.addEventListener('DOMContentLoaded', function () {
  // make chart canvases a fixed height for better layout
  const charts = document.querySelectorAll('.chart-card canvas');
  charts.forEach(c => c.style.height = '220px');

  // Modal open/close for Add Item
  const openBtn = document.getElementById('openAddModal');
  const modal = document.getElementById('addItemModal');
  const closeBtn = document.getElementById('closeAddModal');
  const cancelBtn = document.getElementById('cancelAdd');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // Edit item modal handlers
  const editModal = document.getElementById('editItemModal');
  const openEditButtons = document.querySelectorAll('button[data-edit-id]');
  const closeEditBtn = document.getElementById('closeEditModal');
  const cancelEditBtn = document.getElementById('cancelEdit');
  const editForm = document.getElementById('editItemForm');
  if (openEditButtons.length) {
    openEditButtons.forEach(btn => btn.addEventListener('click', async (e) => {
      const id = btn.getAttribute('data-edit-id');
      try {
        const res = await fetch(`/inventory/${id}/get`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        document.getElementById('edit_name').value = data.name || '';
        document.getElementById('edit_category').value = data.category || '';
        document.getElementById('edit_quantity').value = data.quantity || 0;
        document.getElementById('edit_reorder').value = data.reorder_level || 0;
        document.getElementById('edit_unit_cost').value = data.unit_cost || 0;
        editForm.action = `/inventory/${id}/edit`;
        editModal.classList.add('open'); editModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      } catch (err) { alert('Failed to load item'); }
    }));
  }
  if (closeEditBtn) closeEditBtn.addEventListener('click', () => { editModal.classList.remove('open'); editModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => { editModal.classList.remove('open'); editModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });

  // Stock movement modal handlers
  const stockModal = document.getElementById('stockModal');
  const openStockButtons = document.querySelectorAll('button[data-stock-id]');
  const closeStockBtn = document.getElementById('closeStockModal');
  const cancelStockBtn = document.getElementById('cancelStock');
  const stockForm = document.getElementById('stockForm');
  if (openStockButtons.length) {
    openStockButtons.forEach(btn => btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-stock-id');
      stockForm.action = `/inventory/${id}/transaction`;
      stockModal.classList.add('open'); stockModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    }));
  }
  if (closeStockBtn) closeStockBtn.addEventListener('click', () => { stockModal.classList.remove('open'); stockModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });
  if (cancelStockBtn) cancelStockBtn.addEventListener('click', () => { stockModal.classList.remove('open'); stockModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });
  if (stockModal) { stockModal.addEventListener('click', (e) => { if (e.target === stockModal) { stockModal.classList.remove('open'); stockModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; } }); }

  // Mobile sidebar toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.querySelector('.sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.toggle('open'); });
    // close sidebar when clicking a link
    sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (window.innerWidth <= 900) sidebar.classList.remove('open'); }));
    // close sidebar when clicking outside
    document.addEventListener('click', (e) => { if (sidebar.classList.contains('open') && !e.target.closest('.sidebar') && !e.target.closest('#mobileMenuBtn')) sidebar.classList.remove('open'); });
  }

  // Create PO modal logic
  const openCreatePO = document.getElementById('openCreatePO');
  const createPOModal = document.getElementById('createPOModal');
  const closeCreatePO = document.getElementById('closeCreatePO');
  const cancelCreatePO = document.getElementById('cancelCreatePO');
  const addPORow = document.getElementById('addPORow');
  if (openCreatePO && createPOModal) {
    openCreatePO.addEventListener('click', () => { createPOModal.classList.add('open'); document.body.style.overflow='hidden'; });
    if (closeCreatePO) closeCreatePO.addEventListener('click', () => { createPOModal.classList.remove('open'); document.body.style.overflow=''; });
    if (cancelCreatePO) cancelCreatePO.addEventListener('click', () => { createPOModal.classList.remove('open'); document.body.style.overflow=''; });
    addPORow && addPORow.addEventListener('click', () => {
      const template = document.querySelector('#poItems .form-row');
      if (template) {
        const clone = template.cloneNode(true);
        clone.querySelectorAll('input').forEach(i=>i.value='');
        document.getElementById('poItems').appendChild(clone);
        clone.querySelector('.removeRow')?.addEventListener('click', () => clone.remove());
      }
    });
    document.querySelectorAll('#poItems .removeRow').forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.form-row').remove()));
  }

  // Create Sale modal logic
  const openCreateSale = document.getElementById('openCreateSale');
  const createSaleModal = document.getElementById('createSaleModal');
  const closeCreateSale = document.getElementById('closeCreateSale');
  const cancelCreateSale = document.getElementById('cancelCreateSale');
  const addSaleRow = document.getElementById('addSaleRow');
  if (openCreateSale && createSaleModal) {
    openCreateSale.addEventListener('click', () => { createSaleModal.classList.add('open'); document.body.style.overflow='hidden'; });
    if (closeCreateSale) closeCreateSale.addEventListener('click', () => { createSaleModal.classList.remove('open'); document.body.style.overflow=''; });
    if (cancelCreateSale) cancelCreateSale.addEventListener('click', () => { createSaleModal.classList.remove('open'); document.body.style.overflow=''; });
    addSaleRow && addSaleRow.addEventListener('click', () => {
      const template = document.querySelector('#saleItems .form-row');
      if (template) {
        const clone = template.cloneNode(true);
        clone.querySelectorAll('input').forEach(i=>i.value='');
        document.getElementById('saleItems').appendChild(clone);
        clone.querySelector('.removeRow')?.addEventListener('click', () => clone.remove());
      }
    });
    document.querySelectorAll('#saleItems .removeRow').forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.form-row').remove()));
  }

  // Sidebar collapse toggle
  const collapseBtn = document.getElementById('collapseSidebarBtn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      collapseBtn.setAttribute('aria-pressed', isCollapsed ? 'true' : 'false');
      const icon = collapseBtn.querySelector('i');
      if (icon) icon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    if (document.body.classList.contains('sidebar-collapsed')) {
      const icon = collapseBtn.querySelector('i'); if (icon) icon.style.transform = 'rotate(180deg)';
    }
  }
});
